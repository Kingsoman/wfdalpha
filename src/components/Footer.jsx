import React from 'react'
import { SiGmail } from 'react-icons/si'
import { CgWebsite } from 'react-icons/cg'
import { Flex, Text, ButtonGroup, IconButton } from '@chakra-ui/react'
import { FaTelegram, FaMedium, FaTwitter, FaYoutube } from 'react-icons/fa'

const SocialMediaLinks = () => (
  <ButtonGroup variant="ghost" color="gray.600" spacing={1}>
    <IconButton
      as="a"
      aria-label="Medium"
      className="footerButton"
      icon={<FaMedium fontSize="20px" className="footerIcon" />}
      href="https://medium.com/@wefundofficial"
    />
    <IconButton
      as="a"
      aria-label="Youtube"
      className="footerButton"
      icon={<FaYoutube className="footerIcon" />}
      href="https://youtube.com/channel/UCjwo-9Yj7NQSmSqiY6FvEdw"
    />
    <IconButton
      as="a"
      aria-label="Telegram"
      className="footerButton"
      href="https://t.me/wefundofficial"
      icon={<FaTelegram className="footerIcon" />}
    />
    <IconButton
      as="a"
      aria-label="Twitter"
      className="footerButton"
      icon={<FaTwitter className="footerIcon" />}
      href="https://twitter.com/WeFund_Official"
    />
    <IconButton
      as="a"
      aria-label="SiGmail"
      className="footerButton"
      href="mailto:info@wefund.app"
      icon={<SiGmail className="footerIcon" />}
    />
    <IconButton
      as="a"
      aria-label="Website"
      className="footerButton"
      href="https://wefund.app"
      icon={<CgWebsite className="footerIcon" />}
    />
  </ButtonGroup>
)

export default function Newfooter() {
  return (
    <Flex id="footerBottomStyle">
      <Flex id="footerBottomInnerStyle">
        <Flex id="footerBottomInnerStyleBox">
          <Flex>
            <Flex id="FooterTextWork">
              <Text mr="5px">Wanna know more about</Text>
              <Text mr="5px" color="#00A3FF">
                WeFund
              </Text>
              <Text>?</Text>
            </Flex>
          </Flex>
          <SocialMediaLinks />
        </Flex>
        <Flex id="FooterTextWork2">
          <Text>&copy; {new Date().getFullYear()}</Text>
          <Text ml="5px" mr="5px" color="#00A3FF">
            WeFund.
          </Text>
          <Text>All rights reserved.</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
