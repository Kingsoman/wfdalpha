import React from 'react'
import { Flex, Text, UnorderedList, ListItem } from '@chakra-ui/react'

export default function Roadmap() {
  return (
    <Flex
      pt={'3em'}
      width="100%"
      position="relative"
      alignItems="center"
      flexDirection="column"
      pb={{ base: '2em', md: '5em', lg: '10em' }}
      mt={{ base: '2em', md: '5em', lg: '5em' }}
    >
      <Flex fontFamily="PilatExtended-Bold" fontSize="20px">
        <Text color="#63CDFA">ROADMAP</Text>
      </Flex>

      {/* {/ Roadmap For Desktop /} */}
      <Flex
        mt={'2em'}
        position="relative"
        alignItems={'center'}
        flexDirection="column"
        justifyContent={'flex-start'}
        height={{ base: '35em', md: '60em', lg: '60em' }}
        display={{ base: 'none', md: 'flex', lg: 'flex' }}
      >
        <Flex
          borderRadius="10px"
          backgroundColor={'#69E4FF'}
          height={{ base: '33em', md: '53em', lg: '53em' }}
          width={{ base: '.3em', md: '.4em', lg: '.4em' }}
        />

        <Flex id="roadmapBox1" top={'0'}>
          <Flex className="RoadmapContent2"></Flex>
          <Flex
            width={'1.5em'}
            height={'1.5em'}
            borderRadius="100px"
            data-aos="zoom-in-up"
            backgroundColor="#69E4FF"
          />
          <Flex className="RoadmapContent" data-aos="fade-right">
            <Flex fontFamily="PilatExtended-Bold" fontSize="20px">
              <Text color="#63CDFA">Q1</Text>
              <Text color="white" ml={'10px'}>
                2022
              </Text>
            </Flex>

            <UnorderedList className="RoadmapDesc" ml={'0'}>
              <ListItem color={'green.300'}>Platform 1.0 launch</ListItem>
              <ListItem color={'green.300'}>
                Community registration system
              </ListItem>
              <ListItem color={'green.300'}>
                Investor project approval by voting power Create a project with
                the milestone system Multi-stage fundraising
              </ListItem>
              <ListItem color={'green.300'}>
                Milestone money release with backer’s approval voting power
              </ListItem>
              <ListItem color={'green.300'}>
                Complete Seed/Private sale fundraise
              </ListItem>
              <ListItem color={'white'}>Complete Presale fundraise</ListItem>
              <ListItem color={'white'}>
                Marketing for Initial Offering
              </ListItem>
              <ListItem color={'white'}>
                10 projects for incubation and fundraise
              </ListItem>
            </UnorderedList>
          </Flex>
        </Flex>
        <Flex id="roadmapBox2" top={'25em'}>
          <Flex className="RoadmapContent2">
            <Flex fontFamily="PilatExtended-Bold" fontSize="20px">
              <Text color="#63CDFA">Q2</Text>
              <Text color="white" ml={'10px'}>
                2022
              </Text>
            </Flex>

            <UnorderedList className="RoadmapDesc">
              <ListItem color={'white'}>
                Fundraising for the project hosted on WeFund
              </ListItem>
              <ListItem color={'white'}>Platform update 2.0</ListItem>
              <ListItem color={'white'}>
                Have 10 projects hosted on WeFund
              </ListItem>
              <ListItem color={'white'}>
                Real-world project implementation
              </ListItem>
            </UnorderedList>
          </Flex>
          <Flex
            width={'1.5em'}
            height={'1.5em'}
            borderRadius="100px"
            data-aos="zoom-in-up"
            backgroundColor="#69E4FF"
          />
          <Flex className="RoadmapContent" data-aos="fade-right"></Flex>
        </Flex>
        <Flex id="roadmapBox3" top={'39em'}>
          <Flex className="RoadmapContent2"></Flex>
          <Flex
            width={'1.5em'}
            height={'1.5em'}
            borderRadius="100px"
            data-aos="zoom-in-up"
            backgroundColor="#69E4FF"
          />
          <Flex className="RoadmapContent" data-aos="fade-right">
            <Flex fontFamily="PilatExtended-Bold" fontSize="20px">
              <Text color="#63CDFA">Q3</Text>
              <Text color="white" ml={'10px'}>
                2022
              </Text>
            </Flex>
            <UnorderedList className="RoadmapDesc" ml={'0'}>
              <ListItem color={'white'}>
                Have successful fundraising for the first 10 projects
              </ListItem>
              <ListItem color={'white'}>Platform update 3.0</ListItem>
              <ListItem color={'white'}>
                Starting real-world project incubation
              </ListItem>
            </UnorderedList>
          </Flex>
        </Flex>
        <Flex id="roadmapBox4" top={'52em'}>
          <Flex className="RoadmapContent2">
            <Flex fontFamily="PilatExtended-Bold" fontSize="20px">
              <Text color="#63CDFA">Q4</Text>
              <Text color="white" ml={'10px'}>
                2022
              </Text>
            </Flex>
            <UnorderedList className="RoadmapDesc">
              <ListItem color={'white'}>
                Have successful fundraising for real-world projects
              </ListItem>
              <ListItem color={'white'}>
                Startup pitch competition for real-world projects
              </ListItem>
              <ListItem color={'white'}>Platform update 4.0</ListItem>
            </UnorderedList>
          </Flex>
        </Flex>
        <Flex
          width={'1.5em'}
          height={'1.5em'}
          marginTop="-.5em"
          borderRadius="100px"
          data-aos="zoom-in-up"
          backgroundColor="#69E4FF"
        />
        <Flex className="RoadmapContent" data-aos="fade-right"></Flex>
      </Flex>
      {/* {/ Roadmap For Desktop /} */}

      {/* {/ Roadmap For Mobile /} */}
      <Flex
        mt={'2em'}
        width="95%"
        position="relative"
        flexDirection="column"
        alignItems={'flex-start'}
        justifyContent={'flex-start'}
        height={{ base: '40em', md: '60em', lg: '60em' }}
        display={{ base: 'flex', md: 'none', lg: 'none' }}
      >
        <Flex
          borderRadius="10px"
          backgroundColor={'#69E4FF'}
          height={{ base: '32em', md: '53em', lg: '53em' }}
          width={{ base: '.3em', md: '.4em', lg: '.4em' }}
        />

        <Flex width={'95%'} id="roadmapBox1" top={0}>
          <Flex
            ml="-0.4em"
            width={'1.2em'}
            height={'1.2em'}
            borderRadius="100px"
            data-aos="zoom-in-up"
            backgroundColor="#69E4FF"
          />
          <Flex className="RoadmapContent" width={'95%'} data-aos="fade-right">
            <Flex fontFamily="PilatExtended-Bold" fontSize="12px">
              <Text color="#63CDFA">Q1</Text>
              <Text color="white" ml={'10px'}>
                2022
              </Text>
            </Flex>

            <UnorderedList
              className="RoadmapDesc"
              fontSize={'14px'}
              mt={'10px'}
              ml="0"
            >
              <ListItem color={'green.300'}>Platform 1.0 launch</ListItem>
              <ListItem color={'green.300'}>
                Community registration system
              </ListItem>
              <ListItem color={'green.300'}>
                Investor project approval by voting power Create a project with
                the milestone system Multi-stage fundraising
              </ListItem>
              <ListItem color={'green.300'}>
                Milestone money release with backer’s approval voting power
              </ListItem>
              <ListItem color={'green.300'}>
                Complete Seed/Private sale fundraise
              </ListItem>
              <ListItem color={'white'}>Complete Presale fundraise</ListItem>
              <ListItem color={'white'}>
                Marketing for Initial Offering
              </ListItem>
              <ListItem color={'white'}>
                10 projects for incubation and fundraise
              </ListItem>
            </UnorderedList>
          </Flex>
        </Flex>
        <Flex width={'95%'} id="roadmapBox2" top={'16em'}>
          <Flex
            ml="-0.4em"
            width={'1.2em'}
            height={'1.2em'}
            borderRadius="100px"
            data-aos="zoom-in-up"
            backgroundColor="#69E4FF"
          />
          <Flex className="RoadmapContent" width={'95%'} data-aos="fade-right">
            <Flex fontFamily="PilatExtended-Bold" fontSize="12px">
              <Text color="#63CDFA">Q2</Text>
              <Text color="white" ml={'10px'}>
                2022
              </Text>
            </Flex>
            <UnorderedList
              className="RoadmapDesc"
              fontSize={'14px'}
              mt={'10px'}
              ml="0"
            >
              <ListItem color={'white'}>
                Fundraising for the project hosted on WeFund
              </ListItem>
              <ListItem color={'white'}>Platform update 2.0</ListItem>
              <ListItem color={'white'}>
                Have 10 projects hosted on WeFund
              </ListItem>
              <ListItem color={'white'}>
                Real-world project implementation
              </ListItem>
            </UnorderedList>
          </Flex>
        </Flex>
        <Flex width={'95%'} id="roadmapBox3" top={'24em'}>
          <Flex
            ml="-0.4em"
            width={'1.2em'}
            height={'1.2em'}
            borderRadius="100px"
            data-aos="zoom-in-up"
            backgroundColor="#69E4FF"
          />
          <Flex className="RoadmapContent" width={'95%'} data-aos="fade-right">
            <Flex fontFamily="PilatExtended-Bold" fontSize="12px">
              <Text color="#63CDFA">Q3</Text>
              <Text color="white" ml={'10px'}>
                2022
              </Text>
            </Flex>
            <UnorderedList
              className="RoadmapDesc"
              fontSize={'14px'}
              mt={'10px'}
              ml="0"
            >
              <ListItem color={'white'}>
                Have successful fundraising for the first 10 projects
              </ListItem>
              <ListItem color={'white'}>Platform update 3.0</ListItem>
              <ListItem color={'white'}>
                Starting real-world project incubation
              </ListItem>
            </UnorderedList>
          </Flex>
        </Flex>
        <Flex width={'95%'} id="roadmapBox4" top={'32em'}>
          <Flex
            mt="-0.5em"
            ml="-0.4em"
            width={'1.2em'}
            height={'1.2em'}
            borderRadius="100px"
            data-aos="zoom-in-up"
            backgroundColor="#69E4FF"
          />
          <Flex className="RoadmapContent" width={'95%'} data-aos="fade-right">
            <Flex fontFamily="PilatExtended-Bold" fontSize="12px">
              <Text color="#63CDFA">Q4</Text>
              <Text color="white" ml={'10px'}>
                2022
              </Text>
            </Flex>
            <UnorderedList
              className="RoadmapDesc"
              fontSize={'14px'}
              mt={'10px'}
              ml="0"
            >
              <ListItem color={'white'}>
                Have successful fundraising for real-world projects
              </ListItem>
              <ListItem color={'white'}>
                Startup pitch competition for real-world projects
              </ListItem>
              <ListItem color={'white'}>Platform update 4.0</ListItem>
            </UnorderedList>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
