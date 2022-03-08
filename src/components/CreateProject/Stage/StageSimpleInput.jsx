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
} from '../../ImageTransition'
import {
  isNull
} from '../../Util';

export default function StageSimpleInput({index, typeText, type, setType, notificationRef, w}) 
{
  function onChangeAmount(e) {
    if (e.target.value.length < 5000) {
      let ar=[...type];
      ar[index] = e.target.value;
      setType(ar); 

    }
  }

  return (
    <Box w={w}>
      <Flex justify="space-between">
        <Text mb="20px">{typeText}</Text>
      </Flex>
      <InputTransition
        unitid={"projectamount" + typeText}
        selected={isNull(type[index]) ? false : true}
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
          value={type[index]}
          size="sm"
          onChange={(e) => {
            onChangeAmount(e)
          }}
        />
      </InputTransition>
    </Box>
  )
}

