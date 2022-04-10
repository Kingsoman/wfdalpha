import React from 'react'
import { Flex, Text, Image } from '@chakra-ui/react'

import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
}

export default function Works() {
  return (
    <Flex
      width="100%"
      id="HowItWorkBg"
      position="relative"
      alignItems="center"
      flexDirection="column"
      pb={{ base: '5em', md: '8em', lg: '10em' }}
    >
      <Flex
        fontFamily="PilatExtended-Bold"
        fontSize={{ md: '25px', lg: '30px' }}
      >
        <Text color="#63CDFA">HOW IT</Text>
        <Text color="white" ml={'10px'}>
          WORKS
        </Text>
      </Flex>
      <Flex
        mt={'2em'}
        overflow="hidden"
        bgGradient="linear(#1E0024, #150049)"
        mb={{ base: '3em', md: '5em', lg: '6em' }}
        width={{ base: '96%', md: '90%', lg: '75%' }}
        height={{ base: '26em', md: '33em', lg: '40em' }}
        borderRadius={{ base: '10px', md: '20px', lg: '20px' }}
      >
        <Flex
          width="100%"
          height={'100%'}
          fontWeight="bold"
          alignItems="center"
          padding={'10px 10px 10px 10px'}
          position={'relative'}
          backgroundSize={'cover'}
          justifyContent={'center'}
          fontFamily={{
            base: 'Sk-Modernist-Regular',
            md: 'PilatExtended-Regular',
            lg: 'PilatExtended-Regular',
          }}
          backgroundImage="/media/Home/40.png"
        >
          <Flex
            mt="-3em"
            alignItems="center"
            textAlign={'center'}
            flexDirection="column"
            justifyContent="center"
            mr={{ base: '.1em', md: '1em', lg: '1em' }}
            width={{ base: '20%', md: '16%', lg: '10em' }}
          >
            <Text
              mb="10px"
              color="#63CDFA"
              fontFamily="PilatExtended-Bold"
              fontSize={{ base: '12px', md: '16px', lg: '18px' }}
              lineHeight={{ base: '13px', md: '18px', lg: '20px' }}
            >
              New
              <br />
              Project
            </Text>
            <Image
              width={{ base: '12px', md: '18px', lg: '20px' }}
              src="/media/Home/18.png"
            />
            <Image
              src="/media/Home/12.png"
              width={{ base: '80%', md: '6em', lg: '8em' }}
            />
            <Text
              mt="20px"
              color="#63CDFA"
              lineHeight={'16px'}
              fontSize={{ base: '12px', md: '12px', lg: '14px' }}
            >
              WeFund Team & Advisor approval
            </Text>
          </Flex>

          <Flex
            flexDirection="column"
            justifyContent="center"
            width={{ base: '50%', md: '50%', lg: '30em' }}
          >
            <Flex width={'60%'} alignItems="center" justify={'center'}>
              <Image
                src="/media/Home/14.png"
                width={{ base: '5em', md: '8em', lg: '8em' }}
              />
            </Flex>
            <Flex alignItems={'center'} justifyContent="space-between">
              <Image width={'60%'} src="/media/Home/15.png" />
              <Text
                color="white"
                width={'40%'}
                lineHeight={'16px'}
                textAlign={'center'}
                fontSize={{ base: '11px', md: '12px', lg: '14px' }}
              >
                <span style={{ color: '#63CDFA' }}>
                  Project milestone smart contracts
                </span>{' '}
                with automatic fund release
              </Text>
            </Flex>
            <Flex
              mt="0"
              width={'60%'}
              color="#63CDFA"
              lineHeight={'16px'}
              alignItems="center"
              justify={'space-between'}
              fontSize={{ base: '11px', md: '12px', lg: '14px' }}
            >
              <Text>Fundraising</Text>
              <Text
                textAlign={'center'}
                w={{ base: '100%', md: '60%', lg: '100%' }}
              >
                Project Delivery
              </Text>
            </Flex>
            <Text
              lineHeight={'16px'}
              mt={{ base: '1.5em', md: '1em', lg: '1em' }}
              fontSize={{ base: '11px', md: '12px', lg: '14px' }}
            >
              Yield
              <br />
              benefit
            </Text>

            <Text
              mt={'1em'}
              lineHeight={'16px'}
              fontSize={{ base: '11px', md: '12px', lg: '14px' }}
            >
              Secure &<br />
              refundable
              <br />
              deposits
            </Text>
          </Flex>

          <Flex
            mt="-3em"
            textAlign={'center'}
            alignItems={'center'}
            flexDirection="column"
            padding={'25px'}
            justifyContent="center"
            width={{ base: '20%', md: '16%', lg: '11em' }}
          >
            <Text
              fontSize={{ base: '11px', md: '12px', lg: '14px' }}
              lineHeight={{ base: '13px', md: '14px', lg: '16px' }}
            >
              Deliver a winning project with full community{' '}
              <span style={{ color: '#63CDFA' }}>
                approval, transparency, and minimal risk.
              </span>
            </Text>
            <Image
              my="10px"
              height={'3.3em'}
              objectFit={'contain'}
              src="/media/Home/17.png"
            />
            <Flex alignItems={'center'}>
              <Image
                my="10px"
                width={'20px'}
                objectFit={'contain'}
                src="/media/Home/16.png"
              />
              <Text
                ml={'10px'}
                color="#63CDFA"
                fontSize={{ base: '11px', md: '12px', lg: '14px' }}
                lineHeight={{ base: '13px', md: '14px', lg: '16px' }}
              >
                Investor
                <br />
                approval
              </Text>
            </Flex>
            <Image
              height={'3.3em'}
              objectFit={'contain'}
              src="/media/Home/18.png"
            />
            <Text
              color="white"
              lineHeight={'16px'}
              fontSize={{ base: '11px', md: '12px', lg: '14px' }}
            >
              Remaining funds
              <span style={{ color: '#63CDFA' }}>returned </span> to backers
              with <span style={{ color: '#63CDFA' }}>Anchor yield</span>{' '}
              benefit
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        fontFamily="PilatExtended-Bold"
        fontSize={{ md: '25px', lg: '30px' }}
      >
        <Text color="#63CDFA">TOKEN</Text>
        <Text color="white" ml={'10px'}>
          UTILITY
        </Text>
      </Flex>
      <Flex
        flexWrap={'wrap'}
        flexDirection="row"
        backgroundSize={'contain'}
        backgroundImage="/media/Home/42.png"
        mt={{ base: '1em', md: '1em', lg: '1em' }}
        mb={{ base: '4em', md: '8em', lg: '10em' }}
        width={{ base: '98%', md: '90%', lg: '75em' }}
        justifyContent={{ base: 'center', md: 'center', lg: 'center' }}
      >
        {tokens.map((e, i) => (
          <Flex
            key={i}
            id="utilityToken"
            textAlign="center"
            overflow={'hidden'}
            alignItems={'center'}
            flexDirection="column"
            justifyContent={'center'}
            bgGradient="linear(#430E82, #1D0551)"
            m={{ base: '.2em', md: '.5em', lg: '.5em' }}
            p={{ base: '.2em', md: '.5em 1em', lg: '1em' }}
            width={{ base: '46%', md: '18em', lg: '19em' }}
            height={{ base: '14em', md: '20em', lg: '22em' }}
            borderRadius={{ base: '10px', md: '15px', lg: '15px' }}
          >
            <Image
              src={e.img}
              objectFit="contain"
              width={{ base: '80%', md: '70%', lg: '70%' }}
              height={{ base: '6em', md: '7em', lg: '60%' }}
            />
            <Text
              mt={'1em'}
              width="95%"
              color={'white'}
              fontFamily={{
                base: 'PilatExtended-Regular',
                md: 'PilatExtended-Bold',
                lg: 'PilatExtended-Bold',
              }}
              fontSize={{ base: '12px', md: '16px', lg: '16px' }}
              fontWeight={{ base: '500', md: 'bold', lg: 'bold' }}
            >
              {e.lable}
            </Text>
          </Flex>
        ))}
      </Flex>

      <Flex
        fontFamily="PilatExtended-Bold"
        fontSize={{ md: '25px', lg: '30px' }}
      >
        <Text color="#63CDFA">COMPETITIVE</Text>
        <Text color="white" ml={'10px'}>
          ADVANTAGES
        </Text>
      </Flex>

      <Flex
        mt={'2em'}
        position={'relative'}
        flexDirection="column"
        justifyContent={'flex-start'}
        width={{ base: '100%', md: '100%', lg: '100%' }}
      >
        <Carousel
          infinite
          autoPlay={true}
          swipeable={true}
          draggable={true}
          centerMode={true}
          showThumbs={false}
          autoPlaySpeed={2000}
          keyBoardControl={true}
          responsive={responsive}
          transitionDuration={500}
        >
          {advantages.map((e, i) => (
            <Flex
              key={i}
              m={'1em'}
              zIndex={'4'}
              textAlign="center"
              alignItems={'center'}
              position={'relative'}
              flexDirection="column"
              justifyContent={'center'}
            >
              <Flex
                alignItems={'center'}
                justifyContent={'center'}
                bgGradient="linear(#1C83BD, #210656)"
                width={{ base: '10em', md: '17em', lg: '17em' }}
                height={{ base: '10em', md: '17em', lg: '17em' }}
                borderRadius={{ base: '50em', md: '50em', lg: '50em' }}
              >
                <Image
                  src={e.img}
                  objectFit="contain"
                  width={{ base: '7em', md: '10em', lg: '12em' }}
                  height={{ base: '7em', md: '10em', lg: '12em' }}
                />
              </Flex>
              <Text
                mt={'1em'}
                color={'white'}
                fontWeight={'bold'}
                fontFamily={{
                  base: 'PilatExtended-Regular',
                  md: 'PilatExtended-Bold',
                  lg: 'PilatExtended-Bold',
                }}
                width={{ base: '95%', md: '80%', lg: '80%' }}
                fontSize={{ base: '10px', md: '13px', lg: '14px' }}
              >
                {e.lable}
              </Text>
            </Flex>
          ))}
        </Carousel>
      </Flex>
    </Flex>
  )
}

