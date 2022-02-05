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
  Progress,
  useDisclosure,
  Button,
} from '@chakra-ui/react'
import React, { useEffect, useState, useMemo, useRef } from 'react'
import { WasmAPI, LCDClient } from '@terra-money/terra.js'
import {
  BsArrowUpRight,
  BsBookmarksFill,
  BsPerson,
  BsCashCoin,
} from 'react-icons/bs'
import { Router, Link, useNavigate } from '@reach/router'
import { IoChevronUpOutline, IoChevronDownOutline, IoCheckmark, IoCloudUploadOutline, IoCheckbox } from 'react-icons/io5';
import Pagination from "@choc-ui/paginator"
import { MdHeadset, MdEmail, MdOutlinePlace, MdWork, MdOutlineAccountBalanceWallet, MdOutlineCategory } from "react-icons/md";
import { useStore } from '../store'
import { ImageTransition,ButtonBackTransition } from '../components/ImageTransition'
import Notification from '../components/Notification'
import Footer from '../components/Footer'

let useConnectedWallet = {}
if (typeof document !== 'undefined') {
  useConnectedWallet =
    require('@terra-money/wallet-provider').useConnectedWallet
}

export default function ProjectDetail() {
  const { state, dispatch } = useStore()
  const [totalBackedMoney, setTotalBackedMoney] = useState(0)
  const [percent, setPercent] = useState(0)

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
  const api = new WasmAPI(state.lcd_client.apiRequester)

  //------------notification setting---------------------------------
  const notificationRef = useRef();
  //------------back button-----------------------------------
  function next() {
    if (project_id == 2)
      //fake
      navigate('/invest_step1?project_id=' + state.wefundID);
    else 
      navigate('/invest_step1?project_id=' + oneprojectData.project_id);
  }
  //------------fectch project data------------------------------------
  async function fetchContractQuery() {
    let _project_id = 1
    if (project_id != null) _project_id = project_id

    try {
      const projectData = await api.contractQuery(state.WEFundContractAddress, {
        get_project: {
          project_id: `${_project_id}`,
        },
      })
      if (!projectData) return

      dispatch({
        type: 'setOneprojectdata',
        message: projectData,
      })

      let i, j
      let totalBacked = 0
      for (j = 0; j < projectData.backer_states.length; j++) {
        totalBacked += parseInt(projectData.backer_states[j].ust_amount.amount)
      }

      totalBacked /= 10 ** 6

      if (project_id == 2)
        //fake
        totalBacked = 120000

      let percent = parseInt(
        (totalBacked / parseInt(projectData.project_collected)) * 100,
      )

      setPercent(percent)
      setTotalBackedMoney(totalBacked)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchContractQuery()
  }, [connectedWallet])
  //--Pop Ups for Projects
  const { isOpen: isVoteBoxOpen, onOpen: onVoteBoxOpen, onClose: onVoteBoxClose  } = useDisclosure()
  //--Pop ups for Referral thing
  const { isOpen: isRefBoxOpen, onOpen: onRefBoxOpen, onClose: onRefBoxClose } = useDisclosure()
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
            backgroundImage: "url('/media/createproject_banner_emphasis.svg')",
            boxShadow: '0px 5px 50px 0px #000000A6',
            width: '100%',
            zIndex: '10',
          }}
        >
          <div
            style={{
              backgroundImage: "url('/media/projectbanner.svg')",
              width: '100%',
              width: '100%',
              zIndex: '11',
              backgroundPosition: 'left',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              zIndex: '11',
            }}
          >
            <Flex pt="64px" ml="100px" justify="left" height="200px"></Flex>
          </div>
        </div>
        {/* ------------Parent Box for the Details------------ */}
        <Flex width="100%" justify="center" mt="50px" minHeight={'3000px'}>
          <Box style={{ fontFamily: 'Sk-Modernist-Regular' }}>
            {/* ------------Details------------ */}
            <Flex
              width="100%"
              justify="center"
              alignItems={'center'}
              zIndex={'1'}
              mt={'-180px'}
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
                    style={{
                      backdropFilter: 'blur(54px)',
                      paddingTop: '45px',
                      background: 'rgba(20, 0, 75, 0.74)',
                      border: '2px solid rgba(255, 255, 255, 0.05)',
                      borderRadius: '25px',
                    }}
                  >
                    <Flex
                      alignSelf={{
                        base: 'center',
                        md: 'center',
                        lg: 'flex-start',
                      }}
                    >
                      <Text
                        fontSize="16px"
                        fontWeight="normal"
                        color={'rgba(255, 255, 255, 0.54)'}
                      >
                        Home &gt;&nbsp;
                      </Text>
                      <Text
                        fontSize="16px"
                        fontWeight="normal"
                        color={'rgba(255, 255, 255, 0.54)'}
                      >
                        User Center &gt;&nbsp;
                      </Text>
                      <Text
                        fontSize="16px"
                        color={'rgba(255, 255, 255, 0.84)'}
                        textAlign="center"
                      >
                        Wallet addr Terra1023190239131xsd
                      </Text>
                    </Flex>
                    <Flex
                      style={{ fontFamily: 'PilatExtended-Bold' }}
                      alignSelf={{
                        base: 'center',
                        md: 'center',
                        lg: 'flex-start',
                      }}
                    >
                      <Text fontSize="40px" fontWeight={'900'}>
                        Welcome  Terra1023190239131xsd
                      </Text>
                    </Flex>
                    <Flex
                      alignSelf={{
                        base: 'center',
                        md: 'center',
                        lg: 'flex-start',
                      }}
                      marginBottom={'40px !important'}
                    >
                      <chakra.p color={'gray.100'} fontSize="15px">
                        Joined Since -{' '}
                        <span style={{ color: '#FE8600' }}>10 Dec, 2021</span>
                      </chakra.p>
                      <Icon as={MdOutlinePlace} h={6} w={6} mr={2} ml={3} />

                      <chakra.h1 fontSize="sm" marginTop={'4px'}>
                        Wallet ecosystem of user wallet
                      </chakra.h1>
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
                        mb={{ base: '40px', md: '40px', lg: '20px' }}
                        ml={{ base: '0px', md: '0px', lg: '10px' }}
                        alignSelf={{ base: 'center', md: 'center', lg: 'flex-start'}}
                      >
                        <ImageTransition
                          unitid="ref"
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
                            onClick={onRefBoxOpen}
                          >
                            Referral
                          </Box>
                        </ImageTransition>
                      </Flex>
                    </Flex>
                  </VStack>
                </Flex>
                <Flex>
                  <VStack>
                    <Flex mt={'45px'} mb={'45px'}>
                      {/* ------------Details on key factors, as SimpleGrid with 1 Col at base, and 4 when in medium res. Stack of Stats------------ */}
                      <Flex
                        borderTop="1.5px solid rgba(255, 255, 255, 0.15)"
                        borderBottom="1.5px solid rgba(255, 255, 255, 0.15)"
                        width={'100%'}
                        paddingTop={'15px'}
                        paddingBottom={'15px'}
                      >
                        <Flex
                          spacing={{ base: 5, lg: 8 }}
                          gridColumn={{ base: 1, lg: 4 }}
                          direction={{
                            base: 'column',
                            md: 'column',
                            lg: 'row',
                          }}
                          justifyContent={'center'}
                          paddingLeft={{ lg: '110px' }}
                        >
                          <Stat
                            px={{ base: 2, md: 4 }}
                            py={'5'}
                            width={'320px'}
                            shadow={'xl'}
                            borderLeft={{
                              base: '1px solid',
                              md: '1px solid',
                              lg: '0px solid',
                            }}
                            borderRight={'1px solid'}
                            borderColor={'rgba(255, 255, 255, 0.15)'}
                          >
                            <Flex
                              justifyContent={{
                                base: 'center',
                                md: 'center',
                                lg: 'space-between',
                              }}
                            >
                              <Box pl={{ base: 2, md: 4 }}>
                                <HStack>
                                  <Image src="/media/3_User.svg" />
                                  <StatLabel fontWeight={'medium'} isTruncated>
                                    Voted Project
                                  </StatLabel>
                                </HStack>
                                <StatNumber
                                  fontSize={'2xl'}
                                  fontFamily="PilatExtended-Heavy"
                                >
                                  14
                                </StatNumber>
                              </Box>
                            </Flex>
                          </Stat>
                          <Stat
                            px={{ base: 2, md: 4 }}
                            py={'5'}
                            width={'320px'}
                            shadow={'xl'}
                            borderRight={{
                              base: '1px solid',
                              md: '1px solid',
                              lg: '0px solid',
                            }}
                            borderLeft={'1px solid'}
                            borderColor={'rgba(255, 255, 255, 0.15)'}
                          >
                            <Flex
                              justifyContent={{
                                base: 'center',
                                md: 'center',
                                lg: 'space-between',
                              }}
                            >
                              <Box pl={{ base: 2, md: 4 }}>
                                <HStack>
                                  <Image src="/media/Wallet.svg" />
                                  <StatLabel fontWeight={'medium'} isTruncated>
                                    Amount Contributed
                                  </StatLabel>
                                </HStack>
                                <StatNumber
                                  fontSize={'2xl'}
                                  fontFamily="PilatExtended-Heavy"
                                >
                                  {/* {oneprojectData.project_collected} */}
                                </StatNumber>
                              </Box>
                            </Flex>
                          </Stat>
                          <Stat
                            px={{ base: 2, md: 4 }}
                            py={'5'}
                            width={'320px'}
                            shadow={'xl'}
                            borderRight={{
                              base: '1px solid',
                              md: '1px solid',
                              lg: '0px solid',
                            }}
                            borderLeft={'1px solid'}
                            borderColor={'rgba(255, 255, 255, 0.15)'}
                          >
                            <Flex
                              justifyContent={{
                                base: 'center',
                                md: 'center',
                                lg: 'space-between',
                              }}
                            >
                              <Box pl={{ base: 2, md: 4 }}>
                                <HStack>
                                  <Image src="/media/Graph.svg" />
                                  <StatLabel fontWeight={'medium'} isTruncated>
                                    Number of Vesting Project
                                  </StatLabel>
                                </HStack>
                                <StatNumber
                                  fontSize={'2xl'}
                                  fontFamily="PilatExtended-Heavy"
                                >
                                  2
                                </StatNumber>
                              </Box>
                            </Flex>
                          </Stat>
                          <Stat
                            px={{ base: 2, md: 4 }}
                            py={'5'}
                            width={'320px'}
                            shadow={'xl'}
                            visibility={{
                              base: 'hidden',
                              md: 'hidden',
                              lg: 'visible',
                            }}
                            borderLeft={'1px solid'}
                            borderColor={'rgba(255, 255, 255, 0.15)'}
                          >
                            <Flex
                              justifyContent={{
                                base: 'center',
                                md: 'center',
                                lg: 'space-between',
                              }}
                            >
                              <Box pl={{ base: 2, md: 4 }}>
                                <HStack>
                                  <Image src="/media/Work.svg" />
                                  <StatLabel fontWeight={'medium'} isTruncated>
                                    Project backed with Milestone open
                                  </StatLabel>
                                </HStack>
                                <StatNumber
                                  fontSize={'2xl'}
                                  fontFamily="PilatExtended-Heavy"
                                >
                                  5
                                </StatNumber>
                              </Box>
                            </Flex>
                          </Stat>
                        </Flex>
                      </Flex>
                    </Flex>
                    <Flex
                      mt="40px"
                      px={'45px'}
                      py={'45px'}
                      width={'100%'}
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
                        Project you are backing
                      </chakra.h2>
                      {/* ------------Description of Project------------ */}
                      <Flex width={{lg:'1225px'}} style={{  borderRadius:'3xl',borderTopColor: 'transparent', fontFamily:'Sk-Modernist-Regular', paddingLeft:'50px', paddingRight:'50px'}} >
                {/* ------------------project desktop---------- */}
                <VStack visibility={{base:'hidden', md:'hidden', lg:'visible'}} maxW={{base:'0px',md:'0px',lg:'2560px'}} maxH={{base:'0px',md:'0px',lg:'9999px'}}>
                    {/* ------------------project list---------- */}
                    <Flex marginTop={'26px'} marginBottom={'26px'} alignSelf={{lg:'flex-start'}} direction={{base:'row',md:'row',lg:'row'}} >
                      <Flex alignSelf={'flex-start'} width={{lg:'950px'}} >
                        <Text fontSize={{base:'15px',md:'15px',lg:'22px'}}>Projects you might like</Text>
                      </Flex>
                      <Flex alignSelf={'flex-end'} marginLeft={'73px'}>
                        <Text fontSize={{base:'15px',md:'15px',lg:'22px'}} width={'100px'}>x Projects</Text>
                      </Flex>
                    </Flex>

                    {/* ------------------project snippet detail---------- */}
                    <Box 
                      w= {{lg:"100%"}} h= {{lg:"320px"}} mx="auto" borderTop= "1px solid rgba(255, 255, 255, 0.1)"
                      boxSizing="border-box" shadow="lg" rounded="lg" overflow="hidden" alignSelf={{base:'center', md:'center', lg:'flex-start'}} direction={{base:'column',md:'column',lg:'row'}}>
                      <Flex alignSelf={{base:'center', md:'center', lg:'flex-start'}} direction={{base:'column',md:'column',lg:'row'}}>
                        
                        <Flex my={"6px"} mx={"6px"} width="200px" height="249px" bg="#FFFFFF"
                              boxShadow={"0px 2px 10px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.25)"}
                              borderRadius={"2xl"} px="20px" py="10px">
                          <Image src="/media/sheep.svg" alt="avatar"/>
                        </Flex>
                        <Box py={4} px={2} direction={{base:'column',md:'column',lg:'row'}}>
                          <Flex>
                            <Flex as={Stack} width={{lg:'80%'}} paddingRight={'20px'} maxWidth={'700px'}>
                              <chakra.h1 color="white" fontWeight="bold" fontSize="lg">
                                Simba
                              </chakra.h1>
                              <chakra.p py={2} color={"gray.400"} fontSize="15px">
                              Date - <span style={{color:"#FE8600"}}>10 Dec, 2021</span>
                              </chakra.p>
                              {/* ------------------project synopsis---------- */}
                              <chakra.p py={2} color={"gray.400"}>
                              Commodo labore ut nisi laborum amet eu qui magna ullamco ut labore. 
                              Aliquip consectetur labore consectetur dolor exercitation est min quis. 
                              Magna non irure qui ex est laborum nulla excepteur. <span style={{color:'#00A3FF'}}>...more</span>
                              </chakra.p>
                          </Flex>
                            <Flex 
                            alignSelf={{base:'center', md:'center', lg:'flex-start'}}
                            marginTop={'20px !important'}
                            >
                              <VStack alignSelf={'flex-start'}>
                        <Flex>
                        <Text>Backed Funds :  4 / 10 Millions UST</Text>
                        </Flex>
                        <Flex 
                          alignSelf={{base:'center', md:'center', lg:'flex-start'}}>
                            <CircularProgress value={40} size='120px' color='#00A3FF;'>
                            <CircularProgressLabel>40%</CircularProgressLabel>
                            </CircularProgress>
                        {/* The progress - Replace with functional ones*/}
                          </Flex>
