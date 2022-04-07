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


export default function CustomSimpleNumberInput({typeText, type, setType, w}) 
{
  function onChangeAmount(e) {
    // if (
    //   e.target.value != '' &&
    //   e.target.value != parseInt(e.target.value).toString()
    // ) {
    //   notificationRef?.current.showNotification('Please input number only', 'error', 4000)
    //   return
    // }
    setType(e.target.value)
  }

  return (
    <Box w={w}>
      <Flex justify="space-between">
        <Text mb="20px">{typeText}</Text>
      </Flex>
      <InputTransition
        unitid={"projectamount" + typeText}
        selected={type == '' ? false : true}
        width="100%"
        height="55px"
        rounded="md"
      >
        <Input
          style={{ border: '0', background: 'transparent' }}
          type="text"
          h="55px"
          placeholder='Numbers only'
          focusBorderColor="purple.800"
          rounded="md"
          value={type}
          size="sm"
          onChange={(e) => {
            onChangeAmount(e)
          }}
        />
      </InputTransition>
    </Box>
  )
}

