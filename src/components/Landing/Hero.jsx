import React, { useState } from 'react'
import { Image, Flex, Text, Link } from '@chakra-ui/react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader

export default function Hero() {
  const [index, setIndex] = useState(0)

  return (
    <Flex id="heroSection" direction="column">
      <Image
        src="/media/cloud.svg"
        pos="absolute"
        width="100%"
        top={{ base: '0', md: '0', lg: '-100px' }}
      />
      <Image
        src="/media/stars.svg"
        position="relative"
        id="starsBg"
      />
      <Image
        src="/media/stage.png"
        position="relative"
        id="stageBg"
      />
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
          <Logo />
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
          <Coming />
        </Flex>
        <Flex
          height={{ base: '14em', md: '20em', lg: '25em' }}
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
        >
          <Logo />
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
          <Coming />
        </Flex>
        <Flex
          height={{ base: '14em', md: '20em', lg: '25em' }}
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
        >
          <Logo />
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
          <Coming />
        </Flex>
      </Carousel>
      <Text id="heroHeading" data-aos="fade-up">
        Community
        <br />
        Crowdfunding
        <br />
        Cross-Chain
        <br />
        Incubator
      </Text>
      <Flex id="ArrowDownButton" data-aos="flip-up">
        <a href="#aboutSection">
          <Image src="/media/ArrowDown.png" id="ArrowDownButtonImage" />
        </a>
      </Flex>
    </Flex>
  )
}

function Coming() {
  return (
    <Text
      fontSize={{ base: '12px', md: '16px', lg: '20px' }}
      fontFamily="PilatExtended-Bold"
      mt="20px"
    >
      Coming Soon
    </Text>
  )
}

function Logo() {
  return (
    <Image
      mb="20px"
      position="relative"
      data-aos="fade-down"
      objectFit="contain"
      src="/media/horizontallogo.svg"
      width={{ base: '30px', lg: '50px' }}
      height={{ base: '15px', lg: '25px' }}
    />
  )
}
