import React, { useState } from 'react'

import { Flex, Text, Image, Select } from '@chakra-ui/react'
import { ButtonBackTransition } from '../components/ImageTransition'

export default function Aboutone() {
  const [selectedLang, setSelectedlang] = useState('/Litepaper_Wefund.pdf') //default value
  function handleSelectChange(event) {
    setSelectedlang(event.target.value)
  }

  return (
    <Flex id="aboutSection">
      <Flex id="aboutFirstSection">
        <Flex id="aboutFirstSection1" data-aos="fade-right">
          <Flex direction="row" data-aos="fade-down">
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

            <Text id="aboutUsPageHeadingDesc" mt="30px">
              Select Litepaper Languange
            </Text>
            <Select
              value={selectedLang}
              onChange={handleSelectChange}
              placeholder="Select option"
              id="paper-lang"
              border="linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)"
              background="linear-gradient(180deg, #1A133E 0%, #1A133E 100%)"
              color="white"
              mt="10px"
            >
              <option
                value="/Litepaper_Wefund.pdf"
                style={{ backgroundColor: '#1B0645' }}
              >
                English
              </option>
              <option
                value="/Litepaper_Wefund_ID.pdf"
                style={{ backgroundColor: '#1B0645' }}
              >
                Indonesian
              </option>
              <option
                value="/Litepaper_Wefund_ITA.pdf"
                style={{ backgroundColor: '#1B0645' }}
              >
                Italian
              </option>
              <option
                value="/Litepaper_Wefund_SP.pdf"
                style={{ backgroundColor: '#1B0645' }}
              >
                Spanish
              </option>
              <option
                value="/Litepaper_Wefund_KOR.pdf"
                style={{ backgroundColor: '#1B0645' }}
              >
                Korea
              </option>
            </Select>
            <a href={selectedLang}>
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
                    <Text color="white">Download Litepaper </Text>
                    <Image src="Download.svg" />
                  </Flex>
                </ButtonBackTransition>
              </Flex>
            </a>
            <a href={selectedLang}>
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
                      Download Litepaper{' '}
                    </Text>
                    <Image src="Download.svg" height="12px" />
                  </Flex>
                </ButtonBackTransition>
              </Flex>
            </a>
            <Text id="aboutUsPageHeadingDesc" mt="30px">
              OR
            </Text>
            <a href='/Whitepaper%202.0%20New%20Update.pdf'>
              <Flex w="100%" mt="30px" id="displayNoneInMobile">
                <ButtonBackTransition
                  width="100%"
                  height="55px"
                  rounded="100px"
                  selected={false}
                  unitid="downfullwhitepaper"
                >
                  <Flex
                    w="100%"
                    pl="25px"
                    pr="25px"
                    alignItems="center"
                    justify="space-between"
                  >
                    <Text color="white">Download Whitepaper (ENG Only) </Text>
                    <Image src="Download.svg" />
                  </Flex>
                </ButtonBackTransition>
              </Flex>
            </a>
            <a href='/Whitepaper%202.0%20New%20Update.pdf'>
              <Flex w="100%" mt="30px" id="displayNoneInDesktop">
                <ButtonBackTransition
                  width="100%"
                  height="40px"
                  rounded="100px"
                  selected={false}
                  unitid="downfullwhitepaper"
                >
                  <Flex
                    w="100%"
                    pl="25px"
                    pr="25px"
                    alignItems="center"
                    justify="space-between"
                  >
                    <Text color="white" fontSize="12px">
                      Download Whitepaper (ENG Only){' '}
                    </Text>
                    <Image src="Download.svg" height="12px" />
                  </Flex>
                </ButtonBackTransition>
              </Flex>
            </a>
          </Flex>
        </Flex>
        <Flex id="aboutFirstSection2" data-aos="fade-left">
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
