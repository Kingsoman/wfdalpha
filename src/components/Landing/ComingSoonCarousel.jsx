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
          margin={'auto'}
          alignItems={'center'}
          flexDirection="column"
          justifyContent={'center'}
          bgGradient="linear(#430E82, #1D0551)"
          p={{ base: '1em', md: '1em', lg: '1em' }}
          width={{ base: '90%', md: '60%', lg: '60%' }}
          height={{ base: '25em', md: '25em', lg: '25em' }}
          borderRadius={{ base: '10px', md: '15px', lg: '15px' }}
        >
          <Link
            href="https://youtube.com/channel/UCmNM2yxDyy6NonRrzGSXQVA"
            isExternal
          >
            <Image
              cursor="pointer"
              position="relative"
              data-aos="fade-down"
              objectFit="contain"
              src="/media/partners/pandai.png"
              width={{ base: '90%', md: '70%', lg: '20em' }}
              height={{ base: '90%', md: '70%m', lg: '15em' }}
            />
          </Link>
        </Flex>
        <Flex
          margin={'auto'}
          alignItems={'center'}
          flexDirection="column"
          justifyContent={'center'}
          bgGradient="linear(#430E82, #1D0551)"
          p={{ base: '1em', md: '1em', lg: '1em' }}
          width={{ base: '90%', md: '60%', lg: '60%' }}
          height={{ base: '25em', md: '25em', lg: '25em' }}
          borderRadius={{ base: '10px', md: '15px', lg: '15px' }}
        >
          <Flex
            height={{ base: '5em', md: '10em', lg: '15em' }}
            alignItems="center"
            justify="center"
          >
            <Link href="https://portalkripto.com/" isExternal>
              <Image
                cursor="pointer"
                position="relative"
                data-aos="fade-down"
                objectFit="contain"
                src="/media/partners/Portalkripto.png"
                width={{ base: '90%', md: '70%', lg: '20em' }}
                height={{ base: '90%', md: '70%', lg: '6em' }}
              />
            </Link>
          </Flex>
        </Flex>
        <Flex
          margin={'auto'}
          alignItems={'center'}
          flexDirection="column"
          justifyContent={'center'}
          bgGradient="linear(#430E82, #1D0551)"
          p={{ base: '1em', md: '1em', lg: '1em' }}
          width={{ base: '90%', md: '60%', lg: '60%' }}
          height={{ base: '25em', md: '25em', lg: '25em' }}
          borderRadius={{ base: '10px', md: '15px', lg: '15px' }}
        >
          <Link href="https://lynxverse.io/" isExternal>
            <Image
              cursor="pointer"
              data-aos="fade-down"
              position="relative"
              objectFit="contain"
              src="/media/partners/lynx-dark.png"
              width={{ base: '90%', md: '70%', lg: '20em' }}
              height={{ base: '90%', md: '70%m', lg: '15em' }}
            />
          </Link>
        </Flex>
      </Carousel>
    </Flex>
  )
}