</VStack> 
                            </Flex>
                          </Flex>
                            <Flex mt={'25px'} direction={{base:'column',md:'column',lg:'row'}}> 
                              <Flex alignItems="center" color={"gray.400"} visibility={{base:'hidden', md:'hidden', lg:'visible'}}>
                                <Icon as={MdOutlineCategory} h={6} w={6} mr={2} />
                                <chakra.h1 px={2} fontSize="sm">
                                  Charity Project
                                </chakra.h1>
                              </Flex>
                              <Flex alignItems="center" color={"gray.400"} visibility={{base:'hidden', md:'hidden', lg:'visible'}}>
                                <Icon as={MdOutlinePlace} h={6} w={6} mr={2} />
                                <chakra.h1 px={2} fontSize="sm">
                                  Cardano
                                </chakra.h1>
                              </Flex>
                              <Flex alignItems="center" color={"gray.400"} visibility={{base:'hidden', md:'hidden', lg:'visible'}}>
                                <Icon as={MdOutlineAccountBalanceWallet} h={6} w={6} mr={2} />
                                <chakra.h1 px={2} fontSize="sm">
                                  $32,000.50 <span style={{color:'#00A3FF'}}>Funding Pool</span>
                                </chakra.h1>
                              </Flex>
                              <HStack style={{paddingLeft:'10%', width:'330px', spacing:10}}>
                                <Flex >
                                  <ImageTransition 
                                    unitid='visit'
                                    border1='linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)' 
                                    background1='linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)'
                                    border2='linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)'
                                    background2='linear-gradient(180deg, #1A133E 0%, #1A133E 100%)'
                                    border3="linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)"
                                    background3="linear-gradient(180deg, #171347 0%, #171347 100%)"
                                    selected={false}
                                    width='190px' height='50px' rounded='33px'
                                  >
                                    <Box variant="solid" color="white" justify='center' align='center'
                                        onClick = {()=>{setSubmitPressed(!submitPressed)}} >
                                      Visit Website  <Icon as={BsArrowUpRight} h={4} w={4} mr={3} />
                                    </Box>
                                  </ImageTransition>
                                </Flex>
                                <Flex>
                                  <ImageTransition 
                                      unitid='view'
                                      border1='linear-gradient(180deg, #FE8600 0%, #F83E00 100%)' 
                                      background1='linear-gradient(180deg, #FE8600 0%, #F83E00  100%)'
                                      border2='linear-gradient(180deg, #FE8600 0%, #F83E00 100%)'
                                      background2='linear-gradient(180deg, #1A133E 0%, #1A133E 100%)'
                                      border3="linear-gradient(180deg, #FE8600 0%, #F83E00 100%)"
                                      background3="linear-gradient(180deg, #171347 0%, #171347 100%)"
                                      selected={false}
                                      width='160px' height='50px' rounded='33px'
                                    >
                                    <Box variant="solid" color="white" justify='center' align='center'
                                        onClick = {()=>{setSubmitPressed(!submitPressed)}} >
                                      View Project
                                    </Box>
                                  </ImageTransition>
                                </Flex>
                              </HStack>
                            </Flex>
                        </Box>
                      </Flex>
                    </Box>
                    <Box 
                      w= {{lg:"100%"}} h= {{lg:"320px"}} mx="auto" borderTop= "1px solid rgba(255, 255, 255, 0.1)"
                      boxSizing="border-box" shadow="lg" rounded="lg" overflow="hidden" alignSelf={{base:'center', md:'center', lg:'flex-start'}} direction={{base:'column',md:'column',lg:'row'}}>
                      <Flex alignSelf={{base:'center', md:'center', lg:'flex-start'}} direction={{base:'column',md:'column',lg:'row'}}>
                        
                        <Flex my={"6px"} mx={"6px"} width="200px" height="249px" bg="#FFFFFF"
                              boxShadow={"0px 2px 10px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.25)"}
                              borderRadius={"2xl"} px="20px" py="10px">
                          <Image src="/media/sheep.svg" alt="avatar"/>
                        </Flex>
                        <Box py={4} px={2} direction={{base:'column',md:'column',lg:'row'}}>
                          <Flex>
                            <Flex as={Stack} width={{lg:'80%'}} paddingRight={'20px'} maxWidth={'700px'}>
                              <chakra.h1 color="white" fontWeight="bold" fontSize="lg">
                                Simba
                              </chakra.h1>
                              <chakra.p py={2} color={"gray.400"} fontSize="15px">
                              Date - <span style={{color:"#FE8600"}}>10 Dec, 2021</span>
                              </chakra.p>
                              {/* ------------------project synopsis---------- */}
                              <chakra.p py={2} color={"gray.400"}>
                              Commodo labore ut nisi laborum amet eu qui magna ullamco ut labore. 
                              Aliquip consectetur labore consectetur dolor exercitation est min quis. 
                              Magna non irure qui ex est laborum nulla excepteur. <span style={{color:'#00A3FF'}}>...more</span>
                              </chakra.p>
                          </Flex>
                            <Flex 
                            alignSelf={{base:'center', md:'center', lg:'flex-start'}}
                            marginTop={'20px !important'}
                            >
                              <VStack alignSelf={'flex-start'}>
                        <Flex>
                        <Text>Backed Funds :  4 / 10 Millions UST</Text>
                        </Flex>
                        <Flex 
                          alignSelf={{base:'center', md:'center', lg:'flex-start'}}>
                            <CircularProgress value={40} size='120px' color='#00A3FF;'>
                            <CircularProgressLabel>40%</CircularProgressLabel>
                            </CircularProgress>
                        {/* The progress - Replace with functional ones*/}
                          </Flex>
