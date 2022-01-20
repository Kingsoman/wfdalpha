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
import React, { useEffect, useState, useMemo, useRef } from 'react'
import { WasmAPI, LCDClient, MsgExecuteContract } from '@terra-money/terra.js'
import { MdOutlinePlace } from 'react-icons/md'
import {
  BsArrowUpRight,
} from 'react-icons/bs'
import { useNavigate } from '@reach/router'

import { useStore } from '../store'
import { ImageTransition } from '../components/ImageTransition'
import Footer from '../components/Footer'

import { Chart } from "react-google-charts"

import Notification from '../components/Notification'
import {CheckNetwork, GetOneProject, FetchData, EstimateSend} from '../components/Util'

let useConnectedWallet = {}
if (typeof document !== 'undefined') {
  useConnectedWallet =
    require('@terra-money/wallet-provider').useConnectedWallet
}

export default function ProjectDetail() {
  const { state, dispatch } = useStore()
  const [totalBackedMoney, setTotalBackedMoney] = useState(0)
  const [percent, setPercent] = useState(0)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()

  //------------extract project id----------------------------
  let queryString, urlParams, project_id
  if (typeof window != 'undefined') {
    queryString = window.location.search
    urlParams = new URLSearchParams(queryString)
    project_id = urlParams.get('project_id')
  }

  //------------connect wallet ---------------------------------
  let connectedWallet = ''
  if (typeof document !== 'undefined') {
    connectedWallet = useConnectedWallet()
  }

  //------------init api, lcd ----------------------------------------------------
  const lcd = useMemo(() => {
    if (!connectedWallet) {
      return null
    }
    return new LCDClient({
      URL: connectedWallet.network.lcd,
      chainID: connectedWallet.network.chainID,
    })
  }, [connectedWallet])

  const api = new WasmAPI(state.lcd_client.apiRequester)

  //------------notification setting---------------------------------
  const notificationRef = useRef();

  //------------back button-----------------------------------
  function next() {
    if (project_id == state.fakeid)
      //fake
      navigate('/invest_step1')
    else navigate('/back?project_id=' + state.oneprojectData.project_id)
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
          if(oneprojectData.project_status == 3)//releasing status
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

      dispatch({
        type: 'setOneprojectdata',
        message: oneprojectData,
      })
console.log(oneprojectData);
      let totalBacked = parseInt(oneprojectData.communitybacked_amount) + parseInt(oneprojectData.backerbacked_amount);
      totalBacked /= 10 ** 6

      if (project_id == state.fakeid)//fake
        totalBacked = 120000

      let percent = parseInt(totalBacked/parseInt(oneprojectData.project_collected) * 100 );
      setPercent(percent);
      setTotalBackedMoney(totalBacked);
    } catch (e) {
      console.log(e)
    }
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

  useEffect(() => {
    fetchContractQuery()
  }, [connectedWallet, lcd])
  
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

  //--------Visual Code Start
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
              mt={'50px'}
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
                        {state.oneprojectData.project_name}
                        Project Name
                      </Text>
                    </Flex>
                    <Flex widtht={{ base: '70%', md: '70%', lg: '100%' }}>
                    <Text textAlign={'left'} fontWeight={'400'} fontSize={'18px'}>
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
                    </Flex>
                    <Flex
                      alignSelf={{
                        base: 'center',
                        md: 'center',
                        lg: 'flex-start',
                      }}
                    >
                    {/* The Countdown and Vote*/}
                      <Flex mt={{ base: '0px', md: '0px', lg: '25px' }}>
                        <Flex
                            mt={{ base: '20px', md: '20px', lg: '00px' }}
                            mr={{ base: '25px', md: '25px', lg: '25px' }}
                            alignSelf={{ base: 'center', md: 'center', lg: 'flex-start'}}
                            direction={{ base: 'column', md: 'column', lg: 'row' }} 
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
                                $Day
                              </Text>
                              <Text
                                fontFamily={'Sk-Modernist-Regular'}
                                fontSize={'15px'}
                                color={'rgba(255, 255, 255, 0.7)'}>
                                Days
                              </Text>
                            </Box>
                            <Box ml={{ base: '0px', md: '0px', lg: '25px' }}>
                              <Text 
                                fontFamily={'Pilat Extended'}
                                fontWeight={'900'}
                                fontSize={'26px'}
                                lineHeight={'33px'}
                                textAlign={'center'}
                                color={'#FE8600'}
                                >
                                $Day
                              </Text>
                              <Text
                                fontFamily={'Sk-Modernist-Regular'}
                                fontSize={'15px'}
                                color={'rgba(255, 255, 255, 0.7)'}>
                                Days
                              </Text>
                            </Box>
                            <Box ml={{ base: '0px', md: '0px', lg: '25px' }}>
                              <Text 
                                fontFamily={'Pilat Extended'}
                                fontWeight={'900'}
                                fontSize={'26px'}
                                lineHeight={'33px'}
                                textAlign={'center'}
                                color={'#FE8600'}
                                >
                                $Day
                              </Text>
                              <Text
                                fontFamily={'Sk-Modernist-Regular'}
                                fontSize={'15px'}
                                color={'rgba(255, 255, 255, 0.7)'}>
                                Days
                              </Text>
                            </Box>
                            <Box ml={{ base: '0px', md: '0px', lg: '25px' }}>
                              <Text 
                                fontFamily={'Pilat Extended'}
                                fontWeight={'900'}
                                fontSize={'26px'}
                                lineHeight={'33px'}
                                textAlign={'center'}
                                color={'#FE8600'}
                                >
                                $Day
                              </Text>
                              <Text
                                fontFamily={'Sk-Modernist-Regular'}
                                fontSize={'15px'}
                                color={'rgba(255, 255, 255, 0.7)'}>
                                Days
                              </Text>
                            </Box>
                          </HStack>
                        </Flex>
                      </Flex>
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
                            onClick={() => {}}
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
                          <Box
                            variant="solid"
                            color="white"
                            justify="center"
                            align="center"
                            onClick={() => {}}
                          >
                            See Whitepaper
                          </Box>
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
                          width="170px"
                          height="50px"
                          rounded="33px"
                        >
                          <Box
                            variant="solid"
                            color="white"
                            justify="center"
                            align="center"
                            onClick={() => next()}
                          >
                            Back {state.oneprojectData.project_name}
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
                    <Text  alignSelf={'flex-start'} paddingLeft={{ base: '25%', md: '25%', lg: '0%' }} mt={'25px'}>
                      Details
                    </Text>

                    <HStack width={'100%'} paddingLeft={{ base: '25%', md: '25%', lg: '0%' }}>
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
                          Voting
                        </Text>
                      </Flex>
                    </HStack>
                    <HStack width={'100%'} paddingLeft={{ base: '25%', md: '25%', lg: '0%' }}>
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
                          Voting
                        </Text>
                      </Flex>
                    </HStack>
                    <HStack width={'100%'} paddingLeft={{ base: '25%', md: '25%', lg: '0%' }}>
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
                          Voting
                        </Text>
                      </Flex>
                    </HStack>
                    <HStack width={'100%'} paddingLeft={{ base: '25%', md: '25%', lg: '0%' }}>
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
                          Voting
                        </Text>
                      </Flex>
                    </HStack>
                    <HStack width={'100%'} paddingLeft={{ base: '25%', md: '25%', lg: '0%' }}>
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
                          Voting
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
                            {state.oneprojectData.project_collected} UST
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
                            value={40}
                            size="120px"
                            color="#00A3FF;"
                          >
                            <CircularProgressLabel>
                              {percent}%
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
                        Host high-quality projects that align with WeFund’s investor community.
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
                        Project funds managed exclusively on Terra’s Anchor protocol using smart contracts and following the Milestone.
                      </chakra.p>
              
                  
                      <chakra.p
                        fontSize={'18px'}
                        marginBottom={'20px'}
                        color={'rgba(255, 255, 255, 0.5)'}
                        w={{ base: '400px', lg: '1000px' }}
                      >
                        {state.oneprojectData.project_description}
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
                            src="/WeFund Logos only.png"
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
                      visibility={{base:'hidden',md:'hidden', lg:'visible'}}
                    >
                      <Flex mt='60px' justify='center' align='center' direction='column' maxWidth={{base:'0px',md:'0px',lg:'999px'}} maxHeight={{base:'0px',md:'0px',lg:'999px'}} visibility={{base:'hidden',md:'hidden', lg:'visible'}} >
                      <Chart
      chartType="Gantt"
      width="100%"
      height="50%"
      background='rgba(255, 255, 255, 0.05)'
      data={data}
      options={options}
    />
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
                              <Th style={{color:'#00A3FF'}}>Milestone External Detail</Th>
                            </Tr>
                          </Thead>
                          <Tbody bgColor={' rgba(196, 196, 196, 0.08)'} borderRadius={'10px 10px 0px 0px'}> 
                            <Tr>
                            <Td >1</Td>
                            <Td >Prototype Making </Td>
                            <Td >20 . 02 . 2022 </Td>
                            <Td >20 . 04 . 2022 </Td>
                            <Td >$20.000,00 </Td>
                            <Td ><Button onClick={onOpen} colorScheme={'teal'}>Vote & Details</Button></Td>
                            <Td >Not Yet Started</Td>
                            <Td ><Text color={'#FE8600'}>See More</Text></Td>
                            </Tr>
                            <Tr>
                            <Td >2</Td>
                            <Td >Prototype Making </Td>
                            <Td >20 . 02 . 2022 </Td>
                            <Td >20 . 04 . 2022 </Td>
                            <Td >$20.000,00 </Td>
                            <Td ><Button onClick={onOpen} colorScheme={'teal'}>Vote & Details</Button></Td>
                            <Td >Not Yet Started</Td>
                            <Td ><Text color={'#FE8600'}>See More</Text></Td>
                            </Tr>
                            <Tr>
                            <Td >3</Td>
                            <Td >Prototype Making </Td>
                            <Td >20 . 02 . 2022 </Td>
                            <Td >20 . 04 . 2022 </Td>
                            <Td >$20.000,00 </Td>
                            <Td ><Button onClick={onOpen} colorScheme={'teal'}>Vote & Details</Button></Td>
                            <Td >Not Yet Started</Td>
                            <Td ><Text color={'#FE8600'}>See More</Text></Td>
                            </Tr>
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
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
          <ModalContent>
            <ModalHeader>Vote The Project</ModalHeader>
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
                <Button colorScheme='grey' mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button colorScheme='blue' mr={3} 
                  onClick={()=>{
                    onClose(); MilestoneVote(state.oneprojectData.project_id, true);}}
                >
                  Vote Yes
                </Button>
                <Button colorScheme='red' mr={3}
                  onClick={()=>{
                    onClose(); MilestoneVote(state.oneprojectData.project_id, false);}}
                >
                  Vote No
                </Button>
            </ModalFooter>
          </ModalContent>
      </Modal>
    </ChakraProvider>
    
  )
}
