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
import CardBox from '../components/Staking/CardBox'
import PageLayout from '../components/PageLayout'
import Footer from '../components/Footer'
import Notification from '../components/Notification'
import { EstimateSend, FetchData, Set2Mainnet, Set2Testnet } from '../components/Util'

export default function Staking() {
  const { state, dispatch } = useStore();
  const [userInfo, setUserInfo] = useState({ amount: "0", card_type: "Other", card_number: "0" });
  const [balance, setBalance] = useState("");
  const [amount, setAmount] = useState("");
  const [pendingRewards, setPendingRewards] = useState("");
  const [decimals, setDecimals] = useState(1);

  const notificationRef = useRef();
  const api = new WasmAPI(state.lcd_client.apiRequester)

  //-----------fetch project data=-------------------------
  async function fetchContractQuery() {
    try {
      let tokenInfo = await api.contractQuery(
        state.WFDTokenAddress,
        {
          token_info: {}
        }
      )
      setDecimals(parseInt(tokenInfo.decimals));

      let res = await api.contractQuery(
        state.WFDTokenAddress,
        {
          balance: { address: state.connectedWallet.walletAddress }
        }
      )
      setBalance(parseInt(res.balance) / (10 ** parseInt(tokenInfo.decimals)));

      let userInfo = await api.contractQuery(
        state.StakingContractAddress,
        {
          get_user_info: { wallet: state.connectedWallet.walletAddress }
        }
      )
      userInfo.amount = parseInt(userInfo.amount) / (10 ** parseInt(tokenInfo.decimals));
      setUserInfo(userInfo);

      let pendingRewards = await api.contractQuery(
        state.StakingContractAddress,
        {
          get_pending_rewards: { wallet: state.connectedWallet.walletAddress }
        }
      )
      setPendingRewards(pendingRewards);

      console.log(userInfo)
    }
    catch (e) {
      console.log(e)
    }
  }

  //---------initialize fetching---------------------
  useEffect(() => {
    fetchContractQuery();
  }, [state.connectedWallet])

  function selectCard(cardType) {
    switch (cardType.toLowerCase()) {
      case "platium": setAmount(100000); break;
      case "gold": setAmount(40000); break;
      case "silver": setAmount(10000); break;
      case "bronze": setAmount(1000); break;
    }
  }
  async function staking() {
    let realAmount = parseInt(amount) * (10 ** parseInt(decimals));
    let deposit = {
      deposit: {
        wallet: state.connectedWallet.walletAddress,
        amount: `${realAmount}`
      }
    }
    let msg_deposit = new MsgExecuteContract(
      state.connectedWallet.walletAddress,
      state.StakingContractAddress,
      deposit
    )

    let transfer = {
      transfer: {
        recipient: state.StakingContractAddress,
        amount: `${realAmount}`
      }
    }
    let msg_transfer = new MsgExecuteContract(
      state.connectedWallet.walletAddress,
      state.WFDTokenAddress,
      transfer
    )

    await EstimateSend(
      state.connectedWallet,
      state.lcd_client,
      [msg_transfer, msg_deposit],
      'Staking Success',
      notificationRef,
    );
  }
  async function getRewards() {
    let claim = {
      claim_rewards: {
        wallet: state.connectedWallet.walletAddress,
      }
    }
    let msg_claim = new MsgExecuteContract(
      state.connectedWallet.walletAddress,
      state.StakingContractAddress,
      claim
    )

    await EstimateSend(
      state.connectedWallet,
      state.lcd_client,
      [msg_claim],
      'Claim rewards success',
      notificationRef,
    );
  }
  return (
    <PageLayout title="Staking" subTitle1="WFD" subTitle2="Staking">
      <VStack spacing='30px' fontFamily="PilatExtended-Bold">
        <Stack border={"1px dashed gray"} spacing="40px" rounded='15px' p='40px'
          direction={{ base: 'column', md: 'column', lg: 'row' }}
        >
          <CardBox data={userInfo} />
          <Flex
            borderLeft="1px solid gray" w='1px' h='300px'
            display={{ base: 'none', md: 'none', lg: 'block' }}
          ></Flex>
          <VStack spacing='20px' justify='center'>
            <Text fontSize='sm'>
              TOTAL STAKED AMOUNT BY THE USER
            </Text>
            <Text fontSize='5x1'>
              {userInfo?.amount} WFD
            </Text>
            <HStack spacing='5px'>
              <IoBan />
              <Text fontSize='8px' textAlign='left'>
                PendingRewards: {pendingRewards}&nbsp;WFD
              </Text>
            </HStack>
            <Button w='200px' h='50px' fontSize='md' color='#5f6062' onClick={getRewards}>
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
                <Image
                  src="/media/Card/Platinum.png" h='100px'
                  _hover={{ border: '1px solid red' }}
                  onClick={() => { selectCard("platium") }}
                />
                <Image
                  src="/media/Card/Gold.png" h='100px'
                  _hover={{ border: '1px solid red' }}
                  onClick={() => { selectCard("Gold") }}
                />
              </HStack>
              <HStack spacing='10px'>
                <Image
                  src="/media/Card/Silver.png" h='100px'
                  _hover={{ border: '1px solid red' }}
                  onClick={() => { selectCard("Silver") }}
                />
                <Image
                  src="/media/Card/Bronze.png" h='100px'
                  _hover={{ border: '1px solid red' }}
                  onClick={() => { selectCard("bronze") }}
                />
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
                  BALANCE: {balance}
                </Text>
              </Flex>
              <HStack justify='space-between' align='flex-end' w='100%'>
                <Input fontSize='12px' value={amount} onChange={(e) => { setAmount(e.target.value) }} />
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
            <Button color='#5f6062' onClick={staking}>
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
