import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme'
import {
  chakra,
  Box,
  Flex,
  Text,
  Stack,
  Stat,
  StatNumber,
  StatLabel,
  Icon,
  Image,
  HStack,
  VStack,
  CircularProgress,
  CircularProgressLabel, Table,Thead,Tbody,Tr,Th,Td,TableCaption, 
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react'
import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react'
import { WasmAPI, LCDClient, MsgExecuteContract } from '@terra-money/terra.js'
// import { Chart } from "react-google-charts"
import {
  BsArrowUpRight,
} from 'react-icons/bs'
import { useNavigate } from '@reach/router'

import { useStore } from '../store'
import {ImageTransition, ButtonTransition} from '../components/ImageTransition'
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
  GetOneProject,
  GetProjectStatusString,
  ParseParam,
  }  from '../components/Util'

let useConnectedWallet = {}
if (typeof document !== 'undefined') {
  useConnectedWallet =
    require('@terra-money/wallet-provider').useConnectedWallet
}

export default function ProjectDetail() {
  const { state, dispatch } = useStore()
  const [oneprojectData, setOneprojectData] = useState('');
  const [totalBackedMoney, setTotalBackedMoney] = useState(0)
  const [totalBackedPercent, setTotalBackedPercent] = useState(0)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()

  //------------parse URL for project id----------------------------
  let project_id = ParseParam();

  //------------connect wallet ---------------------------------
  let connectedWallet = ''
  if (typeof document !== 'undefined') {
    connectedWallet = useConnectedWallet()
  }

  //------------init api, lcd ----------------------------------------------------
  const api = new WasmAPI(state.lcd_client.apiRequester)

  //------------notification setting---------------------------------
  const notificationRef = useRef();
  
  //------------deadline timer-------------------------------
  const postRef = useRef(oneprojectData);
  postRef.current = oneprojectData;

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const myTimer = () => {
    if(postRef.current != '')
    {
      postRef.current.leftTime = 
        parseInt((parseInt(postRef.current.community_vote_deadline) - Date.now())/1000/60); //for minutes
    }
    setOneprojectData(postRef.current);
    forceUpdate();
  };

  useEffect(
    () => {
        if(oneprojectData.project_status == '1'){ //CommuntyApproval
          myTimer();
          const id = setInterval(myTimer, 1000*60);
          return () => clearInterval(id);
        }
    },
    []
  );

  function onNext() {
    navigate('/invest_step1?project_id=' + oneprojectData.project_id)
  }
  //------------fectch project data------------------------------------
  async function fetchContractQuery() {
    let _project_id = 1
    if (project_id != null) _project_id = project_id

    try {
      let {projectData, communityData, configData} = await FetchData(api, notificationRef, state, dispatch);

      const oneprojectData = GetOneProject(projectData, _project_id);
      if(oneprojectData == ''){
        notificationRef.current.showNotification("Can't fetch Project Data", 'error', 6000);
        return;
      }

      for(let i=0; i<oneprojectData.milestone_states.length; i++){
        if(i < oneprojectData.project_milestonestep){
          oneprojectData.milestone_states[i].milestone_statusmessage = "Released";
        }
        else if(i == oneprojectData.project_milestonestep){
          if(oneprojectData.project_status == '3')//releasing status
          {
            oneprojectData.milestone_states[i].milestone_statusmessage = "Voting";
            oneprojectData.milestone_states[i].milestone_votingavailable = true;
          }
          else
          oneprojectData.milestone_states[i].milestone_statusmessage = "Not yet";
        }
        else
          oneprojectData.milestone_states[i].milestone_statusmessage = "Not yet";
      }

      setOneprojectData(oneprojectData);

      let totalBacked = parseInt(oneprojectData.communitybacked_amount) + parseInt(oneprojectData.backerbacked_amount);
      totalBacked /= 10 ** 6

      let percent = parseInt(totalBacked/parseInt(oneprojectData.project_collected) * 100 );
      setTotalBackedPercent(percent);
      setTotalBackedMoney(totalBacked);
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchContractQuery()
  }, [connectedWallet])

//------------Wefund Approve-----------------
function WefundApprove(project_id){
  if(CheckNetwork(connectedWallet, notificationRef, state) == false)
    return false;

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
  EstimateSend(connectedWallet, state.lcd_client, msg, "WeFund Approve success", notificationRef);
}
  //-----------Community Vote----------------
  function CommunityVote(project_id, voted, leftTime){
    if(CheckNetwork(connectedWallet, notificationRef, state) == false)
      return false;

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
    EstimateSend(connectedWallet, state.lcd_client, msg, "Community vote success", notificationRef);
  }
  function MilestoneVote(project_id, voted){
    if(CheckNetwork(connectedWallet, notificationRef, state) == false)
      return false;

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
    EstimateSend(connectedWallet, state.lcd_client, msg, "Milestone vote success", notificationRef);
  }
    //--Pop Ups for Projects
    const { isOpen: isVoteBoxOpen, onOpen: onVoteBoxOpen, onClose: onVoteBoxClose  } = useDisclosure()

  //--------Gantt chart data for Milestone timeline charting (Roadmap)

  const columns = [
    { type: "string", label: "Task ID" },
    { type: "string", label: "Task Name" },
    { type: "string", label: "Resource" },
    { type: "date", label: "Start Date" },
    { type: "date", label: "End Date" },
    { type: "number", label: "Duration" },
    { type: "number", label: "Percent Complete" },
    { type: "string", label: "Dependencies" },
  ];
  
  const rows = [
    [
      "2014Spring",
      "Spring 2014",
      "spring",
      new Date(2014, 2, 22),
      new Date(2014, 5, 20),
      null,
      100,
      null,
    ],
    [
      "2014Summer",
      "Summer 2014",
      "summer",
      new Date(2014, 5, 21),
      new Date(2014, 8, 20),
      null,
      100,
      null,
    ],
    [
      "2014Autumn",
      "Autumn 2014",
      "autumn",
      new Date(2014, 8, 21),
      new Date(2014, 11, 20),
      null,
      100,
      null,
    ],
    [
      "2014Winter",
      "Winter 2014",
      "winter",
      new Date(2014, 11, 21),
      new Date(2015, 2, 21),
      null,
      100,
      null,
    ],
    [
      "2015Spring",
      "Spring 2015",
      "spring",
      new Date(2015, 2, 22),
      new Date(2015, 5, 20),
      null,
      50,
      null,
    ],
    [
      "2015Summer",
      "Summer 2015",
      "summer",
      new Date(2015, 5, 21),
      new Date(2015, 8, 20),
      null,
      0,
      null,
    ],
    [
      "2015Autumn",
      "Autumn 2015",
      "autumn",
      new Date(2015, 8, 21),
      new Date(2015, 11, 20),
      null,
      0,
      null,
    ],
    [
      "2015Winter",
      "Winter 2015",
      "winter",
      new Date(2015, 11, 21),
      new Date(2016, 2, 21),
      null,
      0,
      null,
    ],
    [
      "Football",
      "Football Season",
      "sports",
      new Date(2014, 8, 4),
      new Date(2015, 1, 1),
      null,
      100,
      null,
    ],
    [
      "Baseball",
      "Baseball Season",
      "sports",
      new Date(2015, 2, 31),
      new Date(2015, 9, 20),
      null,
      14,
      null,
    ],
    [
      "Basketball",
      "Basketball Season",
      "sports",
      new Date(2014, 9, 28),
      new Date(2015, 5, 20),
      null,
      86,
      null,
    ],
    [
      "Hockey",
      "Hockey Season",
      "sports",
      new Date(2014, 9, 8),
      new Date(2015, 5, 21),
      null,
      89,
      null,
    ],
  ];
  
  const data = [columns, ...rows];
  
  const options = {
    height: 400,
    gantt: {
      trackHeight: 30,
    },
  };

  //-----------------Visual Code Start----------------------------
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
        {/* ------------Parent Box for the Details------------ */}
        <Flex width="100%" justify="center"  minHeight={'3000px'}>
          <Box style={{ fontFamily: 'Sk-Modernist-Regular' }}>
            {/* ------------Details------------ */}
            <Flex
              width="100%"
              justify="center"
              alignItems={'center'}
              zIndex={'1'}
            >
              <VStack>
                <Flex
                  alignContent={'center'}
                  direction={{ base: 'column', md: 'column', lg: 'row' }}
                >
                  
                  <VStack
                    width={{ lg: '880px' }}
                    height={{ lg: '484px' }}
                    paddingLeft={{ lg: '55px' }}
                  >
                    <Flex
                      style={{ fontFamily: 'PilatExtended-Bold' }}
                      alignSelf={{
                        base: 'center',
                        md: 'center',
                        lg: 'flex-start',
                      }}
                    >
                      <Text fontSize="40px" fontWeight={'900'}>
                        {oneprojectData.project_name}
                      </Text>
                    </Flex>
                    <Flex>
                      <Text textAlign={'left'} fontWeight={'400'} fontSize={'18px'}>
                        {oneprojectData.project_description}
                      </Text>
                    </Flex>
                    <Flex
                      alignSelf={{
                        base: 'center',
                        md: 'center',
                        lg: 'flex-start',
                      }}
                    >
                    {/* The Countdown and Vote*/}
                      {/* <Flex>
                        <Flex
                          mt={{ base: '20px', md: '20px', lg: '00px' }}
                          mr={{ base: '0px', md: '0px', lg: '25px' }}
                          alignSelf={{ base: 'center', md: 'center', lg: 'flex-start'}}
                        >
                          <ImageTransition
                            unitid="vote"
                            border1="linear-gradient(180deg, #21EC77 0%, #2ECC711A 100%)"
                            background1="linear-gradient(180deg,  #21EC77 0%, #2ECC711A 100%)"
                            border2="linear-gradient(180deg,  #21EC77 0%, #2ECC711A 100%)"
                            background2="linear-gradient(180deg, #1A133E 0%, #1A133E 100%)"
                            border3="linear-gradient(180deg,  #21EC77 0%, #2ECC711A 100%)"
                            background3="linear-gradient(180deg, #171347 0%, #171347 100%)"
                            selected={false}
                            width="90px"
                            height="90px"
                            rounded="15px"
                          >
                            <Box
                              variant="solid"
                              color="white"
                              justify="center"
                              align="center"
                              onClick={() => {}}
                            >
                              Vote{' '}
                            </Box>
                          </ImageTransition>
                        </Flex>
                        <Flex 
                          direction={{ base: 'column', md: 'column', lg: 'column' }} 
                          ml={{ base: '0px', md: '0px', lg: '25px' }}
                        >
                          <Text>
                            Voting Ends
                          </Text>
                          <HStack>
                            <Box >
                              <Text 
                                fontFamily={'Pilat Extended'}
                                fontWeight={'900'}
                                fontSize={'26px'}
                                lineHeight={'33px'}
                                textAlign={'center'}
                                color={'#FE8600'}
                                >
                                {oneprojectData.leftTime}
                              </Text>
                              <Text
                                fontFamily={'Sk-Modernist-Regular'}
                                fontSize={'15px'}
                                color={'rgba(255, 255, 255, 0.7)'}>
                                Minutes
                              </Text>
                            </Box>
                          </HStack>
                        </Flex>
                      </Flex> */}
                      {oneprojectData.project_status === '0' && isWefundWallet(state) && (
                        <Flex justify={'center'}>
                          <ButtonTransition
                            unitid='Approve'
                            selected={false}
                            width="160px"
                            height="50px"
                            rounded="33px"
                            onClick={() => WefundApprove(oneprojectData.project_id)}
                          >
                            Approve Project
                          </ButtonTransition>
                        </Flex>
                      )}
                      {oneprojectData.project_status === '1' && 
                      isCommunityWallet(state, oneprojectData.project_id) && (
                        <Flex justify={'center'}>
                          <ButtonTransition
                            unitid='visit'
                            width="160px"
                            height="50px"
                            selected={false}
                            rounded="33px"
                            onClick={() => CommunityVote(oneprojectData.project_id, true, oneprojectData.leftTime)}
                          >
                            Vote Yes
                          </ButtonTransition>

                          <ButtonTransition
                            unitid='view'
                            selected={false}
                            width="160px"
                            height="50px"
                            rounded="33px"
                            onClick={() => CommunityVote(oneprojectData.project_id, false, oneprojectData.leftTime)}
                          >
                            Vote No
                          </ButtonTransition>
                        </Flex>
                      )}
                      {oneprojectData.project_status === '2' && (
                        <ButtonTransition
                          unitid='visit'
                          width="160px"
                          height="50px"
                          selected={false}
                          rounded="33px"
                          mb="10px"
                          onClick={onNext}
                        >
                          Back Project
                        </ButtonTransition>
                      )}
                      {oneprojectData.project_status === '3' && 
                      isBackerWallet(state, oneprojectData.project_id) && (
                        <Flex justify={'center'}>
                          <ButtonTransition
                            unitid='milestonevoteyes'
                            width="160px"
                            height="50px"
                            selected={false}
                            rounded="33px"
                            onClick={() => MilestoneVote(oneprojectData.project_id, true)}
                          >
                            Vote Yes
                          </ButtonTransition>

                          <ButtonTransition
                            unitid='milestonevoteno'
                            selected={false}
                            width="160px"
                            height="50px"
                            rounded="33px"
                            onClick={() => MilestoneVote(oneprojectData.project_id, false)}
                          >
                            Vote No
                          </ButtonTransition>
                        </Flex>
                      )}
                    </Flex>
                    {/* The Buttons*/}
                    <Flex
                      alignSelf={{
                        base: 'center',
                        md: 'center',
                        lg: 'flex-start',
                      }}
                      spacing={5}
                      direction={{ base: 'column', md: 'column', lg: 'row' }}
                    >
                      <Flex
                        mt={{ base: '20px', md: '20px', lg: '30px' }}
                        ml={{ base: '0px', md: '0px', lg: '0px' }}
                        alignSelf={{ base: 'center', md: 'center', lg: 'flex-start'}}
                      >
                        <ImageTransition
                          unitid="visit"
                          border1="linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)"
                          background1="linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)"
                          border2="linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)"
                          background2="linear-gradient(180deg, #1A133E 0%, #1A133E 100%)"
                          border3="linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)"
                          background3="linear-gradient(180deg, #171347 0%, #171347 100%)"
                          selected={false}
                          width="170px"
                          height="50px"
                          rounded="33px"
                        >
                          <Box
                            variant="solid"
                            color="white"
                            justify="center"
                            align="center"
                            onClick={() => {
                              window.open(
                                oneprojectData.project_website,
                                '_blank',
                                'noopener,noreferrer',
                              )
                            }}
                          >
                            Visit Website{' '}
                            <Icon as={BsArrowUpRight} h={4} w={4} mr={3} />
                          </Box>
                        </ImageTransition>
                      </Flex>
                      <Flex
                        mt={{ base: '20px', md: '20px', lg: '30px' }}
                        ml={{ base: '0px', md: '0px', lg: '10px' }}
                        alignSelf={{ base: 'center', md: 'center', lg: 'flex-start'}}
                      >
                        <ImageTransition
                          unitid="view"
                          border1="linear-gradient(180deg, #FE8600 0%, #F83E00 100%)"
                          background1="linear-gradient(180deg, #FE8600 0%, #F83E00  100%)"
                          border2="linear-gradient(180deg, #FE8600 0%, #F83E00 100%)"
                          background2="linear-gradient(180deg, #1A133E 0%, #1A133E 100%)"
                          border3="linear-gradient(180deg, #FE8600 0%, #F83E00 100%)"
                          background3="linear-gradient(180deg, #171347 0%, #171347 100%)"
                          selected={false}
                          width="170px"
                          height="50px"
                          rounded="33px"
                        >
                          <a href={ state.request + '/download?filename=' + oneprojectData.project_whitepaper}>
                          <Box
                            variant="solid"
                            color="white"
                            justify="center"
                            align="center"
                            onClick={() => {}}
                          >
                            See Whitepaper
                          </Box>
                          </a>
                        </ImageTransition>
                      </Flex>
                      <Flex
                        mt={{ base: '20px', md: '20px', lg: '30px' }}
                        mb={{ base: '40px', md: '40px', lg: '20px' }}
                        ml={{ base: '0px', md: '0px', lg: '10px' }}
                        alignSelf={{ base: 'center', md: 'center', lg: 'flex-start'}}
                      >
                        <ImageTransition
                          unitid="back"
                          border1="linear-gradient(180deg, #DEDBDB 0%, #DEDBDB 100%)"
                          background1="linear-gradient(180deg, #DEDBDB 0%, #DEDBD/B  100%)"
                          border2="linear-gradient(180deg, #DEDBDB 0%, #DEDBDB 100%)"
                          background2="linear-gradient(180deg, #1A133E 0%, #1A133E 100%)"
                          border3="linear-gradient(180deg, #DEDBDB 0%, #DEDBDB 100%)"
                          background3="linear-gradient(180deg, #171347 0%, #171347 100%)"
                          selected={false}
                          width="250px"
                          height="50px"
                          rounded="33px"
                        >
                          <Box
                            variant="solid"
                            color="white"
                            justify="center"
                            align="center"
                            onClick={onNext}
                          >
                            Back {oneprojectData.project_name}
                          </Box>
                        </ImageTransition>
                      </Flex>
                    </Flex>
                  </VStack>
                  {/* --------The Side Details--------- */}
                  <VStack
                    width={{ lg: '450px' }}
                    height={{ lg: '484px' }}
                    paddingLeft={{ lg: '55px' }}
                  >
                    <Text  alignSelf={'flex-start'}>
                      Details
                    </Text>

                    <HStack width={'100%'}>
                      <Flex width={'50%'} alignSelf={'flex-start'}>
                        <Text
                        color={'rgba(255, 255, 255, 0.84)'}
                        fontFamily={'Pilat-Extended'}
                        fontSize={'18px'}>
                          Status
                        </Text>
                      </Flex>
                      <Flex width={'50%'} alignSelf={'flex-end'}>
                        <Text 
                          color={' #FE8600'}
                          fontFamily={'Pilat-Extended'}
                          fontWeight={'700'}
                          fontSize={'18px'}>
                          {GetProjectStatusString(oneprojectData.project_status)}
                        </Text>
                      </Flex>
                    </HStack>
                    <HStack width={'100%'}>
                      <Flex width={'50%'} alignSelf={'flex-start'}>
                        <Text
                        color={'rgba(255, 255, 255, 0.84)'}
                        fontFamily={'Pilat-Extended'}
                        fontSize={'18px'}>
                          Platform
                        </Text>
                      </Flex>
                      <Flex width={'50%'} alignSelf={'flex-end'}>
                        <Text 
                          color={' #FE8600'}
                          fontFamily={'Pilat-Extended'}
                          fontWeight={'700'}
                          fontSize={'18px'}>
                          {oneprojectData.project_chain}
                        </Text>
                      </Flex>
                    </HStack>
                    <HStack width={'100%'}>
                      <Flex width={'50%'} alignSelf={'flex-start'}>
                        <Text
                        color={'rgba(255, 255, 255, 0.84)'}
                        fontFamily={'Pilat-Extended'}
                        fontSize={'18px'}>
                          Backer
                        </Text>
                      </Flex>
                      <Flex width={'50%'} alignSelf={'flex-end'}>
                        <Text 
                          color={' #FE8600'}
                          fontFamily={'Pilat-Extended'}
                          fontWeight={'700'}
                          fontSize={'18px'}>
                          {oneprojectData.backer_states && oneprojectData.backer_states.length}
                        </Text>
                      </Flex>
                    </HStack>
                    <HStack width={'100%'}>
                      <Flex width={'50%'} alignSelf={'flex-start'}>
                        <Text
                        color={'rgba(255, 255, 255, 0.84)'}
                        fontFamily={'Pilat-Extended'}
                        fontSize={'18px'}>
                          Funding Pool
                        </Text>
                      </Flex>
                      <Flex width={'50%'} alignSelf={'flex-end'}>
                        <Text 
                          color={' #FE8600'}
                          fontFamily={'Pilat-Extended'}
                          fontWeight={'700'}
                          fontSize={'18px'}>
                          {oneprojectData.project_collected}
                        </Text>
                      </Flex>
                    </HStack>
                    <HStack width={'100%'}>
                      <Flex width={'50%'} alignSelf={'flex-start'}>
                        <Text
                        color={'rgba(255, 255, 255, 0.84)'}
                        fontFamily={'Pilat-Extended'}
                        fontSize={'18px'}>
                          Category
                        </Text>
                      </Flex>
                      <Flex width={'50%'} alignSelf={'flex-end'}>
                        <Text 
                          color={' #FE8600'}
                          fontFamily={'Pilat-Extended'}
                          fontWeight={'700'}
                          fontSize={'18px'}>
                          {oneprojectData.project_category}
                        </Text>
                      </Flex>
                    </HStack>
                    <Flex
                      alignSelf={{
                        base: 'center',
                        md: 'center',
                        lg: 'flex-start',
                      }}
                    >
                      {/* The progress - Replace with better ones*/}
                      <VStack alignSelf={'flex-start'}>
                        <Flex>
                          <Text>
                            Progress : {totalBackedMoney} out of{' '}
                            {oneprojectData.project_collected} UST
                          </Text>
                        </Flex>
                        <Flex
                          alignSelf={{
                            base: 'center',
                            md: 'center',
                            lg: 'flex-start',
                          }}
                        >
                          <CircularProgress
                            value={totalBackedPercent}
                            size="120px"
                            color="#00A3FF;"
                          >
                            <CircularProgressLabel>
                              {totalBackedPercent}%
                            </CircularProgressLabel>
                          </CircularProgress>
                          {/* The progress - Replace with functional ones*/}
                        </Flex>
                      </VStack>
                    </Flex>
                  </VStack>
                </Flex>
                <Flex>
                  <VStack>
                    <Flex
                      mt="40px"
                      px={'45px'}
                      py={'45px'}
                      width={'80%'}
                      borderRadius="25px"
                      flexDirection="column"
                      background={'rgba(255, 255, 255, 0.05)'}
                      border={'1.5px solid rgba(255, 255, 255, 0.15)'}
                    >
                      <chakra.h2
                        fontSize={'22px'}
                        fontWeight="bold"
                        marginBottom={'20px'}
                        color={'rgba(255, 255, 255, 1)'}
                      >
                        Introducing
                      </chakra.h2>
                      {/* ------------Description of Project------------ */}
                      <chakra.p
                        fontSize={'18px'}
                        marginBottom={'20px'}
                        color={'rgba(255, 255, 255, 0.5)'}
                      >
                        WeFund is a community crowdfunding incubator for blockchain and real-world projects
                      </chakra.p>
                      <chakra.p
                        fontSize={'18px'}
                        marginBottom={'20px'}
                        color={'rgba(255, 255, 255, 0.5)'}
                      >
                        WeFund Mission is: 
                        Host high-quality projects that align with WeFund's investor community.
                        </chakra.p>
                        <chakra.p fontSize={'18px'}
                        marginBottom={'20px'}
                        color={'rgba(255, 255, 255, 0.5)'}
                      >
                        Community-driven decisions on the platform for 100% transparency.
                        </chakra.p>
                        <chakra.p fontSize={'18px'}
                        marginBottom={'20px'}
                        color={'rgba(255, 255, 255, 0.5)'}
                      >
                        Project funds managed exclusively on Terra's Anchor protocol using smart contracts and following project milestones.
                      </chakra.p>
              
                  
                      <chakra.p
                        fontSize={'18px'}
                        marginBottom={'20px'}
                        color={'rgba(255, 255, 255, 0.5)'}
                        w={{ base: '400px', lg: '1000px' }}
                      >
                        {oneprojectData.project_description}
                      </chakra.p>
                    </Flex>
                    <Flex
                      mt="40px"
                      as={Stack}
                      mb={'50px'}
                      width={'80%'}
                      paddingTop={'35px'}
                    >
                      {/* ------------Some Words that details the team------------ */}
                      {/* ------------Descriptions/Texts------------ */}
                      <Text
                        mb={'20px'}
                        fontSize="28px"
                        fontWeight={'900'}
                        lineHeight={'36px'}
                        fontFamily="PilatExtended-Heavy"
                      >
                        The Project{' '}
                        <span style={{ color: '#00A3FF' }} mb="25px">
                          Team
                        </span>
                      </Text>
                      <Box
                        background="rgba(255, 255, 255, 0.05)"
                        border="1.5px solid rgba(255, 255, 255, 0.15)"
                        boxSizing="border-box"
                        borderRadius="10px"
                        mt={'30px'}
                      >
                        <Box
                          px={'45px'}
                          paddingTop={'35px'}
                          paddingBottom={'35px'}
                        >
                          <Text fontSize={'18px'} fontWeight={'bold'}>
                            WeFund Core Team
                          </Text>
                          <br />
                          <Text color={'rgba(255, 255, 255, 0.54)'}></Text>
                        </Box>
                        {/* ------------About the Founder/Who wrote this/Short desc------------ */}
                        <HStack
                          borderTop={'1.5px solid rgba(255, 255, 255, 0.15)'}
                          spacing={10}
                          paddingLeft={'45px'}
                          paddingTop={'35px'}
                          paddingBottom={'35px'}
                        >
                          <Image
                            height="35px"
                            objectFit="cover"
                            src="/media/WeFund-Logos-only.png"
                            alt="UST Avatar"
                          />
                          <VStack textAlign={'left'}>
                            <Text
                              fontWeight={'bold'}
                              textAlign={'left'}
                              alignSelf={'flex-start'}
                            >
                               Andrea Bello Co Founder & CEO & Co-CTO
                            </Text>
                            <Text textAlign={'left'} fontWeight={'100'}>
                              Most recently behind the development of a smart
                              contract (Fan$quad) that was deployed Col-4 during
                              a hackathon organized by Terraformlabs and former
                              CTO of a Guild Game, successfully raising a $10
                              million Seed round. Founder of Mosquito Solution,
                              an innovative natural misting system startup
                              created and launched within 1 year, operating in
                              Bali, Indonesia. Founder of Bello Service, Domotic
                              System for smart-home efficiency, reducing
                              electrical consumption by 30%. R&D engineer at ABB
                              UPS system, an expert in coding C programming. 
                              </Text>
                              <Text
                              fontWeight={'bold'}
                              textAlign={'left'}
                              alignSelf={'flex-start'}
                            >
                              Ika Afifah Co Founder & CMO Previous CMO at Gamesta
                            </Text> 
                            <Text textAlign={'left'} fontWeight={'100'}>Prior
                              to Guild Game, she worked at Tencent as an
                              operation specialist, in a partnership division.
                              Before Tencent, she was senior partnership manager
                              at Bigo. She previously held a senior account
                              executive position at one of the digital marketing
                              agencies under Jet Group and was a manager at
                              Waves who successfully helped founders to raise
                              $1.2M in pre-seed funding. 
                              </Text>
                              <Text
                              fontWeight={'bold'}
                              textAlign={'left'}
                              alignSelf={'flex-start'}
                            >
                              Jason Galvin Co-CTO
                            </Text>
                            <Text textAlign={'left'} fontWeight={'100'}>
                              World explorer, entrepreneur, and blockchain
                              technology enthusiast. Came from a career in
                              Silicon Valley building web applications during
                              the dot-com boom. Wanting to do it all over again,
                              this time helping to build Web 3.0. 
                              </Text>
                              <Text
                              fontWeight={'bold'}
                              textAlign={'left'}
                              alignSelf={'flex-start'}
                            >
                              
                              Austin Taylor COO
                            </Text>
                            <Text textAlign={'left'} fontWeight={'100'}>
                              Comes from a background in investment and
                              corporate finance. After completing his education,
                              he worked as a Business Analyst for a large tech
                              company in Seattle, Washington USA building AI
                              applications to identify high-risk sale
                              transactions. He now is an Investment Manager for
                              a prestigious silicon valley venture capital firm
                              located in Jakarta, Indonesia managing investment
                              deals in the Southeast Asia region.
                            </Text>
                          </VStack>
                        </HStack>
                      </Box>
                    </Flex>
                    {/* ------------Milestone of Project------------ */}
                    <Flex
                      px={'45px'}
                      py={'45px'}
                      width={'80%'}
                      borderRadius="25px"
                      justify='center' 
                      align='center' 
                      flexDirection="column"
                      background={'rgba(255, 255, 255, 0.05)'}
                      border={'1.5px solid rgba(255, 255, 255, 0.15)'}
                      display={{base:'none',md:'none', lg:'block'}}
                    >
                      <Flex mt='60px' justify='center' align='center' direction='column' maxWidth={{base:'0px',md:'0px',lg:'999px'}} maxHeight={{base:'0px',md:'0px',lg:'999px'}} 
                      display={{base:'none',md:'none', lg:'block'}} >
                        {/* <Chart
                          chartType="Gantt"
                          width="100%"
                          height="50%"
                          background='rgba(255, 255, 255, 0.05)'
                          data={data}
                          options={options}
                        /> */}
                        <Text fontSize='16px' fontWeight={'300'} mb={'20px'}>Project Milestones List</Text>
                        <Table variant='simple'>
                          <TableCaption style={{color:'#00A3FF'}}>Milestones that project have. Details might be more on Project own's website. Project Milestone up for voting would be listed for voting. 
                          Rejected Milestones means project funds would not be released or project suspended. Voted and Approved would result in project rewarded for milestone</TableCaption>
                          <Thead bgColor={'rgba(255, 255, 255, 0.12)'} borderRadius={'10px 10px 0px 0px'}>
                            <Tr>
                              <Th style={{color:'#00A3FF'}}>Milestone No</Th>
                              <Th style={{color:'#00A3FF'}}>Name </Th>
                              <Th style={{color:'#00A3FF'}}>Proposed Start Date</Th>
                              <Th style={{color:'#00A3FF'}}>Proposed End Date</Th>
                              <Th style={{color:'#00A3FF'}}>Milestone Fund Amount</Th>
                              <Th style={{color:'#00A3FF'}}>Milestone Voting</Th>
                              <Th style={{color:'#00A3FF'}}>Milestone Status</Th>
                            </Tr>
                          </Thead>
                          <Tbody bgColor={' rgba(196, 196, 196, 0.08)'} borderRadius={'10px 10px 0px 0px'}> 
                            {oneprojectData != '' && 
                            oneprojectData.milestone_states.map((milestone, index) => (
                            <Tr key={index}>
                            <Td >{milestone.milestone_step}</Td>
                            <Td >{milestone.milestone_name} </Td>
                            <Td >{milestone.milestone_startdate}</Td>
                            <Td >{milestone.milestone_enddate}</Td>
                            <Td >{milestone.milestone_amount}</Td>
                            <Td >
                              {milestone.milestone_votingavailable &&
                              <Button onClick={onOpen} colorScheme={'teal'}>Vote & Details</Button>}
                            </Td>
                            <Td >{milestone.milestone_statusmessage}</Td>
                            </Tr>
                            ))}
                          </Tbody>
                        </Table>

                      </Flex>
                    </Flex>
                  </VStack>
                </Flex>
              </VStack>
            </Flex>
            <Flex height={'200px'}></Flex>
          </Box>
        </Flex>
        <Footer />
        <Notification  ref={notificationRef}/>     
      </div>
      {/*--This is Where to Vote Pop Up is--*/}
      <Modal onClose={onVoteBoxClose} isOpen={isVoteBoxOpen} isCentered>
        <ModalOverlay />
          <ModalContent>
            <ModalHeader>Vote The Milestone of Project</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text textAlign={'left'}>
                Project Project Milestone Description <br/>
                Aliquip mollit sunt qui irure. Irure ullamco Lorem
                excepteur dolor qui ea ad quis. Enim fugiat cillum enim
                ad occaecat sint qui elit labore mollit sunt laborum
                fugiat consequat. Voluptate labore sunt duis eu
                deserunt. Occaecat do ut ut labore cillum enim dolore ad
                enim enim id. Aliquip do veniam ad excepteur ad cillum
                qui deserunt nostrud sunt aliqua duis sunt occaecat.
                Laborum incididunt commodo ullamco proident quis.
              </Text>
            </ModalBody>
            <ModalFooter>
                <Button colorScheme='grey' mr={3} onClick={onVoteBoxClose}>
                  Close
                </Button>
                <Button colorScheme='blue' mr={3} 
                  onClick={()=>{
                    onClose(); MilestoneVote(oneprojectData.project_id, true);}}
                >
                  Vote Yes
                </Button>
                <Button colorScheme='red' mr={3}
                  onClick={()=>{
                    onClose(); MilestoneVote(oneprojectData.project_id, false);}}
                >
                  Vote No
                </Button>
            </ModalFooter>
          </ModalContent>
      </Modal>
    </ChakraProvider>
    
  )
}
