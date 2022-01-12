import React from 'react'
import { Flex, Text, Image } from '@chakra-ui/react'
import { ButtonBackTransition } from '../components/ImageTransition'

export default function Aboutone() {
  return (
    <Flex id="aboutSection">
      <Flex id="aboutFirstSection">
        <Flex id="aboutFirstSection1">
          <Flex direction="row">
            <Text id="aboutUsPageLable">ABOUT WEFUND</Text>
          </Flex>
          <Flex direction="row" mt="20px">
            <Flex align="center" mr="15px">
              <Image alt="WeFund" src="/onegoal.svg" id="aboutUsPageNumber1" />
            </Flex>
            <Flex>
              <Text id="aboutUsPageHeadingHead">
                GOAL
                <br />
                PASSION
              </Text>
            </Flex>
          </Flex>
          <Flex mt="22px" w="100%" flexDirection="column" justify="flex-start">
            <Text id="aboutUsPageHeadingDesc">
              WeFund is a decentralized crowdfunding and incubation platform for
              blockchain and real-world projects.
              <br />
              <br />
              WeFund's mission is to host high-quality projects that align with
              WeFund's investor community, community-driven decision making for
              100% transparency, and manage funds exclusively on Terra's Anchor
              protocol using smart contracts for investor security.
            </Text>
            <Flex id="rocket" position="relative">
              <Image h="200px" src="/rocket.svg" />
            </Flex>
            <a href="/Litepaper_Wefund.pdf">
              <Flex w="100%" mt="30px" id="displayNoneInMobile">
                <ButtonBackTransition
                  width="100%"
                  height="55px"
                  rounded="100px"
                  selected={false}
                  unitid="downwhitepaper"
                >
                  <Flex
                    w="100%"
                    pl="25px"
                    pr="25px"
                    alignItems="center"
                    justify="space-between"
                  >
                    <Text color="white">Download Whitepaper </Text>
                    <Image src="Download.svg" />
                  </Flex>
                </ButtonBackTransition>
              </Flex>
            </a>
            <a href="/Whitepaper_2.0.docx">
              <Flex w="100%" mt="30px" id="displayNoneInDesktop">
                <ButtonBackTransition
                  width="100%"
                  height="40px"
                  rounded="100px"
                  selected={false}
                  unitid="downwhitepaper"
                >
                  <Flex
                    w="100%"
                    pl="25px"
                    pr="25px"
                    alignItems="center"
                    justify="space-between"
                  >
                    <Text color="white" fontSize="12px">
                      Download Whitepaper{' '}
                    </Text>
                    <Image src="Download.svg" height="12px" />
                  </Flex>
                </ButtonBackTransition>
              </Flex>
            </a>
          </Flex>
        </Flex>
        <Flex id="aboutFirstSection2">
          <Flex alignItems="center" justifyContent="center">
            <Flex bg="#291554" className="aboutUsBox LeftRadiusAboutUs">
              <Image className="aboutUsSectionImages" src="/gift.svg" />
              <Text className="aboutUsSectionBoxesTexts">
                Yield Benefit For Backers
              </Text>
            </Flex>
            <Flex bg="#200E55" className="aboutUsBox RightRadiusAboutUs">
              <Image className="aboutUsSectionImages" src="/blockchain.svg" />
              <Text className="aboutUsSectionBoxesTexts">
                Bridge Real-World and Blockchain
              </Text>
            </Flex>
          </Flex>
          <Flex alignItems="center" justifyContent="center">
            <Flex className="aboutUsBox" bg="#200E55">
              <Image className="aboutUsSectionImages" src="/incubatore.svg" />
              <Text className="aboutUsSectionBoxesTexts">
                Cross-Chain Incubator
              </Text>
            </Flex>
            <Flex className="aboutUsBox" bg="#291554">
              <Image className="aboutUsSectionImages" src="/nftmirror.svg" />
              <Text className="aboutUsSectionBoxesTexts">
                Deflationary Token Value
              </Text>
            </Flex>
          </Flex>
          <Flex alignItems="center" justifyContent="center">
            <Flex className="aboutUsBox LeftBottomRadiusAboutUs" bg="#291554">
              <Image alt="Crypto Industry" src="/voting.svg" />
              <Text className="aboutUsSectionBoxesTexts">
                Community Voting Power
              </Text>
            </Flex>
            <Flex className="aboutUsBox RightBottomRadiusAboutUs" bg="#200E55">
              <Image alt="Crypto Industry" src="/lowriskinvestment.svg" />
              <Text className="aboutUsSectionBoxesTexts">
                Money release with Milestone system after Investor Voting
                approval
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
