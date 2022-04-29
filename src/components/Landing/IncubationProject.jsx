import React from 'react'
import { Flex, Text, Image, Box } from '@chakra-ui/react'

import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 3000, min: 2000 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 2000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
}

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
      backgroundImage="/media/Home/40_1.png"
      mt={{ base: '4em', md: '4em', lg: '8em' }}
      mb={{ base: '1em', md: '5em', lg: '10em' }}
    >
      <Flex
        mb="2em"
        fontFamily="PilatExtended-Bold"
        fontSize={{ md: '25px', lg: '30px' }}
      >
        <Text color="#63CDFA">INCUBATION</Text>
        <Text color="white" ml={'10px'}>
          PROJECT
        </Text>
      </Flex>
      <Box
      width={{ base: '100%', md: '86vw', lg: '86vw' }}>
      <Carousel showDots={true} swipeable={true} keyBoardControl={true} responsive={responsive} >
        {projects.map((e, i) => (
          <Flex justifyContent={'center'}>
          <Image
            key={i}
            src={e}
            objectFit="contain"
            maxH={'225px'}
            minH={'225px'}
          />
          </Flex>
        ))}
      </Carousel>
      </Box>
    </Flex>
  )
}

const projects = [
  '/media/Home/banner1.svg',
  '/media/Home/banner2.svg',
  '/media/Home/banner3.svg',
]
