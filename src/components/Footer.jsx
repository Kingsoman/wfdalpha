import {
  Flex,
  Text,
  Link,
  Input,
  Image,
  IconButton,
  ButtonGroup,
} from '@chakra-ui/react'
import React from 'react'
import { SiGmail } from 'react-icons/si'
import { CgWebsite } from 'react-icons/cg'
import { ButtonBackTransition } from '../components/ImageTransition'
import { FaTelegram, FaMedium, FaTwitter, FaYoutube } from 'react-icons/fa'

const SocialMediaLinks = () => (
  <ButtonGroup variant="ghost" color="white" spacing={2}>
    <IconButton
      as="a"
      aria-label="Medium"
      className="footerButton"
      borderRadius={'100px'}
      backgroundColor={'rgba(255, 255, 255, 0.05)'}
      href="https://medium.com/@wefundofficial"
      icon={<FaMedium fontSize="20px" className="footerIcon" />}
    />
    <IconButton
      as="a"
      aria-label="Youtube"
      className="footerButton"
      borderRadius={'100px'}
      backgroundColor={'rgba(255, 255, 255, 0.05)'}
      icon={<FaYoutube className="footerIcon" />}
      href="https://youtube.com/channel/UCjwo-9Yj7NQSmSqiY6FvEdw"
    />
    <IconButton
      as="a"
      aria-label="Telegram"
      className="footerButton"
      borderRadius={'100px'}
      backgroundColor={'rgba(255, 255, 255, 0.05)'}
      href="https://t.me/wefundofficial"
      icon={<FaTelegram className="footerIcon" />}
    />
    <IconButton
      as="a"
      aria-label="Twitter"
      className="footerButton"
      borderRadius={'100px'}
      backgroundColor={'rgba(255, 255, 255, 0.05)'}
      icon={<FaTwitter className="footerIcon" />}
      href="https://twitter.com/WeFund_Official"
    />
    <IconButton
      as="a"
      aria-label="SiGmail"
      className="footerButton"
      href="mailto:info@wefund.app"
      borderRadius={'100px'}
      backgroundColor={'rgba(255, 255, 255, 0.05)'}
      icon={<SiGmail className="footerIcon" />}
    />
    <IconButton
      as="a"
      aria-label="Website"
      className="footerButton"
      href="https://wefund.app"
      borderRadius={'100px'}
      backgroundColor={'rgba(255, 255, 255, 0.05)'}
      icon={<CgWebsite className="footerIcon" />}
    />
  </ButtonGroup>
)

const PagesLinks = () => (
  <Flex
    fontFamily="Sk-Modernist-Regular"
    fontSize={'16px'}
    className="FlexViewMobile"
  >
    <Link mr={'20px'}>About</Link>
    <Link mr={'20px'}>Contact</Link>
    <Link mr={'20px'}>Partnerships</Link>
    <Link mr={'20px'}>White Papers</Link>
    <Link>Terms of Service</Link>
  </Flex>
)

export default function Newfooter() {
  return (
    <Flex id="footerBottomStyle">
      <Flex id="footerBottomInnerStyleBox">
        <Flex id="FooterTextWork">
          <Text mr="5px">Wanna know more about</Text>
          <Flex>
            <Text
              mr="5px"
              color="#00A3FF"
              fontWeight={'bold'}
              fontFamily={'PilatExtended-Bold'}
            >
              WeFund
            </Text>
            <Text>?</Text>
          </Flex>
        </Flex>
        <Flex className="SUbscriptInputFooter">
          <Input
            h="45px"
            w="250px"
            type="text"
            rounded="100px"
            fontSize="16px"
            color="rgba(255, 255, 255, 0.15)"
            fontFamily="Sk-Modernist-Regular"
            placeholder="Enter email Address"
            style={{
              marginRight: '10px',
              background: 'transparent',
              border: '2px solid rgba(255, 255, 255, 0.15)',
            }}
          />
          <ButtonBackTransition
            width="150px"
            height="45px"
            rounded="100px"
            selected={false}
            unitid="SubscribeButton"
          >
            <Text fontFamily="Sk-Modernist-Regular" fontSize="16px">
              Subscribe
            </Text>
          </ButtonBackTransition>
        </Flex>
      </Flex>
      <Flex id="footerBottomInnerStyleBox">
        <Flex fontSize="25px">
          <Flex>
            <Image
              width={'50px'}
              objectFit={'contain'}
              src="WeFund%20Logos%20only.png"
            />
            <Text fontFamily="Sk-Modernist-Regular" ml={'5px'}>
              We
            </Text>
            <Text fontFamily="Sk-Modernist-Bold" fontWeight={'bolder'}>
              Fund
            </Text>
          </Flex>
        </Flex>
        <PagesLinks />
      </Flex>
      <Flex id="footerBottomInnerStyleBox">
        <Flex id="FooterTextWork2">
          <Text>&copy; {new Date().getFullYear()}</Text>
          <Text ml="5px" mr="5px" color="#00A3FF">
            WeFund.
          </Text>
          <Text>All rights reserved.</Text>
        </Flex>
        <SocialMediaLinks />
      </Flex>
    </Flex>
  )
}
