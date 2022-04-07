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
  IconButton,
  Icon,
  Box,
  Text,
} from '@chakra-ui/react'
import { useStore } from '../store'
import { FetchData } from './Util'
import { RiMapPinUserLine } from 'react-icons/ri'
import { WasmAPI, LCDClient } from '@terra-money/terra.js'

export default function UserSideSnippet() {
  const {
    isOpen: isUserDrawerOpen,
    onOpen: onUserDrawerOpen,
    onClose: onUserDrawerClose,
  } = useDisclosure()
  const { state, dispatch } = useStore()
  const [rewards, setRewards] = useState(0)
  const [projectCount, setProjectCount] = useState(0)
  const [contributes, setContributes] = useState(0)

  //----------init api, lcd-------------------------
  const api = new WasmAPI(state.lcd_client.apiRequester)

  async function fetchContractQuery() {
    try {
      let { projectData } = await FetchData(api, state, dispatch)

      let projectCount = 0
      let totalbacked = 0

      for (let i = 0; i < projectData.length; i++) {
        let one = projectData[i]
        for (let j = 0; j < one.backer_states.length; j++) {
          if (
            one.backer_states[j].backer_wallet ==
            state.connectedWallet.walletAddress
          ) {
            projectCount++
            totalbacked += one.backer_states[i].ust_amount
          }
        }
        for (let j = 0; j < one.communitybacker_states.length; j++) {
          if (
            one.communitybacker_states[j].backer_wallet ==
            state.connectedWallet.walletAddress
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
  }, [state.connectedWallet])

  return (
    <>
      <IconButton
        size="lg"
        background="linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)"
        border="3px solid"
        borderColor="linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)"
        borderRadius="30px"
        aria-label="user"
        icon={<UserIcon />}
        fontSize="24x"
        marginLeft={'20px'}
        onClick={onUserDrawerOpen}
      />
      <Drawer
        isOpen={isUserDrawerOpen}
        placement="right"
        onClose={onUserDrawerClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your Account Details</DrawerHeader>

          <DrawerBody>
            <Box>
              <Text>
                Wallet address: {' '}
                {state.connectedWallet?.walletAddress}
              </Text>
              <Text mt="20px">Projects backed: {projectCount}</Text>
              <Text mt="20px">Amount contributed: {contributes}</Text>
            </Box>
            <Box mt="20px">
              <Text>You have earned&nbsp;</Text>
              <Text color={'blue.400'}>{state.referralCount * 50}WFD</Text>
            </Box>
            <Box mt="20px">
              <Text>
                Earn WFD and other bonuses for referring project backers. Your referral link is
              </Text>
              <Text color={'blue.400'}>{state.referralLink}</Text>
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
function UserIcon() {
  return <Icon as={RiMapPinUserLine} size={'lg'} />
}
