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
                      {projectItem.mobile}
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
      'WeFund is an incubator of projects on all blockchains, with the aim of helping projects at every stage to "Convert an idea into a project"  "Prepare the project for fundraising"  "Plan project development with milestones"  "Complete the project: We want to make projects 100% winning" WeFund has the capability to host and incubate projects from various blockchains including Terra, Ethereum, Binance Smart Chain, and more.',
    mobile:
      'WeFund has the capability to host and incubate projects from various blockchains including Terra, Ethereum, Binance Smart Chain, and more.',
    imgsrc: '/media/CryptoProject.png',
  },
  {
    label: 'GAMING INDUSTRY',
    title: 'Gaming Projects',
    state: 'Coming soon',
    description:
      "The global video game industry is one of the largest and most stable, and experienced tremendous growth over the past two years. The substantial growth also brought a lot of innovation expected to continually drive the growth in the coming years. One of the key drivers for success of a company or game is the dialogue between game developers and the players. With WeFund, the players can be investors in the projects game developers want to build. With WeFund's system and profit-sharing incentive, the players will determine the success of projects and any campaigns that do not reach its fundraising goal will have the capital returned to the investors. Substantial growth in the gaming industry is bringing a lot of innovation. With WeFund, the players can be investors in the projects game developers want to build and receive financial incentives to invest.",
    mobile:
      'Substantial growth in the gaming industry is bringing a lot of innovation. With WeFund, the players can be investors in the projects game developers want to build and receive financial incentives to invest.',
    imgsrc: '/media/GamingProject.png',
  },
  {
    label: 'CREATIVE INDUSTRY',
    title: 'Creative Projects',
    state: 'Coming soon',
    description:
      "Content creators are dependent on the platforms hosting them. For example, in 2021 OnlyFans creators specializing in adult content were (briefly) banned from the platform. According to Time.com, OnlyFans made the decision to ban adult content because banks and other financial institutions were not willing to invest in OnlyFans when they were hosting adult content creators. With WeFunds decentralization, there is a solution for content creators to express and share their content without the uncertainty of their content being restricted. According to insider.com, there were 31 Netflix series that were canceled in 2021 with budget being one of the main reasons. By using WeFund, film makers, producers, and fans have the freedom to crowdfund the necessary capital for their projects. This removes the barrier of budget as fans, rather than corporate decision-makers, become the main drivers of a project's success.",
    mobile:
      'Using WeFund, filmmakers, producers, and fans have the freedom to crowdfund the necessary capital for their projects. This removes the barrier of a limited budget as the fans are the main drivers of a project\'s success, not corporate decision-makers.',
    imgsrc: '/media/CreativeProject.png',
  },
  {
    label: 'SPORTS INDUSTRY',
    title: 'Sports Projects',
    state: 'Coming soon',
    description:
      "A recent example in the world of sports, the owner of the Barcelona Football Club was forced to sell the best player in the world, Lionel Messi, as his salary was not sustainable. FC Barcelona has 227.3 million fans globally and the fans are willing to spend a lot of money on their team and its memorabilia. A fundraising campaign on WeFund could repurpose the souvenir spending of its fans and instead generate the funds needed to fulfill the salary requirements of Lionel Messi. In this case, a small donation from a small percentage of the club's fanbase could have fulfilled the funding requirements. A fundraising campaign on WeFund could repurpose the souvenir spending of a team's fanbase and generate funds needed to fulfill the budget requirements of a team with more transparency.",
    mobile:
      'A fundraising campaign on WeFund could repurpose the souvenir spending of a team\'s fanbase and generate funds needed to fulfill the budget requirements of a team with more transparency.',
    imgsrc: '/media/SportsProject.png',
  },
  {
    label: 'REAL ESTATE INDUSTRY',
    title: 'Real Estate Projects',
    state: 'Coming soon',
    description:
      "Real estate is one of the most stable and low risk long-term investments, however, there are many barriers that make real estate investing unattainable. With WeFund these barriers will no longer be a problem as each person invests as much as they want and is able to decide the risk they are comfortable with. WeFund aims to drastically improve the selection and quality of real estate projects by the direct participation in the investment by all stakeholders. The projects will reach the fundraising goals when a large number of backers are directly invested and involved. One of the components restricting the growth of real estate, and many other industries, is the inability to reach a larger community of investors that know consumer demands. WeFund brings together the strength of many, not a few, to benefit financially and show support for projects that meet the consumer's demands.",
    mobile:
      'Real estate is one of the most stable and low-risk long-term investments, however, there are many barriers that make real estate investing unattainable. Real estate projects on WeFund make real estate investing and its benefits more attainable.',
    imgsrc: '/media/RealEstateProject.png',
  },
]
