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
      <Flex fontFamily="PilatExtended-Bold" fontSize={{ lg: '30px' }}>
        <Text color="#63CDFA">WeFund</Text>
        <Text color="white" ml={'10px'}>
          Team
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
          {team.map((t, index) => (
            <Flex
              p={'1em'}
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
              <Image src={t.imgsrc} width={'100%'} objectFit="contain" />
              {t.logos && (
                <Flex mt="20px" height="40px" justify="space-between">
                  {t.logos?.map((e, i) => (
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
              )}
              <Flex w="100%" my="20px">
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
                      width="40px"
                      height="40px"
                      src="/media/linkedin.png"
                      cursor="pointer"
                      background="white"
                      borderRadius="6px"
                      border="0"
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