</VStack> 
                            </Flex>
                          </Flex>
                            <Flex mt={'25px'} direction={{base:'column',md:'column',lg:'row'}}> 
                              <Flex alignItems="center" color={"gray.400"} visibility={{base:'hidden', md:'hidden', lg:'visible'}}>
                                <Icon as={MdOutlineCategory} h={6} w={6} mr={2} />
                                <chakra.h1 px={2} fontSize="sm">
                                  Charity Project
                                </chakra.h1>
                              </Flex>
                              <Flex alignItems="center" color={"gray.400"} visibility={{base:'hidden', md:'hidden', lg:'visible'}}>
                                <Icon as={MdOutlinePlace} h={6} w={6} mr={2} />
                                <chakra.h1 px={2} fontSize="sm">
                                  Cardano
                                </chakra.h1>
                              </Flex>
                              <Flex alignItems="center" color={"gray.400"} visibility={{base:'hidden', md:'hidden', lg:'visible'}}>
                                <Icon as={MdOutlineAccountBalanceWallet} h={6} w={6} mr={2} />
                                <chakra.h1 px={2} fontSize="sm">
                                  $32,000.50 <span style={{color:'#00A3FF'}}>Funding Pool</span>
                                </chakra.h1>
                              </Flex>
                              <HStack style={{paddingLeft:'10%', width:'330px', spacing:10}}>
                                <Flex >
                                  <ImageTransition 
                                    unitid='visit'
                                    border1='linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)' 
                                    background1='linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)'
                                    border2='linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)'
                                    background2='linear-gradient(180deg, #1A133E 0%, #1A133E 100%)'
                                    border3="linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)"
                                    background3="linear-gradient(180deg, #171347 0%, #171347 100%)"
                                    selected={false}
                                    width='190px' height='50px' rounded='33px'
                                  >
                                    <Box variant="solid" color="white" justify='center' align='center'
                                        onClick = {()=>{setSubmitPressed(!submitPressed)}} >
                                      Visit Website  <Icon as={BsArrowUpRight} h={4} w={4} mr={3} />
                                    </Box>
                                  </ImageTransition>
                                </Flex>
                                <Flex>
                                  <ImageTransition 
                                      unitid='view'
                                      border1='linear-gradient(180deg, #FE8600 0%, #F83E00 100%)' 
                                      background1='linear-gradient(180deg, #FE8600 0%, #F83E00  100%)'
                                      border2='linear-gradient(180deg, #FE8600 0%, #F83E00 100%)'
                                      background2='linear-gradient(180deg, #1A133E 0%, #1A133E 100%)'
                                      border3="linear-gradient(180deg, #FE8600 0%, #F83E00 100%)"
                                      background3="linear-gradient(180deg, #171347 0%, #171347 100%)"
                                      selected={false}
                                      width='160px' height='50px' rounded='33px'
                                    >
                                    <Box variant="solid" color="white" justify='center' align='center'
                                        onClick = {()=>{setSubmitPressed(!submitPressed)}} >
                                      View Project
                                    </Box>
                                  </ImageTransition>
                                </Flex>
                              </HStack>
                            </Flex>
                        </Box>
                      </Flex>
                    </Box>
                    <Box 
                      w= {{lg:"100%"}} h= {{lg:"320px"}} mx="auto" borderTop= "1px solid rgba(255, 255, 255, 0.1)"
                      boxSizing="border-box" shadow="lg" rounded="lg" overflow="hidden" alignSelf={{base:'center', md:'center', lg:'flex-start'}} direction={{base:'column',md:'column',lg:'row'}}>
                      <Flex alignSelf={{base:'center', md:'center', lg:'flex-start'}} direction={{base:'column',md:'column',lg:'row'}}>
                        
                        <Flex my={"6px"} mx={"6px"} width="200px" height="249px" bg="#FFFFFF"
                              boxShadow={"0px 2px 10px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.25)"}
                              borderRadius={"2xl"} px="20px" py="10px">
                          <Image src="/media/sheep.svg" alt="avatar"/>
                        </Flex>
                        <Box py={4} px={2} direction={{base:'column',md:'column',lg:'row'}}>
                          <Flex>
                            <Flex as={Stack} width={{lg:'80%'}} paddingRight={'20px'} maxWidth={'700px'}>
                              <chakra.h1 color="white" fontWeight="bold" fontSize="lg">
                                Simba
                              </chakra.h1>
                              <chakra.p py={2} color={"gray.400"} fontSize="15px">
                              Date - <span style={{color:"#FE8600"}}>10 Dec, 2021</span>
                              </chakra.p>
                              {/* ------------------project synopsis---------- */}
                              <chakra.p py={2} color={"gray.400"}>
                              Commodo labore ut nisi laborum amet eu qui magna ullamco ut labore. 
                              Aliquip consectetur labore consectetur dolor exercitation est min quis. 
                              Magna non irure qui ex est laborum nulla excepteur. <span style={{color:'#00A3FF'}}>...more</span>
                              </chakra.p>
                          </Flex>
                            <Flex 
                            alignSelf={{base:'center', md:'center', lg:'flex-start'}}
                            marginTop={'20px !important'}
                            >
                              <VStack alignSelf={'flex-start'}>
                        <Flex>
                        <Text>Backed Funds :  4 / 10 Millions UST</Text>
                        </Flex>
                        <Flex 
                          alignSelf={{base:'center', md:'center', lg:'flex-start'}}>
                            <CircularProgress value={40} size='120px' color='#00A3FF;'>
                            <CircularProgressLabel>40%</CircularProgressLabel>
                            </CircularProgress>
                        {/* The progress - Replace with functional ones*/}
                          </Flex>
