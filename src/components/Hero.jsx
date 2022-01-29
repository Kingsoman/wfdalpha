import React from 'react'

import { Image, Flex, Text } from '@chakra-ui/react'

export default function Hero() {
  return (
    <Flex id="heroSection" direction="column">
      <Image src="/media/stars.svg" id="starsBg" />
      <Image src="/media/cloud.svg" id="cloudBg" />
      <Image src="/media/stage.png" id="stageBg" />
      <Image
        src="/media/horizontallogo.svg"
        id="heroLogo"
        data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="1500"
      />

      <Text id="heroHeading" data-aos="fade-up">
        Community
        <br />
        Crowdfunding
        <br />
        Cross-Chain
        <br />
        Incubator
      </Text>

      <Flex id="ArrowDownButton" data-aos="flip-up">
        <a href="#aboutSection">
          <Image src="/media/ArrowDown.png" id="ArrowDownButtonImage" />
        </a>
      </Flex>
    </Flex>
  )
}
