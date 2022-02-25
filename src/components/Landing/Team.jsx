import React from 'react'
import { Image, Flex, Text, Link } from '@chakra-ui/react'

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
              <Flex my="20px" height="40px" justify={'space-around'}>
                {projectItem.logos?.map((e) => (
                  <Image
                    src={e}
                    width={'40px'}
                    objectFit="contain"
                    background={'white'}
                    borderRadius={'3px'}
                  />
                ))}
              </Flex>
              <Flex w="100%" alignItems="center" justify="space-between">
                <Text fontSize={'18px'} fontFamily={'PilatExtended-Bold'}>
                  {projectItem.name}
                </Text>
                <Link href={projectItem.link} isExternal>
                  <Image
                    width="25px"
                    height="25px"
                    src="/media/linkedin.png"
                    cursor="pointer"
                    background="white"
                    borderRadius="6px"
                    border="0"
                  />
                </Link>
              </Flex>
              <Text fontSize={'13px'} fontFamily={'PilatExtended-Regular'}>
                {projectItem.role}
              </Text>
              <Text className="missionDesc">{projectItem.description}</Text>
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
    description:
      'CEO of Mosquito Solution / Bello Service / Hotel Lanca Funds Manager in Axa and Zurich Soft Developer on ABB, Ing. Maggia and General Electric',
    imgsrc: '/media/Team/wfd-andrea.jpg',
  },
  {
    name: 'Ika Afifah',
    role: 'CMO and Co-Founder',
    link: 'https://linkedin.com/in/ika-nur-afifah/',
    description:
      'Tencent > Tencent Music Entertainment > Responsible for partnerships and handling clients, Bigo > Agency Management Specialist > handling clients, Waves > Manager of Indonesia, helped co-founders raise $1.2M in pre-seed funding',
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
    description:
      'Investment Manager at Pegasus Tech Ventures Business Analyst at Harman International Revenue Management Analyst at Holland America Line',
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
    description:
      'Senior Software Engineer with 20 years experience in Silicon Valley at GoPro, General Things, Provident Funding, BearingPoint, RealNames, etc.',
    imgsrc: '/media/Team/wfd-jason.jpg',
    logos: [
      '/media/Team_Companies/GoPro.jpeg',
      '/media/Team_Companies/GeneralThings.png',
      '/media/Team_Companies/ProvidentFunding.jpg',
      '/media/Team_Companies/BearingPoint.jpg',
    ],
  },
]
