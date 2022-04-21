import React, { useState } from 'react'

import { Flex, Text, Image, Select, Link, Stack, useBreakpointValue, chakra, Box } from '@chakra-ui/react'

const AboutMobile = function() {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      my={{ base: '5em', md: '7em', lg: '10em' }}
      width={{ base: '98%', md: '80%', lg: '80em', xl: '100em' }}
      flexDirection={{ base: 'column', md: 'row', lg: 'row' }}
      paddingLeft={{ base: '0', md: '10px', lg: '50px', xl: '20px' }}
      paddingRight={{ base: '0', md: '10px', lg: '50px', xl: '20px' }}
    >
      <Image
        zIndex="3"
        objectFit="contain"
        position="relative"
        src="/media/Home/3.svg"
        mr={{ base: '0', md: '-10em', lg: '-10em' }}
        mb={{ base: '-5em', md: '-0', lg: '0' }}
        width={{ base: '12em', md: '16em', lg: '21em' }}
      />
      <Flex
        flexDirection="column"
        bgGradient="Linear(#340B6E, transparent)"
        p={{ base: '1em', md: '1em', lg: '2em' }}
        pl={{ base: '1em', md: '12em', lg: '15em' }}
        pt={{ base: '7em', md: '1em', lg: '2em' }}
        width={{ base: '95%', md: '85%', lg: '70%' }}
        borderRadius={{ base: '10px', md: '15px', lg: '15px' }}
      >
        <Text
          color="#63CDFA"
          fontWeight="bold"
          fontFamily="PilatExtended-Bold"
          mb={{ base: '.5em', md: '.5em', lg: '.5em' }}
          fontSize={{ base: '16px', md: '28px', lg: '32px' }}
        >
          ABOUT WeFund
        </Text>
        <Text
          display="inline"
          fontSize={{ base: '16px', md: '20px', lg: '20px' }}
          fontFamily="Sk-Modernist-Regular"
        >
          <b>WeFund</b> is a community crowdfunding incubator for blockchain
          and real-world projects built on various blockchains including
          Terra, Solana, Ethereum, and more. WeFund’s platform is built on the
          Terra blockchain. WeFund has the
          capability to implement various blockchain and real-world projects,
          bridging the gap between the real world and blockchain.
          <br />
          <br /> To increase transparency, minimize risk, and hold projects
          accountable for the funds raised, WeFund has a unique community
          vetting and unique milestone system. This means the WeFund community
          at each milestone of a project’s development, vote as to
          whether the relevant milestone has been achieved, with the outcome
          determining release of funds for the
          project to achieve its next milestone.
        </Text>
      </Flex>
    </Flex>
  )
}

const AboutDesktop = function() {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      direction={'column'}
      my={{ base: '4em', md: '5em'}}
      width={{ base: '98%', md: '80%', lg: '80em', xl: '100em' }}
      px={{ base: '0', md: '10px'}}
    >
      <Text
        color="#63CDFA"
        fontWeight="bold"
        fontFamily="PilatExtended-Bold"
        mb={{ base: '.5em', md: '.5em', lg: '.5em' }}
        fontSize={{ base: '16px', md: '28px', lg: '32px' }}
      >
        ABOUT <chakra.span color='#FCFCFC'>WeFund</chakra.span>
      </Text>
      <Flex
        direction={'row'}>
        <Box marginX={'80px'}>
          <Image
            zIndex="3"
            objectFit="contain"
            src="/media/Home/wfd-logo-projection.png"
          />
        </Box>

        <Stack
          flex={1}
          flexDirection="column"
          width={{ base: '95%', md: '85%', lg: '70%' }}
          spacing={1}
        >
          <Flex
            direction={'row'}
            bgGradient="Linear(#340B6E, transparent)"
            borderRadius={{ base: '10px', md: '15px', lg: '15px' }}
            p={'32px'}>
            <Image
              objectFit="contain"
              src="/media/Home/about-icon-2.png"
            />
            <Text
              flex={1}
              display="inline"
              fontSize={{ base: '16px', md: '20px', lg: '20px' }}
              fontFamily="Sk-Modernist-Regular"
              marginLeft={'32px'}
            >
              <chakra.span color={'brand'}><b>WeFund</b> is a community crowdfunding incubator</chakra.span> for blockchain
              and real-world projects built on various blockchains including
              Terra, Solana, Ethereum, and more. WeFund's platform is built on the
              Terra blockchain. WeFund has the
              capability to implement various blockchain and real-world projects,
              bridging the gap between the real world and blockchain.
            </Text>
          </Flex>
          <Flex
            direction={'row'}
            bgGradient="Linear(#340B6E, transparent)"
            borderRadius={{ base: '10px', md: '15px', lg: '15px' }}
            p={'32px'}>
            <Image
              objectFit="contain"
              src="/media/Home/about-icon-1.png"
            />
            <Text
              flex={1}
              display="inline"
              fontSize={{ base: '16px', md: '20px', lg: '20px' }}
              fontFamily="Sk-Modernist-Regular"
              marginLeft={'32px'}
            >
              To increase transparency, minimize risk, and hold projects
              accountable for the funds raised, <chakra.span color={'brand'}>WeFund has a unique community
              vetting and unique milestone system.</chakra.span> This means the WeFund community
              at each milestone of a project's development, vote as to
              whether the relevant milestone has been achieved, with the outcome
              determining release of funds for the
              project to achieve its next milestone.
            </Text>
          </Flex>
        </Stack>
      </Flex>

    </Stack>
  )
}

export default function Aboutone() {
  const variant = useBreakpointValue({base: 'mobile', md: 'desktop'})
  return (
    <Flex
      width="100%"
      position="relative"
      alignItems="center"
      flexDirection="column"
      pb={{ base: '5em', md: '5em', lg: '10em' }}
      paddingLeft={'35px'}
      paddingRight={'35px'}
    >
      { (variant === 'mobile') && <AboutMobile /> }
      { (variant === 'desktop') && <AboutDesktop /> }

    </Flex>
  )
}
