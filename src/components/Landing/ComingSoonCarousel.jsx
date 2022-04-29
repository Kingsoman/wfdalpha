import React from 'react'
import { Image, Flex, Box, Text, Link, Center } from '@chakra-ui/react'

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
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
}


export default function UpcomingProject() {
  return (
    <Flex
      mt={'3em'}
      width="100%"
      alignItems="center"
      flexDirection="column"
      pb={{ md: '5em', lg: '10em' }}
    >
      <Flex
        fontFamily="PilatExtended-Bold"
        fontSize={{ md: '25px', lg: '30px' }}
        mb="1em"
        background={'linear-gradient(90deg, rgba(42, 246, 255, 0) 20%, #63CDFA 48.75%, rgba(42, 246, 255, 0) 80%)'}
        width={'100%'}
        justifyContent={'center'}
      >
        
        <Text color="#1F196B" >UPCOMING PROJECTS</Text>
      </Flex>
      <Box
        width={{ base: '100%', md: '86vw', lg: '86vw' }}
        
        >
        <Carousel
          autoPlay
          swipeable={true}
          showDots={true}
          showThumbs={false}

          responsive={responsive}
          
        >
          
          <Flex
                justifyContent={'center'}>
            <Link
              href="https://youtube.com/channel/UCmNM2yxDyy6NonRrzGSXQVA"
              isExternal
            >
              <Center width={{ base: '220px', md:'375px' }}
                  height={{ base: '220px', md:'375px'  }}
                  bgGradient="linear(#430E82, #1D0551)"
                  borderRadius={{ base: '10px', md: '15px', lg: '15px' }}>
              <Image
                cursor="pointer"
                data-aos="fade-down"
                objectFit="contain"
                src="/partner/Kosu.png"
                width={{ base: '20em' }}
                height={{ base: '15em' }}
              />
              </Center>
            </Link>
            </Flex>
          
            <Flex
                  justifyContent={'center'}>
            <Link
              href="https://portalkripto.com/"
              isExternal>
                <Center width={{ base: '220px', md:'375px' }}
                  height={{ base: '220px', md:'375px'  }}
                  bgGradient="linear(#430E82, #1D0551)"
                  borderRadius={{ base: '10px', md: '15px', lg: '15px' }}>
              <Image
                cursor="pointer"
                data-aos="fade-down"
                objectFit="contain"
                src="/media/partners/Portalkripto.png"
                width={{ base: '20em' }}
                height={{ base: '6em' }}
              />
              </Center>
              
            </Link>
            
            </Flex>
            
            <Flex justifyContent={'center'}>
            <Link href="https://lynxverse.io/"
              isExternal>
                <Center
                  width={{ base: '220px', md:'375px' }}
                  height={{ base: '220px', md:'375px'  }}
                  bgGradient="linear(#430E82, #1D0551)"
                  borderRadius={{ base: '10px', md: '15px', lg: '15px' }}>
              <Image
                cursor="pointer"
                data-aos="fade-down"
                objectFit="contain"
                src="/media/partners/lynx-dark.png"
                width={{ base: '20em' }}
                height={{ base: '15em' }}
              />
              </Center>
              
            </Link>
            </Flex>
          
        </Carousel>
      </Box>
    </Flex>
  )
}
