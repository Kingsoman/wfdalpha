import React from 'react'
import {
  Box,
  Flex,
  Text,
  InputGroup,
  Input,
} from '@chakra-ui/react'

import {
  InputTransition,
} from '../../ImageTransition'

import{
  isNull,
} from '../../Util'

export default function TeamMemberInput({
  index, 
  typeText,
  type,
  setType,
  style
}) 
{
  function onChangeType(e, index){
    if (e.target.value.length < 100) {
      let ar=[...type];
      ar[index] = e.target.value;
      setType(ar);
    }
  }

  return (
    <Box mt="40px" style={style}>
      <Flex justify="space-between">
        <Text mb="20px">{typeText}</Text>
        <Text fontSize="15px" opacity="0.5">
          {type[index]?.length}/100 words
        </Text>
      </Flex>
      <InputTransition
        unitid={`${typeText}${index}`}
        selected={isNull(type[index]) ? false : true}
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
            value={type[index]}
            onChange={(e) => onChangeType(e, index)}
          />
        </InputGroup>
      </InputTransition>
    </Box>
  )
};