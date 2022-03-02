import React,{ useRef, useState, useEffect, forwardRef, useCallback } from 'react'
import {
  Box,
  Flex,
  HStack,
  VStack,
  ChakraProvider
} from '@chakra-ui/react'
import {
  Sleep,
  FetchData,
  EstimateSend,
  CheckNetwork,
  GetProjectStatus,
} from '../components/Util'

import theme from '../theme'
import { useStore } from '../store'
import Footer from '../components/Footer'

import { Link, useNavigate } from '@reach/router'
import CoverHeader from '../components/CoverHeader'
import Notification from '../components/Notification'
import { WasmAPI, MsgExecuteContract } from '@terra-money/terra.js'

import ProjectCount from '../components/ProjectExplorer/ProjectCount'
import Tabs from '../components/ProjectExplorer/Tabs'
import Logo from '../components/ProjectExplorer/Logo'
import StatusButtons from '../components/ProjectExplorer/StatusButtons'
import Title from '../components/ProjectExplorer/Title'
import Description from '../components/ProjectExplorer/Description'
import ExtraInfos from '../components/ProjectExplorer/ExtraInfos'
import Informations from '../components/ProjectExplorer/Informations'
import MainButtons from '../components/ProjectExplorer/MainButtons'
import ProjectPaginator from '../components/ProjectExplorer/ProjectPaginator'
import CircularProgresses from '../components/ProjectExplorer/CircularProgresses'

import MobileLogo from '../components/ProjectExplorer/Mobile/Logo'
import MobileTitle from '../components/ProjectExplorer/Mobile/Title'
import MobileStatusButtons from '../components/ProjectExplorer/Mobile/StatusButtons'
import MobileInformations from '../components/ProjectExplorer/Mobile/Informations'
import MobileMainButtons from '../components/ProjectExplorer/Mobile/MainButtons'

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

  const notificationRef = useRef()
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
    if (CheckNetwork(connectedWallet, notificationRef, state) == false)
      return false
    let deadline = Date.now() + 1000 * 60 * 60 * 24 * 15 //for 15days
    let msg = new MsgExecuteContract(
      connectedWallet.walletAddress,
      state.WEFundContractAddress,
      { 
        wefund_approve: { 
          project_id: project_id, 
          deadline: `${deadline}` 
        } 
      }
    )
    await EstimateSend(
      connectedWallet,
      state.lcd_client,
      [msg],
      'WeFund Approve success',
      notificationRef,
    )
    await Sleep(2000)
    fetchContractQuery(true)
  }

  //-----------Community Vote----------------
  async function CommunityVote(project_id, voted, leftTime) {
    if (CheckNetwork(connectedWallet, notificationRef, state) == false)
      return false
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
      [msg],
      'Community vote success',
      notificationRef,
    )
    await Sleep(2000)
    fetchContractQuery(true)
  }

  async function MilestoneVote(project_id, voted) {
    if (CheckNetwork(connectedWallet, notificationRef, state) == false)
      return false
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
      [msg],
      'Milestone vote success',
      notificationRef,
    )
    await Sleep(2000)
    fetchContractQuery(true)
  }

  async function NextFundraisingStage(project_id, curStage){
    if (CheckNetwork(connectedWallet, notificationRef, state) == false)
      return false
    let wallet = connectedWallet.walletAddress;

    let stage = '';
    switch(curStage.toLowerCase()){
      case 'seed':
        stage = 'Presale'; break;
      case 'presale':
        stage = 'IDO'; break;
      default:
        return;
    }
console.log(stage);
    let FundraisingMsg = { set_fundraising_stage: { project_id, stage } }

    let wefundContractAddress = state.WEFundContractAddress
    let msg = new MsgExecuteContract(
      wallet,
      wefundContractAddress,
      FundraisingMsg,
    )
    EstimateSend(
      connectedWallet,
      state.lcd_client,
      [msg],
      'Set Fundraising stage success',
      notificationRef,
    )
    await Sleep(2000)
    fetchContractQuery(true)
  }
  //---------initialize fetching---------------------
  useEffect(() => {
    fetchContractQuery()
  }, [activeTab])

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
        <CoverHeader
          text2Color
          title={'Projects'}
          text1={'Explore'}
          text2={'Projects'}
        />

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
                    <ProjectCount />
                    {postProjectData != '' && postProjectData.map((e, index) => (
                      <Box
                        w="100%"
                        key={index}
                        shadow="lg"
                        overflow="hidden"
                        boxSizing="border-box"
                        borderTop="1px solid rgba(255, 255, 255, 0.1)"
                      >
                        <HStack w="100%">
                          <Logo data={e} />
                          <Box py={4} px={2} w="100%">
                            <Flex justify={'space-between'} mb={'20px'} alignItems='center'>
                              <Title activeTab={activeTab} data = {e} />
                              <StatusButtons
                                index = {index}
                                data={e}
                                activeTab = {activeTab}
                                WefundApprove = {WefundApprove}
                                CommunityVote = {CommunityVote}
                                MilestoneVote = {MilestoneVote}
                                NextFundraisingStage = {NextFundraisingStage}
                              />
                            </Flex>

                            <Flex
                              align="self-start"
                              justifyContent={'space-between'}
                            >
                              <Description data={e} />
                              <CircularProgresses
                                activeTab = {activeTab}
                                data={e}
                                sz={{ base: '80px', md: '120px', lg: '150px'}}
                              />
                            </Flex>
                            <ExtraInfos activeTab={activeTab} data={e} />
                            <HStack justify="space-between" mt={'10px'}>
                              <Informations data={e}/>
                              <MainButtons index = {index} data={e}/>
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
                    <ProjectCount />

                    <Flex
                      w={'100%'}
                      shadow="lg"
                      alignSelf={'center'}
                      direction={'column'}
                      boxSizing="border-box"
                    >
                      {postProjectData != '' && postProjectData.map((e, index) => (
                        <Flex
                          width={'100%'}
                          alignSelf={'center'}
                          direction={'column'}
                          mb="20px"
                          key={index}
                          align="center"
                        >
                          <Flex
                            width={'90%'}
                            justify={'center'}
                            direction={'column'}
                            alignSelf={'center'}
                          >
                            <MobileLogo data={e} />
                            <MobileTitle data={e} />
                            <Flex
                              py={2}
                              w="100%"
                              alignItems={'center'}
                              flexDirection={'column'}
                              justify={'space-between'}
                            >
                              <MobileInformations data={e}/>
                              <MobileStatusButtons 
                                index = {index}
                                data={e}
                                activeTab = {activeTab}
                                WefundApprove = {WefundApprove}
                                CommunityVote = {CommunityVote}
                                MilestoneVote = {MilestoneVote}
                                NextFundraisingStage = {NextFundraisingStage}
                              />
                            </Flex>
                          </Flex>

                          <Flex alignSelf={'center'} marginTop={'20px'}>
                            <CircularProgresses value={e} sz="120px" />
                          </Flex>

                          <MobileMainButtons index = {index} data={e} />
                        </Flex>
                      ))}
                    </Flex>
                  </Flex>
                </Flex>
                <ProjectPaginator 
                  current = {current}
                  pagesize = {pageSize}
                  onChangePaginator = {onChangePaginator}
                />
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
