import React from 'react'
import { Text, Box, Image, Flex } from '@chakra-ui/react'

export default function Projectfeature() {
  var down_position = 0

  function movingpadDown(e) {
    down_position = e.pageX
  }
  function movingpadUp(e) {
    var movingpad = document.getElementById('movingpad')
    var offsets = movingpad.getBoundingClientRect()
    var left = offsets.left
    var offset = e.pageX - down_position

    movingpad.style.transform = 'translateX(' + (left + offset) + 'px)'
  }
  return (
    <Flex
      w="100%"
      px="115px"
      mt="135px"
      direction="column"
      fontFamily="Sk-Modernist-Regular"
    >
      <Box mt="70px">
        <Text
          fontFamily="PilatExtended-Regular"
          fontWeight="400"
          fontSize="22px"
        >
          PROJECT POOLS
        </Text>
        <Text
          fontFamily="PilatExtended-Regular"
          fontWeight="700"
          fontSize="35px"
        >
          See Various Featured
        </Text>
        <Flex
          direction="row"
          fontFamily="PilatExtended-Regular"
          fontWeight="700"
          fontSize="35px"
        >
          <Text color="#00A3FF">Projects&nbsp;</Text>
          <Text>to back</Text>
        </Flex>
      </Box>
      <Flex w="100%" mt="45px" height="400px" pb="168px" position="relative">
        <Flex
          w="100%"
          position="absolute"
          onMouseUp={movingpadUp}
          onMouseDown={movingpadDown}
        >
          <Flex
            id="movingpad"
            direction="row"
            position="relative"
            style={{ transition: 'transform 1s', cursor: 'pointer' }}
          >
            {FEATURED_ITEMS.map((featuredItem, index) => (
              <Flex
                direction="row"
                rounded="30px"
                border="1px solid #ffffff50"
                padding="10px"
                bg="#FFFFFF1A"
                ml="30px"
                key={index}
                w="515px"
                h="270px"
                userSelect="none"
              >
                <Flex
                  justify="center"
                  align="center"
                  rounded="30px"
                  bg="white"
                  minWidth="165px"
                  h="250px"
                  pointerEvents="none"
                >
                  <Image
                    alt="Crypto Industry"
                    src={featuredItem.imgsrc}
                    style={{ height: '150px' }}
                  />
                </Flex>
                <Box ml="29px" overflow="hidden" pointerEvents="none">
                  <Box
                    mt="20px"
                    fontFamily="PilatExtended-Regular"
                    fontWeight="700"
                    fontSize="18px"
                  >
                    {featuredItem.title}
                  </Box>
                  <Box
                    mt="8px"
                    fontWeight="400"
                    fontSize="16px"
                    color="gainsboro"
                  >
                    {featuredItem.description}
                  </Box>
                  <Flex mt="20px" direction="row">
                    <Image alt="Crypto Industry" src="/media/ProjectIcon.svg" />
                    <Box ml="3px" fontWeight="700" fontSize="16px">
                      {featuredItem.project}
                    </Box>
                  </Flex>
                  <Flex mt="20px" direction="row">
                    <Image alt="Crypto Industry" src="/media/CategoryIcon.svg" />
                    <Box ml="3px" fontWeight="700" fontSize="16px">
                      {featuredItem.category}
                    </Box>
                  </Flex>
                  <Flex mt="20px" direction="row">
                    <Image alt="Crypto Industry" src="/media/ExtraIcon.svg" />
                    <Box ml="3px" fontWeight="700" fontSize="16px">
                      {featuredItem.extra}
                    </Box>
                  </Flex>
                </Box>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

const FEATURED_ITEMS = [
  {
    title: 'Lynx Vr',
    description: 'A charity project of a simulation game based on VR',
    project: 'Charity Project',
    category: 'Cardino',
    extra: '-\\',
    imgsrc: '/media/lynx.jpeg',
  },
  {
    title: 'Sheep',
    description: 'Memecoin to share awareness of covid',
    project: 'Charity Project',
    category: 'Dalas',
    extra: '-\\',
    imgsrc: '/media/sheep.png',
  },
  {
    title: 'Simba',
    description: 'A charity project on memecoin to fund nature and ecosystem',
    project: 'Charity Project',
    category: 'Cardino',
    extra: '-\\',
    imgsrc: '/media/simba-icon-mini.png',
  },
  {
    title: 'Crypto of duty',
    description: 'Multi Chain global war project game',
    project: 'Game Project',
    category: 'Cardino',
    extra: '-\\',
    imgsrc: '/media/6053394334130220469_121.jpg',
  },
]
