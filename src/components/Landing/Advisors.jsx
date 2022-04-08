import React from 'react'
import { Image, Flex, Text, Link, Spacer } from '@chakra-ui/react'

export default function Advisors() {
  return (
    <Flex
      width="100%"
      justify="center"
      position="relative"
      alignItems="center"
      flexDirection="column"
      pb={{ base: '3em', md: '5em', lg: '10em' }}
      fontFamily="Sk-Modernist-Regular"
    >
      <Flex fontFamily="PilatExtended-Bold" fontSize={{ lg: '30px' }}>
        <Text color="#63CDFA">WeFund</Text>
        <Text color="white" ml={'10px'}>
          Advisors
        </Text>
      </Flex>
      <Flex id="missionList">
        {team.map((e, index) => (
          <Flex
            key={index}
            className="teamCard"
            data-aos="zoom-in-up"
            width={{ base: '100%', md: '45%', lg: '30%' }}
          >
            <Image src={e.imgsrc} width={'100%'} height={'70%'} />
            <Flex my="20px" height="40px" justify="space-around">
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
    name: 'Trevor Ogata',
    role: 'Terra Ecosystem',
    imgsrc: '/media/Home/46.png',
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
    role: 'Business & Operations',
    imgsrc: '/media/Home/47.png',
    logos: [
      '/media/Home/55.png',
      '/media/Home/52.png',
      '/media/Home/54.png',
      '/media/Home/53.png',
    ],
  },
]
