import { ChakraProvider } from '@chakra-ui/react'
import {
  Box,
  Flex,
  Text,
  Img,
  Icon,
  Image,
  HStack,
  VStack,
  chakra,
  CircularProgress,
  CircularProgressLabel,
  Button,
} from '@chakra-ui/react'
import { WasmAPI, LCDClient, MsgExecuteContract } from '@terra-money/terra.js'
import { BsArrowUpRight } from 'react-icons/bs'
import Pagination from '@choc-ui/paginator'
import {
  MdOutlinePlace,
  MdOutlineCategory,
  MdOutlineAccountBalanceWallet,
} from 'react-icons/md'
import { Link, useNavigate } from '@reach/router'
import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  forwardRef,
  useCallback,
} from 'react'

import { useStore } from '../store'
import theme from '../theme'
import {
  ImageTransition,
  ButtonTransition,
  ButtonBackTransition,
  ButtonOrangeBackTransition,
} from '../components/ImageTransition'
import Footer from '../components/Footer'
import Notification from '../components/Notification'
import {
  GetProjectStatus,
  EstimateSend,
  CheckNetwork,
  FetchData,
  isWefundWallet,
  isCommunityWallet,
  isBackerWallet,
  Sleep,
} from '../components/Util'

let useConnectedWallet = {}
if (typeof document !== 'undefined') {
  useConnectedWallet =
    require('@terra-money/wallet-provider').useConnectedWallet
}

