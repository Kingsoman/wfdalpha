import React from 'react'
import {
  Flex,
  Text,
  Select,
  InputGroup,
  InputRightElement,
  Input,
  Box,
} from '@chakra-ui/react';

import {
  InputTransition,
} from '../ImageTransition'


export default function ProjectCollectedAmount({prjAmount, setPrjAmount, notificationRef}) 
{
  function onChangePrjAmount(e) {
    if (
      e.target.value != '' &&
      e.target.value != parseInt(e.target.value).toString()
    ) {
      notificationRef.current.showNotification('Please input number only', 'error', 4000)
      return
    }
    setPrjAmount(e.target.value)
  }

  return (
    <Box ml="24px" w="100%">
      <Flex justify="space-between">
        <Text mb="20px">Amount Required</Text>
      </Flex>
      <InputTransition
        unitid="projectamount"
        selected={prjAmount == '' ? false : true}
        width="100%"
        height="55px"
        rounded="md"
      >
        <InputGroup
          size="sm"
          style={{ background: 'rgba(255, 255, 255, 0.05' }}
        >
          <Input
            style={{ border: '0', background: 'transparent' }}
            type="text"
            h="55px"
            placeholder="Type here"
            focusBorderColor="purple.800"
            rounded="md"
            value={prjAmount}
            onChange={(e) => {
              onChangePrjAmount(e)
            }}
          />
          <InputRightElement
            style={{ border: '0', background: 'transparent' }}
            w="125px"
            h="55px"
            pointerEvents="none"
            align="center"
            color="blue.200"
          />
          <Select
            id="peg"
            style={{ border: '0', background: 'transparent' }}
            h="55px"
            w="140px"
            rounded="md"
            fontSize="16px"
            value=""
            onChange={(e) => {
              setPrjChain(e.target.value)
            }}
          >
            <option selected style={{ backgroundColor: '#1B0645' }}>
              ($)UST
            </option>
          </Select>
        </InputGroup>
      </InputTransition>
    </Box>
  )
}
