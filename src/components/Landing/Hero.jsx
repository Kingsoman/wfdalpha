import React from 'react'
import { Image, Flex, Text } from '@chakra-ui/react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader

export default function Hero() {
  return (
    <Flex id="heroSection" direction="column">
      <Image
        src="/media/cloud.svg"
        pos={'absolute'}
        width={'100%'}
        top={{ base: '0', md: '0', lg: '-100px' }}
        zIndex="5px"
      />
      <Image
        src="/media/stars.svg"
        position="relative"
        zIndex="5px"
        id="starsBg"
      />
      <Image
        src="/media/stage.png"
        position="relative"
        zIndex="5px"
        id="stageBg"
      />

      <Carousel width={'100vw'} infiniteLoop={true}>
        <Flex
          justifyContent={'center'}
          flexDirection={'column'}
          alignItems={'center'}
          height={{ base: '14em', md: '20em', lg: '25em' }}
          w={'100%'}
        >
          <Image
            mb={'20px'}
            zIndex="5px"
            width={{ base: '30px', lg: '50px' }}
            height={{ base: '15px', lg: '25px' }}
            position="relative"
            data-aos="fade-down"
            objectFit={'contain'}
            src="/media/horizontallogo.svg"
          />
          <Image
            zIndex="5px"
            width={'20em'}
            height={{ base: '5em', md: '10em', lg: '15em' }}
            position="relative"
            data-aos="fade-down"
            objectFit={'contain'}
            src="/media/partners/pandai.png"
          />
          <Text
            fontFamily={'PilatExtended-Bold'}
            fontSize={{ base: '12px', md: '16px', lg: '20px' }}
            mt={'20px'}
          >
            Coming Soon..
          </Text>
        </Flex>
        <Flex
          justifyContent={'center'}
          flexDirection={'column'}
          alignItems={'center'}
          height={{ base: '14em', md: '20em', lg: '25em' }}
          w={'100%'}
        >
          <Image
            mb={'20px'}
            zIndex="5px"
            width={{ base: '30px', lg: '50px' }}
            height={{ base: '15px', lg: '25px' }}
            position="relative"
            data-aos="fade-down"
            objectFit={'contain'}
            src="/media/horizontallogo.svg"
          />
          <Flex
            height={{ base: '5em', md: '10em', lg: '15em' }}
            justify="center"
            alignItems={'center'}
          >
            <Image
              zIndex="5px"
              width={'20em'}
              height={{ base: '2em', md: '4em', lg: '6em' }}
              position="relative"
              data-aos="fade-down"
              objectFit={'contain'}
              src="/media/partners/Portalkripto.png"
            />
          </Flex>
          <Text
            fontFamily={'PilatExtended-Bold'}
            fontSize={{ base: '12px', md: '16px', lg: '20px' }}
            mt={'20px'}
          >
            Coming Soon..
          </Text>
        </Flex>
        <Flex
          justifyContent={'center'}
          flexDirection={'column'}
          alignItems={'center'}
          height={{ base: '14em', md: '20em', lg: '25em' }}
          w={'100%'}
        >
          <Image
            mb={'20px'}
            zIndex="5px"
            width={{ base: '30px', lg: '50px' }}
            height={{ base: '15px', lg: '25px' }}
            position="relative"
            data-aos="fade-down"
            objectFit={'contain'}
            src="/media/horizontallogo.svg"
          />
          <Image
            zIndex="5px"
            width={'20em'}
            height={{ base: '5em', md: '10em', lg: '15em' }}
            data-aos="fade-down"
            position={'relative'}
            objectFit={'contain'}
            src="/media/partners/lynx-dark.png"
          />
          <Text
            fontFamily={'PilatExtended-Bold'}
            fontSize={{ base: '12px', md: '16px', lg: '20px' }}
            mt={'20px'}
          >
            Coming Soon..
          </Text>
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