const tokens = [
  { img: '/media/Home/19.png', lable: 'Additional Investment Allocation' },
  {
    img: '/media/Home/20.png',
    lable: 'Increasing Value Through Deflationary Action',
  },
  { img: '/media/Home/21.png', lable: 'Staking Rewards' },
  {
    img: '/media/Home/22.png',
    lable: '0% Transaction Fee',
  },
  {
    img: '/media/Home/23.png',
    lable: 'Ads Payment',
  },
  {
    img: '/media/Home/24.png',
    lable: 'Prioritized Platform Placement',
  },
]

const advantages = [
  { img: '/media/Home/25.png', lable: 'Yield Benefit for Backers' },
  {
    img: '/media/Home/26.png',
    lable: 'Investor Voting Power',
  },
  { img: '/media/Home/27.png', lable: 'Cross Chain' },
  {
    img: '/media/Home/28.png',
    lable: 'Secure & Refundable Deposits',
  },
  {
    img: '/media/Home/29.png',
    lable: 'Deflationary Token Value',
  },
  {
    img: '/media/Home/30.png',
    lable: 'Fund Release With Milestone and Investor Vote Approval',
  },
  {
    img: '/media/Home/31.png',
    lable: 'Cross-Chain',
  },
  {
    img: '/media/Home/32.png',
    lable: 'Bridge Real-World and Blockchain',
  },
]
