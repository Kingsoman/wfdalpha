import React, { useState, useEffect } from 'react'

import theme from '../theme'
import Footer from '../components/Footer'
import { Flex, Text, Image, ChakraProvider, Link } from '@chakra-ui/react'

import AOS from 'aos'
import 'aos/dist/aos.css' // You can also use <link> for styles

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState(null)

  useEffect(() => {
    AOS.init({ duration: 1000 })
    setTimeout(() => setSplash(false), 3000)
  }, [])

  return (
    <ChakraProvider resetCSS theme={theme}>
      <Flex
        pb={'50px'}
        color={'white'}
        alignItems="center"
        data-aos="fade-down"
        flexDirection={'column'}
      >
        <div
          style={{
            width: '100%',
            color: 'white',
            fontSize: '18px',
            fontWeight: '500',
            fontFamily: 'Sk-Modernist-Regular',
          }}
        >
          <div
            style={{
              zIndex: '10',
              height: '100%',
              backgroundImage: "url('/createproject_banner_emphasis.svg')",
            }}
          >
            <div
              style={{
                backgroundImage: "url('/createproject_banner.svg')",
                width: '100%',
                zIndex: '11',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                zIndex: '11',
              }}
            >
              <Flex pt="95px" justify="center">
                <Text
                  fontSize="16px"
                  fontWeight="400"
                  data-aos="fade-down"
                  color={'rgba(255, 255, 255, 0.54)'}
                >
                  Home &gt;&nbsp;
                </Text>
                <Text fontWeight="400" fontSize="16px" data-aos="fade-down">
                  FAQ
                </Text>
              </Flex>
              <Flex
                mt="11px"
                pb="150px"
                justify="center"
                fontSize={'40px'}
                data-aos="fade-down"
                fontFamily={'PilatExtended-Bold'}
              >
                FAQ
              </Flex>
            </div>
          </div>
        </div>

        <Text
          mt={'30px'}
          fontSize={'20px'}
          fontWeight={'light'}
          data-aos="fade-down"
          fontFamily={'PilatExtended-Regular'}
        >
          FAQ
        </Text>
        <Text
          fontSize={'25px'}
          data-aos="fade-down"
          fontFamily={'PilatExtended-Bold'}
        >
          Frequently Ask Questions
        </Text>
        <Text
          mx={'10%'}
          mt={'10px'}
          fontSize={'16px'}
          data-aos="fade-down"
          textAlign={'center'}
          fontFamily={'Sk-Modernist-Regular'}
        >
          WFD Tokens will be used to operate WeFund Platforms. Projects for
          example converts 1% of their funding into WFD tokens. WFD Tokens also
          used as governance tokens for voting and govern the project
          trajectory.
        </Text>
        <Flex
          w={'80%'}
          mt={'50px'}
          mb={'100px'}
          flexDirection={'column'}
          fontFamily={'Sk-Modernist-Regular'}
        >
          {faqData.map((e, index) => (
            <Flex
              mt={'20px'}
              bg={'#250E42'}
              width={'100%'}
              cursor={'pointer'}
              data-aos="zoom-in-up"
              borderRadius={'15px'}
              flexDirection={'column'}
              border={'1px solid #513E69'}
              onClick={() => {
                if (openIndex == index) setOpenIndex(null)
                else setOpenIndex(index)
              }}
            >
              <Flex
                p={'20px'}
                alignItems={'center'}
                justifyContent={'space-between'}
              >
                <Text>{e.ques}</Text>

                {openIndex == index ? (
                  <Image src="/ArrowDown2.svg" transform={'rotate(180deg)'} />
                ) : (
                  <Image src="/ArrowDown2.svg" />
                )}
              </Flex>
              {openIndex == index && (
                <Flex
                  p={'20px'}
                  borderTop={'1px solid #513E69'}
                  flexDirection={'column'}
                >
                  {e.ans.map((i) => (
                    <>
                      <Text>{i}</Text>
                      <br />
                    </>
                  ))}
                </Flex>
              )}
            </Flex>
          ))}

          <Flex
            mt={'20px'}
            bg={'#250E42'}
            width={'100%'}
            cursor={'pointer'}
            data-aos="zoom-in-up"
            borderRadius={'15px'}
            flexDirection={'column'}
            border={'1px solid #513E69'}
            onClick={() => {
              if (openIndex == 11) setOpenIndex(null)
              else setOpenIndex(11)
            }}
          >
            <Flex
              p={'20px'}
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Text>
                Where can we find out more about WeFund on social media?
              </Text>

              {openIndex == 11 ? (
                <Image src="/ArrowDown2.svg" transform={'rotate(180deg)'} />
              ) : (
                <Image src="/ArrowDown2.svg" />
              )}
            </Flex>
            {openIndex == 11 && (
              <Flex
                p={'20px'}
                borderTop={'1px solid #513E69'}
                flexDirection={'column'}
              >
                <Link href="https://twitter.com/WeFund_Official">Twitter</Link>
                <Link href="https://t.me/wefundofficial">WeFund Official</Link>
                <Link href="https://t.me/talkwithwefund">
                  WeFund Discussion
                </Link>
                <Link href="mailto:info@wefund.app">Email</Link>
                <Link href="https://medium.com/@wefundofficial">Medium</Link>
                <Link href="https://medium.com/@wefundofficial">Medium</Link>
              </Flex>
            )}
          </Flex>

          <Flex
            mt={'20px'}
            bg={'#250E42'}
            width={'100%'}
            cursor={'pointer'}
            data-aos="zoom-in-up"
            borderRadius={'15px'}
            flexDirection={'column'}
            border={'1px solid #513E69'}
            onClick={() => {
              if (openIndex == 12) setOpenIndex(null)
              else setOpenIndex(12)
            }}
          >
            <Flex
              p={'20px'}
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Text>
                Currently from where I can buy it? Is it possible that I can get
                it only by holding it?
              </Text>

              {openIndex == 12 ? (
                <Image src="/ArrowDown2.svg" transform={'rotate(180deg)'} />
              ) : (
                <Image src="/ArrowDown2.svg" />
              )}
            </Flex>
            {openIndex == 12 && (
              <Flex
                p={'20px'}
                borderTop={'1px solid #513E69'}
                flexDirection={'column'}
              >
                <Text>
                  If you participate in the ongoing Seed round, you will benefit
                  from profit sharing in addition to token allocation. (Link
                  below){' '}
                  <Link href="https://www.pdffiller.com/en/link_to_fill/864925851.htm">
                    https://www.pdffiller.com/en/link_to_fill/864925851.htm
                  </Link>
                </Text>
                <br />
                <Text>
                  For seed & presale tokens, tokens distributed will be vested
                  over 10 months after the offering. For team tokens, 17% of the
                  entire token distributed will be vested over 17 months after
                  the 10-month vesting period is completed. Team token vesting
                  will begin once the investor vesting has been completed.
                  Profit-sharing is only for Seed investors
                </Text>
              </Flex>
            )}
          </Flex>
        </Flex>

        <Text
          mt={'20px'}
          fontSize={'20px'}
          data-aos="zoom-in-up"
          fontWeight={'light'}
          fontFamily={'PilatExtended-Regular'}
        >
          Supporting your project
        </Text>
        <Text
          fontSize={'25px'}
          fontFamily={'PilatExtended-Bold'}
          data-aos="zoom-in-up"
        >
          Committed to top quality and results
        </Text>
        <Text
          mx={'25%'}
          my={'15px'}
          justify="center"
          fontSize={'16px'}
          textAlign={'center'}
          data-aos="zoom-in-up"
          fontWeight={'light'}
          fontFamily={'Sk-Modernist-Regular'}
        >
          Proin ullamcorper pretium orci. Donec necscele risque leo. Nam massa
          dolor imperdiet neccon sequata congue idsem. Maecenas malesuada
          faucibus finibus.
        </Text>
        <Image src="userGuide.svg" data-aos="zoom-in-up" />
      </Flex>
      <Footer />
    </ChakraProvider>
  )
}

