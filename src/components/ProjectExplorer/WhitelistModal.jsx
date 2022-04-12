import React from 'react'
import { Flex, Box, Icon } from '@chakra-ui/react'
import { BsArrowUpRight } from 'react-icons/bs'
import { Link, useNavigate } from '@reach/router'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

import { 
  ButtonBackTransition, 
  ButtonOrangeBackTransition 
} from '../../components/ImageTransition'


export default function WhitelistModal({ project_id, isOpen, onClose }) 
{
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Lorem count={2} />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant='ghost'>Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
};
