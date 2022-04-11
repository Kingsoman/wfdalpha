import React from 'react'
import { Image, Flex, Text } from '@chakra-ui/react'

export default function Hero() {
  return (
    <Flex
      width="100%"
      id="heroComponent"
      textAlign="center"
      position="relative"
      alignItems="center"
      flexDirection="column"
      bgGradient="Linear(#058cd8, #4d188f, #2a0a31)"
      height={{ base: '30em', md: '90vh', lg: '90vh' }}
    >
      <Image
        top="1em"
        width="100%"
        height="70%"
        position="absolute"
        objectFit="contain"
        src="/media/Home/2.png"
      />
      <Image
        zIndex={'3'}
        pos={'relative'}
        src="/media/Home/logo.svg"
        mt={{ base: '20vh', md: '20vh', lg: '25vh' }}
        width={{ base: '12em', md: '23em', lg: '25em' }}
      />
      <Text
        zIndex="2"
        position="relative"
        paddingLeft={'25px'}
        paddingRight={'25px'}
        fontFamily="PilatExtended-Bold"
        mt={{ base: '0', md: '.3em', lg: '.1em' }}
        fontSize={{ base: '25px', md: '32px', lg: '40px' }}
        lineHeight={{ base: '30px', md: '1em', lg: '1.1em' }}
      >
        CROWDFUNDING
        <br />
        INCUBATOR
        <br />
        LAUNCHPAD
      </Text>
      <Image
        bottom={'0'}
        width="100%"
        position="absolute"
        objectFit="contain"
        src="/media/Home/1.svg"
      />
    </Flex>
  )
}
