import React from 'react'
import { Image, Flex, Text, Box } from '@chakra-ui/react'
import { ButtonTransition } from '../components/ImageTransition'

export default function Industry() {
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
          <Text fontSize="18px" fontWeight="400" color="#FFFFFF8A">
            PROJECTS
          </Text>
          <Flex id="headingIndustry">
            <Text color="#00A3FF">WeFund&nbsp;</Text>
            <Text>Supports All</Text>
          </Flex>
        </Flex>

        <Flex id="projectpad">
          {PROJECT_ITEMS.map((projectItem, index) => {
            const odd = index % 2 == 0
            return (
              <div
                className="containerIndustry"
                data-aos={odd ? 'fade-right' : 'fade-left'}
                key={index}
              >
                <div
                  className="containerIndustry__image"
                  style={{ backgroundImage: `url(${projectItem.imgsrc})` }}
                >
                  <Text
                    fontFamily="PilatExtended-Regular"
                    fontWeight="300"
                    color="#FFFFFF8A"
                    className="projectLabel containerIndustry__info"
                  >
                    -{projectItem.label}
                  </Text>
                  <Text
                    fontFamily="PilatExtended-Regular"
                    className="projectTitle containerIndustry__info"
                  >
                    {projectItem.title}
                  </Text>
                  <Text
                    fontFamily="Sk-Modernist-Regular"
                    fontWeight="700"
                    color={
                      projectItem.state === 'Ongoing' ? '#2BC54D' : '#FE8600'
                    }
                    className="projectState containerIndustry__info"
                    fontSize="18px"
                    mt="10px"
                  >
                    {projectItem.state}
                  </Text>
                  <Text
                    fontSize="18px"
                    fontWeight="400"
                    fontFamily="Sk-Modernist-Regular"
                    className="projectDesc containerIndustry__info"
                  >
                    {projectItem.description}
                  </Text>

                  {projectItem.state === 'Ongoing' && (
                    <Box>
                      <Flex
                        id="displayNoneInMobile"
                        className="containerIndustry__info"
                      >
                        <ButtonTransition
                          unitid={'cryptofunding' + index}
                          selected={false}
                          width="192px"
                          height="50px"
                          rounded="100px"
                        >
                          Start Funding
                        </ButtonTransition>
                      </Flex>
                      <Flex
                        id="displayNoneInDesktop"
                        className="containerIndustry__info"
                      >
                        <ButtonTransition
                          unitid={'cryptofunding' + index}
                          selected={false}
                          width="120px"
                          height="30px"
                          rounded="5px"
                        >
                          <Text color="white" fontSize="13px">
                            Start Funding
                          </Text>
                        </ButtonTransition>
                      </Flex>
                    </Box>
                  )}
                </div>
              </div>
            )
          })}
        </Flex>
        <Flex id="ProjectInMobile">
          {PROJECT_ITEMS.map((projectItem, index) => {
            const odd = index % 2 == 0
            return (
              <Flex
                className={odd ? 'PROJECT_ITEMS_ROW1' : 'PROJECT_ITEMS_ROW2'}
                data-aos={odd ? 'fade-right' : 'fade-left'}
                key={index}
              >
                <Flex className="projectItemContentCol">
                  <Box>
                    <Text
                      fontFamily="PilatExtended-Regular"
                      fontWeight="300"
                      color="#FFFFFF8A"
                      className="projectLabel"
                    >
                      -{projectItem.label}
                    </Text>
                    <Text
                      fontFamily="PilatExtended-Regular"
                      className="projectTitle"
                    >
                      {projectItem.title}
                    </Text>
                    <Text
                      fontFamily="Sk-Modernist-Regular"
                      fontWeight="700"
                      color={
                        projectItem.state === 'Ongoing' ? '#2BC54D' : '#FE8600'
                      }
                      className="projectState"
                      fontSize={{lg: "18px", base: "14px"}}
                      mt={{lg: "10px", base: "0px"}}
                    >
                      {projectItem.state}
                    </Text>
                    <Text
                      id="displayNoneInMobile"
                      className="projectDesc"
                      fontFamily="Sk-Modernist-Regular"
                    >
                      {projectItem.description}
                    </Text>
                    <Text
                      id="displayNoneInDesktop"
                      className="projectDesc"
                      fontFamily="Sk-Modernist-Regular"
                      mt="10px"
                      mb="20px"
                    >
                      {projectItem.description}
                    </Text>
                  </Box>
                  {projectItem.state === 'Ongoing' && (
                    <Box>
                      <Flex
                        id="displayNoneInMobile"
                        className="containerIndustry__info"
                      >
                        <ButtonTransition
                          unitid={'cryptofunding' + index}
                          selected={false}
                          width="200px"
                          height="50px"
                          rounded="100px"
                        >
                          Start Funding
                        </ButtonTransition>
                      </Flex>
                      <Flex
                        id="displayNoneInDesktop"
                        className="containerIndustry__info"
                      >
                        <ButtonTransition
                          unitid={'cryptofunding' + index}
                          selected={false}
                          width="120px"
                          height="40px"
                          rounded="100px"
                        >
                          <Text color="white" fontSize="13px">
                            Start Funding
                          </Text>
                        </ButtonTransition>
                      </Flex>
                    </Box>
                  )}
                </Flex>
                <Box className="projectItemImageCol">
                  <Image
                    alt="Crypto project"
                    src={projectItem.imgsrc}
                    w="100%"
                  />
                </Box>
              </Flex>
            )
          })}
        </Flex>
      </Flex>
    </Flex>
  )
}

const PROJECT_ITEMS = [
  {
    label: 'CRYPTO-STARTUP INDUSTRY',
    title: 'Crypto Cross-Chain Projects',
    state: 'Ongoing',
    description:
      'WeFund has the capability to host and incubate projects from various blockchains including Terra, Ethereum, Binance Smart Chain, and more.',
    imgsrc: '/media/CryptoProject.png',
  },
  {
    label: 'GAMING INDUSTRY',
    title: 'Gaming Projects',
    state: 'Coming soon',
    description:
      'Substantial growth in the gaming industry is bringing a lot of innovation. With WeFund, the players can be investors in the projects game developers want to build and receive financial incentives to invest.',
    imgsrc: '/media/GamingProject.png',
  },
  {
    label: 'CREATIVE INDUSTRY',
    title: 'Creative Projects',
    state: 'Coming soon',
    description:
      'Using WeFund, filmmakers, producers, and fans have the freedom to crowdfund the necessary capital for their projects. This removes the barrier of a limited budget as the fans are the main drivers of a project\'s success, not corporate decision-makers.',
    imgsrc: '/media/CreativeProject.png',
  },
  {
    label: 'SPORTS INDUSTRY',
    title: 'Sports Projects',
    state: 'Coming soon',
    description:
      'A fundraising campaign on WeFund could repurpose the souvenir spending of a team\'s fanbase and generate funds needed to fulfill the budget requirements of a team with more transparency.',
    imgsrc: '/media/SportsProject.png',
  },
  {
    label: 'REAL ESTATE INDUSTRY',
    title: 'Real Estate Projects',
    state: 'Coming soon',
    description:
      'Real estate is one of the most stable and low-risk long-term investments, however, there are many barriers that make real estate investing unattainable. Real estate projects on WeFund make real estate investing and its benefits more attainable.',
    imgsrc: '/media/RealEstateProject.png',
  },
]
