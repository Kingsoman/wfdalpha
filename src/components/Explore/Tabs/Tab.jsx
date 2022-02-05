import React from 'react'
import { Flex, Text } from '@chakra-ui/react'

export default function Tab({ activeTab, onChangeActivetab, lable, value }) {
  const lable1 = lable.split(' ')[0]
  const lable2 = lable.split(' ')[1]
  return (
    <Flex
      bg={activeTab == value ? '#13002B' : 'rgba(255, 255, 255, 0.05)'}
      py={{ lg: '25px', md: '16px', base: '10px' }}
      flexDirection={{ base: 'column', lg: 'row' }}
      border="1px solid rgba(255, 255, 255, 0.05)"
      onClick={() => onChangeActivetab(value)}
      alignItems={'center'}
      textAlign="center"
      justify="center"
      width="20%"
      px="5px"
    >
      <Text fontSize={{ base: '12px', md: '14px', lg: '16px' }}>{lable1}</Text>
      <Text
        fontSize={{ base: '12px', md: '14px', lg: '16px' }}
        ml={{ lg: '5px', md: '0px' }}
      >
        {lable2}
      </Text>
    </Flex>
  )
}
