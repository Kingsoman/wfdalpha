import React from 'react'
import { Flex, Text, Image } from '@chakra-ui/react'

import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader

export default function Problem() {
  return (
    <Flex
      pt={'1em'}
      pb={'2em'}
      width="100%"
      position="relative"
      alignItems="center"
      flexDirection="column"
      backgroundSize={'contain'}
      backgroundImage="/media/Home/40.png"
      mt={{ base: '4em', md: '4em', lg: '8em' }}
      mb={{ base: '1em', md: '5em', lg: '10em' }}
    >
      <Flex fontFamily="PilatExtended-Bold" fontSize={{ lg: '30px' }} mb="2em">
        <Text color="#63CDFA">INCUBATION</Text>
        <Text color="white" ml={'10px'}>
          PROJECT
        </Text>
      </Flex>
      <Carousel showThumbs={false} width="100%">
        {projects.map((e, i) => (
          <Image
            key={i}
            src={e}
            objectFit="contain"
            height={{ base: '12em', md: '20em', lg: '25em' }}
          />
        ))}
      </Carousel>
    </Flex>
  )
}

const projects = [
  '/media/Home/banner1.svg',
  '/media/Home/banner2.svg',
  '/media/Home/banner3.svg',
]
