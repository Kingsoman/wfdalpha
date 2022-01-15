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
import { WasmAPI, LCDClient } from '@terra-money/terra.js'
import { BsArrowUpRight } from 'react-icons/bs'
import Pagination from '@choc-ui/paginator'
import {
  MdOutlinePlace,
  MdOutlineCategory,
  MdOutlineAccountBalanceWallet,
} from 'react-icons/md'
import { Link } from '@reach/router'
import React, { useEffect, useState, useMemo, useRef, forwardRef } from 'react'

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

let useConnectedWallet = {}
if (typeof document !== 'undefined') {
  useConnectedWallet =
    require('@terra-money/wallet-provider').useConnectedWallet
}

export default function ExplorerProject() {
  const { state, dispatch } = useStore()

  const [totalBackedMoney, setTotalBackedMoney] = useState(0)
  const [totalDeposit, setTotalDeposit] = useState(0)
  const [ustAmount, setUstAmount] = useState(0)
  const [austAmount, setAustAmount] = useState(0)
  const [activeTab, setActiveTab] = useState('')

  //-------------paginator------------------------------
  const [current, setCurrent] = useState(1);
  const pageSize = 3;
  const [postProjectData, setPostProjectData] = useState('');

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
    console.log("active Project Data");
    console.log(state.activeProjectdata);
    
    if(state.activeProjectdata == ''){
      setPostProjectData('');
      return;
    }
    const offset = (page - 1) * pageSize;      
    setPostProjectData(state.activeProjectdata.slice(offset, offset+pageSize));
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
    return new LCDClient({
      URL: connectedWallet.network.lcd,
      chainID: connectedWallet.network.chainID,
    })
  }, [connectedWallet])

  const api = new WasmAPI(state.lcd_client.apiRequester)

  //-----------fetch project data=-------------------------
  async function fetchContractQuery() {
    try {
      const projectData = await api.contractQuery(
        state.WEFundContractAddress,
        {
            get_all_project: {
            },
        }
      )
      
      if(projectData == ''){
        notificationRef.current.showNotification("Can't fetch Project Data", 'error', 6000);
        return;
      }

      let i, j
      let totalBacked = 0
      let totalDeposit = 0

      for (i = 0; i < projectData.length; i++) {
        let percent = projectData[i].backerbacked_amount + projectData[i].communitybacked_amount;

        percent = parseInt(
          (percent / 10 ** 6 / parseInt(projectData[i].project_collected)) *
            100,
        )
      }

      dispatch({
        type: 'setProjectdata',
        message: projectData,
      })

      totalBacked /= 10**6;
      totalDeposit /= 10**6;

      setTotalBackedMoney(totalBacked)
      setTotalDeposit(totalDeposit)

      const balanceData = await api.contractQuery(state.WEFundContractAddress, {
        get_balance: {
          wallet: state.WEFundContractAddress,
        },
      })
      if (!balanceData) return

      setUstAmount(balanceData.amount[0].amount / 1000000)
      setAustAmount(balanceData.amount[1].amount / 1000000)
    } catch (e) {
      console.log(e)
    }
  }

  function onChangeActivetab(mode){
    setActiveTab(mode);

    let projectstatus = 0;
    switch(mode){
      case 'WeFundApproval':
        projectstatus =0;
        break;
      case 'CommuntyApproval':
        projectstatus = 1;
        break;
      case 'MileStoneFundraising':
        projectstatus = 2;
        break;
      case 'MileStoneDelivery':
        projectstatus = 3;
        break;
      case 'ProjectComplete':
        projectstatus = 4;
        break;
    }

    let activeProjectdata = '';
    if(state.projectData != '')
      activeProjectdata = state.projectData.filter(project => parseInt(project.project_status) == projectstatus);
    
    dispatch({
      type: 'setActiveProjectdata',
      message: activeProjectdata,
    })

    //onChangePaginator(1);
    setCurrent(1);
    setPostProjectData(activeProjectdata.slice(0, pageSize));
  }

  useEffect(() => {
    fetchContractQuery();
    onChangeActivetab('WeFundApproval');
    // onChangePaginator(1);
  }, [connectedWallet, lcd])

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
              activeTab == 'WeFundApproval'
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
              activeTab == 'CommuntyApproval'
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
              activeTab == 'MileStoneFundraising'
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
              activeTab == 'MileStoneDelivery'
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
              activeTab == 'ProjectComplete'
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
                                    {projectItem.project_name}
                                  </chakra.h1>
                                </Box>
                                {activeTab === 'WeFundApproval' && (
                                  <Flex w={'330px'} justify={'space-between'}>
                                    <ButtonTransition
                                      unitid={'Reject' + index}
                                      width="160px"
                                      height="50px"
                                      selected={false}
                                      rounded="33px"
                                      onClick={() => WeFundApprove(false)}
                                    >
                                      Reject Project
                                    </ButtonTransition>

                                    <ButtonTransition
                                      unitid={'Approve' + index}
                                      selected={false}
                                      width="160px"
                                      height="50px"
                                      rounded="33px"
                                    >
                                      Approve Project
                                    </ButtonTransition>
                                  </Flex>
                                )}
                                {activeTab === 'CommuntyApproval' && (
                                  <Flex w={'330px'} justify={'space-between'}>
                                    <ButtonTransition
                                      unitid={'visit' + index}
                                      width="160px"
                                      height="50px"
                                      selected={false}
                                      rounded="33px"
                                    >
                                      Vote Yes
                                    </ButtonTransition>

                                    <ButtonTransition
                                      unitid={'view' + index}
                                      selected={false}
                                      width="160px"
                                      height="50px"
                                      rounded="33px"
                                    >
                                      Vote No
                                    </ButtonTransition>
                                  </Flex>
                                )}
                                {activeTab === 'MileStoneFundraising' && (
                                  <ButtonTransition
                                    unitid={'visit' + index}
                                    width="160px"
                                    height="50px"
                                    selected={false}
                                    rounded="33px"
                                    mb="10px"
                                  >
                                    Back Project
                                  </ButtonTransition>
                                )}
                                {activeTab === 'MileStoneDelivery' && (
                                  <Flex w={'330px'} justify={'space-between'}>
                                    <ButtonTransition
                                      unitid={'visit' + index}
                                      width="160px"
                                      height="50px"
                                      selected={false}
                                      rounded="33px"
                                    >
                                      Vote Yes
                                    </ButtonTransition>

                                    <ButtonTransition
                                      unitid={'view' + index}
                                      selected={false}
                                      width="160px"
                                      height="50px"
                                      rounded="33px"
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
                                  31 Dec, 2021
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
                                  {activeTab === 'MileStoneDelivery' && (
                                    <ButtonTransition
                                      unitid={'visit' + index}
                                      width="160px"
                                      height="50px"
                                      selected={false}
                                      rounded="33px"
                                      mb="10px"
                                    >
                                      Check Milestone Progress
                                    </ButtonTransition>
                                  )}
                                </Box>
                                <CircularProgress
                                  value={projectItem.percent}
                                  size="150px"
                                  color="blue.600"
                                >
                                  <CircularProgressLabel>
                                    {projectItem.percent}%
                                  </CircularProgressLabel>
                                </CircularProgress>
                              </HStack>
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
                                    31 Dec, 2021
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
                            <Flex
                              alignSelf={'center'}
                              marginTop={'20px !important'}
                            >
                              <CircularProgress
                                value={projectItem.percent}
                                size="120px"
                                color="blue.600"
                              >
                                <CircularProgressLabel>
                                  {projectItem.percent}%
                                </CircularProgressLabel>
                              </CircularProgress>
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
                    total={state.activeProjectdata == ''? 0 : state.activeProjectdata.length}
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
