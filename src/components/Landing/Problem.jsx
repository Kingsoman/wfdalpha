import React from 'react'
import { Flex, Text, Image } from '@chakra-ui/react'

import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader

export default function Problem() {
  return (
    <Flex
      width="100%"
      position="relative"
      alignItems="center"
      flexDirection="column"
      pb={{ base: '5em', md: '5em', lg: '10em' }}
    >
      <Flex
        p={'1em 0'}
        pt={'0'}
        width={'100%'}
        position={'relative'}
        alignItems={'center'}
        justifyContent="center"
        backgroundSize={'contain'}
        backgroundImage="/media/Home/11.png"
        mt={{ base: '4em', md: '4em', lg: '8em' }}
      >
        <Carousel
          width="100%"
          showThumbs={false}
          showStatus={false}
          useKeyboardArrows={true}
          infiniteLoop={true}
          autoPlay={true}
          stopOnHover={true}
          emulateTouch={true}
          transitionTime={400}
        >
          <Flex
            zIndex={'4'}
            margin="auto"
            borderRadius="20px"
            alignItems={'center'}
            position={'relative'}
            flexDirection={'column'}
            justifyContent={'center'}
            bgGradient={'Linear(#430E82, #1D0551)'}
            p={{ base: '1em', md: '2em 1em', lg: '2em 1em' }}
            width={{ base: '95%', md: '90%', lg: '55em', xl: '60em' }}
          >
            <Text
              fontFamily="PilatExtended-Bold"
              fontSize={{ base: '20px', md: '25px', lg: '30px' }}
              color="#63CDFA"
            >
              PROBLEM
            </Text>
            <Flex
              width={'100%'}
              alignItems="center"
              justifyContent="center"
              flexWrap={{ md: 'wrap', lg: 'wrap' }}
              flexDirection={{ base: 'column', md: 'row', lg: 'row' }}
            >
              {problems.map((e, i) => (
                <Flex
                  key={i}
                  mt={{ base: '1em', md: '2em', lg: '2em' }}
                  w={{ base: '98%', md: '30%', lg: e.width, xl: e.width }}
                  alignItems={{ base: 'center', md: 'center', lg: 'center' }}
                >
                  <Flex
                    alignItems="center"
                    position={'relative'}
                    borderRadius={'200px'}
                    justifyContent="center"
                    bgGradient={'Linear(#F8A5FF, #FFE2FF)'}
                    minWidth={{ base: '5.5em', md: '7em', lg: '8em' }}
                    maxWidth={{ base: '5.5em', md: '7em', lg: '8em' }}
                    width={{ base: '5.5em', md: '7em', lg: '8em' }}
                    height={{ base: '4.5em', md: '7em', lg: '8em' }}
                    mr={{ base: '.5em', md: '0.5em', lg: '0.5em' }}
                  >
                    <Image
                      src={e.img}
                      position={'absolute'}
                      width={{ base: '2em', md: '80%', lg: '80%' }}
                      height={{ base: '2em', md: '80%', lg: '80%' }}
                      objectFit={{ base: 'contain', md: 'auto', lg: 'auto' }}
                    />
                  </Flex>
                  <Text
                    textAlign={'left'}
                    fontWeight={'bold'}
                    fontFamily="Sk-Modernist-Regular"
                    w={{ base: '90%', md: e.md, lg: e.lg, xl: e.xl }}
                    fontSize={{ base: '14px', md: '16px', lg: '18px' }}
                  >
                    {e.lable}
                  </Text>
                </Flex>
              ))}
            </Flex>
          </Flex>

          <Flex
            zIndex={'4'}
            margin="auto"
            borderRadius="20px"
            alignItems={'center'}
            position={'relative'}
            flexDirection={'column'}
            justifyContent={'center'}
            bgGradient={'Linear(#430E82, #1D0551)'}
            p={{ base: '1em', md: '1em', lg: '2em' }}
            width={{ base: '95%', md: '90%', lg: '55em', xl: '60em' }}
          >
            <Text
              fontFamily="PilatExtended-Bold"
              fontSize={{ lg: '30px' }}
              color="#63CDFA"
            >
              SOLUTION
            </Text>
            <Flex
              width={'100%'}
              alignItems="flex-start"
              justifyContent="space-around"
              flexWrap={{ md: 'wrap', lg: 'wrap' }}
              flexDirection={{ base: 'column', md: 'row', lg: 'row' }}
            >
              {solutions.map((e, i) => (
                <Flex
                  key={i}
                  mt={'2em'}
                  alignItems={'center'}
                  justifyContent="center"
                  w={{ base: '98%', md: '30%', lg: '12em', xl: '14em' }}
                  flexDirection={{ base: 'row', md: 'column', lg: 'column' }}
                >
                  <Flex
                    align="center"
                    justify="center"
                    alignItems="center"
                    position={'relative'}
                    borderRadius={'100px'}
                    justifyContent="center"
                    mr={{ base: '.5em', md: '0', lg: '0' }}
                    bgGradient={'Linear(#F8A5FF, #FFE2FF)'}
                    width={{ base: '4em', md: '7em', lg: '8em' }}
                    height={{ base: '4em', md: '7em', lg: '8em' }}
                  >
                    <Image
                      src={e.img}
                      objectFit="contain"
                      position="absolute"
                      height={{ base: '3em', md: '7em', lg: '7em' }}
                    />
                  </Flex>
                  <Text
                    mt={'1em'}
                    fontWeight={'bold'}
                    fontFamily="Sk-Modernist-Regular"
                    fontSize={{ md: '16px', lg: '18px' }}
                    width={{ base: '80%', md: '100%', lg: '100%' }}
                    textAlign={{ base: 'left', md: 'center', lg: 'center' }}
                  >
                    {e.lable}
                  </Text>
                </Flex>
              ))}
            </Flex>
          </Flex>
        </Carousel>
      </Flex>
    </Flex>
  )
}

const problems = [
  {
    md: '8em',
    lg: '8em',
    xl: '10em',
    width: '26%',
    img: '/media/Home/5.png',
    lable: 'Pump and\ndump schemes',
  },
  {
    md: '8em',
    lg: '8em',
    xl: '10em',
    width: '26%',
    img: '/media/Home/6.png',
    lable: 'Non-refundable investment',
  },
  {
    md: '8em',
    lg: '8em',
    xl: '10em',
    width: '26%',
    img: '/media/Home/7.png',
    lable: 'Undelivered achievement',
  },
  {
    lg: '12em',
    xl: '14em',
    md: '10em',
    width: '35%',
    img: '/media/Home/8.png',
    lable: 'Failed projects unable to return any resources to investors',
  },
  {
    xl: '17em',
    lg: '17em',
    md: '14em',
    width: '40%',
    img: '/media/Home/9.png',
    lable:
      'An early-stage crypto project could have a high barrier of entry such as minimum investment amounts',
  },
]

const solutions = [
  {
    img: '/media/Home/37.png',
    lable:
      'All projects will have a dedicated smart contract to deposit all funds in the Anchor protocol for security. WeFund does not touch the funds raised.',
  },
  {
    img: '/media/Home/38.png',
    lable:
      'Milestones will be approved by the project backers for the next set of funds to be released from Anchor to the project.',
  },
  {
    img: '/media/Home/39.png',
    lable:
      'If the project does not get approved by the backers, then the remaining funds will be returned to the backers.',
  },
]