</VStack> 
                            </Flex>
                          </Flex>
                            <Flex mt={'25px'} direction={{base:'column',md:'column',lg:'row'}}> 
                              <Flex alignItems="center" color={"gray.400"} visibility={{base:'hidden', md:'hidden', lg:'visible'}}>
                                <Icon as={MdOutlineCategory} h={6} w={6} mr={2} />
                                <chakra.h1 px={2} fontSize="sm">
                                  Charity Project
                                </chakra.h1>
                              </Flex>
                              <Flex alignItems="center" color={"gray.400"} visibility={{base:'hidden', md:'hidden', lg:'visible'}}>
                                <Icon as={MdOutlinePlace} h={6} w={6} mr={2} />
                                <chakra.h1 px={2} fontSize="sm">
                                  Cardano
                                </chakra.h1>
                              </Flex>
                              <Flex alignItems="center" color={"gray.400"} visibility={{base:'hidden', md:'hidden', lg:'visible'}}>
                                <Icon as={MdOutlineAccountBalanceWallet} h={6} w={6} mr={2} />
                                <chakra.h1 px={2} fontSize="sm">
                                  $32,000.50 <span style={{color:'#00A3FF'}}>Funding Pool</span>
                                </chakra.h1>
                              </Flex>
                              <HStack style={{paddingLeft:'10%', width:'330px', spacing:10}}>
                                <Flex >
                                  <ImageTransition 
                                    unitid='visit'
                                    border1='linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)' 
                                    background1='linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)'
                                    border2='linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)'
                                    background2='linear-gradient(180deg, #1A133E 0%, #1A133E 100%)'
                                    border3="linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)"
                                    background3="linear-gradient(180deg, #171347 0%, #171347 100%)"
                                    selected={false}
                                    width='190px' height='50px' rounded='33px'
                                  >
                                    <Box variant="solid" color="white" justify='center' align='center'
                                        onClick = {()=>{setSubmitPressed(!submitPressed)}} >
                                      Visit Website  <Icon as={BsArrowUpRight} h={4} w={4} mr={3} />
                                    </Box>
                                  </ImageTransition>
                                </Flex>
                                <Flex>
                                  <ImageTransition 
                                      unitid='view'
                                      border1='linear-gradient(180deg, #FE8600 0%, #F83E00 100%)' 
                                      background1='linear-gradient(180deg, #FE8600 0%, #F83E00  100%)'
                                      border2='linear-gradient(180deg, #FE8600 0%, #F83E00 100%)'
                                      background2='linear-gradient(180deg, #1A133E 0%, #1A133E 100%)'
                                      border3="linear-gradient(180deg, #FE8600 0%, #F83E00 100%)"
                                      background3="linear-gradient(180deg, #171347 0%, #171347 100%)"
                                      selected={false}
                                      width='160px' height='50px' rounded='33px'
                                    >
                                    <Box variant="solid" color="white" justify='center' align='center'
                                        onClick = {()=>{setSubmitPressed(!submitPressed)}} >
                                      View Project
                                    </Box>
                                  </ImageTransition>
                                </Flex>
                              </HStack>
                            </Flex>
                        </Box>
                      </Flex>
                    </Box>



                  </VStack>
                  {/* ------------------project mobile---------- */}
                  <VStack visibility={{base:'visible', md:'visible', lg:'hidden'}}>
                    {/* ------------------project list---------- */}
                    <Flex marginTop={'26px'} marginBottom={'26px'} alignSelf={{lg:'flex-start'}} direction={{base:'row',md:'row',lg:'row'}} >
                      <Flex alignSelf={'flex-start'} width={{lg:'950px'}} >
                        <Text fontSize={{base:'15px',md:'15px',lg:'22px'}}>Projects you might like</Text>
                      </Flex>
                      <Flex alignSelf={'flex-end'} marginLeft={'98px'}>
                        <Text fontSize={{base:'15px',md:'15px',lg:'22px'}}>x Projects</Text>
                      </Flex>
                    </Flex>

                    {/* ------------------project snippet detail---------- */}
                    <Flex
                      w= {{lg:"100%"}} h= {{lg:"320px"}} mx="auto" borderTop= "1px solid rgba(255, 255, 255, 0.1)"
                      boxSizing="border-box" shadow="lg" rounded="lg" alignSelf={{base:'center', md:'center', lg:'flex-start'}} direction={{base:'column',md:'column',lg:'row'}}>
                        <Flex width={'300px'} alignSelf={{base:'center', md:'center', lg:'flex-start'}} direction={{base:'column',md:'column',lg:'row'}}>
                          
                          {/* ------------------project image---------- */}
                          <Flex width={'300px'}>
                            <Flex my={"6px"} mx={"6px"} width="240px" height="249px" bg="#FFFFFF"
                                  boxShadow={"0px 2px 10px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.25)"}
                                  borderRadius={"2xl"} px="5px" py="15px">
                              <Image src="/media/sheep.svg" alt="avatar"/>
                            </Flex>
                          {/* ------------------project Detail---------- */}
                                <Flex py={4} px={2} direction={{base:'column',md:'column',lg:'row'}}>
                                  <Flex as={Stack} width={{lg:'80%'}} maxWidth={'600px'}>
                                    <chakra.h1 color="white" fontWeight="bold" fontSize="lg">
                                      Simba
                                    </chakra.h1>
                                    <chakra.p py={2} color={"gray.400"} fontSize="15px">
                                    Date - <span style={{color:"#FE8600"}}>10 Dec, 2021</span>
                                    </chakra.p>
                                    {/* ------------------project synopsis---------- */}
                                    <chakra.p py={2} color={"gray.400"}>
                                    Commodo labore ut nisi laborum amet eu qui magna ullamco ut labore. 
                                    Aliquip consectetur labore consectetur dolor  <span style={{color:'#00A3FF'}}>...more</span>
                                    </chakra.p>
                                  </Flex>
                                </Flex>
                            </Flex>
                            <Flex 
                              alignSelf={{base:'center', md:'center', lg:'flex-start'}}
                              marginTop={'20px !important'}
                              >
                            {/* The progress - Replace with functional ones*/}
                              <VStack alignSelf={'flex-start'}>
                        <Flex>
                        <Text>Backed Funds :  4 / 10 Millions UST</Text>
                        </Flex>
                        <Flex 
                          alignSelf={{base:'center', md:'center', lg:'flex-start'}}>
                            <CircularProgress value={40} size='120px' color='#00A3FF;'>
                            <CircularProgressLabel>40%</CircularProgressLabel>
                            </CircularProgress>
                        {/* The progress - Replace with functional ones*/}
                          </Flex>
