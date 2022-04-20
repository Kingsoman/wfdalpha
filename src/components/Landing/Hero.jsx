import React from 'react'
import { Image, Flex, Text, Stack, Container } from '@chakra-ui/react'

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
        width='100%'
        position="absolute"
        objectFit="contain"
        src="/media/Home/2.png"
      />
      <Container position={'relative'} mt={{base: '15vh', lg: '20vh'}} zIndex={'3'} maxW='container.lg'>
      <Stack>
        <Text
          fontFamily="PilatExtended-Bold"
          fontSize={{ base: '40px', md: '64px'}}
          lineHeight={{ base: '30px', md: '1em', lg: '1.1em' }}
          letterSpacing={{base: '0.1em'}}
          textTransform={'uppercase'}
          textShadow="lg">
          Community
        </Text>
        <Text
          fontFamily="PilatExtended-Black"
          fontSize={{ base: '40px', md: '64px'}}
          lineHeight={{ base: '30px', md: '1em', lg: '1.1em' }}
          letterSpacing={{base: '0.1em'}}
          textTransform={'uppercase'}
          textShadow="lg"
          color={'brand'}>
          Crowdfunding
        </Text>
        <Text
          fontFamily="PilatExtended-Black"
          fontSize={{ base: '40px', md: '64px'}}
          lineHeight={{ base: '30px', md: '1em', lg: '1.1em' }}
          letterSpacing={{base: '0.1em'}}
          textShadow="lg"
          textTransform={'uppercase'}>
          Incubator
        </Text>
      </Stack>
      </Container>
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