export default function ExplorerProject() {
  const { state, dispatch } = useStore()
  const [postProjectData, setPostProjectData] = useState('')

  const navigate = useNavigate()

  let activeTab
  //------------extract active mode----------------------------
  if (typeof window != 'undefined') {
    let queryString, urlParams
    queryString = window.location.search
    urlParams = new URLSearchParams(queryString)
    activeTab = urlParams.get('activetab')
    if (GetProjectStatus(activeTab) == 0) activeTab = 'WeFundApproval'
  }
  function GetActiveTab() {
    return activeTab
  }
  //-----------Change mode---------------------
  function onChangeActivetab(mode) {
    if (state.timer != '') {
      clearInterval(state.timer)
      dispatch({ type: 'setTimer', message: '' })
    }
    navigate('/explorer?activetab=' + mode)
  }
  //------------deadline timer-------------------------------
  const postRef = useRef(postProjectData)
  postRef.current = postProjectData

  const [, updateState] = useState()
  const forceUpdate = useCallback(() => updateState({}), [])

  const myTimer = () => {
    if (postRef.current != '') {
      for (let i = 0; i < postRef.current.length; i++) {
        postRef.current[i].leftTime = parseInt(
          (parseInt(postRef.current[i].community_vote_deadline) - Date.now()) /
            1000 /
            60,
        ) //for minutes
      }
      setPostProjectData(postRef.current)
      forceUpdate()
    }
  }

  useEffect(() => {
    if (activeTab == 'CommuntyApproval') {
      myTimer()
      const id = setInterval(myTimer, 1000 * 60)
      return () => clearInterval(id)
    }
  }, [postProjectData])
  
  //-------------paginator-----------------------------------
  const [current, setCurrent] = useState(1)
  const pageSize = 3

  const Prev = forwardRef((props, ref) => (
    <Button ref={ref} {...props}>
      Prev
    </Button>
  ))

  const Next = forwardRef((props, ref) => (
    <Button ref={ref} {...props}>
      Next
    </Button>
  ))

  const itemRender = (_, type) => {
    if (type === 'prev') {
      return Prev
    }
    if (type === 'next') {
      return Next
    }
  }

  function onChangePaginator(page) {
    if (state.activeProjectData == '') {
      setPostProjectData('')
      return
    }
    const offset = (page - 1) * pageSize
    setPostProjectData(state.activeProjectData.slice(offset, offset + pageSize))
  }
  //-----------connect to wallet ---------------------
  let connectedWallet = ''
  if (typeof document !== 'undefined') {
    connectedWallet = useConnectedWallet()
  }

  //------------notification setting---------------------------------
  const notificationRef = useRef()

  //----------init api, lcd-------------------------
  const api = new WasmAPI(state.lcd_client.apiRequester)

  //-----------fetch project data=-------------------------
  async function fetchContractQuery(force = false) {
    try {
      let { projectData } = await FetchData(
        api,
        notificationRef,
        state,
        dispatch,
        force,
      )
      //-----------------initialize--------------------------
      let activeProjectData = projectData.filter(
        (project) =>
          parseInt(project.project_status) == GetProjectStatus(activeTab),
      )

      dispatch({ type: 'setActiveProjectData', message: activeProjectData })
      setPostProjectData(activeProjectData.slice(0, pageSize))
      setCurrent(1)
    } catch (e) {
      console.log(e)
    }
  }

  //------------Wefund Approve-----------------
  async function WefundApprove(project_id) {
    CheckNetwork(connectedWallet, notificationRef, state)
    let deadline = Date.now() + 1000 * 60 * 60 * 24 * 15 //for 15days
    let msg = new MsgExecuteContract(
      connectedWallet.walletAddress,
      state.WEFundContractAddress,
      { wefund_approve: { project_id, deadline } },
    )
    await EstimateSend(
      connectedWallet,
      state.lcd_client,
      msg,
      'WeFund Approve success',
      notificationRef,
    )
    await Sleep(2000)
    fetchContractQuery(true)
  }

  //-----------Community Vote----------------
  async function CommunityVote(project_id, voted, leftTime) {
    CheckNetwork(connectedWallet, notificationRef, state)
    if (leftTime <= 0) {
      notificationRef.current.showNotification('Time is expired', 'error', 4000)
      return
    }
    let wallet = connectedWallet.walletAddress
    let msg = new MsgExecuteContract(wallet, state.WEFundContractAddress, {
      set_community_vote: { project_id, wallet, voted },
    })
    await EstimateSend(
      connectedWallet,
      state.lcd_client,
      msg,
      'Community vote success',
      notificationRef,
    )
    await Sleep(2000)
    fetchContractQuery(true)
  }

  async function MilestoneVote(project_id, voted) {
    CheckNetwork(connectedWallet, notificationRef, state)
    let wallet = connectedWallet.walletAddress
    let MilestoneVoteMsg = { set_milestone_vote: { project_id, wallet, voted } }

    let wefundContractAddress = state.WEFundContractAddress
    let msg = new MsgExecuteContract(
      wallet,
      wefundContractAddress,
      MilestoneVoteMsg,
    )
    EstimateSend(
      connectedWallet,
      state.lcd_client,
      msg,
      'Milestone vote success',
      notificationRef,
    )
    await Sleep(2000)
    fetchContractQuery(true)
  }

  //---------initialize fetching---------------------
  useEffect(() => {
    fetchContractQuery()
  }, [activeTab])

  const CircularProgresses = ({ value, sz }) => {
    const released = value?.releasedPercent
    const vote = value?.communityVotedPercent
    const backer = value?.backer_backedPercent
    const community = value?.community_backedPercent
    return (
      <>
        {GetActiveTab() == 'CommuntyApproval' && (
          <CircularProgress value={vote} size={sz} color="blue.600">
            <CircularProgressLabel>{vote}%</CircularProgressLabel>
          </CircularProgress>
        )}
        {GetActiveTab() == 'MileStoneFundraising' && (
          <>
            <CircularProgress value={community} size={sz} color="blue.600">
              <CircularProgressLabel>{community}%</CircularProgressLabel>
            </CircularProgress>
            <CircularProgress value={backer} size={sz} color="blue.600">
              <CircularProgressLabel>{backer}%</CircularProgressLabel>
            </CircularProgress>
          </>
        )}
        {GetActiveTab() == 'MileStoneDelivery' && (
          <CircularProgress value={released} size={sz} color="blue.600">
            <CircularProgressLabel>{released}%</CircularProgressLabel>
          </CircularProgress>
        )}
      </>
    )
  }

  return (
    <ChakraProvider resetCSS theme={theme}>
      <Flex
        color={'white'}
        width={'100%'}
        fontSize={'18px'}
        justify={'center'}
        fontWeight={'500'}
        alignItems={'center'}
        flexDirection={'column'}
        fontFamily={'Sk-Modernist-Regular'}
        background={'linear-gradient(90deg, #1F0021 0%, #120054 104.34%)'}
      >
        <Flex
          zIndex={'11'}
          width={'100%'}
          height={'250px'}
          justify={'center'}
          alignItems={'center'}
          flexDirection={'column'}
          backgroundSize={'cover'}
          backgroundPosition={'center'}
          backgroundRepeat={'no-repeat'}
          boxShadow={'0px 5px 15px #000000A6'}
          backgroundImage={"url('/media/createproject_banner.svg')"}
        >
          <Flex fontSize="16px" justify="center">
            <Text fontWeight="normal" color={'rgba(255, 255, 255, 0.54)'}>
              Home &gt;&nbsp;
            </Text>
            <Text color={'rgba(255, 255, 255, 0.84)'}>Projects</Text>
          </Flex>
          <Flex
            mt="10px"
            justify="center"
            fontWeight={'900'}
            fontFamily={'PilatExtended-Bold'}
            fontSize={{ base: '25px', md: '25px', lg: '40px' }}
          >
            <Text>Explore&nbsp;</Text>
            <Text color="#4790f5">Projects</Text>
          </Flex>
        </Flex>

        <Text fontSize="18px" color={'rgba(255, 255, 255, 0.84)'} mt={'50px'}>
          Project Status:
          {GetActiveTab() === 'WeFundApproval' && ' Under WeFund Approval'}
          {GetActiveTab() === 'CommuntyApproval' && ' Under CommunitApproval'}
          {GetActiveTab() === 'MileStoneFundraising' && ' Milestone Fundrasing'}
          {GetActiveTab() === 'MileStoneDelivery' && ' Milestone Delivery'}
          {GetActiveTab() === 'ProjectComplete' && ' Project Completed'}
        </Text>

        {/*---------------- Tabs-------------------- */}
        <Flex
          mt="50px"
          cursor="pointer"
          justify="center"
          width={{ lg: '80%' }}
          bg={'rgba(255, 255, 255, 0.05)'}
        >
          <Box
            bg={
              GetActiveTab() == 'WeFundApproval'
                ? '#13002B'
                : 'rgba(255, 255, 255, 0.05)'
            }
            border={'1px solid rgba(255, 255, 255, 0.05)'}
            onClick={() => onChangeActivetab('WeFundApproval')}
            width={{ lg: '20%' }}
            textAlign={'center'}
            py={'30px'}
          >
            <Text>WeFund Approval</Text>
          </Box>
          <Box
            border={'1px solid rgba(255, 255, 255, 0.05)'}
            bg={
              GetActiveTab() == 'CommuntyApproval'
                ? '#13002B'
                : 'rgba(255, 255, 255, 0.05)'
            }
            onClick={() => onChangeActivetab('CommuntyApproval')}
            width={{ lg: '20%' }}
            textAlign={'center'}
            py={'30px'}
          >
            <Text>Communty Approval</Text>
          </Box>
          <Box
            bg={
              GetActiveTab() == 'MileStoneFundraising'
                ? '#13002B'
                : 'rgba(255, 255, 255, 0.05)'
            }
            onClick={() => onChangeActivetab('MileStoneFundraising')}
            border={'1px solid rgba(255, 255, 255, 0.05)'}
            width={{ lg: '20%' }}
            textAlign={'center'}
            py={'30px'}
          >
            <Text>Milestone Fundraising</Text>
          </Box>
          <Box
            border={'1px solid rgba(255, 255, 255, 0.05)'}
            bg={
              GetActiveTab() == 'MileStoneDelivery'
                ? '#13002B'
                : 'rgba(255, 255, 255, 0.05)'
            }
            onClick={() => onChangeActivetab('MileStoneDelivery')}
            width={{ lg: '20%' }}
            textAlign={'center'}
            py={'30px'}
          >
            <Text>Milestone Delivery</Text>
          </Box>
          <Box
            border={'1px solid rgba(255, 255, 255, 0.05)'}
            bg={
              GetActiveTab() == 'ProjectComplete'
                ? '#13002B'
                : 'rgba(255, 255, 255, 0.05)'
            }
            onClick={() => onChangeActivetab('ProjectComplete')}
            width={{ lg: '20%' }}
            textAlign={'center'}
            py={'30px'}
          >
            <Text>Project Complete</Text>
          </Box>
        </Flex>

        {/* Projects Incubated */}

        <Flex w={{ lg: '80%' }} justify="center" mt="50px">
          <Box fontFamily={'Sk-Modernist-Regular'} w={'100%'}>
            <Flex w={'100%'} justify="center" zIndex={'1'}>
              <VStack w={'100%'} paddingBottom={'50px'}>
                <Flex
                  w="100%"
                  padding={'0 20px'}
                  borderTopColor={'transparent'}
                  bg={'rgba(255, 255, 255, 0.05)'}
                  fontFamily={'Sk-Modernist-Regular'}
                >
                  {/* ------------------project desktop---------- */}
                  <Flex
                    w="100%"
                    flexDirection={'column'}
                    display={{ base: 'none', lg: 'flex' }}
                  >
                    {/* ------------------project list---------- */}
                    <Flex w="100%" my={'26px'} justifyContent={'space-between'}>
                      <Text fontSize={{ base: '15px', lg: '22px' }}>
                        Projects Incubated
                      </Text>

                      <Text fontSize={{ base: '15px', md: '15px', lg: '22px' }}>
                        {state.projectData.length} Project
                        {state.projectData.length === 1 ? '' : 's'}
                      </Text>
                    </Flex>

                    {/* ------------------project snippet detail---------- */}
                    {postProjectData != '' &&
                      postProjectData.map((e, index) => (
                        <Box
                          w="100%"
                          key={index}
                          shadow="lg"
                          overflow="hidden"
                          boxSizing="border-box"
                          borderTop="1px solid rgba(255, 255, 255, 0.1)"
                        >
                          <HStack w="100%">
                            <Flex
                              my={'6px'}
                              mx={'6px'}
                              width="400px"
                              height="270px"
                              bg="#FFFFFF"
                              boxShadow={
                                '0px 2px 10px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.25)'
                              }
                              borderRadius={'2xl'}
                              px="20px"
                              py="10px"
                              align="center"
                              justify="center"
                            >
                              <object
                                data="/logo.png"
                                type="image/png"
                                style={{ width: '200px', height: '200px' }}
                              >
                                <Img
                                  objectFit={'contain'}
                                  src={
                                    state.request +
                                    '/download?filename=' +
                                    e.project_icon
                                  }
                                />
                              </object>
                            </Flex>
                            <Box py={4} px={2} w="100%">
                              <Flex justify={'space-between'} mb={'20px'}>
                                <Box>
                                  <chakra.h1
                                    mb={'15px'}
                                    color="white"
                                    fontSize="lg"
                                    fontWeight="bold"
                                  >
                                    {GetActiveTab() === 'WeFundApproval' &&
                                      'Project Status: Under WeFund Approval'}
                                    {GetActiveTab() === 'CommuntyApproval' &&
                                      'Project Status: Under CommunitApproval'}
                                    {GetActiveTab() ===
                                      'MileStoneFundraising' &&
                                      'Project Status: Milestone Fundrasing'}
                                    {GetActiveTab() === 'MileStoneDelivery' &&
                                      'Project Status: Milestone Delivery'}
                                    {GetActiveTab() === 'ProjectComplete' &&
                                      'Project Status: Project Completed'}
                                  </chakra.h1>
                                  <chakra.h1
                                    color="white"
                                    fontSize="lg"
                                    fontWeight="bold"
                                  >
                                    {e.project_name}
                                  </chakra.h1>
                                </Box>
                                {GetActiveTab() === 'WeFundApproval' &&
                                  isWefundWallet(state) && (
                                    <Flex w={'330px'} justify={'space-between'}>
                                      <ButtonTransition
                                        unitid={'Approve' + index}
                                        selected={false}
                                        width="160px"
                                        height="50px"
                                        rounded="33px"
                                        onClick={() =>
                                          WefundApprove(e.project_id)
                                        }
                                      >
                                        Approve Project
                                      </ButtonTransition>
                                    </Flex>
                                  )}
                                {GetActiveTab() === 'CommuntyApproval' &&
                                  isCommunityWallet(state, e.project_id) && (
                                    <Flex w={'330px'} justify={'space-between'}>
                                      <ButtonTransition
                                        unitid={'visit' + index}
                                        width="160px"
                                        height="50px"
                                        selected={false}
                                        rounded="33px"
                                        onClick={() =>
                                          CommunityVote(
                                            e.project_id,
                                            true,
                                            e.leftTime,
                                          )
                                        }
                                      >
                                        Vote Yes
                                      </ButtonTransition>

                                      <ButtonTransition
                                        unitid={'view' + index}
                                        selected={false}
                                        width="160px"
                                        height="50px"
                                        rounded="33px"
                                        onClick={() =>
                                          CommunityVote(
                                            e.project_id,
                                            false,
                                            e.leftTime,
                                          )
                                        }
                                      >
                                        Vote No
                                      </ButtonTransition>
                                    </Flex>
                                  )}
                                {GetActiveTab() === 'MileStoneFundraising' && (
                                  <ButtonTransition
                                    unitid={'visit' + index}
                                    width="160px"
                                    height="50px"
                                    selected={false}
                                    rounded="33px"
                                    mb="10px"
                                    onClick={() => {
                                      navigate(
                                        '/invest_step1?project_id=' + e.project_id,
                                      )
                                    }}
                                  >
                                    Back Project
                                  </ButtonTransition>
                                )}
                                {GetActiveTab() === 'MileStoneDelivery' &&
                                  isBackerWallet(state, e.project_id) && (
                                    <Flex w={'330px'} justify={'space-between'}>
                                      <ButtonTransition
                                        unitid={'milestonevoteyes' + index}
                                        width="160px"
                                        height="50px"
                                        selected={false}
                                        rounded="33px"
                                        onClick={() =>
                                          MilestoneVote(e.project_id, true)
                                        }
                                      >
                                        Vote Yes
                                      </ButtonTransition>

                                      <ButtonTransition
                                        unitid={'milestonevoteno' + index}
                                        selected={false}
                                        width="160px"
                                        height="50px"
                                        rounded="33px"
                                        onClick={() =>
                                          MilestoneVote(e.project_id, false)
                                        }
                                      >
                                        Vote No
                                      </ButtonTransition>
                                    </Flex>
                                  )}
                              </Flex>

                              <Flex
                                align="self-start"
                                justifyContent={'space-between'}
                              >
                                <Flex flexDirection={'column'} w="60%">
                                  <chakra.p
                                    py={2}
                                    fontSize="15px"
                                    color={'gray.400'}
                                  >
                                    Date -{' '}
                                    <span style={{ color: '#FE8600' }}>
                                      {e.project_createddate}
                                    </span>
                                  </chakra.p>

                                  <chakra.p py={2} color={'gray.400'}>
                                    {e.project_description.substr(0, 250)}
                                  </chakra.p>
                                </Flex>
                                <CircularProgresses value={e} sz="150px" />
                              </Flex>
                              {GetActiveTab() === 'CommuntyApproval' && (
                                <HStack>
                                  <chakra.p
                                    py={2}
                                    w="600px"
                                    color={'gray.400'}
                                    paddingTop={'55px'}
                                    paddingRight={'20px'}
                                  >
                                    Community Voting will be finished in{' '}
                                    {e.leftTime} minutes
                                  </chakra.p>
                                </HStack>
                              )}
                              {GetActiveTab() === 'MileStoneDelivery' && (
                                <HStack>
                                  <chakra.p
                                    py={2}
                                    w="600px"
                                    color={'gray.400'}
                                    paddingTop={'55px'}
                                    paddingRight={'20px'}
                                  >
                                    Project Milestone step -{' '}
                                    {parseInt(e.project_milestonestep) + 1}
                                  </chakra.p>
                                </HStack>
                              )}
                              <HStack justify="space-between" mt={'10px'}>
                                <Flex alignItems="center" color={'gray.400'}>
                                  <Icon
                                    as={MdOutlineCategory}
                                    h={6}
                                    w={6}
                                    mr={1}
                                  />
                                  <chakra.h1 px={1} fontSize="sm">
                                    {e.project_chain}
                                  </chakra.h1>
                                </Flex>
                                <Flex alignItems="center" color={'gray.400'}>
                                  <Icon
                                    as={MdOutlinePlace}
                                    h={6}
                                    w={6}
                                    mr={1}
                                  />
                                  <chakra.h1 px={1} fontSize="sm">
                                    {e.project_category}
                                  </chakra.h1>
                                </Flex>
                                <Flex alignItems="center" color={'gray.400'}>
                                  <Icon
                                    as={MdOutlineAccountBalanceWallet}
                                    h={6}
                                    w={6}
                                    mr={1}
                                  />
                                  <chakra.h1 px={1} fontSize="sm">
                                    ${e.project_collected}
                                    <span style={{ color: '#00A3FF' }}>
                                      {' '}
                                      Fundraising Amount
                                    </span>
                                  </chakra.h1>
                                </Flex>

                                <Flex w={'330px'} justify={'space-between'}>
                                  <ButtonBackTransition
                                    unitid={'visit' + index}
                                    width="160px"
                                    height="50px"
                                    selected={false}
                                    rounded="33px"
                                  >
                                    <Box
                                      variant="solid"
                                      color="white"
                                      justify="center"
                                      align="center"
                                      onClick={() =>
                                        window.open(
                                          e.project_website,
                                          '_blank',
                                          'noopener,noreferrer',
                                        )
                                      }
                                    >
                                      Visit Website{' '}
                                      <Icon as={BsArrowUpRight} h={4} w={4} />
                                    </Box>
                                  </ButtonBackTransition>

                                  <ButtonOrangeBackTransition
                                    unitid={'view' + index}
                                    selected={false}
                                    width="160px"
                                    height="50px"
                                    rounded="33px"
                                  >
                                    <Link
                                      to={'/detail?project_id=' + e.project_id}
                                    >
                                      <Box
                                        variant="solid"
                                        color="white"
                                        justify="center"
                                        align="center"
                                      >
                                        View Project
                                      </Box>
                                    </Link>
                                  </ButtonOrangeBackTransition>
                                </Flex>
                              </HStack>
                            </Box>
                          </HStack>
                        </Box>
                      ))}
                  </Flex>
                  {/* ------------------project mobile---------- */}
                  <VStack display={{ base: 'block', lg: 'none' }}>
                    {/* ------------------project list---------- */}
                    <Flex
                      marginTop={'26px'}
                      marginBottom={'26px'}
                      alignSelf={{ lg: 'flex-start' }}
                      direction={{ base: 'row', md: 'row', lg: 'row' }}
                    >
                      <Flex alignSelf={'flex-start'} width={{ lg: '950px' }}>
                        <Text
                          fontSize={{ base: '15px', md: '15px', lg: '22px' }}
                        >
                          Projects Incubated
                        </Text>
                      </Flex>
                      <Flex alignSelf={'flex-end'} marginLeft={'98px'}>
                        <Text
                          fontSize={{ base: '15px', md: '15px', lg: '22px' }}
                        >
                          {state.projectData.length} Project
                          {state.projectData.length === 1 ? '' : 's'}
                        </Text>
                      </Flex>
                    </Flex>

                    {/* ------------------project snippet detail---------- */}
                    <Flex
                      borderTop="1px solid rgba(255, 255, 255, 0.1)"
                      boxSizing="border-box"
                      shadow="lg"
                      rounded="lg"
                      alignSelf={'center'}
                      direction={'column'}
                    >
                      {postProjectData != '' &&
                        postProjectData.map((e, index) => (
                          <Flex
                            width={'300px'}
                            alignSelf={'center'}
                            direction={'column'}
                            mb="20px"
                            key={index}
                            align="center"
                          >
                            {/* ------------------project image---------- */}
                            <Flex
                              width={'300px'}
                              direction={'column'}
                              alignSelf={'center'}
                            >
                              <Flex
                                my={'6px'}
                                mx={'6px'}
                                minW="72px"
                                bg="#FFFFFF"
                                padding={'10px'}
                                boxShadow={
                                  '0px 2px 10px rgba(0, 0, 0, 015), 0px 4px 4px rgba(0, 0, 0, 0.25)'
                                }
                                borderRadius={'2xl'}
                                align="center"
                              >
                                <object
                                  data="/logo.png"
                                  style={{
                                    width: '100%',
                                    maxHeight: '200px',
                                    alignItems: 'center',
                                  }}
                                  type="image/png"
                                >
                                  <Image
                                    alignSelf={'center'}
                                    src={
                                      state.request +
                                      '/download?filename=' +
                                      e.project_icon
                                    }
                                    w="72px"
                                  />
                                </object>
                              </Flex>
                              {/* ------------------project Detail---------- */}
                              <Flex
                                pt={2}
                                px={2}
                                w="240px"
                                direction="column"
                                alignSelf={'end'}
                              >
                                <chakra.h1
                                  color="white"
                                  fontWeight="bold"
                                  fontSize="lg"
                                >
                                  {e.project_name}
                                </chakra.h1>
                                <chakra.p
                                  pt={2}
                                  color={'gray.400'}
                                  fontSize="15px"
                                >
                                  Date -{' '}
                                  <span style={{ color: '#FE8600' }}>
                                    {e.project_createddate}
                                  </span>
                                </chakra.p>
                                {/* ------------------project synopsis---------- */}
                                <chakra.p
                                  pt={2}
                                  color={'gray.400'}
                                  fontSize="15px"
                                  h="auto"
                                  overflow="hidden"
                                  textAlign={'center'}
                                  justify={'center'}
                                >
                                  {e.project_description.substr(0, 300)}
                                </chakra.p>
                              </Flex>
                            </Flex>
                            {GetActiveTab() === 'CommuntyApproval' && (
                              <HStack>
                                <chakra.p py={2} w="600px" color={'gray.400'}>
                                  Community Voting will be finished in{' '}
                                  {e.leftTime} minutes
                                </chakra.p>
                              </HStack>
                            )}
                            {GetActiveTab() === 'MileStoneDelivery' && (
                              <HStack>
                                <chakra.p py={2} w="600px" color={'gray.400'}>
                                  Project Milestone step -{' '}
                                  {parseInt(e.project_milestonestep) + 1}
                                </chakra.p>
                              </HStack>
                            )}
                            {GetActiveTab() === 'WeFundApproval' &&
                              isWefundWallet(state) && (
                                <Flex justify={'center'}>
                                  <ButtonTransition
                                    unitid={'Approve' + index}
                                    selected={false}
                                    width="140px"
                                    height="40px"
                                    rounded="30px"
                                    onClick={() => WefundApprove(e.project_id)}
                                  >
                                    Approve Project
                                  </ButtonTransition>
                                </Flex>
                              )}
                            {GetActiveTab() === 'CommuntyApproval' &&
                              isCommunityWallet(state, e.project_id) && (
                                <Flex justify={'space-between'}>
                                  <ButtonTransition
                                    unitid={'visit' + index}
                                    width="140px"
                                    height="40px"
                                    selected={false}
                                    rounded="30px"
                                    onClick={() =>
                                      CommunityVote(
                                        e.project_id,
                                        true,
                                        e.leftTime,
                                      )
                                    }
                                  >
                                    Vote Yes
                                  </ButtonTransition>

                                  <ButtonTransition
                                    unitid={'view' + index}
                                    selected={false}
                                    width="140px"
                                    height="40px"
                                    rounded="30px"
                                    onClick={() =>
                                      CommunityVote(
                                        e.project_id,
                                        false,
                                        e.leftTime,
                                      )
                                    }
                                  >
                                    Vote No
                                  </ButtonTransition>
                                </Flex>
                              )}
                            {GetActiveTab() === 'MileStoneFundraising' && (
                              <ButtonTransition
                                unitid={'visit' + index}
                                width="140px"
                                height="40px"
                                selected={false}
                                rounded="30px"
                                mb="10px"
                                onClick={() => {
                                  navigate('/back?project_id=' + e.project_id)
                                }}
                              >
                                Back Project
                              </ButtonTransition>
                            )}
                            {GetActiveTab() === 'MileStoneDelivery' &&
                              isBackerWallet(state, e.project_id) && (
                                <Flex justify={'space-between'}>
                                  <ButtonTransition
                                    unitid={'milestonevoteyes' + index}
                                    width="140px"
                                    height="40px"
                                    selected={false}
                                    rounded="30px"
                                    onClick={() =>
                                      MilestoneVote(e.project_id, true)
                                    }
                                  >
                                    Vote Yes
                                  </ButtonTransition>

                                  <ButtonTransition
                                    unitid={'milestonevoteno' + index}
                                    selected={false}
                                    width="140px"
                                    height="40px"
                                    rounded="30px"
                                    onClick={() =>
                                      MilestoneVote(e.project_id, false)
                                    }
                                  >
                                    Vote No
                                  </ButtonTransition>
                                </Flex>
                              )}
                            <Flex
                              alignSelf={'center'}
                              marginTop={'20px !important'}
                            >
                              <CircularProgresses value={e} sz="130px" />
                            </Flex>
                            {/* ------------------project buttons---------- */}
                            <Flex
                              my={'25px'}
                              direction={{ base: 'column', lg: 'row' }}
                            >
                              <HStack style={{ spacing: 10 }}>
                                <Flex>
                                  <ImageTransition
                                    unitid={'visit' + index}
                                    border1="linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)"
                                    background1="linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)"
                                    border2="linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)"
                                    background2="linear-gradient(180deg, #1A133E 0%, #1A133E 100%)"
                                    border3="linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)"
                                    background3="linear-gradient(180deg, #171347 0%, #171347 100%)"
                                    selected={false}
                                    width="150px"
                                    height="50px"
                                    rounded="33px"
                                  >
                                    <a href={e.project_website}>
                                      <Box
                                        variant="solid"
                                        color="white"
                                        justify="center"
                                        align="center"
                                        onClick={() => {}}
                                      >
                                        Visit Website{' '}
                                        <Icon
                                          as={BsArrowUpRight}
                                          h={4}
                                          w={4}
                                          mr={3}
                                        />
                                      </Box>
                                    </a>
                                  </ImageTransition>
                                </Flex>
                                <Flex>
                                  <ImageTransition
                                    unitid={'view' + index}
                                    border1="linear-gradient(180deg, #FE8600 0%, #F83E00 100%)"
                                    background1="linear-gradient(180deg, #FE8600 0%, #F83E00  100%)"
                                    border2="linear-gradient(180deg, #FE8600 0%, #F83E00 100%)"
                                    background2="linear-gradient(180deg, #1A133E 0%, #1A133E 100%)"
                                    border3="linear-gradient(180deg, #FE8600 0%, #F83E00 100%)"
                                    background3="linear-gradient(180deg, #171347 0%, #171347 100%)"
                                    selected={false}
                                    width="150px"
                                    height="50px"
                                    rounded="33px"
                                  >
                                    <Link
                                      to={'/detail?project_id=' + e.project_id}
                                    >
                                      <Box
                                        variant="solid"
                                        color="white"
                                        justify="center"
                                        align="center"
                                        onClick={() => {}}
                                      >
                                        View Project
                                      </Box>
                                    </Link>
                                  </ImageTransition>
                                </Flex>
                              </HStack>
                            </Flex>
                          </Flex>
                        ))}
                    </Flex>
                  </VStack>
                </Flex>
                <Flex
                  p={50}
                  w="100%"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Pagination
                    bg={
                      'linear-gradient(180deg, #FE8600 21.43%, #F83E00 147.62%)'
                    }
                    current={current}
                    onChange={(page) => onChangePaginator(page)}
                    pageSize={pageSize}
                    total={
                      state.activeProjectData == ''
                        ? 0
                        : state.activeProjectData.length
                    }
                    itemRender={itemRender}
                    paginationProps={{ display: 'flex' }}
                  />
                </Flex>
              </VStack>
            </Flex>
          </Box>
        </Flex>
        <Footer />
        <Notification ref={notificationRef} />
      </Flex>
    </ChakraProvider>
  )
}