</VStack> 
                            </Flex>
                            {/* ------------------project buttons---------- */}
                            <Flex mt={'25px'} mb={'25px'} direction={{base:'column',md:'column',lg:'row'}}> 
                              <HStack style={{spacing:10}}>
                                <Flex >
                                  <ImageTransition 
                                    unitid='visit'
                                    border1='linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)' 
                                    background1='linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)'
                                    border2='linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)'
                                    background2='linear-gradient(180deg, #1A133E 0%, #1A133E 100%)'
                                    border3="linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)"
                                    background3="linear-gradient(180deg, #171347 0%, #171347 100%)"
                                    selected={false}
                                    width='150px' height='50px' rounded='33px'
                                  >
                                    <Box variant="solid" color="white" justify='center' align='center'
                                        onClick = {()=>{setSubmitPressed(!submitPressed)}} >
                                      Visit Website  <Icon as={BsArrowUpRight} h={4} w={4} mr={3} />
                                    </Box>
                                  </ImageTransition>
                                </Flex>
                                <Flex>
                                  <ImageTransition 
                                      unitid='view'
                                      border1='linear-gradient(180deg, #FE8600 0%, #F83E00 100%)' 
                                      background1='linear-gradient(180deg, #FE8600 0%, #F83E00  100%)'
                                      border2='linear-gradient(180deg, #FE8600 0%, #F83E00 100%)'
                                      background2='linear-gradient(180deg, #1A133E 0%, #1A133E 100%)'
                                      border3="linear-gradient(180deg, #FE8600 0%, #F83E00 100%)"
                                      background3="linear-gradient(180deg, #171347 0%, #171347 100%)"
                                      selected={false}
                                      width='150px' height='50px' rounded='33px'
                                    >
                                    <Box variant="solid" color="white" justify='center' align='center'
                                        onClick = {()=>{setSubmitPressed(!submitPressed)}} >
                                      View Project
                                    </Box>
                                  </ImageTransition>
                                </Flex>
                              </HStack>
                            </Flex>
                          
                        </Flex>
                    </Flex>
                    <Flex
                      w= {{lg:"100%"}} h= {{lg:"320px"}} mx="auto" borderTop= "1px solid rgba(255, 255, 255, 0.1)"
                      boxSizing="border-box" shadow="lg" rounded="lg" alignSelf={{base:'center', md:'center', lg:'flex-start'}} direction={{base:'column',md:'column',lg:'row'}}>
                        <Flex width={'300px'} alignSelf={{base:'center', md:'center', lg:'flex-start'}} direction={{base:'column',md:'column',lg:'row'}}>
                          
                          {/* ------------------project image---------- */}
                          <Flex width={'300px'}>
                            <Flex my={"6px"} mx={"6px"} width="240px" height="249px" bg="#FFFFFF"
                                  boxShadow={"0px 2px 10px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.25)"}
                                  borderRadius={"2xl"} px="5px" py="15px">
                              <Image src="/media/sheep.svg" alt="avatar"/>
                            </Flex>
                          {/* ------------------project Detail---------- */}
                                <Flex py={4} px={2} direction={{base:'column',md:'column',lg:'row'}}>
                                  <Flex as={Stack} width={{lg:'80%'}} maxWidth={'600px'}>
                                    <chakra.h1 color="white" fontWeight="bold" fontSize="lg">
                                      Simba
                                    </chakra.h1>
                                    <chakra.p py={2} color={"gray.400"} fontSize="15px">
                                    Date - <span style={{color:"#FE8600"}}>10 Dec, 2021</span>
                                    </chakra.p>
                                    {/* ------------------project synopsis---------- */}
                                    <chakra.p py={2} color={"gray.400"}>
                                    Commodo labore ut nisi laborum amet eu qui magna ullamco ut labore. 
                                    Aliquip consectetur labore consectetur dolor  <span style={{color:'#00A3FF'}}>...more</span>
                                    </chakra.p>
                                  </Flex>
                                </Flex>
                            </Flex>
                            <Flex 
                              alignSelf={{base:'center', md:'center', lg:'flex-start'}}
                              marginTop={'20px !important'}
                              >
                            {/* The progress - Replace with functional ones*/}
                              <VStack alignSelf={'flex-start'}>
                        <Flex>
                        <Text>Backed Funds :  4 / 10 Millions UST</Text>
                        </Flex>
                        <Flex 
                          alignSelf={{base:'center', md:'center', lg:'flex-start'}}>
                            <CircularProgress value={40} size='120px' color='#00A3FF;'>
                            <CircularProgressLabel>40%</CircularProgressLabel>
                            </CircularProgress>
                        {/* The progress - Replace with functional ones*/}
                          </Flex>
