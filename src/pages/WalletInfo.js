import React, { useState, useEffect, useRef } from 'react'
import { MsgExecuteContract, WasmAPI } from '@terra-money/terra.js'
import { Link } from '@reach/router'
import { Box, Flex, Text, Button, HStack } from '@chakra-ui/react'
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
  const [tokens, setTokens] = useState([])

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
      let tokens = [];
console.log(state.connectedWallet);
console.log(connectedWallet);
      for (let i = 0; i < projectData.length; i++) {
        let one = projectData[i]
        for (let j = 0; j < one.backer_states.length; j++) {
          if (
            one.backer_states[j].backer_wallet == connectedWallet.walletAddress
          ) {
            projectCount++;
            totalbacked += one.backer_states[j].ust_amount.amount;
          }
        }
        for (let j = 0; j < one.communitybacker_states.length; j++) {
          if (
            one.communitybacker_states[j].backer_wallet ==
            connectedWallet.walletAddress
          ) {
            projectCount++;
            totalbacked += one.communitybacker_states[j].ust_amount.amount;
          }
        }

        if(one.project_id != state.wefundID && one.token_addr != ''){
          let userInfo = await api.contractQuery(
            state.VestingContractAddress,
            {
              get_user_info: {
                project_id: one.project_id,
                wallet: connectedWallet.walletAddress
              }
            }
          )
console.log(userInfo)
          let pending = await api.contractQuery(
            state.VestingContractAddress,
            {
              get_pending_tokens: {
                project_id: one.project_id,
                wallet: connectedWallet.walletAddress
              }
            }
          )
          
          let tokenInfo = await api.contractQuery(
            one.token_addr,
            {
              token_info: {}
            }
          )

          tokens.push({
            project_id: one.project_id,
            symbol: tokenInfo.symbol,
            amount: userInfo.total_amount - userInfo.released_amount,
            pendingAmount: pending,
          })
        }
      }
      setProjectCount(projectCount);
      setContributes(totalbacked / 10 ** 6);
      setTokens(tokens);
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    fetchContractQuery()
  }, [connectedWallet])

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
      [msg],
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
      [msg],
      'Remove community success',
      notificationRef,
    )
  }

  function claim(project_id){
    let claimMsg = {
      claim_pending_tokens: {
        project_id: project_id
      }
    }

    let vestingContract = state.VestingContractAddress
    let msg = new MsgExecuteContract(
      connectedWallet.walletAddress,
      vestingContract,
      claimMsg,
    )
    EstimateSend(
      connectedWallet,
      state.lcd_client,
      [msg],
      'Claim pending tokens',
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
            {state.connectedWallet?.walletAddress}
          </Text>
        </>
      )}

      {activeTab === 'Account' && (
        <>
          <Text mt="10px">Projects backed: {projectCount}</Text>
          <Text mt="10px">Amount contributed: {contributes}</Text>
          {tokens.map((item, index)=>{
            return(
              <HStack spacing='10px' mt='10px'>
                <Text mt='10px'>{item.pendingAmount} of {item.amount}&nbsp;{item.symbol} tokens </Text>
                <Button color="red" onClick={() => claim(item.project_id)}>Claim</Button>
              </HStack>
            )
          })}
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
