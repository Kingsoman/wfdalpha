import React from 'react'
import { Image, Flex, Text, Link, Spacer } from '@chakra-ui/react'

import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 3000, min: 2000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 2000, min: 1024 },
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

export default function Team() {
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
      <Flex
        fontFamily="PilatExtended-Bold"
        fontSize={{ md: '25px', lg: '30px' }}
      >
        <Text color="#63CDFA">WeFund</Text>
        <Text color="white" ml={'10px'}>
          Team
        </Text>
      </Flex>

      <Flex
        pl="1em"
        mt={'2em'}
        pb={'2em'}
        position={'relative'}
        flexDirection="column"
        justifyContent={'flex-start'}
        width={{ base: '100%', md: '80vw', lg: '88vw' }}
      >
        <Carousel
          infinite
          showDots
          autoPlay={true}
          swipeable={true}
          draggable={false}
          renderDotsOutside
          showThumbs={false}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          responsive={responsive}
          transitionDuration={500}
        >
          {team.map((t, index) => (
            <Flex
              key={index}
              zIndex={'5'}
              height="100%"
              borderRadius="10px"
              position="relative"
              className="teamCard"
              data-aos="zoom-in-up"
              flexDirection={'column'}
              mx={{ md: '2vw', lg: '1vw' }}
              py={{ md: '2vw', lg: '1vw' }}
              bgGradient={'linear(#360847, #18075b)'}
              width={{ base: '20vw', md: '37vw', lg: '19vw' }}
            >
              <Image
                src={t.imgsrc}
                mx={{ md: '2vw', lg: '1vw' }}
                mb={{ md: '1vw', lg: '.5vw' }}
                width={{ md: '33vw', lg: '17vw' }}
                height={{ md: '20em', lg: '25em' }}
              />
              {t.logos && (
                <Flex flexWrap={'wrap'} mx={{ md: '1vw', lg: '.5vw' }}>
                  {t.logos?.map((e, i) => (
                    <Image
                      src={e}
                      key={i}
                      height="40px"
                      background="white"
                      borderRadius="3px"
                      objectFit="contain"
                      m={{ md: '.5vw', lg: '.5vw' }}
                      width={{ md: '7.5vw', lg: '3.5vw' }}
                    />
                  ))}
                </Flex>
              )}
              <Flex w="100%" px={{ md: '2vw', lg: '1vw' }}>
                <div>
                  <Text fontSize={'18px'} fontFamily={'PilatExtended-Bold'}>
                    {t.name}
                  </Text>
                  <Text fontSize={'13px'} fontFamily={'PilatExtended-Regular'}>
                    {t.role}
                  </Text>
                </div>
                <Spacer />
                {t.link && (
                  <Link href={t.link} mt="5px" isExternal>
                    <Image
                      border="0"
                      width="40px"
                      height="40px"
                      cursor="pointer"
                      background="white"
                      borderRadius="6px"
                      src="/media/linkedin.png"
                    />
                  </Link>
                )}
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
    name: 'Andrea Bello',
    role: 'CEO CTO & Co-Founder',
    link: 'https://linkedin.com/in/bello-andrea-380572b4/',
    logos: [
      '/media/Team_Companies/GE.png',
      '/media/Team_Companies/ABB.png',
      '/media/Team_Companies/AXA.png',
      '/media/Team_Companies/zurich.png',
    ],
    imgsrc: '/media/Team/wfd-andrea.jpg',
  },
  {
    name: 'Ika Afifah',
    role: 'CMO and Co-Founder',
    link: 'https://linkedin.com/in/ika-nur-afifah/',
    imgsrc: '/media/Team/wfd-ika.jpg',
    logos: [
      '/media/Team_Companies/waves.png',
      '/media/Team_Companies/TME.png',
      '/media/Team_Companies/Tencent.jpeg',
      '/media/Team_Companies/Bigo.jpeg',
    ],
  },
  {
    name: 'Austin Taylor',
    role: 'CCO',
    link: 'https://linkedin.com/in/austintaylor19/',
    imgsrc: '/media/Team/wfd-austin.jpg',
    logos: [
      '/media/Team_Companies/pegasus.png',
      '/media/Team_Companies/Harman.png',
      '/media/Team_Companies/Holland.jpeg',
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
    name: 'Melati Puspa Anisa',
    role: 'Marketing & Data',
    imgsrc: '/media/Home/60.png',
  },
  {
    name: 'Pirda Fajriati',
    role: 'Graphic Design & Marketing',
    imgsrc: '/media/Home/61.png',
  },
  {
    name: 'Marko Vitez',
    role: 'Smart Contract Dev',
    imgsrc: '/media/Home/62.png',
  },
  {
    name: 'Manuel Guerrero',
    role: 'Community Manager',
    imgsrc: '/media/Home/63.png',
  },
  {
    name: 'Hardin Santoso',
    role: 'Web Development & Content Creation',
    imgsrc: '/media/Home/64.png',
  },
  {
    name: 'Ahmed Ashraf',
    role: 'Front end Dev',
    imgsrc: '/media/Home/65.png',
  },
]
