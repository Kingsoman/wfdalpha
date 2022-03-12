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
import { IoBan } from 'react-icons/io5';
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
      <VStack spacing='30px' fontFamily="PilatExtended-Bold">
        <Stack border={"1px dashed gray"} spacing="40px" rounded='15px' p='40px'
          direction={{ base: 'column', md: 'column', lg: 'row' }}
        >
          <VStack spacing="10px" justify='center'>
            <Image src="/media/Card/Platinum Card.png" h='200px' />
            <Text fontSize="30px">
              Platinum Card
            </Text>
            <Text fontSize='12px'>
              Validated staked amount
            </Text>
            <Text fontSize='24px'>
              1000,100.0 WFD
            </Text>
          </VStack>
          <Flex
            borderLeft="1px solid gray" w='1px' h='300px'
            display={{ base: 'none', md: 'none', lg: 'block' }}
          ></Flex>
          <VStack spacing='20px' justify='center'>
            <Text fontSize='sm'>
              TOTAL STAKED AMOUNT BY THE USER
            </Text>
            <Text fontSize='5x1'>
              100,000.0 WFD
            </Text>
            <HStack spacing='5px'>
              <IoBan />
              <Text fontSize='8px' textAlign='left'>
                No staking History
              </Text>
            </HStack>
            <Button w='200px' h='50px' fontSize='md' color='#5f6062'>
              Get Rewards
            </Button>
          </VStack>
        </Stack>
        <Box w={{ base: '100%', md: '70', lg: '50%' }} pb='10px'>
          <Flex 
            rounded="15px 15px 0 0" 
            background='rgba(255, 255, 255, 0.09)' 
            w='100%' 
            h='60px' 
            align='center' 
          >
            <Text fontSize='14px' textAlign='left' pl='20px'>
              Stake Now
            </Text>
          </Flex>
          <VStack 
            spacing='20px' 
            background='rgba(255, 255, 255, 0.05)' 
            rounded='0 0 15px 15px' 
            pb='20px'
          >
            <Stack 
              spacing='10px' 
              mt='10px'
              direction={{ base: 'column', md: 'column', lg: 'row' }}
            >
              <HStack spacing='10px'>
                <Image src="/media/Card/Platinum Card.png" h='100px' _hover={{border:'1px solid red'}}/>
                <Image src="/media/Card/Golden Card.png" h='100px'  _hover={{border:'1px solid red'}}/>
              </HStack>
              <HStack spacing='10px'>
                <Image src="/media/Card/Silver Card.png" h='100px'  _hover={{border:'1px solid red'}}/>
                <Image src="/media/Card/Bronze Card.png" h='100px'  _hover={{border:'1px solid red'}}/>
              </HStack>
            </Stack>
            <Text fontSize='16px' py='20px'>
              HOW MUCH DO YOU WANT TO STAKE?
            </Text>
            <VStack
              background='rgba(255, 255, 255, 0.03)'
              mx='10px'
              spacing='20px'
              rounded='10px'
              w='70%'
              py='10px'
              px='10px'
            >
              <Flex direction='row' justify='space-between' w='100%'>
                <Text fontSize='8px'>
                  Stake
                </Text>
                <Text fontSize='8px'>
                  BALANCE:0
                </Text>
              </Flex>
              <HStack justify='space-between' align='flex-end' w='100%'>
                <Input fontSize='12px' />
                <HStack>
                  <Text fontSize='8px' color='gray.300'>
                    MAX
                  </Text>
                  <Text fontSize='12px'>
                    WFD
                  </Text>
                </HStack>
              </HStack>
            </VStack>
            <Checkbox>
              <Text fontSize='12px'>
                I agree to WeFund Staking Terms
              </Text>
            </Checkbox>
            <Button color='#5f6062'>
              Approve
            </Button>
          </VStack>
        </Box>
      </VStack>

      <Footer />
      <Notification ref={notificationRef} />
    </PageLayout>
  )
}
