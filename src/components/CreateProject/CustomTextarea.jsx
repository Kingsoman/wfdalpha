import React, {useState} from 'react'
import {
  Flex,
  Text,
  Box ,
  Textarea,
} from '@chakra-ui/react'

import {
  InputTransition,
} from '../ImageTransition'

export default function CustomTextarea({typeText, type, setType}) {
  const [nameLen, setNameLen] = useState(0);
  function onChangeType(e) {
    setNameLen(e.target.value.length)
    if (e.target.value.length < 3000) setType(e.target.value)
  }

  return (
    <Box mt="40px">
      <Flex justify="space-between">
        <Text mb="20px">{typeText}</Text>
        <Text fontSize="15px" opacity="0.5">
          {nameLen}/3000 words
        </Text>
      </Flex>
      <InputTransition
        unitid="projectdescription"
        selected={type == '' ? false : true}
        width="100%"
        height="175px"
        rounded="md"
        style={{ background: 'transparent', border: '0' }}
      >
        <Textarea
          style={{ background: 'transparent', border: '0' }}
          value={type}
          onChange={(e) => {
            onChangeType(e)
          }}
          rounded="md"
          size="sm"
          h="175px"
        />
      </InputTransition>
    </Box>
  )
}
