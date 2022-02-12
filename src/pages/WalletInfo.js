import React, { useState, useEffect, useRef } from 'react'
import { MsgExecuteContract, WasmAPI } from '@terra-money/terra.js'
import { Link } from '@reach/router'
import { Box, Flex, Text, Button } from '@chakra-ui/react'
import { FetchData, EstimateSend } from '../components/Util'
import Notification from '../components/Notification'
import { useStore } from '../store'

let useConnectedWallet = {}
if (typeof document !== 'undefined') {
  useConnectedWallet =
    require('@terra-money/wallet-provider').useConnectedWallet
}

export default function UserSideSnippet() {
  const { state, dispatch } = useStore()
  const [contributes, setContributes] = useState(0)
  const [projectCount, setProjectCount] = useState(0)
  const [activeTab, setActiveTab] = useState('Account')
  const notificationRef = useRef()

  //-----------connect to wallet ---------------------
  let connectedWallet = ''
  if (typeof document !== 'undefined') {
    connectedWallet = useConnectedWallet()
  }

  async function fetchContractQuery() {
    try {
      const api = new WasmAPI(state.lcd_client.apiRequester)
      let { projectData } = await FetchData(api, null, state, dispatch)

      let projectCount = 0
      let totalbacked = 0

      for (let i = 0; i < projectData.length; i++) {
        let one = projectData[i]
        for (let j = 0; j < one.backer_states.length; j++) {
          if (
            one.backer_states[j].backer_wallet == connectedWallet.walletAddress
          ) {
            projectCount++
            totalbacked += one.backer_states[i].ust_amount
          }
        }
        for (let j = 0; j < one.communitybacker_states.length; j++) {
          if (
            one.communitybacker_states[j].backer_wallet ==
            connectedWallet.walletAddress
          ) {
            projectCount++
            totalbacked += one.backer_states[i].ust_amount
          }
        }
      }
      setProjectCount(projectCount)
      setContributes(totalbacked / 10 ** 6)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    fetchContractQuery()
  }, [])

  function addCommunityMember() {
    let CommunityMsg = {
      add_communitymember: {
        wallet: connectedWallet.walletAddress,
      },
    }

    let wefundContractAddress = state.WEFundContractAddress
    let msg = new MsgExecuteContract(
      connectedWallet.walletAddress,
      wefundContractAddress,
      CommunityMsg,
    )
    EstimateSend(
      connectedWallet,
      state.lcd_client,
      msg,
      'Add community success',
      notificationRef,
    )
  }

  function removeCommunityMember() {
    let CommunityMsg = {
      remove_communitymember: {
        wallet: connectedWallet.walletAddress,
      },
    }

    let wefundContractAddress = state.WEFundContractAddress
    let msg = new MsgExecuteContract(
      connectedWallet.walletAddress,
      wefundContractAddress,
      CommunityMsg,
    )
    EstimateSend(
      connectedWallet,
      state.lcd_client,
      msg,
      'Remove community success',
      notificationRef,
    )
  }

  return (
    <Box color={'white'} padding={'5%'}>
      <Flex
        mb="20px"
        fontSize={'18px'}
        fontWeight={'bold'}
        justify={{ base: 'space-between', lg: 'flex-start' }}
      >
        <Text
          cursor={'pointer'}
          textAlign={'center'}
          mr={{ base: '5px', lg: '10px' }}
          p={{ base: '5px', lg: '10px 20px' }}
          fontSize={{ base: '12px', lg: '20' }}
          onClick={() => setActiveTab('Account')}
          borderRadius={{ base: '5px', lg: '10px' }}
          color={activeTab === 'Account' ? '#4299E1' : 'white'}
          border={{
            base:
              activeTab === 'Account' ? '1px solid #4299E1' : '1px solid white',
            lg:
              activeTab === 'Account' ? '3px solid #4299E1' : '3px solid white',
          }}
        >
          MY ACCOUNT
        </Text>
        <Text
          cursor={'pointer'}
          textAlign={'center'}
          mr={{ base: '5px', lg: '10px' }}
          p={{ base: '5px', lg: '10px 20px' }}
          fontSize={{ base: '12px', lg: '20' }}
          onClick={() => setActiveTab('Prefund')}
          borderRadius={{ base: '5px', lg: '10px' }}
          color={activeTab === 'Prefund' ? '#4299E1' : 'white'}
          border={{
            base:
              activeTab === 'Prefund' ? '1px solid #4299E1' : '1px solid white',
            lg:
              activeTab === 'Prefund' ? '3px solid #4299E1' : '3px solid white',
          }}
        >
          MY PREFUND
        </Text>
        <Text
          cursor={'pointer'}
          textAlign={'center'}
          mr={{ base: '5px', lg: '10px' }}
          p={{ base: '5px', lg: '10px 20px' }}
          fontSize={{ base: '12px', lg: '20' }}
          onClick={() => setActiveTab('Invite')}
          borderRadius={{ base: '5px', lg: '10px' }}
          color={activeTab === 'Invite' ? '#4299E1' : 'white'}
          border={{
            base:
              activeTab === 'Invite' ? '1px solid #4299E1' : '1px solid white',
            lg:
              activeTab === 'Invite' ? '3px solid #4299E1' : '3px solid white',
          }}
        >
          INVITE BACKER
        </Text>
        <Text
          cursor={'pointer'}
          textAlign={'center'}
          mr={{ base: '5px', lg: '10px' }}
          p={{ base: '5px', lg: '10px 20px' }}
          fontSize={{ base: '12px', lg: '20' }}
          onClick={() => setActiveTab('Wallet')}
          borderRadius={{ base: '5px', lg: '10px' }}
          color={activeTab === 'Wallet' ? '#4299E1' : 'white'}
          border={{
            base:
              activeTab === 'Wallet' ? '1px solid #4299E1' : '1px solid white',
            lg:
              activeTab === 'Wallet' ? '3px solid #4299E1' : '3px solid white',
          }}
        >
          WALLET ADDRESS
        </Text>
      </Flex>

      {activeTab === 'Wallet' && (
        <>
          <Text fontWeight={'bold'}>Wallet address</Text>
          <Text>
            {state.connectedWallet && state.connectedWallet.walletAddress}
          </Text>
        </>
      )}

      {activeTab === 'Account' && (
        <>
          <Text mt="10px">Projects backed: {projectCount}</Text>
          <Text mt="10px">Amount contributed: {contributes}</Text>
        </>
      )}

      {activeTab === 'Prefund' && (
        <Flex mt="10px">
          <Text>You have earned:</Text>
          <Text ml={'5px'} color={'#4299E1'}>
            {state.referralCount * 50}WFD
          </Text>
        </Flex>
      )}

      {activeTab === 'Invite' && (
        <>
          <Text mt={'10px'}>
            Earn WFD and other bonuses for referring project backers. Your referral link is:
          </Text>
          <Link to={state.referralLink} mt="10px">
            <Text color={'#4299E1'}>{state.referralLink}</Text>
          </Link>
        </>
      )}

      <Text
        mt="50px"
        fontWeight={'bold'}
        fontSize={{ base: '15px', lg: '25px' }}
      >
        Register to become a community member
      </Text>

      <Flex mt={'20px'}>
        <Button colorScheme="blue" width={'200px'} onClick={addCommunityMember}>
          Register
        </Button>
        <Button
          variant="outline"
          width={'200px'}
          ml={3}
          onClick={removeCommunityMember}
        >
          Cancel
        </Button>
      </Flex>
      <Notification ref={notificationRef} />
    </Box>
  )
}
