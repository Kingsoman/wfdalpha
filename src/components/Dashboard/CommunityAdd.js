import React, { useEffect, useState, useMemo, useRef, forwardRef } from 'react'
import { Link, navigate } from '@reach/router'
import { WasmAPI, LCDClient, MsgExecuteContract } from '@terra-money/terra.js'
import {
  Box,
  Flex,
  Text,
  Input,
  HStack,
  VStack,
  Button,
} from '@chakra-ui/react'
import Pagination from '@choc-ui/paginator'

import { useStore, WEFUND_MAIN, WEFUND_TEST, VESTING_MAIN, VESTING_TEST } from '../store'
import { InputTransition, ButtonTransition, } from '../components/ImageTransition'

import PageLayout from '../components/PageLayout'
import Footer from '../components/Footer'
import Notification from '../components/Notification'
import { EstimateSend, FetchData, Set2Mainnet, Set2Testnet } from '../components/Util'

export default function Dashboard() {
  const { state, dispatch } = useStore()
  const [wallet, setWallet] = useState('');
  //-------------paginator------------------------------
  const [current, setCurrent] = useState(1);
  const pageSize = 10;
  const [postCommunityData, setPostCommunityData] = useState('');
  const [nextNetwork, setNextNetwork] = useState('Test');

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
  function onChangePaginator(page) {
    if (state.communityData == '') {
      setPostCommunityData('');
      return;
    }
    const offset = (page - 1) * pageSize;
    setPostCommunityData(state.communityData.slice(offset, offset + pageSize));
  }

  const api = new WasmAPI(state.lcd_client.apiRequester)

  //-----------fetch project data=-------------------------
  async function fetchContractQuery() {
    try {
      let { projectData, communityData, configData } = await FetchData(api, state, dispatch);

      //-----------------initialize--------------------------
      setCurrent(1);
      setPostCommunityData(communityData.slice(0, pageSize));
    } catch (e) {
      console.log(e)
    }
  }

  //------------Add/remove community member-----------------
  function addCommunityMember() {
    let CommunityMsg = {
      add_communitymember: {
        wallet: wallet,
      },
    }

    let wefundContractAddress = state.WEFundContractAddress
    let msg = new MsgExecuteContract(
      state.connectedWallet.walletAddress,
      wefundContractAddress,
      CommunityMsg,
    )
    EstimateSend(state.connectedWallet, state.lcd_client, [msg], "Add Community success");
  }

  function removeCommunityMember(wallet) {
    let CommunityMsg = {
      remove_communitymember: {
        wallet: wallet.member,
      },
    }

    let wefundContractAddress = state.WEFundContractAddress
    let msg = new MsgExecuteContract(
      state.connectedWallet.walletAddress,
      wefundContractAddress,
      CommunityMsg,
    )
    EstimateSend(state.connectedWallet, state.lcd_client, [msg], "Remove Community success");
  }

  //---------initialize fetching---------------------
  useEffect(() => {
    fetchContractQuery();
  }, [state.connectedWallet, nextNetwork])

  useEffect(() => {
    if (state.net == 'testnet')
      setNextNetwork("mainnet")
    else
      setNextNetwork("testnet")
  }, [state.net])

  function switchNetwork() {
    if (state.net == 'testnet') {
      Set2Mainnet(state, dispatch);
      setNextNetwork("testnet")
    } else {
      Set2Testnet(state, dispatch)
      setNextNetwork("mainnet");
    }
    dispatch({
      type: 'setProjectData',
      message: ''
    })
    dispatch({
      type: 'setConfigData',
      message: ''
    })
    dispatch({
      type: 'setCommunityData',
      message: ''
    })
    dispatch({
      type: 'setActiveProjectData',
      message: ''
    })
    // navigate("/");
  }
  const SwitchButton = () => {
    return (
      <div onClick={switchNetwork} style={{ cursor: "pointer", border: '1px solid red', padding: '1px' }}>
        Switch to {nextNetwork}
      </div>
    )
  }

  return (
    <PageLayout title="Dashboard" subTitle1="Admin" subTitle2="Dashboard">
      <Flex  direction="column" justify="center" mt="50px" px="175px">
        <SwitchButton />
        {postCommunityData != '' &&
          postCommunityData.map((member, index) => (
            <HStack
              w="100%"
              h="80px"
              key={index}
              justify="space-between"
            >
              <Text>{member}</Text>
              <ButtonTransition
                unitid={'Removemember' + index}
                selected={false}
                width="140px"
                height="35px"
                rounded="33px"
                onClick={() => removeCommunityMember({ member })}
              >
                Remove
              </ButtonTransition>
            </HStack>
          ))}
          <HStack
            w="100%"
            h='80px'
            spacing="100px"
            justify="space-between"
          >
            <InputTransition
              unitid="wallet"
              selected={wallet == '' ? false : true}
              width="100%"
              height="55px"
              rounded="md"
            >
              <Input
                style={{ border: '0', background: 'transparent' }}
                type="text"
                h="55px"
                rounded="md"
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
              />
            </InputTransition>
            <Box w='140px'>
              <ButtonTransition
                unitid='addmember'
                selected={false}
                width="140px"
                height="35px"
                rounded="33px"
                onClick={() => addCommunityMember()}
              >
                Add
              </ButtonTransition>
            </Box>
          </HStack>
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
              total={state.communityData == '' ? 0 : state.communityData.length}
              itemRender={itemRender}
              paginationProps={{ display: 'flex' }}
            />
          </Flex>
      </Flex>
      <Footer />
    </PageLayout>
  )
}