</VStack> 
                            </Flex>
                            {/* ------------------project buttons---------- */}
                            <Flex mt={'25px'} mb={'25px'} direction={{base:'column',md:'column',lg:'row'}}> 
                              <HStack style={{spacing:10}}>
                                <Flex >
                                  <ImageTransition 
                                    unitid='visit'
                                    border1='linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)' 
                                    background1='linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)'
                                    border2='linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)'
                                    background2='linear-gradient(180deg, #1A133E 0%, #1A133E 100%)'
                                    border3="linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)"
                                    background3="linear-gradient(180deg, #171347 0%, #171347 100%)"
                                    selected={false}
                                    width='150px' height='50px' rounded='33px'
                                  >
                                    <Box variant="solid" color="white" justify='center' align='center'
                                        onClick = {()=>{setSubmitPressed(!submitPressed)}} >
                                      Visit Website  <Icon as={BsArrowUpRight} h={4} w={4} mr={3} />
                                    </Box>
                                  </ImageTransition>
                                </Flex>
                                <Flex>
                                  <ImageTransition 
                                      unitid='view'
                                      border1='linear-gradient(180deg, #FE8600 0%, #F83E00 100%)' 
                                      background1='linear-gradient(180deg, #FE8600 0%, #F83E00  100%)'
                                      border2='linear-gradient(180deg, #FE8600 0%, #F83E00 100%)'
                                      background2='linear-gradient(180deg, #1A133E 0%, #1A133E 100%)'
                                      border3="linear-gradient(180deg, #FE8600 0%, #F83E00 100%)"
                                      background3="linear-gradient(180deg, #171347 0%, #171347 100%)"
                                      selected={false}
                                      width='150px' height='50px' rounded='33px'
                                    >
                                    <Box variant="solid" color="white" justify='center' align='center'
                                        onClick = {()=>{setSubmitPressed(!submitPressed)}} >
                                      View Project
                                    </Box>
                                  </ImageTransition>
                                </Flex>
                              </HStack>
                            </Flex>
                          
                        </Flex>
                    </Flex>
                    <Flex
                      w= {{lg:"100%"}} h= {{lg:"320px"}} mx="auto" borderTop= "1px solid rgba(255, 255, 255, 0.1)"
                      boxSizing="border-box" shadow="lg" rounded="lg" alignSelf={{base:'center', md:'center', lg:'flex-start'}} direction={{base:'column',md:'column',lg:'row'}}>
                        <Flex width={'300px'} alignSelf={{base:'center', md:'center', lg:'flex-start'}} direction={{base:'column',md:'column',lg:'row'}}>
                          
                          {/* ------------------project image---------- */}
                          <Flex width={'300px'}>
                            <Flex my={"6px"} mx={"6px"} width="240px" height="249px" bg="#FFFFFF"
                                  boxShadow={"0px 2px 10px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.25)"}
                                  borderRadius={"2xl"} px="5px" py="15px">
                              <Image src="/media/sheep.svg" alt="avatar"/>
                            </Flex>
                          {/* ------------------project Detail---------- */}
                                <Flex py={4} px={2} direction={{base:'column',md:'column',lg:'row'}}>
                                  <Flex as={Stack} width={{lg:'80%'}} maxWidth={'600px'}>
                                    <chakra.h1 color="white" fontWeight="bold" fontSize="lg">
                                      Simba
                                    </chakra.h1>
                                    <chakra.p py={2} color={"gray.400"} fontSize="15px">
                                    Date - <span style={{color:"#FE8600"}}>10 Dec, 2021</span>
                                    </chakra.p>
                                    {/* ------------------project synopsis---------- */}
                                    <chakra.p py={2} color={"gray.400"}>
                                    Commodo labore ut nisi laborum amet eu qui magna ullamco ut labore. 
                                    Aliquip consectetur labore consectetur dolor  <span style={{color:'#00A3FF'}}>...more</span>
                                    </chakra.p>
                                  </Flex>
                                </Flex>
                            </Flex>
                            <Flex 
                              alignSelf={{base:'center', md:'center', lg:'flex-start'}}
                              marginTop={'20px !important'}
                              >
                            {/* The progress - Replace with functional ones*/}
                              <VStack alignSelf={'flex-start'}>
                        <Flex>
                        <Text>Backed Funds :  4 / 10 Millions UST</Text>
                        </Flex>
                        <Flex 
                          alignSelf={{base:'center', md:'center', lg:'flex-start'}}>
                            <CircularProgress value={40} size='120px' color='#00A3FF;'>
                            <CircularProgressLabel>40%</CircularProgressLabel>
                            </CircularProgress>
                        {/* The progress - Replace with functional ones*/}
                          </Flex>
