import React from 'react'

import { Image, Text, Flex } from '@chakra-ui/react'
import { ButtonTransition } from '../components/ImageTransition'

export default function Email() {
  return (
    <Flex id="comunityBackgroundHeight">
      <Image src="/media/EmailBg.png" className="EmailBg" />
      <Flex id="emailInnerBox">
        <Flex flexDirection="column" textAlign="center">
          <Text className="emailInnerBoxTitle">GET IN WEFUND</Text>

          <Text className="emailInnerBoxTitle" mt="10px">
            Grow With Us Now
          </Text>
        </Flex>
        <Flex justify="center" id="displayNoneInMobile">
          <ButtonTransition
            unitid="investinwefund"
            selected={false}
            width="210px"
            height="50px"
            rounded="100px"
          >
            <Flex direction="row">
              Invest in WeFund
              <Image ml="10px" alt="startfunding" src="/media/investface.svg" />
            </Flex>
          </ButtonTransition>
        </Flex>
        <Flex justify="center" id="displayNoneInDesktop">
          <ButtonTransition
            unitid="investinwefund"
            selected={false}
            width="120px"
            height="20px"
            rounded="100px"
          >
            <Flex direction="row" fontSize="10px">
              Invest in WeFund
            </Flex>
          </ButtonTransition>
        </Flex>
      </Flex>
    </Flex>
  )
}
