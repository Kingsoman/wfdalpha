import React, { useEffect, useState } from 'react'
import { Flex, Text, Select, Link, Image, Stack } from "@chakra-ui/react";
import { ButtonBackTransition } from '../ImageTransition';

const litepaperLinks = {
  en: '/media/Litepaper_WeFund_2_2.pdf',
  id: '/media/Litepaper_Wefund_ID.pdf',
  fr: '/media/Litepaper_WeFund_2.1_French.pdf',
  it: '/media/Litepaper_Wefund_ITA.pdf',
  ko: '/media/Litepaper_Wefund_KOR.pdf',
  sw: '/media/Litepaper_WeFund_2.1_Swahili.pdf'
}

const whitepaperLink = '/media/Whitepaper-2.0-New-Update.pdf'

export default function Litepaper() {
  const [selectedLang, setSelectedlang] = useState('en') //default value
  const [paperLink, setPaperLink] = useState()

  function handleSelectChange(event) {
    setSelectedlang(event.target.value)
  }

  useEffect(() => {
    if (litepaperLinks[selectedLang] !== undefined) {
      setPaperLink(litepaperLinks[selectedLang])
    } else {
      setPaperLink(litepaperLinks['en'])
    }
  }, [selectedLang])

  const paperLangs = [
    {
      name: "en",
      label: "English",
    },
    {
      name: "fr",
      label: "Franch",
    },
    {
      name: "id",
      label: "Indonesian",
    },
    {
      name: "it",
      label: "Italian",
    },
    {
      name: "ko",
      label: "Korean"
    },
    {
      name: "sw",
      label: "Swahili"
    }
  ]

  return (
    <Flex backgroundImage="/media/Home/grid-2.svg"
      alignItems="center"
      justifyContent="center"
      px={{ base: '0', md: '10px', lg: '50px', xl: '20px' }}>
      <Stack
        alignItems="center"
        justifyContent="center"
        my={{ base: '2em', md: '4em', lg: '7em' }}
        width={{ base: '98%', md: '80%', lg: '80em', xl: '100em' }}>
        <Text
          color="#FCFCFC"
          fontWeight="bold"
          fontFamily="PilatExtended-Bold"
          fontSize={{ base: '24', md: '36' }}
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
          {paperLangs.map((lang) => 
            <option
              key={lang.name}
              value={lang.name}
              style={{ backgroundColor: '#1B0645' }}>
              {lang.label}
            </option>
          )}
          
        </Select>
        <Link href={paperLink} w="100%">
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
        <Link href={whitepaperLink} w="100%">
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
      </Stack>
    </Flex>
  )
}