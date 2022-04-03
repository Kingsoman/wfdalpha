import React from 'react'
import { Image, Flex, Text, Link } from '@chakra-ui/react'

import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader

export default function UpcomingProject() {
  return (
    <Flex
      mt={'3em'}
      width="100%"
      alignItems="center"
      flexDirection="column"
      pb={{ md: '5em', lg: '10em' }}
    >
      <Flex fontFamily="PilatExtended-Bold" fontSize={{ lg: '30px' }} mb="1em">
        <Text color="#63CDFA">UPCOMING</Text>
        <Text color="white" ml={'10px'}>
          PROJECTS
        </Text>
      </Flex>
      <Carousel
        autoPlay
        width="100%"
        swipeable={true}
        showArrows={false}
        showStatus={false}
        showThumbs={false}
        infiniteLoop={true}
      >
        <Flex
          width="60%"
          margin={'auto'}
          alignItems={'center'}
          flexDirection="column"
          justifyContent={'center'}
          p={{ md: '1em', lg: '1em' }}
          height={{ md: '25em', lg: '25em' }}
          bgGradient="linear(#430E82, #1D0551)"
          borderRadius={{ md: '15px', lg: '15px' }}
        >
          <Link
            href="https://youtube.com/channel/UCmNM2yxDyy6NonRrzGSXQVA"
            isExternal
          >
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
          width="60%"
          margin={'auto'}
          alignItems={'center'}
          flexDirection="column"
          justifyContent={'center'}
          p={{ md: '1em', lg: '1em' }}
          height={{ md: '25em', lg: '25em' }}
          bgGradient="linear(#430E82, #1D0551)"
          borderRadius={{ md: '15px', lg: '15px' }}
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
          width="60%"
          margin={'auto'}
          alignItems={'center'}
          flexDirection="column"
          justifyContent={'center'}
          p={{ md: '1em', lg: '1em' }}
          height={{ md: '25em', lg: '25em' }}
          bgGradient="linear(#430E82, #1D0551)"
          borderRadius={{ md: '15px', lg: '15px' }}
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