</VStack> 
                            </Flex>
                            {/* ------------------project buttons---------- */}
                            <Flex mt={'25px'} mb={'25px'} direction={{base:'column',md:'column',lg:'row'}}> 
                              <HStack style={{spacing:10}}>
                                <Flex >
                                  <ImageTransition 
                                    unitid='visit'
                                    border1='linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)' 
                                    background1='linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)'
                                    border2='linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)'
                                    background2='linear-gradient(180deg, #1A133E 0%, #1A133E 100%)'
                                    border3="linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)"
                                    background3="linear-gradient(180deg, #171347 0%, #171347 100%)"
                                    selected={false}
                                    width='150px' height='50px' rounded='33px'
                                  >
                                    <Box variant="solid" color="white" justify='center' align='center'
                                        onClick = {()=>{setSubmitPressed(!submitPressed)}} >
                                      Visit Website  <Icon as={BsArrowUpRight} h={4} w={4} mr={3} />
                                    </Box>
                                  </ImageTransition>
                                </Flex>
                                <Flex>
                                  <ImageTransition 
                                      unitid='view'
                                      border1='linear-gradient(180deg, #FE8600 0%, #F83E00 100%)' 
                                      background1='linear-gradient(180deg, #FE8600 0%, #F83E00  100%)'
                                      border2='linear-gradient(180deg, #FE8600 0%, #F83E00 100%)'
                                      background2='linear-gradient(180deg, #1A133E 0%, #1A133E 100%)'
                                      border3="linear-gradient(180deg, #FE8600 0%, #F83E00 100%)"
                                      background3="linear-gradient(180deg, #171347 0%, #171347 100%)"
                                      selected={false}
                                      width='150px' height='50px' rounded='33px'
                                    >
                                    <Box variant="solid" color="white" justify='center' align='center'
                                        onClick = {()=>{setSubmitPressed(!submitPressed)}} >
                                      View Project
                                    </Box>
                                  </ImageTransition>
                                </Flex>
                              </HStack>
                            </Flex>
                          
                        </Flex>
                    </Flex>


                  </VStack>
                </Flex>
                    </Flex>
                    {/* ------------Milestone of Project------------ */}
                    <Flex
                      mt="100px"
                      px={'45px'}
                      py={'45px'}
                      width={'90%'}
                      borderRadius="25px"
                      justify='center' 
                      align='center' 
                      flexDirection="column"
                      background={'rgba(255, 255, 255, 0.05)'}
                      border={'1.5px solid rgba(255, 255, 255, 0.15)'}
                      visibility={{base:'hidden',md:'hidden', lg:'visible'}}
                    >
                      <Flex mt='60px' justify='center' align='center' direction='column' maxWidth={{base:'0px',md:'0px',lg:'1200px'}} maxHeight={{base:'0px',md:'0px',lg:'999px'}} visibility={{base:'hidden',md:'hidden', lg:'visible'}} >
                        <Text fontSize='16px' fontWeight={'300'} mb={'20px'}>Project Milestones List on Project Backed by You</Text>
                        <Table variant='simple'>
                          <TableCaption style={{color:'#00A3FF'}}>Milestones that project have. Details might be more on Project own's website. Project Milestone up for voting would be listed for voting. 
                          Rejected Milestones means project funds would not be released or project suspended. Voted and Approved would result in project rewarded for milestone</TableCaption>
                          <Thead bgColor={'rgba(255, 255, 255, 0.12)'} borderRadius={'10px 10px 0px 0px'}>
                            <Tr>
                              <Th style={{color:'#00A3FF'}}>Project Name </Th>
                              <Th style={{color:'#00A3FF'}}>Milestone Name </Th>
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
                            <Td >Project A </Td>
                            <Td >Prototype Making </Td>
                            <Td >20 . 02 . 2022 </Td>
                            <Td >20 . 04 . 2022 </Td>
                            <Td >$20.000,00 </Td>
                            <Td ><Button onClick={onVoteBoxOpen} colorScheme={'teal'}>Vote & Details</Button></Td>
                            <Td >Not Yet Started</Td>
                            <Td ><Text color={'#FE8600'}>See More</Text></Td>
                            </Tr>
                            <Tr>
                            <Td >Project B </Td>
                            <Td >Prototype Making </Td>
                            <Td >20 . 02 . 2022 </Td>
                            <Td >20 . 04 . 2022 </Td>
                            <Td >$20.000,00 </Td>
                            <Td ><Button onClick={onVoteBoxOpen} colorScheme={'teal'}>Vote & Details</Button></Td>
                            <Td >Not Yet Started</Td>
                            <Td ><Text color={'#FE8600'}>See More</Text></Td>
                            </Tr>
                            <Tr>
                            <Td >Project C </Td>
                            <Td >Prototype Making </Td>
                            <Td >20 . 02 . 2022 </Td>
                            <Td >20 . 04 . 2022 </Td>
                            <Td >$20.000,00 </Td>
                            <Td ><Button onClick={onVoteBoxOpen} colorScheme={'teal'}>Vote & Details</Button></Td>
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
      </div>
      {/*--This is Where to Vote Pop Up is--*/}
      <Modal onClose={onVoteBoxClose} isOpen={isVoteBoxOpen} isCentered>
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
                <Button colorScheme='grey' mr={3} onClick={onVoteBoxClose}>
                  Close
                </Button>
                <Button colorScheme='blue' mr={3} >
                  Vote Yes
                </Button>
                <Button colorScheme='red' mr={3} >
                  Vote No
                </Button>
            </ModalFooter>
          </ModalContent>
      </Modal>
      {/*--This is Where to Referral Pop Up is--*/}
      <Modal onClose={onRefBoxClose} isOpen={isRefBoxOpen} isCentered>
        <ModalOverlay />
          <ModalContent>
            <ModalHeader>Refer a Backer</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Text>Earn WFD and other Bonuses for Referring a Backer. Your Link is</Text>
                <Text color={'blue.400'}>Link</Text>
            </ModalBody>
            <ModalFooter>
                <Button colorScheme='grey' mr={3} onClick={onRefBoxClose}>
                  Close
                </Button>
            </ModalFooter>
          </ModalContent>
      </Modal>
    </ChakraProvider>
    
  )
}
