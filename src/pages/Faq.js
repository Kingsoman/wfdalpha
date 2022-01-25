import React, { useState, useEffect } from 'react'

import theme from '../theme'
import Footer from '../components/Footer'
import { Flex, Text, Image, ChakraProvider, Link, Box } from '@chakra-ui/react'

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
        <Box
          w={'100%'}
          color={'white'}
          fontSize={'18px'}
          fontWeight={'500'}
          overflow={'hidden'}
          borderRadius={'15px'}
          fontFamily={'Sk-Modernist-Regular'}
          height={{ base: '150px', lg: '200px' }}
        >
          <Box
            w={'100%'}
            zIndex={'10'}
            height={{ base: '150px', lg: '200px' }}
            backgroundImage={'url(/createproject_banner_emphasis.svg)'}
          >
            <Flex
              w={'100%'}
              zIndex={'11'}
              justify={'center'}
              alignItems={'center'}
              flexDirection={'column'}
              backgroundSize={'cover'}
              backgroundPosition={'center'}
              backgroundRepeat={'no-repeat'}
              height={{ base: '150px', lg: '200px' }}
              backgroundImage={'url(/createproject_banner.svg)'}
            >
              <Flex justify="center">
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
                justify="center"
                data-aos="fade-down"
                fontFamily={'PilatExtended-Bold'}
                fontSize={{ lg: '40px', base: '30px' }}
              >
                FAQ
              </Flex>
            </Flex>
          </Box>
        </Box>
        <Text
          mt="33px"
          textAlign={'center'}
          data-aos="fade-down"
          fontFamily={'PilatExtended-Bold'}
          fontSize={{ lg: '25px', base: '16px' }}
        >
          Frequently Asked Questions
        </Text>
        <Text
          mt={'10px'}
          data-aos="fade-down"
          textAlign={'center'}
          mx={{ lg: '10%', base: '2.5%' }}
          fontFamily={'Sk-Modernist-Regular'}
          fontSize={{ lg: '18px', base: '15px' }}
        >
          WFD Tokens are used to operate WeFund Platforms. Projects 
          convert 1% of their funding into WFD tokens. WFD Tokens are also
          used as governance tokens for voting and governing project
          trajectory.
        </Text>
        <Flex
          flexDirection={'column'}
          w={{ lg: '80%', base: '95%' }}
          mt={{ lg: '50px', base: '30px' }}
          mb={{ lg: '100px', base: '50px' }}
          fontSize={{ lg: '18px', base: '15px' }}
          fontFamily={'Sk-Modernist-Regular'}
        >
          {faqData.map((e, index) => (
            <Flex
              bg={'#250E42'}
              width={'100%'}
              cursor={'pointer'}
              data-aos="zoom-in-up"
              borderRadius={'15px'}
              overflow={'hidden'}
              flexDirection={'column'}
              border={'1px solid #513E69'}
              mt={{ lg: '20px', base: '10px' }}
              onClick={() => {
                if (openIndex == index) setOpenIndex(null)
                else setOpenIndex(index)
              }}
            >
              <Flex
                alignItems={'center'}
                p={{ lg: '20px', base: '10px' }}
                justifyContent={'space-between'}
              >
                <Text>{e.ques}</Text>

                {openIndex == index ? (
                  <Image src="/media/ArrowDown2.svg" transform={'rotate(180deg)'} />
                ) : (
                  <Image src="/media/ArrowDown2.svg" />
                )}
              </Flex>
              {openIndex == index && (
                <Flex alignItems={'flex-start'}>
                  <Flex
                    flexDirection={'column'}
                    borderTop={'1px solid #513E69'}
                    p={{ lg: '20px', base: '10px' }}
                    width={{ lg: '80%', base: '100%' }}
                  >
                    {e.ans.map((i) => (
                      <>
                        <Text>{i}</Text>
                        <br />
                      </>
                    ))}
                  </Flex>
                  <Image
                    src={e.img}
                    width={'20%'}
                    objectFit={'contain'}
                    display={{ lg: 'flex', base: 'none' }}
                  />
                </Flex>
              )}
            </Flex>
          ))}

          <Flex
            bg={'#250E42'}
            width={'100%'}
            cursor={'pointer'}
            data-aos="zoom-in-up"
            borderRadius={'15px'}
            flexDirection={'column'}
            border={'1px solid #513E69'}
            mt={{ lg: '20px', base: '10px' }}
            onClick={() => {
              if (openIndex == 11) setOpenIndex(null)
              else setOpenIndex(11)
            }}
          >
            <Flex
              alignItems={'center'}
              justifyContent={'space-between'}
              p={{ lg: '20px', base: '10px' }}
            >
              <Text>
                Where can we find out more about WeFund on social media?
              </Text>

              {openIndex == 11 ? (
                <Image src="/media/ArrowDown2.svg" transform={'rotate(180deg)'} />
              ) : (
                <Image src="/media/ArrowDown2.svg" />
              )}
            </Flex>
            {openIndex == 11 && (
              <Flex alignItems={'flex-start'}>
                <Flex
                  flexDirection={'column'}
                  borderTop={'1px solid #513E69'}
                  p={{ lg: '20px', base: '10px' }}
                  width={{ lg: '80%', base: '100%' }}
                >
                  <Link href="https://twitter.com/WeFund_Official">
                    Twitter
                  </Link>
                  <Link href="https://t.me/wefundofficial">
                    WeFund Official
                  </Link>
                  <Link href="https://t.me/talkwithwefund">
                    WeFund Discussion
                  </Link>
                  <Link href="mailto:info@wefund.app">Email</Link>
                  <Link href="https://medium.com/@wefundofficial">Medium</Link>
                  <Link href="https://medium.com/@wefundofficial">Medium</Link>
                </Flex>
                <Image
                  width={'20%'}
                  src={'/Faqs/Q8.svg'}
                  objectFit={'contain'}
                  display={{ lg: 'flex', base: 'none' }}
                />
              </Flex>
            )}
          </Flex>

          <Flex
            bg={'#250E42'}
            width={'100%'}
            cursor={'pointer'}
            data-aos="zoom-in-up"
            borderRadius={'15px'}
            flexDirection={'column'}
            border={'1px solid #513E69'}
            mt={{ lg: '20px', base: '10px' }}
            onClick={() => {
              if (openIndex == 12) setOpenIndex(null)
              else setOpenIndex(12)
            }}
          >
            <Flex
              alignItems={'center'}
              p={{ lg: '20px', base: '10px' }}
              justifyContent={'space-between'}
            >
              <Text>
                Currently from where I can buy it? Is it possible that I can get
                it only by holding it?
              </Text>

              {openIndex == 12 ? (
                <Image src="/media/ArrowDown2.svg" transform={'rotate(180deg)'} />
              ) : (
                <Image src="/media/ArrowDown2.svg" />
              )}
            </Flex>
            {openIndex == 12 && (
              <Flex alignItems={'flex-start'}>
                <Flex
                  flexDirection={'column'}
                  borderTop={'1px solid #513E69'}
                  p={{ lg: '20px', base: '10px' }}
                  width={{ lg: '80%', base: '100%' }}
                >
                  <Text>
                    If you participate in the ongoing Seed round, you will
                    benefit from profit sharing in addition to token allocation.
                    (Link below){' '}
                    <Link href="https://www.pdffiller.com/en/link_to_fill/864925851.htm">
                      https://www.pdffiller.com/en/link_to_fill/864925851.htm
                    </Link>
                  </Text>
                  <br />
                  <Text>
                    For seed & presale tokens, tokens distributed will be vested
                    over 10 months after the offering. For team tokens, 17% of
                    the entire token distributed will be vested over 17 months
                    after the 10-month vesting period is completed. Team token
                    vesting will begin once the investor vesting has been
                    completed. Profit-sharing is only for Seed investors
                  </Text>
                </Flex>
                <Image
                  width={'20%'}
                  src={'/Faqs/Q12.svg'}
                  objectFit={'contain'}
                  display={{ lg: 'flex', base: 'none' }}
                />
              </Flex>
            )}
          </Flex>
        </Flex>

        <Text
          fontWeight={'light'}
          textAlign={'center'}
          data-aos="zoom-in-up"
          mt={{ lg: '20px', base: '0' }}
          fontFamily={'PilatExtended-Regular'}
          fontSize={{ lg: '20px', base: '15px' }}
        >
          Supporting your project
        </Text>
        <Text
          textAlign={'center'}
          data-aos="zoom-in-up"
          fontFamily={'PilatExtended-Bold'}
          fontSize={{ lg: '25px', base: '18px' }}
        >
          Committed to top quality and results
        </Text>
        <Text
          my={'15px'}
          justify="center"
          textAlign={'center'}
          fontWeight={'light'}
          data-aos="zoom-in-up"
          width={{ lg: '50%', base: '95%' }}
          fontFamily={'Sk-Modernist-Regular'}
          fontSize={{ lg: '16px', base: '14px' }}
        >
          Proin ullamcorper pretium orci. Donec necscele risque leo. Nam massa
          dolor imperdiet neccon sequata congue idsem. Maecenas malesuada
          faucibus finibus.
        </Text>
        <Image
          objectFit="contain"
          data-aos="zoom-in-up"
          borderRadius={'20px'}
          width={{ lg: '50%', base: '95%' }}
          src="/Faqs/website-wefund-pics.png"
        />
      </Flex>
      <Footer />
    </ChakraProvider>
  )
}

