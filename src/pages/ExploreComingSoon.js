import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  forwardRef,
  useCallback,
} from 'react'
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
  Button,
  ChakraProvider,
  CircularProgress,
  CircularProgressLabel,
} from '@chakra-ui/react'
import {
  Sleep,
  FetchData,
  EstimateSend,
  CheckNetwork,
  isBackerWallet,
  isWefundWallet,
  GetProjectStatus,
  isCommunityWallet,
} from '../components/Util'
import {
  MdOutlinePlace,
  MdOutlineCategory,
  MdOutlineAccountBalanceWallet,
} from 'react-icons/md'
import {
  ImageTransition,
  ButtonTransition,
  ButtonBackTransition,
  ButtonOrangeBackTransition,
} from '../components/ImageTransition'
import theme from '../theme'
import { useStore } from '../store'
import Footer from '../components/Footer'
import Pagination from '@choc-ui/paginator'
import Tabs from '../components/Explore/Tabs'
import { BsArrowUpRight } from 'react-icons/bs'
import { Link, useNavigate } from '@reach/router'
import Notification from '../components/Notification'
import { WasmAPI, LCDClient, MsgExecuteContract } from '@terra-money/terra.js'

let useConnectedWallet = {}
if (typeof document !== 'undefined') {
  useConnectedWallet =
    require('@terra-money/wallet-provider').useConnectedWallet
}

