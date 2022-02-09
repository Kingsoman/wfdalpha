import React from 'react'
import {
  Box,
  Flex,
  Text,
  InputGroup,
  Input,
  TextArea
} from '@chakra-ui/react'

import {
  InputTransition,
} from '../../ImageTransition'

import{
  isNull,
} from '../../Util'

export default function MilestoneTitle({
  index, 
  milestoneTitle,
  setMilestoneTitle,
  milestoneTitleLen,
  setMilestoneTitleLen,
}) 
{
  function onChangeMilestoneTitle(e, index){
    if (e.target.value.length < 100) {
      let ar=[...milestoneTitle];
      ar[index] = e.target.value;
      setMilestoneTitle(ar);
    }

    let ar=[...milestoneTitleLen];
    ar[index] = e.target.value.length;
    setMilestoneTitleLen(ar);
  }

  return (
    <Box mt="40px">
      <Flex justify="space-between">
        <Text mb="20px">Milestone Title</Text>
        <Text fontSize="15px" opacity="0.5">
          {milestoneTitleLen[index]}/100 words
        </Text>
      </Flex>
      <InputTransition
        unitid="projectname"
        selected={isNull(milestoneTitle[index]) ? false : true}
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
            value={milestoneTitle[index]}
            placeholder="Type here"
            onChange={(e) => onChangeMilestoneTitle(e, index)}
          />
        </InputGroup>
      </InputTransition>
    </Box>
  )
};