const faqData = [
  {
    ques: 'What is WeFund and the story behind the idea?',
    img: '/Faqs/Q1.svg',
    ans: [
      "WeFund is a cross-chain crowdfunding platform to create a space for backers and creators to raise the necessary resources for the realization of the project via the means of backers. At the moment only using Terra and operating as a crowdfunding platform, however, it will expand to include multiple chains and provide a full incubation service to increase the chance of success of the projects on our platform. The founder's vision was to create a community that everyone could participate. There was a hackathon that the founders participated as Fan$quad, however, there was a decision made to rebrand the name to include more industries to reach a larger audience and community.",
    ],
  },
  {
    ques: 'Who are the team and their experience with crypto projects?',
    img: '/Faqs/Q2.jpg',
    ans: [
      'Ika (Co-Founder & CMO) helped raise $10 million dollars for Gamesta, crypto & NFT trading platform startup, as the CMO and is now focused 100% on WeFund.',
      "Andrea (Co-Founder, CEO, & Co-CTO), similar to Ika, played a big role in the initial development of Gamesta's $10 million raise. He is highly skilled & versatile in back-end development.",
      'Jason (Co-CTO) is a 90s dot com boom veteran and has been losing money in Crypto since 2017 from his day trading (just joking). He works closely with Andrea & our development team to bring our project to life.',
      "Austin (CCO). This is officially my first crypto project, however, I have been closely following various crypto projects. One of my favorites is Stellar Development Foundation's Stellar Lumen. I have been completing their quest series which teaches how to use Stellar's ecosystem, APIs, & SDK. My background is with a silicon-valley VC fund and following trends of startup technology companies got me interested in actively participating in this space.",
      'WeFund\'s development team has a strong background in Rust and Solidity.',
    ],
  },
  {
    ques: 'What makes WeFund unique?',
    img: '/Faqs/Q3.svg',
    ans: [
      'We are building WeFund to be a full 360-degree service for project support and guidance after funding has been completed. It will be crowdfunding & incubation. We will be able to Implement various industries and projects Crypto & Real-World projects - a bridge between blockchain & real-world projects. In our roadmap, we plan to make this a cross-chain platform and provide in-house funding for projects from the revenue we generate.',
    ],
  },
  {
    ques: 'What are the benefits for project proposers & project backers?',
    img: '/Faqs/Q4.svg',
    ans: [
      'Proposers: Can reach a big community and generate awareness for their projects. Full service from the WeFund team and our experts to help with the fundraising and scale the project.',
      'Backers: Money returned if fundraising goals are not met. Yield from Anchor protocol. Can easily find new and exciting projects. No minimum or maximum amounts for very early-stage projects. Everyone is able to be an investor.',
    ],
  },
  {
    ques: 'What are the $WFD token use cases, distribution, and how to buy/get it?',
    img: '/Faqs/Q5.svg',
    ans: [
      'If you use $WFD on the platform there is a 0% transaction fee. If the project proposer uses $WFD to fund the project there will be prioritized placement on the platform. Those projects will get more exposure and staking rewards. Increased value from its deflationary token system. Can be used as an ad payment on our platform if project proposers want more exposure.',
    ],
  },
  {
    ques: 'How do you approach your marketing to increase WeFund users in the future?',
    img: '/Faqs/Q6.svg',
    ans: [
      'Our approach is to build and maintain community relationships through social media and strategic partnerships such as Kommunitas. Kommunitas, like WeFund, is a multichain platform ensuring resources can come from multiple ecosystems. Kommunitas will complement the offering of WeFund by providing access to easier IDO and incubation for projects that have completed a funding round, looking to take the next step towards launching their project while using the resources they have more effectively.',
    ],
  },
  {
    ques: 'WWhat is the WeFund roadmap?',
    img: '/Faqs/Q7.svg',
    ans: [
      'At the moment we are raising a seed round for initial development and to ensure the talent we have will deliver a strong platform & operation. 3% of our revenue for Seed investors will be equally distributed by the amount each investor invested. This month we will have our platform launch and start our pre-sale. Our pre-sale is 10% of our token allocation. Then we will have an offering in May.',
    ],
  },
  {
    ques: 'What is WeFund’s revenue model?',
    img: '/Faqs/Q9.svg',
    ans: [
      '1% transaction fee (if not using $WFD)',
      'Revenue from users paying us for prioritized placement on our platform (ads)',
      'Anchor Protocol - 50% of yield generated from this protocol (coming from money deposited to back a project) will go to WeFund & 50% to the backer',
    ],
  },
  {
    ques: "As crypto users we don't want to lose our assets to some scam projects that run away and disappear with our money so why should we invest in your project as a long-term investment?",
    img: '/Faqs/Q10.svg',
    ans: [
      'We will have the platform running before the offering, unlike other projects that raise money before any product/platform is launched with the exception of our Seed round, which is the amount we need to have a strong talent for our initial development & launch',
      'We have a deflationary token system that is designed to increase token value over time.',
      'We do AMA in person with our real identities. Our goal is to be fully transparent with our operations.',
    ],
  },
  {
    ques: 'Is your project only open to a certain audience (elite investors, Professional players), or is it open to medium and small fund investors, traditional players?',
    img: '/Faqs/Q11.svg',
    ans: [
      'No, we are open to any investor. Being community-driven is a big part of our philosophy and we want to ensure that everyone has the ability to take part regardless of being an independent, large, or small investor.',
    ],
  },
]
