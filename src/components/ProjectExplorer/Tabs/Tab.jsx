import React from 'react'
import { Flex, Text } from '@chakra-ui/react'

export default function Tab({ activeTab, onChangeActivetab, label, value }) {
  const label1 = label.split(' ')[0]
  const label2 = label.split(' ')[1]
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
      <Text fontSize={{ base: '12px', md: '14px', lg: '16px' }}>{label1}</Text>
      <Text
        fontSize={{ base: '12px', md: '14px', lg: '16px' }}
        ml={{ lg: '5px', md: '0px' }}
      >
        {label2}
      </Text>
    </Flex>
  )
}
