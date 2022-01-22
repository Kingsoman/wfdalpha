import React, { useState, useEffect, useMemo } from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    Box,
    Text
  } from '@chakra-ui/react'
import { 
    WasmAPI, 
    LCDClient, 
    MsgExecuteContract 
  } from '@terra-money/terra.js'

import { useStore } from '../store'
import { FetchData } from './Util'

let useConnectedWallet = {}
if (typeof document !== 'undefined') {
  useConnectedWallet =
    require('@terra-money/wallet-provider').useConnectedWallet
}

export default function UserSideSnippet() {
  const { isOpen:isUserDrawerOpen, onOpen:onUserDrawerOpen, onClose:onUserDrawerClose } = useDisclosure()
  const { state, dispatch } = useStore()
  const [ rewards, setRewards ] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [ contributes, setContributes ] = useState(0);

  //-----------connect to wallet ---------------------
  let connectedWallet = ''
  if (typeof document !== 'undefined') {
    connectedWallet = useConnectedWallet()
  }
    
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

  async function fetchContractQuery() {
    try {
      let {projectData, communityData, configData} = await FetchData(api, null, state, dispatch);
console.log(projectData)
      let projectCount = 0;
      let totalbacked = 0;

      for(let i=0; i<projectData.length; i++){
        let one = projectData[i];
        for(let j=0; j<one.backer_states.length; j++){
          if(one.backer_states[j].backer_wallet == state.connectedWallet.walletAddress){
            projectCount++;
            totalbacked += one.backer_states[i].ust_amount;
          }
        }
        for(let j=0; j<one.communitybacker_states.length; j++){
          if(one.communitybacker_states[j].backer_wallet == state.connectedWallet.walletAddress){
            projectCount++;
            totalbacked += one.backer_states[i].ust_amount;
          }
        }
      }
      setProjectCount(projectCount);
      setContributes(totalbacked/10**6);
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    fetchContractQuery();
  }, [connectedWallet])

  return (
    <>
      <Button colorScheme='purple' onClick={onUserDrawerOpen}>
        Open
      </Button>
      <Drawer
        isOpen={isUserDrawerOpen}
        placement='right'
        onClose={onUserDrawerClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your Account Details</DrawerHeader>

          <DrawerBody>
            <Box>
                <Text>
                    Wallet address : {state.connectedWallet && state.connectedWallet.walletAddress}
                </Text>
                <Text mt='20px'>
                    Project Backed : {projectCount}
                </Text>
                <Text mt='20px'>
                    Amount Contributed : {contributes}
                </Text>
            </Box>
            <Box mt='20px'>
              <Text>You have earned&nbsp;</Text>
              <Text color={'blue.400'}>{state.referralCount * 50}WFD</Text>
            </Box>
            <Box mt='20px'>
              <Text>Earn WFD and other Bonuses for Referring a Backer. Your Link is</Text>
              <Text color={'blue.400'}>{state.referralLink}</Text>
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} >
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}