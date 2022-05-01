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
            <Text className="RoadmapHeading">Q1 2022</Text>
            <Image src="/media/beautifulDash.svg" />
            <Text className="RoadmapTitle">Platform V2</Text>
            <UnorderedList className="RoadmapDesc">
              <ListItem color="green">Community registration system</ListItem>
              <ListItem color="green"> Community project approval by voting power</ListItem>
              <ListItem color="green">Project creation with milestone system</ListItem>
              <ListItem color="green">Multi-stage fundraising</ListItem>
              <ListItem color="green">Milestone funds released with backers approval through voting power</ListItem>
            </UnorderedList>
          </Flex>
        </Flex>
        <Flex id="roadmapBox2">
          <Flex className="RoadmapContent2"></Flex>
          <Image src="/media/circle.svg" id="circleD" data-aos="zoom-in-up" />
          <Flex className="RoadmapContent" data-aos="fade-right">
            <Text className="RoadmapTitle">Team Extend</Text>
            <UnorderedList className="RoadmapDesc">
              <ListItem color="green">Advisors</ListItem>
              <ListItem color="green">CFO</ListItem>
            </UnorderedList>
          </Flex>
        </Flex>
        <Flex id="roadmapBox3">
          <Flex className="RoadmapContent2"></Flex>
          <Image src="/media/circle.svg" id="circleD" data-aos="zoom-in-up" />
          <Flex className="RoadmapContent" data-aos="fade-right">
            <Text className="RoadmapTitle">Project Incubation</Text>
            <UnorderedList className="RoadmapDesc">
              <ListItem color="green">Incubate 3 Projects</ListItem>
            </UnorderedList>
          </Flex>
        </Flex>
        <Flex id="roadmapBox4">
          <Flex className="RoadmapContent2"></Flex>
          <Image src="/media/circle.svg" id="circleD" data-aos="zoom-in-up" />
          <Flex className="RoadmapContent" data-aos="fade-right">
            <Text className="RoadmapTitle">Documentation</Text>
            <UnorderedList className="RoadmapDesc">
              <ListItem color="green">Release Whitepaper 2.0</ListItem>
              <ListItem color="green">Update Litepaper</ListItem>
            </UnorderedList>
          </Flex>
        </Flex>
        <Flex id="roadmapBox5">
          <Flex className="RoadmapContent2" data-aos="fade-left">
            <Text className="RoadmapHeading">Q2 2022</Text>
            <Image src="/media/beautifulDash.svg" />
            <Text className="RoadmapTitle">Platform V3</Text>
            <UnorderedList className="RoadmapDesc">
              <ListItem color="green">Set up WeFund holder allocation</ListItem>
              <ListItem color="green">Set up staking mechanism</ListItem>
            </UnorderedList>
          </Flex>
          <Image src="/media/circle.svg" id="circleD" data-aos="zoom-in-up" />
          <Flex className="RoadmapContent"></Flex>
        </Flex>
        <Flex id="roadmapBox6">
          <Flex className="RoadmapContent2" data-aos="fade-left">
            <Text className="RoadmapTitle">WeFund Launch</Text>
            <UnorderedList className="RoadmapDesc">
              <ListItem color="green">IDO price discovery + MultiLaunchpad IDO</ListItem>
              <ListItem color="green"> TGE + Exchange listing</ListItem>
            </UnorderedList>
          </Flex>
          <Image src="/media/circle.svg" id="circleD" data-aos="zoom-in-up" />
          <Flex className="RoadmapContent"></Flex>
        </Flex>
        <Flex id="roadmapBox7">
          <Flex className="RoadmapContent2" data-aos="fade-left">
            <Text className="RoadmapTitle">Project Incubation</Text>
            <UnorderedList className="RoadmapDesc">
              <ListItem color="green">Incubate 10 projects</ListItem>
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
            <Text className="RoadmapHeading">Q3 2022</Text>
            <Image src="/media/beautifulDash.svg" />
            <Text className="RoadmapTitle">Hackathon</Text>
            <UnorderedList className="RoadmapDesc">
              <ListItem>Have the Hackathon with Partners</ListItem>
            </UnorderedList>
          </Flex>
        </Flex>
        <Flex id="roadmapBox10">
          <Flex className="RoadmapContent2"></Flex>
          <Image src="/media/circle.svg" id="circleD" data-aos="zoom-in-up" />
          <Flex className="RoadmapContent">
            <Text className="RoadmapTitle">Project Incubation</Text>
            <UnorderedList className="RoadmapDesc">
              <ListItem>Complete the fundraising for the 10 projects incubate</ListItem>
              <ListItem>Incubate 10 new projects</ListItem>
              <ListItem>Real estate projects listed</ListItem>
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
            <Text className="RoadmapHeading">Q1 2022</Text>
            <Image src="/media/beautifulDash.svg" />
            <Text className="RoadmapTitle">Platform V2</Text>
            <UnorderedList className="RoadmapDesc">
              <ListItem color="green">Community registration system</ListItem>
              <ListItem color="green">WeFund project approval by voting power</ListItem>
              <ListItem color="green">Project creation with milestone system</ListItem>
              <ListItem color="green">Multi-stage fundraising</ListItem>
              <ListItem color="green">Milestone funds released with backers approval through voting power</ListItem>
            </UnorderedList>
          </Flex>
        </Flex>
        <Flex id="roadmapBox2">
          <Image src="/media/circle.svg" id="circleD" data-aos="zoom-in-up" />
          <Flex className="RoadmapContent" data-aos="fade-right">
            <Text className="RoadmapTitle">Team Extend</Text>
            <UnorderedList className="RoadmapDesc">
            <ListItem color="green">Advisors</ListItem>
              <ListItem color="green">CFO</ListItem>
            </UnorderedList>
          </Flex>
        </Flex>
        <Flex id="roadmapBox3">
          <Image src="/media/circle.svg" id="circleD" data-aos="zoom-in-up" />
          <Flex className="RoadmapContent" data-aos="fade-right">
            <Text className="RoadmapTitle">Project Incubation</Text>
            <UnorderedList className="RoadmapDesc">
            <ListItem color="green">Incubate 3 Projects</ListItem>
            </UnorderedList>
          </Flex>
        </Flex>
        <Flex id="roadmapBox4">
          <Image src="/media/circle.svg" id="circleD" data-aos="zoom-in-up" />
          <Flex className="RoadmapContent" data-aos="fade-right">
            <Text className="RoadmapTitle">Documentation</Text>
            <UnorderedList className="RoadmapDesc">
              <ListItem color="green">Release Whitepaper 2.0</ListItem>
              <ListItem color="green"> Update Litepaper</ListItem>
            </UnorderedList>
          </Flex>
        </Flex>
        <Flex id="roadmapBox5">
          <Image src="/media/circle.svg" id="circleD" data-aos="zoom-in-up" />
          <Flex className="RoadmapContent" data-aos="fade-right">
            <Text className="RoadmapHeading">Q2 2022</Text>
            <Image src="/media/beautifulDash.svg" />
            <Text className="RoadmapTitle">Platform V3</Text>
            <UnorderedList className="RoadmapDesc">
              <ListItem color="green">Set up community allocation</ListItem>
              <ListItem color="green">Set up WeFund holder allocation</ListItem>
              <ListItem color="green">Set up staking mechanism</ListItem>
            </UnorderedList>
          </Flex>
        </Flex>
        <Flex id="roadmapBox6">
          <Image src="/media/circle.svg" id="circleD" data-aos="zoom-in-up" />
          <Flex className="RoadmapContent" data-aos="fade-right">
            <Text className="RoadmapTitle">WeFund Launch</Text>
            <UnorderedList className="RoadmapDesc">
               <ListItem color="green">IDO price discovery + MultiLaunchpad IDO</ListItem>
               <ListItem color="green"> TGE + Exchange listing</ListItem>
            </UnorderedList>
          </Flex>
        </Flex>
        <Flex id="roadmapBox7">
          <Image src="/media/circle.svg" id="circleD" data-aos="zoom-in-up" />
          <Flex className="RoadmapContent" data-aos="fade-right">
            <Text className="RoadmapTitle">Project Incubation</Text>
            <UnorderedList className="RoadmapDesc">
            <ListItem color="green">Incubate 10 projects</ListItem>
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
            <Text className="RoadmapHeading">Q3 2022</Text>
            <Image src="/media/beautifulDash.svg" />
            <Text className="RoadmapTitle">Hackathon</Text>
            <UnorderedList className="RoadmapDesc">
            <ListItem>Have the Hackathon with Partners</ListItem>
            </UnorderedList>
          </Flex>
        </Flex>
        <Flex id="roadmapBox10">
          <Image src="/media/circle.svg" id="circleD" data-aos="zoom-in-up" />
          <Flex className="RoadmapContent" data-aos="fade-right">
            <Text className="RoadmapTitle">Project Incubation</Text>
            <UnorderedList className="RoadmapDesc">
              <ListItem>Complete the fundraising for the 10 projects incubate</ListItem>
              <ListItem>Incubate 10 new projects</ListItem>
              <ListItem>Real estate projects listed</ListItem>
            </UnorderedList>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}