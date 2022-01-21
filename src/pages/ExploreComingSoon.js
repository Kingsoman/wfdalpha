import { ChakraProvider } from '@chakra-ui/react'
import {
  Box,
  Flex,
  Text,
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
import React, { useEffect, useState, useMemo, useRef, forwardRef, useCallback } from 'react'

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
  GetOneProject
  }  from '../components/Util'


let useConnectedWallet = {}
if (typeof document !== 'undefined') {
  useConnectedWallet =
    require('@terra-money/wallet-provider').useConnectedWallet
}

export default function ExplorerProject() {
  const { state, dispatch } = useStore()
  const [postProjectData, setPostProjectData] = useState('');

  const navigate = useNavigate()

  let activeTab;
  //------------extract active mode----------------------------
  if (typeof window != 'undefined') {
    let queryString, urlParams;
    queryString = window.location.search;
    urlParams = new URLSearchParams(queryString);
    activeTab = urlParams.get('activetab');
    if (GetProjectStatus(activeTab) == 0)
      activeTab = 'WeFundApproval';
  }
  function GetActiveTab(){
    return activeTab;
  }
  //-----------Change mode---------------------
  function onChangeActivetab(mode){
    if(state.timer != ''){
      clearInterval(state.timer);
      dispatch({
        type: 'setTimer',
        message: '',
      })      
    }
    navigate('/explorer?activetab=' + mode);
  }
  //------------deadline timer-------------------------------
  const postRef = useRef(postProjectData);
  postRef.current = postProjectData;

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
 
  const myTimer = () => {
    if(postRef.current != '')
    {
      for(let i=0; i<postRef.current.length; i++)
        postRef.current[i].leftTime = 
          parseInt((parseInt(postRef.current[i].community_vote_deadline) - Date.now())/1000/60); //for minutes
    }
    setPostProjectData(postRef.current);
    forceUpdate();
  };

  useEffect(
    () => {
        if(activeTab == 'CommuntyApproval'){
          myTimer();
          const id = setInterval(myTimer, 1000*60);
          return () => clearInterval(id);
        }
    },
    [postProjectData]
  );
  //-------------paginator-----------------------------------
  const [current, setCurrent] = useState(1);
  const pageSize = 3;

  const Prev = forwardRef((props, ref) => (
    <Button ref={ref} {...props}>
      Prev
    </Button>
  ));
  const Next = forwardRef((props, ref) => (
    <Button ref={ref} {...props}>
      Next
    </Button>
  ));
  const itemRender = (_, type) => {
    if (type === "prev") {
      return Prev;
    }
    if (type === "next") {
      return Next;
    }
  };
  function onChangePaginator(page){
    if(state.activeProjectData == ''){
      setPostProjectData('');
      return;
    }
    const offset = (page - 1) * pageSize;      
    setPostProjectData(state.activeProjectData.slice(offset, offset+pageSize));
  }
  //-----------connect to wallet ---------------------
  let connectedWallet = ''
  if (typeof document !== 'undefined') {
    connectedWallet = useConnectedWallet()
  }
  //------------notification setting---------------------------------
  const notificationRef = useRef();

  //----------init api, lcd-------------------------
  const lcd = useMemo(() => {
    if (!connectedWallet) {
      return null
    }

    dispatch({
      type: 'setConnectedWallet',
      message: connectedWallet,
    })

    return new LCDClient({
      URL: connectedWallet.network.lcd,
      chainID: connectedWallet.network.chainID,
    })
  }, [connectedWallet])

  const api = new WasmAPI(state.lcd_client.apiRequester)

  //-----------fetch project data=-------------------------
  async function fetchContractQuery() {
    try {
      let {projectData, communityData, configData} = await FetchData(api, notificationRef, state, dispatch);
      //-----------------initialize--------------------------
      let activeProjectData = projectData.filter(project => parseInt(project.project_status) == GetProjectStatus(activeTab));
      
      dispatch({
        type: 'setActiveProjectData',
        message: activeProjectData,
      })

      setPostProjectData(activeProjectData.slice(0, pageSize));
      setCurrent(1);
    } catch (e) {
      console.log(e)
    }
  }
  //------------Wefund Approve-----------------
  function WefundApprove(project_id){
    CheckNetwork(connectedWallet, notificationRef, state);

    let deadline = Date.now() + 1000*60*60*24*15; //for 15days
    let WefundApproveMsg = {
      wefund_approve: {
        project_id: project_id,
        deadline: deadline,
      },
    }
  
    let wefundContractAddress = state.WEFundContractAddress
    let msg = new MsgExecuteContract(
      connectedWallet.walletAddress,
      wefundContractAddress,
      WefundApproveMsg,
    )
    EstimateSend(connectedWallet, lcd, msg, "WeFund Approve success", notificationRef);
  }
  //-----------Community Vote----------------
  function CommunityVote(project_id, voted, leftTime){
    CheckNetwork(connectedWallet, notificationRef, state);
    if(leftTime <= 0){
      notificationRef.current.showNotification("Time is expired", "error", 4000);
      return;
    }
    let CommunityVoteMsg = {
      set_community_vote: {
        project_id: project_id,
        wallet: connectedWallet.walletAddress,
        voted: voted
      },
    }

    let wefundContractAddress = state.WEFundContractAddress
    let msg = new MsgExecuteContract(
      connectedWallet.walletAddress,
      wefundContractAddress,
      CommunityVoteMsg,
    )
    EstimateSend(connectedWallet, lcd, msg, "Community vote success", notificationRef);
  }
  function MilestoneVote(project_id, voted){
    CheckNetwork(connectedWallet, notificationRef, state);

    let MilestoneVoteMsg = {
      set_milestone_vote: {
        project_id: project_id,
        wallet: connectedWallet.walletAddress,
        voted: voted
      },
    }

    let wefundContractAddress = state.WEFundContractAddress
    let msg = new MsgExecuteContract(
      connectedWallet.walletAddress,
      wefundContractAddress,
      MilestoneVoteMsg,
    )
    EstimateSend(connectedWallet, lcd, msg, "Milestone vote success", notificationRef);
  }
  //---------initialize fetching---------------------
  useEffect(() => {
    fetchContractQuery();
  }, [activeTab])

  const CircularProgresses = ({projectItem, sz}) => {
    return(
      <>
      {GetActiveTab() == 'CommuntyApproval' &&
        <CircularProgress
          value={projectItem.communityVotedPercent}
          size={sz}
          color="blue.600"
        >
          <CircularProgressLabel>
            {projectItem.communityVotedPercent}%
          </CircularProgressLabel>
        </CircularProgress>
        }
        {GetActiveTab() == 'MileStoneFundraising' &&
        <>
          <CircularProgress
            value={projectItem.community_backedPercent}
            size={sz}
            color="blue.600"
          >
            <CircularProgressLabel>
              {projectItem.community_backedPercent}%
            </CircularProgressLabel>
          </CircularProgress>
          <CircularProgress
            value={projectItem.backer_backedPercent}
            size={sz}
            color="blue.600"
          >
            <CircularProgressLabel>
              {projectItem.backer_backedPercent}%
            </CircularProgressLabel>
          </CircularProgress>
        </>
        }
        {GetActiveTab() == 'MileStoneDelivery' &&
        <CircularProgress
          value={projectItem.releasedPercent}
          size={sz}
          color="blue.600"
        >
          <CircularProgressLabel>
            {projectItem.releasedPercent}%
          </CircularProgressLabel>
        </CircularProgress>
        }
      </>
    )
  }
  return (
    <ChakraProvider resetCSS theme={theme}>
      <div
        style={{
          background: 'linear-gradient(90deg, #1F0021 0%, #120054 104.34%)',
          width: '100%',
          color: 'white',
          fontSize: '18px',
          fontFamily: 'Sk-Modernist-Regular',
          fontWeight: '500',
        }}
      >
        <div
          style={{
            boxShadow: '0px 5px 50px 0px #000000A6',
            width: '100%',
            zIndex: '10',
          }}
        >
          <div
            style={{
              backgroundImage: "url('/createproject_banner.svg')",
              width: '100%',
              zIndex: '11',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
          >
            <Flex pt="64px" justify="center">
              <Text
                fontSize="16px"
                fontWeight="normal"
                color={'rgba(255, 255, 255, 0.54)'}
              >
                Home &gt;&nbsp;
              </Text>
              <Text fontSize="16px" color={'rgba(255, 255, 255, 0.84)'}>
                Projects
              </Text>
            </Flex>
            <Flex
              mt="11px"
              pb="75px"
              mb="75px"
              justify="center"
              style={{ fontFamily: 'PilatExtended-Bold' }}
            >
              <Text
                fontSize={{ base: '25px', md: '25px', lg: '40px' }}
                fontWeight={'900'}
              >
                Explore&nbsp;
              </Text>
              <Text
                fontSize={{ base: '25px', md: '25px', lg: '40px' }}
                color="#4790f5"
                fontWeight={'900'}
              >
                Projects
              </Text>
            </Flex>
            <Flex pt="14px" justify="center">
              <Text fontSize="18px" color={'rgba(255, 255, 255, 0.84)'}>
                {GetActiveTab() === 'WeFundApproval' &&
                  'Project Status: Under WeFund Approval'}
                {GetActiveTab() === 'CommuntyApproval' &&
                  'Project Status: Under CommunitApproval'}
                {GetActiveTab() === 'MileStoneFundraising' &&
                  'Project Status: Milestone Fundrasing'}
                {GetActiveTab() === 'MileStoneDelivery' &&
                  'Project Status: Milestone Delivery'}
                {GetActiveTab() === 'ProjectComplete' &&
                  'Project Status: Project Completed'}
              </Text>
            </Flex>
          </div>
        </div>

        {/*---------------- Tabs-------------------- */}

        <Flex
          mt="50px"
          mx={'10%'}
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
            <Text>MileStone Fundraising</Text>
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
            <Text>MileStone Delivery</Text>
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

        <Flex width={{ lg: '100%' }} justify="center" mt="50px" px="175px">
          <Box style={{ fontFamily: 'Sk-Modernist-Regular' }}>
            <Flex
              width={{ lg: '100%' }}
              justify="center"
              px="175px"
              zIndex={'1'}
            >
              <VStack paddingBottom={'50px'}>
                <Flex
                  width={{ lg: '1225px' }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '3xl',
                    borderTopColor: 'transparent',
                    fontFamily: 'Sk-Modernist-Regular',
                    paddingLeft: '20px',
                    paddingRight: '20px',
                  }}
                >
                  {/* ------------------project desktop---------- */}
                  <VStack
                    display={{ base: 'none', md: 'none', lg: 'block' }}
                    maxW={{ base: '0px', md: '0px', lg: '2560px' }}
                    maxH={{ base: '0px', md: '0px', lg: '9999px' }}
                  >
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
                      <Flex alignSelf={'flex-end'} marginLeft={'73px'}>
                        <Text
                          fontSize={{ base: '15px', md: '15px', lg: '22px' }}
                          width={'100px'}
                        >
                          {state.projectData.length} Projects
                        </Text>
                      </Flex>
                    </Flex>

                    {/* ------------------project snippet detail---------- */}
                    {postProjectData != '' &&
                      postProjectData.map((projectItem, index) => (
                        <Box
                          w="100%"
                          mx="auto"
                          borderTop="1px solid rgba(255, 255, 255, 0.1)"
                          boxSizing="border-box"
                          shadow="lg"
                          rounded="lg"
                          overflow="hidden"
                          key={index}
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
                                style={{ width: '200px', height: '200px' }}
                                type="image/png"
                              >
                                <Image
                                  src={
                                    state.request +
                                    '/download?filename=' +
                                    projectItem.project_icon
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
                                    {GetActiveTab() === 'MileStoneFundraising' &&
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
                                    {projectItem.project_name}
                                  </chakra.h1>
                                </Box>
                                {GetActiveTab() === 'WeFundApproval' && isWefundWallet(state) && (
                                  <Flex w={'330px'} justify={'space-between'}>
                                    <ButtonTransition
                                      unitid={'Approve' + index}
                                      selected={false}
                                      width="160px"
                                      height="50px"
                                      rounded="33px"
                                      onClick={() => WefundApprove(projectItem.project_id)}
                                    >
                                      Approve Project
                                    </ButtonTransition>
                                  </Flex>
                                )}
                                {GetActiveTab() === 'CommuntyApproval' && 
                                isCommunityWallet(state, projectItem.project_id) && (
                                  <Flex w={'330px'} justify={'space-between'}>
                                    <ButtonTransition
                                      unitid={'visit' + index}
                                      width="160px"
                                      height="50px"
                                      selected={false}
                                      rounded="33px"
                                      onClick={() => CommunityVote(projectItem.project_id, true, projectItem.leftTime)}
                                    >
                                      Vote Yes
                                    </ButtonTransition>

                                    <ButtonTransition
                                      unitid={'view' + index}
                                      selected={false}
                                      width="160px"
                                      height="50px"
                                      rounded="33px"
                                      onClick={() => CommunityVote(projectItem.project_id, false, projectItem.leftTime)}
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
                                    onClick={()=>{navigate('/back?project_id=' + projectItem.project_id)}}
                                  >
                                    Back Project
                                  </ButtonTransition>
                                )}
                                {GetActiveTab() === 'MileStoneDelivery' && 
                                isBackerWallet(state, projectItem.project_id) && (
                                  <Flex w={'330px'} justify={'space-between'}>
                                    <ButtonTransition
                                      unitid={'milestonevoteyes' + index}
                                      width="160px"
                                      height="50px"
                                      selected={false}
                                      rounded="33px"
                                      onClick={() => MilestoneVote(projectItem.project_id, true)}
                                    >
                                      Vote Yes
                                    </ButtonTransition>

                                    <ButtonTransition
                                      unitid={'milestonevoteno' + index}
                                      selected={false}
                                      width="160px"
                                      height="50px"
                                      rounded="33px"
                                      onClick={() => MilestoneVote(projectItem.project_id, false)}
                                    >
                                      Vote No
                                    </ButtonTransition>
                                  </Flex>
                                )}
                              </Flex>
                              <chakra.p
                                py={2}
                                color={'gray.400'}
                                fontSize="15px"
                              >
                                Date -{' '}
                                <span style={{ color: '#FE8600' }}>
                                  {projectItem.project_createddate}
                                </span>
                              </chakra.p>
                              {/* -------It works, This margin will push it up by 40px and then added padding (same val + 10) for desc so it stays down---- */}
                              <HStack
                                align="self-start"
                                marginTop={'-45px'}
                                marginBottom={'20px'}
                              >
                                <Box>
                                  <chakra.p
                                    py={2}
                                    w="600px"
                                    color={'gray.400'}
                                    paddingTop={'55px'}
                                    paddingRight={'20px'}
                                  >
                                    {projectItem.project_description.substr(
                                      0,
                                      250,
                                    )}
                                  </chakra.p>
                                </Box>
                                <CircularProgresses projectItem={projectItem} sz="150px"/>
                              </HStack>
                              {GetActiveTab() === 'CommuntyApproval' &&
                                <HStack>
                                  <chakra.p
                                      py={2}
                                      w="600px"
                                      color={'gray.400'}
                                      paddingTop={'55px'}
                                      paddingRight={'20px'}
                                    >
                                      Community Voting will be finished in {projectItem.leftTime} minutes
                                    </chakra.p>
                                </HStack>
                              }
                              {GetActiveTab() === 'MileStoneDelivery' &&
                                <HStack>
                                  <chakra.p
                                      py={2}
                                      w="600px"
                                      color={'gray.400'}
                                      paddingTop={'55px'}
                                      paddingRight={'20px'}
                                    >
                                      Project Milestone step - {parseInt(projectItem.project_milestonestep) + 1}
                                    </chakra.p>
                                </HStack>
                              }
                              <HStack justify="space-between">
                                <Flex alignItems="center" color={'gray.400'}>
                                  <Icon
                                    as={MdOutlineCategory}
                                    h={6}
                                    w={6}
                                    mr={2}
                                  />
                                  <chakra.h1 px={2} fontSize="sm">
                                    {projectItem.project_chain}
                                  </chakra.h1>
                                </Flex>
                                <Flex alignItems="center" color={'gray.400'}>
                                  <Icon
                                    as={MdOutlinePlace}
                                    h={6}
                                    w={6}
                                    mr={2}
                                  />
                                  <chakra.h1 px={2} fontSize="sm">
                                    {projectItem.project_category}
                                  </chakra.h1>
                                </Flex>
                                <Flex alignItems="center" color={'gray.400'}>
                                  <Icon
                                    as={MdOutlineAccountBalanceWallet}
                                    h={6}
                                    w={6}
                                    mr={2}
                                  />
                                  <chakra.h1 px={2} fontSize="sm">
                                    ${projectItem.project_collected}
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
                                          projectItem.project_website,
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
                                      to={
                                        '/detail?project_id=' +
                                        projectItem.project_id
                                      }
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
                  </VStack>
                  {/* ------------------project mobile---------- */}
                  <VStack
                    display={{
                      base: 'block',
                      md: 'block',
                      lg: 'none',
                    }}
                  >
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
                          {state.projectData.length} Projects
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
                        postProjectData.map((projectItem, index) => (
                          <Flex
                            width={'300px'}
                            alignSelf={'center'}
                            direction={'column'}
                            mb="20px"
                            key={index}
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
                                      projectItem.project_icon
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
                                  {projectItem.project_name}
                                </chakra.h1>
                                <chakra.p
                                  pt={2}
                                  color={'gray.400'}
                                  fontSize="15px"
                                >
                                  Date -{' '}
                                  <span style={{ color: '#FE8600' }}>
                                    {projectItem.project_createddate}
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
                                  {projectItem.project_description.substr(
                                    0,
                                    300,
                                  )}
                                </chakra.p>
                              </Flex>
                            </Flex>
                            {GetActiveTab() === 'WeFundApproval' && isWefundWallet(state) && (
                              <Flex justify={'center'}>
                                <ButtonTransition
                                  unitid={'Approve' + index}
                                  selected={false}
                                  width="140px"
                                  height="40px"
                                  rounded="30px"
                                  onClick={() => WefundApprove(projectItem.project_id)}
                                >
                                  Approve Project
                                </ButtonTransition>
                              </Flex>
                            )}
                            {GetActiveTab() === 'CommuntyApproval' && 
                            isCommunityWallet(state, projectItem.project_id) && (
                              <Flex justify={'space-between'}>
                                <ButtonTransition
                                  unitid={'visit' + index}
                                  width="140px"
                                  height="40px"
                                  selected={false}
                                  rounded="30px"
                                  onClick={() => CommunityVote(projectItem.project_id, true, projectItem.leftTime)}
                                >
                                  Vote Yes
                                </ButtonTransition>

                                <ButtonTransition
                                  unitid={'view' + index}
                                  selected={false}
                                  width="140px"
                                  height="40px"
                                  rounded="30px"
                                  onClick={() => CommunityVote(projectItem.project_id, false, projectItem.leftTime)}
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
                                onClick={()=>{navigate('/back?project_id=' + projectItem.project_id)}}
                              >
                                Back Project
                              </ButtonTransition>
                            )}
                            {GetActiveTab() === 'MileStoneDelivery' && 
                            isBackerWallet(state, projectItem.project_id) && (
                              <Flex justify={'space-between'}>
                                <ButtonTransition
                                  unitid={'milestonevoteyes' + index}
                                  width="140px"
                                  height="40px"
                                  selected={false}
                                  rounded="30px"
                                  onClick={() => MilestoneVote(projectItem.project_id, true)}
                                >
                                  Vote Yes
                                </ButtonTransition>

                                <ButtonTransition
                                  unitid={'milestonevoteno' + index}
                                  selected={false}
                                  width="140px"
                                  height="40px"
                                  rounded="30px"
                                  onClick={() => MilestoneVote(projectItem.project_id, false)}
                                >
                                  Vote No
                                </ButtonTransition>
                              </Flex>
                            )}
                            <Flex
                              alignSelf={'center'}
                              marginTop={'20px !important'}
                            >
                              <CircularProgresses projectItem={projectItem} sz="130px"/>
                            </Flex>
                            {/* ------------------project buttons---------- */}
                            <Flex
                              mt={'25px'}
                              mb={'25px'}
                              direction={{
                                base: 'column',
                                md: 'column',
                                lg: 'row',
                              }}
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
                                    <a href={projectItem.project_website}>
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
                                      to={
                                        '/detail?project_id=' +
                                        projectItem.project_id
                                      }
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
                  w="1000px"
                  p={50}
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
                    total={state.activeProjectData == ''? 0 : state.activeProjectData.length}
                    itemRender={itemRender}
                    paginationProps={{ display: 'flex' }}
                  />
                </Flex>
              </VStack>
            </Flex>
          </Box>
        </Flex>
        <Footer/>
        <Notification  ref={notificationRef}/>        
      </div>
    </ChakraProvider>
  )
}
