import React, { useState } from 'react'

import { Flex, Text, Image, Select, Link } from '@chakra-ui/react'
import { ButtonBackTransition } from '../ImageTransition'

export default function Aboutone() {
  const [selectedLang, setSelectedlang] = useState(
    '/media/Litepaper_WeFund_2_2.pdf',
  ) //default value

  function handleSelectChange(event) {
    setSelectedlang(event.target.value)
  }

  return (
    <Flex
      width="100%"
      position="relative"
      alignItems="center"
      flexDirection="column"
      pb={{ base: '5em', md: '5em', lg: '10em' }}
    >
      <Flex
        alignItems="center"
        justifyContent="center"
        my={{ base: '5em', md: '7em', lg: '10em' }}
        width={{ base: '98%', md: '80%', lg: '80em' }}
        flexDirection={{ base: 'column', md: 'row', lg: 'row' }}
      >
        <Image
          zIndex="3"
          objectFit="contain"
          position="relative"
          src="/media/Home/3.png"
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
            Terra blockchain, a stablecoin-based ecosystem with high-quality
            protocols, low gas fees, and a strong community. WeFund has the
            capability to implement various blockchain and real-world projects,
            bridging the gap between the real world and blockchain.
            <br />
            <br /> To increase transparency, minimize risk, and hold projects
            accountable for the funds raised, WeFund has a unique community
            vetting and unique milestone system. This means the WeFund community
            will, at each milestone of a project’s development, vote as to
            whether the relevant milestone has been achieved, with the outcome
            of such vote determining the release of funds required for the
            project to achieve its next milestone
          </Text>
        </Flex>
      </Flex>

      <Text
        color="#63CDFA"
        fontWeight="bold"
        fontFamily="PilatExtended-Regular"
        fontSize={{ base: '14px', md: '18px', lg: '20px' }}
      >
        Select Litepaper Languange
      </Text>
      <Select
        mt="15px"
        color="white"
        border="none"
        id="paper-lang"
        value={selectedLang}
        backgroundColor="#1A133E"
        onChange={handleSelectChange}
        placeholder="Select language"
        width={{ base: '90%', md: '70%', lg: '50%' }}
      >
        <option
          value="/media/Litepaper_WeFund_2_2.pdf"
          style={{ backgroundColor: '#1B0645' }}
        >
          English
        </option>
        <option
          value="/media/Litepaper_WeFund_2.1_French.pdf"
          style={{ backgroundColor: '#1B0645' }}
        >
          French
        </option>
        <option
          value="/media/Litepaper_Wefund_ID.pdf"
          style={{ backgroundColor: '#1B0645' }}
        >
          Indonesian
        </option>
        <option
          value="/media/Litepaper_Wefund_ITA.pdf"
          style={{ backgroundColor: '#1B0645' }}
        >
          Italian
        </option>
        <option
          value="/media/Litepaper_Wefund_KOR.pdf"
          style={{ backgroundColor: '#1B0645' }}
        >
          Korean
        </option>
        <option
          value="/media/Litepaper_WeFund_2.1_Swahili.pdf"
          style={{ backgroundColor: '#1B0645' }}
        >
          Swahili
        </option>
      </Select>
      <Link href={selectedLang} w="100%">
        <Flex
          m="0 auto"
          mt="30px"
          width={{ base: '90%', md: '70%', lg: '50%' }}
        >
          <ButtonBackTransition
            width="100%"
            height="45px"
            rounded="100px"
            selected={false}
            unitid="downwhitepaper"
          >
            <Flex
              w="100%"
              pl="25px"
              pr="25px"
              alignItems="center"
              justify="space-between"
            >
              <Text
                color="white"
                fontSize={{ base: '14px', md: '16px', lg: '16px' }}
              >
                Download Litepaper
              </Text>
              <Image src="/media/Download.svg" />
            </Flex>
          </ButtonBackTransition>
        </Flex>
      </Link>
      <Text
        mt="10px"
        textAlign="center"
        fontFamily="Sk-Modernist-Regular"
        fontSize={{ base: '14px', md: '18px', lg: '18px' }}
      >
        OR
      </Text>
      <Link href="/media/Whitepaper-2.0-New-Update.pdf" w="100%">
        <Flex
          m="0 auto"
          mt="10px"
          width={{ base: '90%', md: '70%', lg: '50%' }}
        >
          <ButtonBackTransition
            width="100%"
            height="45px"
            rounded="100px"
            selected={false}
            unitid="downfullwhitepaper"
          >
            <Flex
              w="100%"
              pl="25px"
              pr="25px"
              alignItems="center"
              justify="space-between"
            >
              <Text
                color="white"
                fontSize={{ base: '14px', md: '16px', lg: '16px' }}
              >
                Download Whitepaper (ENG Only)
              </Text>
              <Image src="/media/Download.svg" />
            </Flex>
          </ButtonBackTransition>
        </Flex>
      </Link>
    </Flex>
  )
}
