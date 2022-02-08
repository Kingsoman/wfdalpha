import React from 'react'
import { Flex, Text } from '@chakra-ui/react'

export default function CoverHeader({
  title,
  text1,
  text2,
  text1Color,
  text2Color,
}) {
  return (
    <Flex
      mb={'30px'}
      width={'100%'}
      justify={'center'}
      alignItems={'center'}
      flexDirection={'column'}
      backgroundSize={'cover'}
      backgroundRepeat={'no-repeat'}
      boxShadow={'0px 5px 15px #000000A6'}
      height={{ base: '150px', lg: '250px' }}
      backgroundImage={"url('/media/createproject_banner.svg')"}
    >
      <Flex
        color="rgba(255, 255, 255, 0.54)"
        fontSize={{ base: '12px', lg: '16px' }}
      >
        Home &gt;&nbsp;
        <Text color={'rgba(255, 255, 255, 0.84)'}>{title}</Text>
      </Flex>
      <Flex
        mt="10px"
        fontWeight={'900'}
        fontFamily={'PilatExtended-Bold'}
        fontSize={{ base: '20px', md: '25px', lg: '40px' }}
      >
        <Text color={text1Color ? '#4790f5' : 'white'}>{text1}</Text>
        <Text color={text2Color ? '#4790f5' : 'white'} ml={'5px'}>
          {text2}
        </Text>
      </Flex>
    </Flex>
  )
}
