import { Flex, Image, Text, UnorderedList, ListItem } from '@chakra-ui/react'
import React from 'react'

export default function Roadmap() {
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
        data-aos="fade-down"
        direction="column"
        textAlign="center"
        fontFamily="Sk-Modernist-Regular"
      >
        <Text id="aboutUsPageLable">ROADMAP</Text>
        <Flex id="headingIndustry">
          <Text color="#00A3FF">WeFund&nbsp;</Text>
          <Text>Roadmap</Text>
        </Flex>
      </Flex>

      {/* {/ Roadmap For Desktop /} */}
      <Flex id="RoadMapDesktop">
        <Image src="/media/RoadmapLine.svg" data-aos="zoom-in-up" />
        <Flex id="roadmapBox1">
          <Flex className="RoadmapContent2"></Flex>
          <Image src="/media/circle.svg" id="circleD" data-aos="zoom-in-up" />
          <Flex className="RoadmapContent" data-aos="fade-right">
            <Text className="RoadmapHeading">January 2022</Text>
            <Image src="/media/beautifulDash.svg" />
            <Text className="RoadmapTitle">Platform V2</Text>
            <UnorderedList className="RoadmapDesc">
              <ListItem>Community registration system</ListItem>
              <ListItem>Community project approval by voting power</ListItem>
              <ListItem>Project creation with milestone system</ListItem>
              <ListItem>Multi-stage fundraising</ListItem>
              <ListItem>Milestone funds released with backers approval through voting power</ListItem>
              <ListItem>Customer service</ListItem>
            </UnorderedList>
          </Flex>
        </Flex>
        <Flex id="roadmapBox2">
          <Flex className="RoadmapContent2"></Flex>
          <Image src="/media/circle.svg" id="circleD" data-aos="zoom-in-up" />
          <Flex className="RoadmapContent" data-aos="fade-right">
            <Text className="RoadmapTitle">WeFund Investment Status</Text>
            <UnorderedList className="RoadmapDesc">
              <ListItem>Seed phase until end of January</ListItem>
              <ListItem>Pre-sale begins</ListItem>
            </UnorderedList>
          </Flex>
        </Flex>
        <Flex id="roadmapBox3">
          <Flex className="RoadmapContent2"></Flex>
          <Image src="/media/circle.svg" id="circleD" data-aos="zoom-in-up" />
          <Flex className="RoadmapContent" data-aos="fade-right">
            <Text className="RoadmapTitle">Project Incubation</Text>
            <UnorderedList className="RoadmapDesc">
              <ListItem>Bakso Mania Seed Phase</ListItem>
              <ListItem>Pandai Crypto Seed Phase</ListItem>
              <ListItem>LynxVR Seed Phase</ListItem>
            </UnorderedList>
          </Flex>
        </Flex>
        <Flex id="roadmapBox4">
          <Flex className="RoadmapContent2"></Flex>
          <Image src="/media/circle.svg" id="circleD" data-aos="zoom-in-up" />
          <Flex className="RoadmapContent" data-aos="fade-right">
            <Text className="RoadmapTitle">Documentation</Text>
            <UnorderedList className="RoadmapDesc">
              <ListItem>Release Whitepaper 2.0</ListItem>
              <ListItem>Update Litepaper</ListItem>
            </UnorderedList>
          </Flex>
        </Flex>
        <Flex id="roadmapBox5">
          <Flex className="RoadmapContent2" data-aos="fade-left">
            <Text className="RoadmapHeading">February 2022</Text>
            <Image src="/media/beautifulDash.svg" />
            <Text className="RoadmapTitle">Platform V3</Text>
            <UnorderedList className="RoadmapDesc">
              <ListItem>Set up community allocation</ListItem>
              <ListItem>Set up WeFund holder allocation</ListItem>
              <ListItem>Set up staking mechanism</ListItem>
            </UnorderedList>
          </Flex>
          <Image src="/media/circle.svg" id="circleD" data-aos="zoom-in-up" />
          <Flex className="RoadmapContent"></Flex>
        </Flex>
        <Flex id="roadmapBox6">
          <Flex className="RoadmapContent2" data-aos="fade-left">
            <Text className="RoadmapTitle">WeFund Investment Status</Text>
            <UnorderedList className="RoadmapDesc">
              <ListItem>Presale phase until end of February</ListItem>
              <ListItem>Marketing for IWO</ListItem>
            </UnorderedList>
          </Flex>
          <Image src="/media/circle.svg" id="circleD" data-aos="zoom-in-up" />
          <Flex className="RoadmapContent"></Flex>
        </Flex>
        <Flex id="roadmapBox7">
          <Flex className="RoadmapContent2" data-aos="fade-left">
            <Text className="RoadmapTitle">Project Incubation</Text>
            <UnorderedList className="RoadmapDesc">
              <ListItem>Real World Projects (Details coming soon)</ListItem>
            </UnorderedList>
          </Flex>
          <Image src="/media/circle.svg" id="circleD" data-aos="zoom-in-up" />
          <Flex className="RoadmapContent"></Flex>
        </Flex>
        <Flex id="roadmapBox8">
          <Flex className="RoadmapContent2" data-aos="fade-left">
            <Text className="RoadmapTitle">Documentation</Text>
            <UnorderedList className="RoadmapDesc">
              <ListItem>Release Whitepaper 3.0</ListItem>
              <ListItem>Update Litepaper</ListItem>
            </UnorderedList>
          </Flex>
          <Image src="/media/circle.svg" id="circleD" data-aos="zoom-in-up" />
          <Flex className="RoadmapContent"></Flex>
        </Flex>
        <Flex id="roadmapBox9">
          <Flex className="RoadmapContent2"></Flex>
          <Image src="/media/circle.svg" id="circleD" data-aos="zoom-in-up" />
          <Flex className="RoadmapContent" data-aos="fade-right">
            <Text className="RoadmapHeading">March 2022</Text>
            <Image src="/media/beautifulDash.svg" />
            <Text className="RoadmapTitle">WeFund Investment Status</Text>
            <UnorderedList className="RoadmapDesc">
              <ListItem>IWO</ListItem>
            </UnorderedList>
          </Flex>
        </Flex>
        <Flex id="roadmapBox10">
          <Flex className="RoadmapContent2"></Flex>
          <Image src="/media/circle.svg" id="circleD" data-aos="zoom-in-up" />
          <Flex className="RoadmapContent">
            <Text className="RoadmapTitle">Project Incubation</Text>
            <UnorderedList className="RoadmapDesc">
              <ListItem>Sport industry first project - Seed phase</ListItem>
              <ListItem>Game industry first project - Seed phase</ListItem>
              <ListItem>Creative industry first project - Seed phase</ListItem>
              <ListItem>Real estate industry first project - Seed phase</ListItem>
            </UnorderedList>
          </Flex>
        </Flex>
      </Flex>
      {/* {/ Roadmap For Desktop /} */}

      {/* {/ Roadmap For Mobile /} */}
      <Flex id="RoadMapMobile">
        <Image src="/media/RoadmapLine.svg" id="roadMapLineId" />
        <Flex id="roadmapBox1">
          <Image src="/media/circle.svg" id="circleD" data-aos="zoom-in-up" />
          <Flex className="RoadmapContent" data-aos="fade-right">
            <Text className="RoadmapHeading">January 2022</Text>
            <Image src="/media/beautifulDash.svg" />
            <Text className="RoadmapTitle">Platform V2</Text>
            <UnorderedList className="RoadmapDesc">
              <ListItem>Community registration system</ListItem>
              <ListItem>Community project approval by voting power</ListItem>
              <ListItem>Project creation with milestone system</ListItem>
              <ListItem>Multi-stage fundraising</ListItem>
              <ListItem>Milestone funds released with backers approval through voting power</ListItem>
              <ListItem>Customer service</ListItem>
            </UnorderedList>
          </Flex>
        </Flex>
        <Flex id="roadmapBox2">
          <Image src="/media/circle.svg" id="circleD" data-aos="zoom-in-up" />
          <Flex className="RoadmapContent" data-aos="fade-right">
            <Text className="RoadmapTitle">WeFund Investment Status</Text>
            <UnorderedList className="RoadmapDesc">
              <ListItem>Seed phase until end of January</ListItem>
              <ListItem>Pre-sale begins</ListItem>
            </UnorderedList>
          </Flex>
        </Flex>
        <Flex id="roadmapBox3">
          <Image src="/media/circle.svg" id="circleD" data-aos="zoom-in-up" />
          <Flex className="RoadmapContent" data-aos="fade-right">
            <Text className="RoadmapTitle">Project Incubation</Text>
            <UnorderedList className="RoadmapDesc">
              <ListItem>Bakso Mania Seed Phase</ListItem>
              <ListItem>Pandai Crypto Seed Phase</ListItem>
              <ListItem>LynxVR Seed Phase</ListItem>
            </UnorderedList>
          </Flex>
        </Flex>
        <Flex id="roadmapBox4">
          <Image src="/media/circle.svg" id="circleD" data-aos="zoom-in-up" />
          <Flex className="RoadmapContent" data-aos="fade-right">
            <Text className="RoadmapTitle">Documentation</Text>
            <UnorderedList className="RoadmapDesc">
              <ListItem>Release Whitepaper 2.0</ListItem>
              <ListItem>Update Litepaper</ListItem>
            </UnorderedList>
          </Flex>
        </Flex>
        <Flex id="roadmapBox5">
          <Image src="/media/circle.svg" id="circleD" data-aos="zoom-in-up" />
          <Flex className="RoadmapContent" data-aos="fade-right">
            <Text className="RoadmapHeading">February 2022</Text>
            <Image src="/media/beautifulDash.svg" />
            <Text className="RoadmapTitle">Platform V3</Text>
            <UnorderedList className="RoadmapDesc">
              <ListItem>Set up community allocation</ListItem>
              <ListItem>Set up WeFund holder allocation</ListItem>
              <ListItem>Set up staking mechanism</ListItem>
            </UnorderedList>
          </Flex>
        </Flex>
        <Flex id="roadmapBox6">
          <Image src="/media/circle.svg" id="circleD" data-aos="zoom-in-up" />
          <Flex className="RoadmapContent" data-aos="fade-right">
            <Text className="RoadmapTitle">WeFund Investment Status</Text>
            <UnorderedList className="RoadmapDesc">
              <ListItem>Presale phase until end of February</ListItem>
              <ListItem>Marketing for IWO</ListItem>
            </UnorderedList>
          </Flex>
        </Flex>
        <Flex id="roadmapBox7">
          <Image src="/media/circle.svg" id="circleD" data-aos="zoom-in-up" />
          <Flex className="RoadmapContent" data-aos="fade-right">
            <Text className="RoadmapTitle">Project Incubation</Text>
            <UnorderedList className="RoadmapDesc">
              <ListItem>Real World Projects (Details coming soon)</ListItem>
            </UnorderedList>
          </Flex>
        </Flex>
        <Flex id="roadmapBox8">
          <Image src="/media/circle.svg" id="circleD" data-aos="zoom-in-up" />
          <Flex className="RoadmapContent" data-aos="fade-right">
            <Text className="RoadmapTitle">Documentation</Text>
            <UnorderedList className="RoadmapDesc">
              <ListItem>Release Whitepaper 3.0</ListItem>
              <ListItem>Update Litepaper</ListItem>
            </UnorderedList>
          </Flex>
        </Flex>
        <Flex id="roadmapBox9">
          <Image src="/media/circle.svg" id="circleD" data-aos="zoom-in-up" />
          <Flex className="RoadmapContent" data-aos="fade-right">
            <Text className="RoadmapHeading">March 2022</Text>
            <Image src="/media/beautifulDash.svg" />
            <Text className="RoadmapTitle">WeFund Investment Status</Text>
            <UnorderedList className="RoadmapDesc">
              <ListItem>IWO</ListItem>
            </UnorderedList>
          </Flex>
        </Flex>
        <Flex id="roadmapBox10">
          <Image src="/media/circle.svg" id="circleD" data-aos="zoom-in-up" />
          <Flex className="RoadmapContent" data-aos="fade-right">
            <Text className="RoadmapTitle">Project Incubation</Text>
            <UnorderedList className="RoadmapDesc">
              <ListItem>Sport industry first project - Seed phase</ListItem>
              <ListItem>Game industry first project - Seed phase</ListItem>
              <ListItem>Creative industry first project - Seed phase</ListItem>
              <ListItem>Real estate industry first project - Seed phase</ListItem>
            </UnorderedList>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
