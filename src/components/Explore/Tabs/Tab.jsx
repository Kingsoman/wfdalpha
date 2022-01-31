import React from 'react'
import { Box, Text } from '@chakra-ui/react'

export default function Tab({ activeTab, onChangeActivetab, lable, value }) {
  return (
    <Box
      bg={activeTab == value ? '#13002B' : 'rgba(255, 255, 255, 0.05)'}
      border={'1px solid rgba(255, 255, 255, 0.05)'}
      onClick={() => onChangeActivetab(value)}
      width={{ lg: '20%' }}
      textAlign={'center'}
      py={'30px'}
    >
      <Text>{lable}</Text>
    </Box>
  )
}
