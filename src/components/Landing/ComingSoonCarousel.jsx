import React, { useState } from 'react'
import { Image, Flex, Text, Link } from '@chakra-ui/react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader

export default function UpcomingProject() {
  const [index, setIndex] = useState(0)

  return (
    <Flex 
        direction="column" 
        bg={'rgba(255, 255, 255, 0.05)'}
        pt={'25px'}
        pb={'25px'}
    >
        <Flex
            data-aos="fade-down"
            direction="column"
            textAlign="center"
            fontFamily="Sk-Modernist-Regular"
        >
        <Text id="aboutUsPageLable">Upcoming Projects</Text>
        <Flex id="headingIndustry">
            <Text>Soon to Launch on </Text>
            <Text color="#00A3FF">WeFund&nbsp;</Text>
        </Flex>
        </Flex>
        <Carousel
            autoPlay
            width="100vw"
            showArrows={false}
            showStatus={false}
            showThumbs={false}
            infiniteLoop={true}
            onChange={(i) => setIndex(i)}
        >
        <Flex
          height={{ base: '14em', md: '20em', lg: '25em' }}
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          position="relative"
        >
          <Link href="https://youtube.com/channel/UCmNM2yxDyy6NonRrzGSXQVA" isExternal>
            <Image
              width="20em"
              cursor="pointer"
              position="relative"
              data-aos="fade-down"
              objectFit="contain"
              src="/media/partners/pandai.png"
              height={{ base: '5em', md: '10em', lg: '15em' }}
            />
          </Link>
        </Flex>
        <Flex
          height={{ base: '14em', md: '20em', lg: '25em' }}
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
        >
          <Flex
            height={{ base: '5em', md: '10em', lg: '15em' }}
            alignItems="center"
            justify="center"
          >
            <Link href="https://portalkripto.com/" isExternal>
              <Image
                width="20em"
                cursor="pointer"
                position="relative"
                data-aos="fade-down"
                objectFit="contain"
                src="/media/partners/Portalkripto.png"
                height={{ base: '2em', md: '4em', lg: '6em' }}
              />
            </Link>
          </Flex>
        </Flex>
        <Flex
          height={{ base: '14em', md: '20em', lg: '25em' }}
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
        >
          <Link href="https://lynxverse.io/" isExternal>
            <Image
              width="20em"
              cursor="pointer"
              data-aos="fade-down"
              position="relative"
              objectFit="contain"
              src="/media/partners/lynx-dark.png"
              height={{ base: '5em', md: '10em', lg: '15em' }}
            />
          </Link>
        </Flex>
      </Carousel>
    </Flex>
  )
}

