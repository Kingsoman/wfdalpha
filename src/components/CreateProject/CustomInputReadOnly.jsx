import React, {useState} from 'react'
import {
  Flex,
  Text,
  InputGroup,
  Input,
  Box,
} from '@chakra-ui/react'

import {
  InputTransition,
} from '../ImageTransition'

export default function CustomInputReadOnly({typeText, type, w, mt}) {

  return (
    <Box w={w} mt={mt}>
      <Flex justify="space-between">
        <Text mb="20px">{typeText}</Text>
        <Text fontSize="15px" opacity="0.5">
          {type?.length}/100 words
        </Text>
      </Flex>
      <InputTransition
        unitid={"inputtransition" + typeText}
        selected={type == '' ? false : true}
        width="100%"
        height="55px"
        rounded="md"
      >
        <InputGroup
          style={{ background: 'rgba(255, 255, 255, 0.05)' }}
          size="sm"
          border="0px"
        >
          <Input
            style={{ border: '0', background: 'transparent' }}
            type="text"
            h="55px"
            rounded="md"
            value={type}
            readOnly
          />
        </InputGroup>
      </InputTransition>
    </Box>
  )
}