export default function ExplorerProject() {
  const navigate = useNavigate()
  const { state, dispatch } = useStore()
  const [postProjectData, setPostProjectData] = useState('')

  let activeTab
  //------------extract active mode----------------------------
  if (typeof window != 'undefined') {
    let queryString, urlParams
    queryString = window.location.search
    urlParams = new URLSearchParams(queryString)
    activeTab = urlParams.get('activetab')
    if (GetProjectStatus(activeTab) == 0) activeTab = 'WeFundApproval'
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
  const lcd = useMemo(() => {
    if (!connectedWallet) {
      return null
    }
    const { lcd, chainID } = connectedWallet.network
    return new LCDClient({ URL: lcd, chainID })
  }, [connectedWallet])

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
      lcd,
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
      lcd,
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
      lcd,
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
        {activeTab == 'CommuntyApproval' && (
          <CircularProgress value={vote} size={sz} color="blue.600">
            <CircularProgressLabel>{vote}%</CircularProgressLabel>
          </CircularProgress>
        )}
        {activeTab == 'MileStoneFundraising' && (
          <>
            <CircularProgress value={community} size={sz} color="blue.600">
              <CircularProgressLabel>{community}%</CircularProgressLabel>
            </CircularProgress>
            <CircularProgress value={backer} size={sz} color="blue.600">
              <CircularProgressLabel>{backer}%</CircularProgressLabel>
            </CircularProgress>
          </>
        )}
        {activeTab == 'MileStoneDelivery' && (
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
          mb={'30px'}
          width={'100%'}
          justify={'center'}
          alignItems={'center'}
          flexDirection={'column'}
          backgroundSize={'cover'}
          backgroundRepeat={'no-repeat'}
          boxShadow={'0px 5px 15px #000000A6'}
          height={{ base: '150px', lg: '250px' }}
          backgroundImage={"url('/media/createproject_banner.svg')"}
        >
          <Flex
            color="rgba(255, 255, 255, 0.54)"
            fontSize={{ base: '12px', lg: '16px' }}
          >
            Home &gt;&nbsp;
            <Text color={'rgba(255, 255, 255, 0.84)'}>Projects</Text>
          </Flex>
          <Flex
            mt="10px"
            fontWeight={'900'}
            fontFamily={'PilatExtended-Bold'}
            fontSize={{ base: '20px', md: '25px', lg: '40px' }}
          >
            <Text>Explore&nbsp;</Text>
            <Text color="#4790f5">Projects</Text>
          </Flex>
        </Flex>

        <Text
          color="rgba(255, 255, 255, 0.84)"
          fontSize={{ base: '14px', md: '18px' }}
        >
          Project Status:
          {activeTab === 'WeFundApproval' && ' Under WeFund Approval'}
          {activeTab === 'CommuntyApproval' && ' Under CommunitApproval'}
          {activeTab === 'MileStoneFundraising' && ' Milestone Fundrasing'}
          {activeTab === 'MileStoneDelivery' && ' Milestone Delivery'}
          {activeTab === 'ProjectComplete' && ' Project Completed'}
        </Text>

        <Tabs activeTab={activeTab} onChangeActivetab={onChangeActivetab} />

        {/* Projects Incubated */}
        <Flex
          w={{ base: '90%', md: '98%', lg: '80%' }}
          justify="center"
          mt="50px"
        >
          <Box fontFamily={'Sk-Modernist-Regular'} w={'100%'}>
            <Flex w={'100%'} justify="center" zIndex={'1'}>
              <VStack w={'100%'} paddingBottom={'50px'}>
                <Flex
                  w="100%"
                  padding={'0 20px'}
                  justify={'center'}
                  borderTopColor={'transparent'}
                  bg={'rgba(255, 255, 255, 0.05)'}
                  fontFamily={'Sk-Modernist-Regular'}
                >
                  {/* ------------------project desktop---------- */}
                  <Flex
                    w="100%"
                    flexDirection={'column'}
                    display={{ base: 'none', md: 'flex', lg: 'flex' }}
                  >
                    {/* ------------------project list---------- */}
                    <Flex w="100%" my={'26px'} justifyContent={'space-between'}>
                      <Text fontSize={{ base: '15px', lg: '20px' }}>
                        Projects Incubated
                      </Text>

                      <Text fontSize={{ base: '15px', lg: '20px' }}>
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
                              m="6px"
                              p="10px"
                              width="40%"
                              bg="#FFFFFF"
                              height="270px"
                              align="center"
                              justify="center"
                              maxWidth={'270px'}
                              borderRadius={'2xl'}
                              boxShadow={'0px 4px 4px rgba(0, 0, 0, 0.25)'}
                            >
                              <object
                                data="/logo.png"
                                type="image/png"
                                style={{ width: '80%' }}
                              >
                                <Img
                                  w={'100%'}
                                  objectFit={'contain'}
                                  src={`${state.request}/download?filename=${e.project_icon}`}
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
                                    {activeTab === 'WeFundApproval' &&
                                      'Project Status: Under WeFund Approval'}
                                    {activeTab === 'CommuntyApproval' &&
                                      'Project Status: Under CommunitApproval'}
                                    {activeTab === 'MileStoneFundraising' &&
                                      'Project Status: Milestone Fundrasing'}
                                    {activeTab === 'MileStoneDelivery' &&
                                      'Project Status: Milestone Delivery'}
                                    {activeTab === 'ProjectComplete' &&
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
                                {activeTab === 'WeFundApproval' &&
                                  isWefundWallet(state) && (
                                    <Flex w={'330px'} justify={'space-between'}>
                                      <ButtonTransition
                                        unitid={'Approve' + index}
                                        selected={false}
                                        width="150px"
                                        height="45px"
                                        rounded="33px"
                                        onClick={() =>
                                          WefundApprove(e.project_id)
                                        }
                                      >
                                        <Text
                                          fontSize={{
                                            base: '14px',
                                            lg: '16px',
                                          }}
                                        >
                                          Approve Project
                                        </Text>
                                      </ButtonTransition>
                                    </Flex>
                                  )}
                                {activeTab === 'CommuntyApproval' &&
                                  isCommunityWallet(state, e.project_id) && (
                                    <Flex w={'330px'} justify={'space-between'}>
                                      <ButtonTransition
                                        unitid={'visit' + index}
                                        width="150px"
                                        height="45px"
                                        fontSize={{ base: '14px', lg: '16px' }}
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
                                        <Text
                                          fontSize={{
                                            base: '14px',
                                            lg: '16px',
                                          }}
                                        >
                                          Vote Yes
                                        </Text>
                                      </ButtonTransition>

                                      <ButtonTransition
                                        unitid={'view' + index}
                                        selected={false}
                                        width="150px"
                                        height="45px"
                                        fontSize={{ base: '14px', lg: '16px' }}
                                        rounded="33px"
                                        onClick={() =>
                                          CommunityVote(
                                            e.project_id,
                                            false,
                                            e.leftTime,
                                          )
                                        }
                                      >
                                        <Text
                                          fontSize={{
                                            base: '14px',
                                            lg: '16px',
                                          }}
                                        >
                                          Vote No
                                        </Text>
                                      </ButtonTransition>
                                    </Flex>
                                  )}
                                {activeTab === 'MileStoneFundraising' && (
                                  <ButtonTransition
                                    mb="10px"
                                    rounded="33px"
                                    selected={false}
                                    unitid={'visit' + index}
                                    width="150px"
                                    height="45px"
                                    fontSize={{ base: '14px', lg: '16px' }}
                                    onClick={() => {
                                      navigate(
                                        `/back?project_id=${e.project_id}`,
                                      )
                                    }}
                                  >
                                    <Text
                                      fontSize={{
                                        base: '14px',
                                        lg: '16px',
                                      }}
                                    >
                                      Back Project
                                    </Text>
                                  </ButtonTransition>
                                )}
                                {activeTab === 'MileStoneDelivery' &&
                                  isBackerWallet(state, e.project_id) && (
                                    <Flex w={'330px'} justify={'space-between'}>
                                      <ButtonTransition
                                        unitid={'milestonevoteyes' + index}
                                        width="150px"
                                        height="45px"
                                        fontSize={{ base: '14px', lg: '16px' }}
                                        selected={false}
                                        rounded="33px"
                                        onClick={() =>
                                          MilestoneVote(e.project_id, true)
                                        }
                                      >
                                        <Text
                                          fontSize={{
                                            base: '14px',
                                            lg: '16px',
                                          }}
                                        >
                                          Vote Yes
                                        </Text>
                                      </ButtonTransition>

                                      <ButtonTransition
                                        unitid={'milestonevoteno' + index}
                                        selected={false}
                                        width="150px"
                                        height="45px"
                                        fontSize={{ base: '14px', lg: '16px' }}
                                        rounded="33px"
                                        onClick={() =>
                                          MilestoneVote(e.project_id, false)
                                        }
                                      >
                                        <Text
                                          fontSize={{
                                            base: '14px',
                                            lg: '16px',
                                          }}
                                        >
                                          Vote No
                                        </Text>
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
                                <CircularProgresses
                                  value={e}
                                  sz={{
                                    base: '80px',
                                    md: '120px',
                                    lg: '150px',
                                  }}
                                />
                              </Flex>
                              {activeTab === 'CommuntyApproval' && (
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
                              {activeTab === 'MileStoneDelivery' && (
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

                                <Flex w={'305px'} justify={'space-between'}>
                                  <ButtonBackTransition
                                    unitid={'visit' + index}
                                    width="150px"
                                    height="45px"
                                    selected={false}
                                    rounded="33px"
                                  >
                                    <Flex
                                      color="white"
                                      align="center"
                                      justify="center"
                                      fontSize={{ base: '14px', lg: '16px' }}
                                      onClick={() =>
                                        window.open(
                                          e.project_website,
                                          '_blank',
                                          'noopener,noreferrer',
                                        )
                                      }
                                    >
                                      Visit Website
                                      <Icon
                                        ml={'5px'}
                                        as={BsArrowUpRight}
                                        h={{ base: 3, lg: 4 }}
                                        w={{ base: 3, lg: 4 }}
                                      />
                                    </Flex>
                                  </ButtonBackTransition>

                                  <ButtonOrangeBackTransition
                                    unitid={'view' + index}
                                    selected={false}
                                    width="150px"
                                    height="45px"
                                    rounded="33px"
                                  >
                                    <Link
                                      to={`/detail?project_id=${e.project_id}`}
                                      fontSize={{ base: '14px', lg: '16px' }}
                                      color="white"
                                    >
                                      View Project
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
                  <Flex
                    width={'100%'}
                    flexDirection="column"
                    display={{ base: 'flex', md: 'none', lg: 'none' }}
                  >
                    <Flex
                      w="100%"
                      my="26px"
                      pb="10px"
                      direction="row"
                      justifyContent={'space-between'}
                      borderBottom="1px solid rgba(255, 255, 255, 0.1)"
                    >
                      <Text fontSize={'15px'}>Projects Incubated</Text>
                      <Text fontSize="15px">
                        {state.projectData.length} Project
                        {state.projectData.length === 1 ? '' : 's'}
                      </Text>
                    </Flex>

                    {/* ------------------project snippet detail---------- */}
                    <Flex
                      w={'100%'}
                      shadow="lg"
                      alignSelf={'center'}
                      direction={'column'}
                      boxSizing="border-box"
                    >
                      {postProjectData != '' &&
                        postProjectData.map((e, index) => (
                          <Flex
                            width={'100%'}
                            alignSelf={'center'}
                            direction={'column'}
                            mb="20px"
                            key={index}
                            align="center"
                          >
                            {/* ------------------project image---------- */}
                            <Flex
                              width={'90%'}
                              justify={'center'}
                              direction={'column'}
                              alignSelf={'center'}
                            >
                              <Flex
                                mx="6px"
                                p="10px"
                                width="100%"
                                bg="#FFFFFF"
                                height="200px"
                                align="center"
                                justify="center"
                                borderRadius={'2xl'}
                                boxShadow={'0px 4px 4px rgba(0, 0, 0, 0.25)'}
                              >
                                <object
                                  data="/logo.png"
                                  type="image/png"
                                  style={{ width: '40%' }}
                                >
                                  <Image
                                    w="100%"
                                    objectFit="contain"
                                    src={`${state.request}/download?filename=${e.project_icon}`}
                                  />
                                </object>
                              </Flex>
                              {/* ------------------project Detail---------- */}
                              <Flex
                                py={2}
                                w="100%"
                                fontSize="15px"
                                alignItems={'center'}
                                justify={'space-between'}
                              >
                                <Text color="white" fontWeight="bold">
                                  {e.project_name}
                                </Text>
                                <Text color={'gray.400'}>
                                  Date -{' '}
                                  <span style={{ color: '#FE8600' }}>
                                    {e.project_createddate}
                                  </span>
                                </Text>
                              </Flex>

                              {/* ------------------project synopsis---------- */}
                              <Text color={'gray.400'} fontSize="15px">
                                {e.project_description.substr(0, 300)}
                              </Text>

                              <Flex
                                py={2}
                                w="100%"
                                alignItems={'center'}
                                flexDirection={'column'}
                                justify={'space-between'}
                              >
                                <Flex
                                  justify={'space-between'}
                                  alignItems="center"
                                  color={'gray.400'}
                                  w="100%"
                                >
                                  <Flex alignItems={'center'}>
                                    <Icon as={MdOutlineCategory} h={6} w={6} />
                                    <chakra.h1 fontSize="sm" ml={1}>
                                      {e.project_chain}
                                    </chakra.h1>
                                  </Flex>
                                  <Flex alignItems={'center'}>
                                    <Icon as={MdOutlinePlace} h={6} w={6} />
                                    <chakra.h1 fontSize="sm" ml={1}>
                                      {e.project_category}
                                    </chakra.h1>
                                  </Flex>
                                </Flex>

                                <Flex py={2} w="100%" justify="flex-start">
                                  <Icon
                                    as={MdOutlineAccountBalanceWallet}
                                    h={6}
                                    w={6}
                                  />
                                  <chakra.h1 fontSize="sm" ml={1}>
                                    ${e.project_collected}
                                    <span style={{ color: '#00A3FF' }}>
                                      {' '}
                                      Fundraising Amount
                                    </span>
                                  </chakra.h1>
                                </Flex>

                                {activeTab === 'CommuntyApproval' && (
                                  <Text py={2} color={'gray.400'}>
                                    Community Voting will be finished in{' '}
                                    {e.leftTime} minutes
                                  </Text>
                                )}
                                {activeTab === 'MileStoneDelivery' && (
                                  <Text py={2} color={'gray.400'}>
                                    Project Milestone step -{' '}
                                    {parseInt(e.project_milestonestep) + 1}
                                  </Text>
                                )}
                                {activeTab === 'WeFundApproval' &&
                                  isWefundWallet(state) && (
                                    <Flex justify={'center'}>
                                      <ButtonTransition
                                        unitid={'Approve' + index}
                                        selected={false}
                                        width="180px"
                                        height="40px"
                                        rounded="30px"
                                        onClick={() => {
                                          WefundApprove(e.project_id)
                                        }}
                                      >
                                        <Text fontSize={'15px'}>
                                          Approve Project
                                        </Text>
                                      </ButtonTransition>
                                    </Flex>
                                  )}
                                {activeTab === 'CommuntyApproval' &&
                                  isCommunityWallet(state, e.project_id) && (
                                    <Flex justify={'space-between'}>
                                      <ButtonTransition
                                        unitid={'visit' + index}
                                        width="120px"
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
                                        <Text fontSize={'15px'}>Vote Yes</Text>
                                      </ButtonTransition>

                                      <ButtonTransition
                                        unitid={'view' + index}
                                        selected={false}
                                        width="120px"
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
                                        <Text fontSize={'15px'}>Vote No</Text>
                                      </ButtonTransition>
                                    </Flex>
                                  )}
                                {activeTab === 'MileStoneFundraising' && (
                                  <ButtonTransition
                                    unitid={'visit' + index}
                                    width="180px"
                                    height="40px"
                                    selected={false}
                                    rounded="30px"
                                    mb="10px"
                                    onClick={() =>
                                      navigate(
                                        `/back?project_id=${e.project_id}`,
                                      )
                                    }
                                  >
                                    <Text fontSize={'15px'}>Back Project</Text>
                                  </ButtonTransition>
                                )}
                                {activeTab === 'MileStoneDelivery' &&
                                  isBackerWallet(state, e.project_id) && (
                                    <Flex justify={'space-between'}>
                                      <ButtonTransition
                                        unitid={'milestonevoteyes' + index}
                                        width="120px"
                                        height="40px"
                                        selected={false}
                                        rounded="30px"
                                        onClick={() =>
                                          MilestoneVote(e.project_id, true)
                                        }
                                      >
                                        <Text fontSize={'15px'}>Vote Yes</Text>
                                      </ButtonTransition>

                                      <ButtonTransition
                                        unitid={'milestonevoteno' + index}
                                        selected={false}
                                        width="120px"
                                        height="40px"
                                        rounded="30px"
                                        onClick={() =>
                                          MilestoneVote(e.project_id, false)
                                        }
                                      >
                                        <Text fontSize={'15px'}>Vote No</Text>
                                      </ButtonTransition>
                                    </Flex>
                                  )}
                              </Flex>
                            </Flex>

                            <Flex alignSelf={'center'} marginTop={'20px'}>
                              <CircularProgresses value={e} sz="120px" />
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
                                    height="40px"
                                    rounded="33px"
                                  >
                                    <a href={e.project_website}>
                                      <Flex justify="center" align="center">
                                        <Text fontSize={'15px'}>
                                          Visit Website
                                        </Text>
                                        <Icon
                                          as={BsArrowUpRight}
                                          h={3}
                                          w={3}
                                          ml={1}
                                        />
                                      </Flex>
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
                                    height="40px"
                                    rounded="33px"
                                  >
                                    <Link
                                      to={`/detail?project_id=${e.project_id}`}
                                    >
                                      <Box
                                        justify="center"
                                        fontSize={'15px'}
                                        align="center"
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
                  </Flex>
                </Flex>
                <Flex
                  p={50}
                  w="100%"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Pagination
                    bg="linear-gradient(180deg, #FE8600 21.43%, #F83E00 147.62%)"
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