const faqData = [
  {
    ques: 'What is WeFund and the story behind the idea?',
    ans: [
      "WeFund is a cross-chain crowdfunding platform to create a space for backers and creators to raise the necessary resources for the realization of the project via the means of backers. At the moment only using Terra and operating as a crowdfunding platform, however, it will expand to include multiple chains and provide a full incubation service to increase the chance of success of the projects on our platform. The founder's vision was to create a community that everyone could participate. There was a hackathon that the founders participated as Fan$quad, however, there was a decision made to rebrand the name to include more industries to reach a larger audience and community.",
    ],
  },
  {
    ques: 'Why are the team and their experience with crypto projects?',
    ans: [
      'Ika (Co-Founder & CMO) helped raise $10 million dollars for Gamesta, crypto & NFT trading platform startup, as the CMO and is now focused 100% on WeFund.',

      "Andreas (Co-Founder, CEO, & Co-CTO), similar to Ika, played a big role in the initial development of Gamesta's $10 million raise. He is highly skilled & versatile in back-end development.",
      'Jason (Co-CTO) is a 90s dot com boom veteran and has been losing money in Crypto since 2017 from his day trading (just joking). He works closely with Andreas & our development team to bring our project to life.',
      "Austin (CCO). This is officially my first crypto project, however, I have been closely following various crypto projects. One of my favorites is Stellar Development Foundation's Stellar Lumen. I have been completing their quest series which teaches how to use Stellar's ecosystem, APIs, & SDK. My background is with a silicon-valley VC fund and following trends of startup technology companies got me interested in actively participating in this space.",
      'WeFund’s development team has a strong background in Rust and Solidity.',
    ],
  },
  {
    ques: 'What makes WeFund unique?',
    ans: [
      'We are building WeFund to be a full 360-degree service for project support and guidance after funding has been completed. It will be crowdfunding & incubation. We will be able to Implement various industries and projects Crypto & Real-World projects - a bridge between blockchain & real-world projects. In our roadmap, we plan to make this a cross-chain platform and provide in-house funding for projects from the revenue we generate.',
    ],
  },
  {
    ques: 'What are the benefits for project proposers & backer sides?',
    ans: [
      'Proposers: Can reach a big community and generate awareness for their projects. Full service from the WeFund team and our experts to help with the fundraising and scale the project.',

      'Backers: Money returned if fundraising goals are not met. Yield from Anchor protocol. Can easily find new and exciting projects. No minimum or maximum amounts for very early-stage projects. Everyone is able to be an investor.',
    ],
  },
  {
    ques: 'What are the $WFD token use cases, distribution, and how to buy/get it?',
    ans: [
      'If you use $WFD on the platform there is a 0% transaction fee. If the project proposer uses$ WFD to fund the project there will be prioritized placement on the platform. Those projects will get more exposure and staking rewards. Increased value from its deflationary token system. Can be used as an ad payment on our platform if project proposers want more exposure.',
    ],
  },
  {
    ques: 'How do you approach your marketing to increase WeFund users in the future?',
    ans: [
      'Our approach is to build and maintain community relationships through social media and strategic partnerships such as Kommunitas. Kommunitas, like WeFund, is a multichain platform ensuring resources can come from multiple ecosystems. Kommunitas will complement the offering of WeFund by providing access to easier IDO and incubation for projects that have completed a funding round, looking to take the next step towards launching their project while using the resources they have more effectively.',
    ],
  },
  {
    ques: 'WWhat is the WeFund roadmap?',
    ans: [
      'At the moment we are raising a Seed round for initial development and to ensure the talent we have will deliver a strong platform & operation. 3% of our revenue for Seed investors will be equally distributed by the amount each investor invested. This month we will have our platform launch and start our pre-sale. Our pre-sale is 10% of our token allocation. Then we will have an offering in May.',
    ],
  },
  {
    ques: 'What is WeFund’s revenue model?',
    ans: [
      '1% transaction fee (if not using $WFD)',
      'Revenue from users paying us for prioritized placement on our platform (ads)',
      'Anchor Protocol - 50% of yield generated from this protocol (coming from money deposited to back a project) will go to WeFund & 50% to the backer',
    ],
  },
  {
    ques: "As crypto users we don't want to lose our assets to some scam projects that run away and disappear with our money so why should we invest in your project as a long-term investment?",
    ans: [
      'We will have the platform running before the offering, unlike other projects that raise money before any product/platform is launched with the exception of our Seed round, which is the amount we need to have a strong talent for our initial development & launch',
      'We have a deflationary token system that is designed to increase token value over time.',
      'We do AMA in person with our real identities. Our goal is to be fully transparent with our operations.',
    ],
  },
  {
    ques: 'Is your project only open to a certain audience (elite investors, Professional players), or is it open to medium and small fund investors, traditional players?',
    ans: [
      'No, we are open to any investor. Being community-driven is a big part of our philosophy and we want to ensure that everyone has the ability to take part regardless of being an independent, large, or small investor.',
    ],
  },
]
