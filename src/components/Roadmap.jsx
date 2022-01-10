import { Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'

export default function Roadmaps() {
  return (
    <Flex
      w="100%"
      pt="47px"
      mt="100px"
      mb="200px"
      justify="center"
      direction="column"
      alignItems="center"
    >
      <Flex
        direction="column"
        textAlign="center"
        fontFamily="Sk-Modernist-Regular"
      >
        <Text id="aboutUsPageLable">ROADMAP</Text>
        <Flex id="headingIndustry">
          <Text color="#00A3FF">WeFund&nbsp;</Text>
          <Text>RoadMap</Text>
        </Flex>
      </Flex>

      {/* {/ Road Map For Desktop /} */}
      <Flex id="RoadMapDesktop">
        <Image src="/RoadmapLine.svg" />
        <Flex id="roadmapBox1">
          <Flex className="RoadmapContent2"></Flex>
          <Image src="/circle.svg" id="circleD" />
          <Flex className="RoadmapContent">
            <Text className="RoadmapHeading">January 2022</Text>
            <Image src="/beautifulDash.svg" />
            <Text className="RoadmapTitle">Platform V2</Text>
            <Text className="RoadmapDesc">
              -Community registration system -Community Project Approval by
              voting power -Create project with milestone system -Multi-stage
              fundraising -Milestone money release with Backers approval voting
              power -Customer Service
            </Text>
          </Flex>
        </Flex>
        <Flex id="roadmapBox2">
          <Flex className="RoadmapContent2">
            <Text className="RoadmapTitle">WeFund Investment Status</Text>
            <Text className="RoadmapDesc">
              -Seed Phase until end of January -Starting PreSale
            </Text>
          </Flex>
          <Image src="/circle.svg" id="circleD" />
          <Flex className="RoadmapContent"></Flex>
        </Flex>
        <Flex id="roadmapBox3">
          <Flex className="RoadmapContent2"></Flex>
          <Image src="/circle.svg" id="circleD" />
          <Flex className="RoadmapContent">
            <Text className="RoadmapTitle">Projects Incubates</Text>
            <Text className="RoadmapDesc">
              Bakso Mania Seed Phase, Pandai Crypto Seed Phase, LinkxVR Seed
              Phase
            </Text>
          </Flex>
        </Flex>
        <Flex id="roadmapBox4">
          <Flex className="RoadmapContent2">
            <Text className="RoadmapTitle">Documentation</Text>
            <Text className="RoadmapDesc">
              Release WhitePaper 2.0 Update Litepaper
            </Text>
          </Flex>
          <Image src="/circle.svg" id="circleD" />
          <Flex className="RoadmapContent"></Flex>
        </Flex>
        <Flex id="roadmapBox5">
          <Flex className="RoadmapContent2"></Flex>
          <Image src="/circle.svg" id="circleD" />
          <Flex className="RoadmapContent">
            <Text className="RoadmapHeading">February 2022</Text>
            <Image src="/beautifulDash.svg" />
            <Text className="RoadmapTitle">Platform V3</Text>
            <Text className="RoadmapDesc">
              Set up Community allocation, Set up WeFund holder allocation, Set
              up staking mechanism
            </Text>
          </Flex>
        </Flex>
        <Flex id="roadmapBox6">
          <Flex className="RoadmapContent2">
            <Text className="RoadmapTitle">WeFund Investment Status</Text>
            <Text className="RoadmapDesc">
              -PreSale Phase until end of February -Pre marketing for IWO
            </Text>
          </Flex>
          <Image src="/circle.svg" id="circleD" />
          <Flex className="RoadmapContent"></Flex>
        </Flex>
        <Flex id="roadmapBox7">
          <Flex className="RoadmapContent2"></Flex>
          <Image src="/circle.svg" id="circleD" />
          <Flex className="RoadmapContent">
            <Text className="RoadmapTitle">Projects Incubates</Text>
            <Text className="RoadmapDesc">
              Green House Seed Phase (Real World Projects), Recycling Bali Seed
              Phase (Real World Projects), NaturalPool Seed Phase (Real World
              Projects), GreenProtocol Seed Phase, BattleChain of Duty Seed
              Phase, JobChain Seed Phase
            </Text>
          </Flex>
        </Flex>
        <Flex id="roadmapBox8">
          <Flex className="RoadmapContent2">
            <Text className="RoadmapTitle">Documentation</Text>
            <Text className="RoadmapDesc">
              Release WhitePaper 3.0, Update Litepaper
            </Text>
          </Flex>
          <Image src="/circle.svg" id="circleD" />
          <Flex className="RoadmapContent"></Flex>
        </Flex>
        <Flex id="roadmapBox9">
          <Flex className="RoadmapContent2"></Flex>
          <Image src="/circle.svg" id="circleD" />
          <Flex className="RoadmapContent">
            <Text className="RoadmapHeading">March 2022</Text>
            <Image src="/beautifulDash.svg" />
            <Text className="RoadmapTitle">WeFund Investment Status</Text>
            <Text className="RoadmapDesc">- IWO</Text>
          </Flex>
        </Flex>
        <Flex id="roadmapBox10">
          <Flex className="RoadmapContent2">
            <Text className="RoadmapTitle">Project Incubate</Text>
            <Text className="RoadmapDesc">
              Sport Industry first Project Seed Phase, Game Industry first
              Project Seed Phase, Creative Industry first Project Seed Phase,
              Real Estate Industry first Project Seed Phase
            </Text>
          </Flex>
          <Image src="/circle.svg" id="circleD" />
          <Flex className="RoadmapContent"></Flex>
        </Flex>
      </Flex>
      {/* {/ Road Map For Desktop /} */}

      {/* {/ Road Map For Mobile /} */}
      <Flex id="RoadMapMobile">
        <Image src="/RoadmapLine.svg" id="roadMapLineId" />
        <Flex id="roadmapBox1">
          <Image src="/circle.svg" id="circleD" />
          <Flex className="RoadmapContent">
            <Text className="RoadmapHeading">January 2022</Text>
            <Image src="/beautifulDash.svg" />
            <Text className="RoadmapTitle">Platform V2</Text>
            <Text className="RoadmapDesc">
              -Community registration system -Community Project Approval by
              voting power -Create project with milestone system -Multi-stage
              fundraising -Milestone money release with Backers approval voting
              power -Customer Service
            </Text>
          </Flex>
        </Flex>
        <Flex id="roadmapBox2">
          <Image src="/circle.svg" id="circleD" />
          <Flex className="RoadmapContent">
            <Text className="RoadmapTitle">WeFund Investment Status</Text>
            <Text className="RoadmapDesc">
              -Seed Phase until end of January -Starting PreSale
            </Text>
          </Flex>
        </Flex>
        <Flex id="roadmapBox3">
          <Image src="/circle.svg" id="circleD" />
          <Flex className="RoadmapContent">
            <Text className="RoadmapTitle">Projects Incubates</Text>
            <Text className="RoadmapDesc">
              Bakso Mania Seed Phase, Pandai Crypto Seed Phase, LinkxVR Seed
              Phase
            </Text>
          </Flex>
        </Flex>
        <Flex id="roadmapBox4">
          <Image src="/circle.svg" id="circleD" />
          <Flex className="RoadmapContent">
            <Text className="RoadmapTitle">Documentation</Text>
            <Text className="RoadmapDesc">
              Release WhitePaper 2.0 Update Litepaper
            </Text>
          </Flex>
        </Flex>
        <Flex id="roadmapBox5">
          <Image src="/circle.svg" id="circleD" />
          <Flex className="RoadmapContent">
            <Text className="RoadmapHeading">February 2022</Text>
            <Image src="/beautifulDash.svg" />
            <Text className="RoadmapTitle">Platform V3</Text>
            <Text className="RoadmapDesc">
              Set up Community allocation, Set up WeFund holder allocation, Set
              up staking mechanism
            </Text>
          </Flex>
        </Flex>
        <Flex id="roadmapBox6">
          <Image src="/circle.svg" id="circleD" />
          <Flex className="RoadmapContent">
            <Text className="RoadmapTitle">WeFund Investment Status</Text>
            <Text className="RoadmapDesc">
              -PreSale Phase until end of February -Pre marketing for IWO
            </Text>
          </Flex>
        </Flex>
        <Flex id="roadmapBox7">
          <Image src="/circle.svg" id="circleD" />
          <Flex className="RoadmapContent">
            <Text className="RoadmapTitle">Projects Incubates</Text>
            <Text className="RoadmapDesc">
              Green House Seed Phase (Real World Projects), Recycling Bali Seed
              Phase (Real World Projects), NaturalPool Seed Phase (Real World
              Projects), GreenProtocol Seed Phase, BattleChain of Duty Seed
              Phase, JobChain Seed Phase
            </Text>
          </Flex>
        </Flex>
        <Flex id="roadmapBox8">
          <Image src="/circle.svg" id="circleD" />
          <Flex className="RoadmapContent">
            <Text className="RoadmapTitle">Documentation</Text>
            <Text className="RoadmapDesc">
              Release WhitePaper 3.0, Update Litepaper
            </Text>
          </Flex>
        </Flex>
        <Flex id="roadmapBox9">
          <Image src="/circle.svg" id="circleD" />
          <Flex className="RoadmapContent">
            <Text className="RoadmapHeading">March 2022</Text>
            <Image src="/beautifulDash.svg" />
            <Text className="RoadmapTitle">WeFund Investment Status</Text>
            <Text className="RoadmapDesc">- IWO</Text>
          </Flex>
        </Flex>
        <Flex id="roadmapBox10">
          <Image src="/circle.svg" id="circleD" />
          <Flex className="RoadmapContent">
            <Text className="RoadmapTitle">Project Incubate</Text>
            <Text className="RoadmapDesc">
              Sport Industry first Project Seed Phase, Game Industry first
              Project Seed Phase, Creative Industry first Project Seed Phase,
              Real Estate Industry first Project Seed Phase
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
