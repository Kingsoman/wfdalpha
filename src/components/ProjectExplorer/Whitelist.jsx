import React, { useEffect, useState } from 'react'
import { WasmAPI, MsgExecuteContract } from '@terra-money/terra.js'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Flex,
  VStack
} from '@chakra-ui/react'

import { useStore } from '../../store'
import { FetchData, GetOneProject, EstimateSend, ShortenAddress } from '../Util';

export default function Whitelist({ projectID, fetch, isOpen, onClose }) {
  const { state, dispatch } = useStore();
  const api = new WasmAPI(state.lcd_client.apiRequester)
  const [data, setData] = useState('');

  useEffect( () => {
    const getData = async () => {
      const { projectData } = await FetchData(
        api,
        state,
        dispatch,
        true,
      )
      const data = GetOneProject(projectData, projectID);
      setData(data)
      return data;
    }
    getData()    
  }, [projectID])

  async function confirm() {
    let msg = new MsgExecuteContract(
      state.connectedWallet.walletAddress,
      state.WEFundContractAddress,
      {
        close_whitelist: {
          project_id: projectID,
        }
      }
    )
    await EstimateSend(
      state.connectedWallet,
      state.lcd_client,
      [msg],
      'Close Whitelist success',
    )
    fetch(true)
  }
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Registered Members</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={'10px'}>
              {data?.whitelist?.map((item, index) => (
                <Flex key={index} justify={'space-between'} w={'80%'}>
                  <Text>{ShortenAddress(item.wallet)}</Text>
                  <Text>{item.card_type}</Text>
                </Flex>
              ))}
            </VStack>
            <Text mt={'30px'}>
              Are you going to close the Whitelist?
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={confirm}>
              Yes
            </Button>
            <Button variant='ghost' onClick={onClose}>No</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
};
