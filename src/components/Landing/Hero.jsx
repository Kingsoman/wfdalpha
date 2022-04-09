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
        top="3em"
        width="100%"
        height="65%"
        position="absolute"
        objectFit="contain"
        src="/media/Home/2.png"
      />
      <Image
        zIndex={'3'}
        pos={'relative'}
        src="/media/Home/logo.svg"
        mt={{ base: '20vh', md: '20vh', lg: '15vh' }}
        width={{ base: '7em', md: '20em', lg: '23em' }}
      />
      <Text
        zIndex="2"
        position="relative"
        fontFamily="PilatExtended-Bold"
        mt={{ base: '1em', md: '.2em', lg: '.2em' }}
        fontSize={{ base: '25px', md: '3em', lg: '3em' }}
        lineHeight={{ base: '30px', md: '1em', lg: '1.1em' }}
      >
        CROWDFUNDING
        <br />
        CROSS-CHAIN
        <br />
        INCUBATOR
      </Text>
      <Image
        left="0"
        width="100%"
        objectFit="contain"
        position="absolute"
        src="/media/Home/1.svg"
        bottom={{ base: '5em', md: '0', lg: '0' }}
      />
    </Flex>
  )
}
