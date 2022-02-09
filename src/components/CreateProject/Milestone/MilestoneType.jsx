import React from 'react'
import {
  Box,
  Flex,
  Text,
  InputGroup,
  InputLeftElement,
  Input
} from '@chakra-ui/react'

import {
  InputTransition,
} from '../../ImageTransition'

import{
  isNull,
} from '../../Util'

export default function MilestoneType({
  index, 
  milestoneType,
  setMilestoneType,
}) 
{
  function onChangeMilestoneType(e, index){
    let ar=[...milestoneType];
    ar[index] = e.target.value;
    setMilestoneType(ar);
  }

  return (
    <Box w="100%">
      <Flex justify="space-between">
        <Text mb="20px">Milestone Type</Text>
      </Flex>
      <InputTransition
        unitid={`milestonetype${index}`}
        width="100%"
        height="55px"
        rounded="md"
        selected={isNull(milestoneType[index]) ? false : true}
      >
        <InputGroup
          size="sm"
          style={{ background: 'rgba(255, 255, 255, 0.05)' }}
        >
          <InputLeftElement
            style={{ background: 'transparent', border: '0' }}
            pointerEvents="none"
            color="gray.300"
            fontSize="1.2em"
            children=" "
          />
          <Input
            style={{ background: 'transparent', border: '0' }}
            type="email"
            h="55px"
            placeholder="Type here"
            focusBorderColor="purple.800"
            rounded="md"
            value={milestoneType[index]}
            onChange={(e) => onChangeMilestoneType(e, index)}
          />
        </InputGroup>
      </InputTransition>
    </Box>
  )
};