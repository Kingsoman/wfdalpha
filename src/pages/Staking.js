import React, { useEffect, useState, useRef } from 'react'
import { Link, navigate } from '@reach/router'
import { WasmAPI, LCDClient, MsgExecuteContract } from '@terra-money/terra.js'
import {
  Box,
  Flex,
  Text,
  Input,
  HStack,
  VStack,
  Stack,
  Button,
  Image,
  Checkbox
} from '@chakra-ui/react'
import{ IoBan} from 'react-icons/io5';
import { useStore } from '../store'
import { InputTransition, ButtonTransition, } from '../components/ImageTransition'

import PageLayout from '../components/PageLayout'
import Footer from '../components/Footer'
import Notification from '../components/Notification'
import { EstimateSend, FetchData, Set2Mainnet, Set2Testnet } from '../components/Util'

export default function Dashboard() {
  const { state, dispatch } = useStore()
  const [wallet, setWallet] = useState('');

  const notificationRef = useRef();
  const api = new WasmAPI(state.lcd_client.apiRequester)

  //-----------fetch project data=-------------------------
  async function fetchContractQuery() {
    try {
      let { projectData, communityData, configData } = await FetchData(api, notificationRef, state, dispatch);
    }
    catch (e) {

    }

  }


  //---------initialize fetching---------------------
  useEffect(() => {
    fetchContractQuery();
  }, [state.connectedWallet])


  return (
    <PageLayout title="Staking" subTitle1="WFD" subTitle2="Staking">
      <VStack spacing='30px'>
        <HStack border={"1px dashed gray"} spacing="40px" rounded='15px' p='40px'>
          <VStack spacing="10px" justify='center'>
            <Image src="/media/Card/Platinum Card.png" h='200px' />
            <Text fontSize="30px">Gold Card</Text>
            <Text fontSize='12px'>Validated staked amount</Text>
            <Text fontSize='24px'>0.0 WFD</Text>
          </VStack>
          <Flex borderLeft="1px solid gray" w='1px' h='300px'></Flex>
          <VStack spacing='20px'>
            <Text fontSize='sm'>TOTAL STAKED AMOUNT BY THE USER</Text>
            <Text fontSize='5x1'>0.0 WFD</Text>
            <HStack spacing='5px'>
              <IoBan/>
              <Text fontsize='8px' textAlign='left'>
                No staking History
              </Text>
            </HStack>
            <Button w='300px' h='65px' fontSize='md' color='#5f6062'>Get Rewards</Button>
          </VStack>
        </HStack>
        <Box>
          <Flex rounded="15px 15px 0 0" background='gray.300' w='100%' h='72px' >
            <Text>Stack Now</Text>
          </Flex>
          <VStack spacing='20px' background = 'gray.700' rounded='0 0 15px 15px'>
            <Text>HOW MUCH DO YOU WANT TO STACK?</Text>
            <VStack background='gray.500' mx='10px' spacing='20px'>
              <HStack justify='space-between'>
                <Text>Stake</Text>
                <Text>BALANCE:0</Text>
              </HStack>
              <HStack justify='space-between'>
                <Input />
                <Text>MAX</Text>
                <Text>WFD</Text>
              </HStack>
            </VStack>
            <Checkbox>I agree to WeFund Staking Terms</Checkbox>
            <Button>Approve</Button>
          </VStack>
        </Box>
      </VStack>

      <Footer />
      <Notification ref={notificationRef} />
    </PageLayout>
  )
}
