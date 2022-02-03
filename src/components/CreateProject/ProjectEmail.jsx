import React from 'react'
import {
  Flex,
  Text,
  InputGroup,
  InputLeftElement,
  Input,
  Box
} from '@chakra-ui/react'

import {
  InputTransition,
} from '../ImageTransition'

export default function ProjectEmail({prjEmail, setPrjEmail}) {

  return (
    <Box w="100%">
      <Flex justify="space-between">
        <Text mb="20px">Email</Text>
      </Flex>
      <InputTransition
        unitid="projectemail"
        selected={prjEmail == '' ? false : true}
        width="100%"
        height="55px"
        rounded="md"
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
            placeholder="example@email.com"
            focusBorderColor="purple.800"
            rounded="md"
            value={prjEmail}
            onChange={(e) => {
              setPrjEmail(e.target.value)
            }}
          />
        </InputGroup>
      </InputTransition>
    </Box>
  )
};