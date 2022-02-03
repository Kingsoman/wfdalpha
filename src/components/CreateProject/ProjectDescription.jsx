import React from 'react'
import {
  Flex,
  Text,
  Box ,
  Textarea,
} from '@chakra-ui/react'

import {
  InputTransition,
} from '../ImageTransition'

export default function ProjectDescription({prjDescription, setPrjDescription, prjDescriptionLen, setPrjDescriptionLen}) {
  function onChangePrjDescription(e) {
    setPrjDescriptionLen(e.target.value.length)
    if (e.target.value.length < 3000) setPrjDescription(e.target.value)
  }

  return (
    <Box mt="40px">
      <Flex justify="space-between">
        <Text mb="20px">Project Description</Text>
        <Text fontSize="15px" opacity="0.5">
          {prjDescriptionLen}/3000 words
        </Text>
      </Flex>
      <InputTransition
        unitid="projectdescription"
        selected={prjDescription == '' ? false : true}
        width="100%"
        height="175px"
        rounded="md"
        style={{ background: 'transparent', border: '0' }}
      >
        <Textarea
          style={{ background: 'transparent', border: '0' }}
          value={prjDescription}
          onChange={(e) => {
            onChangePrjDescription(e)
          }}
          rounded="md"
          placeholder="Type here"
          size="sm"
          h="175px"
        />
      </InputTransition>
    </Box>
  )
}
