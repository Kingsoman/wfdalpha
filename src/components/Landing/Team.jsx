import React from 'react'
import { Image, Flex, Text, Link, Spacer } from '@chakra-ui/react'

export default function Team() {
  return (
    <Flex
      width="100%"
      justify="center"
      alignItems="center"
      fontFamily="Sk-Modernist-Regular"
    >
      <Flex id="projectIndustryContainer">
        <Flex
          width="100%"
          justify="center"
          textAlign="center"
          alignItems="center"
          data-aos="fade-down"
          flexDirection="column"
          fontFamily="PilatExtended-Regular"
        >
          <Flex id="headingIndustry">
            <Text color="#00A3FF">WeFund&nbsp;</Text>
            <Text>Team</Text>
          </Flex>
        </Flex>
        <Flex id="missionList">
          {PROJECT_ITEMS.map((projectItem, index) => (
            <Flex
              key={index}
              className="teamCard"
              data-aos="zoom-in-up"
              width={{ base: '100%', md: '45%', lg: '24%' }}
            >
              <Image
                src={projectItem.imgsrc}
                objectFit="contain"
                width={'100%'}
              />
              <Flex my="20px" height="40px" justify="space-around">
                {projectItem.logos?.map((e, i) => (
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
                    {projectItem.name}
                  </Text>
                  <Text fontSize={'13px'} fontFamily={'PilatExtended-Regular'}>
                    {projectItem.role}
                  </Text>
                </div>
                <Spacer />
                <Link href={projectItem.link} mt="5px" isExternal>
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
    </Flex>
  )
}

const PROJECT_ITEMS = [
  {
    name: 'Andrea Bello',
    role: 'CEO and Co-Founder',
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
      '/media/Team_Companies/waves.jpeg',
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
    name: 'Jason Galvin',
    role: 'Co-CTO and Advisor',
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
