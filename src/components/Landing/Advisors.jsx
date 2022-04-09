import React from 'react'
import { Image, Flex, Text, Link, Spacer } from '@chakra-ui/react'

import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
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

export default function Advisors() {
  return (
    <Flex
      width="100%"
      justify="center"
      position="relative"
      alignItems="center"
      flexDirection="column"
      fontFamily="Sk-Modernist-Regular"
      mb={{ base: '3em', md: '5em', lg: '8em' }}
    >
      <Flex fontFamily="PilatExtended-Bold" fontSize={{ lg: '30px' }}>
        <Text color="#63CDFA">WeFund</Text>
        <Text color="white" ml={'10px'}>
          Advisors
        </Text>
      </Flex>
      <Flex
        pl="1em"
        mt={'2em'}
        position={'relative'}
        flexDirection="column"
        justifyContent={'flex-start'}
        width={{ base: '100%', md: '100%', lg: '100%' }}
      >
        <Carousel
          infinite
          autoPlay={true}
          draggable={false}
          swipeable={true}
          showThumbs={false}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          responsive={responsive}
          transitionDuration={500}
          removeArrowOnDeviceType={['tablet', 'mobile']}
        >
          {team.map((e, index) => (
            <Flex
              p={'1em'}
              mx={'.5em'}
              key={index}
              zIndex={'5'}
              height="30em"
              borderRadius="10px"
              position="relative"
              className="teamCard"
              data-aos="zoom-in-up"
              flexDirection={'column'}
              bgGradient={'linear(#360847, #18075b)'}
              width={{ base: '20em', md: '20em', lg: '20em' }}
            >
              <Image src={e.imgsrc} width={'100%'} height={'70%'} />
              <Flex my="20px" height="40px" justify="space-between">
                {e.logos?.map((e, i) => (
                  <Image
                    src={e}
                    key={i}
                    width="40px"
                    objectFit="contain"
                    background="white"
                    borderRadius="3px"
                  />
                ))}
              </Flex>
              <Flex w="100%">
                <div>
                  <Text fontSize={'18px'} fontFamily={'PilatExtended-Bold'}>
                    {e.name}
                  </Text>
                  <Text fontSize={'13px'} fontFamily={'PilatExtended-Regular'}>
                    {e.role}
                  </Text>
                </div>
                <Spacer />
                <Link href={e.link} mt="5px" isExternal>
                  <Image
                    width="40px"
                    height="40px"
                    src="/media/linkedin.png"
                    cursor="pointer"
                    background="white"
                    borderRadius="6px"
                    border="0"
                  />
                </Link>
              </Flex>
            </Flex>
          ))}
        </Carousel>
      </Flex>
    </Flex>
  )
}

const team = [
  {
    name: 'John McLean',
    role: 'Legal',
    logos: ['/media/Home/44.png', '/media/Home/59.png', '/media/Home/45.png'],
    imgsrc: '/media/Home/48.png',
  },
  {
    name: 'Trevor.UST',
    role: 'Terra Ecosystem',
    imgsrc: '/media/Home/46.jpeg',
    logos: [
      '/media/Home/49.png',
      '/media/Home/50.png',
      '/media/Home/51.png',
      '/media/Home/58.png',
      '/media/Home/57.png',
      '/media/Home/56.png',
    ],
  },
  {
    name: 'Achuth Chandran',
    role: 'CFO',
    imgsrc: '/media/Home/47.png',
    logos: [
      '/media/Home/55.png',
      '/media/Home/52.png',
      '/media/Home/54.png',
      '/media/Home/53.png',
    ],
  },
  {
    name: 'Jason Galvin',
    role: 'Co-CTO Advisor',
    link: 'https://linkedin.com/in/jasongalvin/',
    imgsrc: '/media/Team/wfd-jason.jpg',
    logos: [
      '/media/Team_Companies/GoPro.jpeg',
      '/media/Team_Companies/GeneralThings.png',
      '/media/Team_Companies/ProvidentFunding.jpg',
      '/media/Team_Companies/BearingPoint.jpg',
    ],
  },
]
