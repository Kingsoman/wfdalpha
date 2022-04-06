import React from 'react'

import { Image, Flex, Text } from '@chakra-ui/react'

export default function Hero() {
  return (
    <Flex
      width="100%"
      id="heroComponent"
      position="relative"
      alignItems="center"
      flexDirection="column"
      justifyContent={'center'}
      height={{ base: '30em', md: '40em', lg: '90vh' }}
      bgGradient="Linear(#058cd8, #4d188f, #2a0a31)"
    >
      <Image
        top="2em"
        width="100%"
        height="65%"
        objectFit="contain"
        position="absolute"
        src="/media/Home/2.png"
      />
      <Image
        src="/media/horizontallogo.svg"
        mt={{ base: '-5em', md: '-1em', lg: '-2em' }}
        width={{ base: '7em', md: '11em', lg: '13em' }}
      />

      <Text
        zIndex="2"
        textAlign="center"
        position="relative"
        fontFamily="PilatExtended-Bold"
        mt={{ base: '1em', md: '.3em', lg: '.1em' }}
        lineHeight={{ base: '30px', md: '50px', lg: '65px' }}
        fontSize={{ base: '25px', md: '45px', lg: '60px' }}
      >
        Crowdfunding
        <br />
        Cross-Chain
        <br />
        Incubator
      </Text>
      <Image
        left="0"
        width="100%"
        objectFit="contain"
        position="absolute"
        src="/media/Home/1.png"
        bottom={{ base: '5em', md: '0', lg: '0' }}
      />
    </Flex>
  )
}
