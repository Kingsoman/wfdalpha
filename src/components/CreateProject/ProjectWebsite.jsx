import React from 'react'
import {
  Flex,
  Text,
  InputGroup,
  InputLeftAddon,
  Input,
  Box,
} from '@chakra-ui/react'

import {
  InputTransition,
} from '../ImageTransition'

export default function ProjectWebsite({prjWebsite, setPrjWebsite}) {

  return (
    <Box w="100%" mt="50px">
      <Flex justify="space-between">
        <Text mb="20px">Project Website</Text>
      </Flex>
      <InputTransition
        unitid="projectwebsite"
        selected={prjWebsite == '' ? false : true}
        width="100%"
        height="55px"
        rounded="md"
      >
        <InputGroup
          size="sm"
          style={{ background: 'rgba(255, 255, 255, 0.05)' }}
        >
          <InputLeftAddon
            h="55px"
            style={{ background: 'transparent', border: '0' }}
            children="http://"
            color="white"
            rounded="md"
          />
          <Input
            type="text"
            h="55px"
            style={{ background: 'transparent', border: '0' }}
            placeholder="Type here"
            rounded="md"
            value={prjWebsite}
            onChange={(e) => {
              setPrjWebsite(e.target.value)
            }}
          />
        </InputGroup>
      </InputTransition>
    </Box>
  )
}
