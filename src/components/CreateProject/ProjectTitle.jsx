import React from 'react'
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

export default function ProjectTitle({prjName, setPrjName, prjNameLen, setPrjNameLen}) {
  function onChangePrjName(e) {
    setPrjNameLen(e.target.value.length)
    if (e.target.value.length < 100) {
      setPrjName(e.target.value)
    }
  }

  return (
    <Box mt="40px">
      <Flex justify="space-between">
        <Text mb="20px">Project Name</Text>
        <Text fontSize="15px" opacity="0.5">
          {prjNameLen}/100 words
        </Text>
      </Flex>
      <InputTransition
        unitid="projectname"
        selected={prjName == '' ? false : true}
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
            value={prjName}
            placeholder="Type here"
            onChange={(e) => onChangePrjName(e)}
          />
        </InputGroup>
      </InputTransition>
    </Box>
  )
}
