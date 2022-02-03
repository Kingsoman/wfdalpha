import React from 'react'
import {
  Flex,
  Text,
  Select,
  InputLeftElement,
  Input,
  Box,
} from '@chakra-ui/react';

import {
  InputTransition,
} from '../ImageTransition'


export default function ProjectCategory({prjCategory, setPrjCategory}) 
{
  return (
    <Box mt="40px" w="30%">
      <Flex justify="space-between">
        <Text mb="20px">Project Category</Text>
      </Flex>

      <InputTransition
        unitid="projectcategory"
        selected={prjCategory == '' ? false : true}
        width="100%"
        height="55px"
        rounded="md"
      >
        <Select
          id="sub_category"
          style={{ background: 'transparent', border: '0' }}
          h="55px"
          name="sub_category"
          autoComplete="sub_category"
          focusBorderColor="purple.800"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
          onChange={(e) => {
            setPrjCategory(e.target.value)
          }}
        >
          <option selected style={{ backgroundColor: '#1B0645' }}>
            Crypto
          </option>
          <option style={{ backgroundColor: '#1B0645' }}>
            Sport Industry
          </option>
          <option style={{ backgroundColor: '#1B0645' }}>
            Pro Enviroment Projects
          </option>
          <option style={{ backgroundColor: '#1B0645' }}>
            Game Industry
          </option>
          <option style={{ backgroundColor: '#1B0645' }}>
            Charity Projects
          </option>
          <option style={{ backgroundColor: '#1B0645' }}>
            Real Estate Industry
          </option>
          <option style={{ backgroundColor: '#1B0645' }}>
            Creative Industry
          </option>
          <option style={{ backgroundColor: '#1B0645' }}>
            Others
          </option>
        </Select>
      </InputTransition>
    </Box>
  )
}
