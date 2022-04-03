import {
  Flex,
  Text,
  Link,
  Input,
  Button,
  IconButton,
  ButtonGroup,
} from '@chakra-ui/react'
import React from 'react'
import { SiGmail } from 'react-icons/si'
import { CgWebsite } from 'react-icons/cg'
import { FaTelegram, FaMedium, FaTwitter, FaYoutube } from 'react-icons/fa'

const SocialMediaLinks = () => (
  <ButtonGroup variant="ghost" color="white" spacing={2}>
    <IconButton
      as="a"
      aria-label="Medium"
      borderRadius={'100px'}
      className="footerButton"
      width={{ lg: '25px', base: '16px' }}
      backgroundColor={'rgba(255, 255, 255, 0.05)'}
      href="https://medium.com/@wefundofficial"
      icon={<FaMedium className="footerIcon" />}
    />
    <IconButton
      as="a"
      aria-label="Youtube"
      className="footerButton"
      width={{ lg: '25px', base: '16px' }}
      borderRadius={'100px'}
      backgroundColor={'rgba(255, 255, 255, 0.05)'}
      icon={<FaYoutube className="footerIcon" />}
      href="https://youtube.com/channel/UCjwo-9Yj7NQSmSqiY6FvEdw"
    />
    <IconButton
      as="a"
      aria-label="Telegram"
      className="footerButton"
      width={{ lg: '25px', base: '16px' }}
      borderRadius={'100px'}
      backgroundColor={'rgba(255, 255, 255, 0.05)'}
      href="https://t.me/wefundofficial"
      icon={<FaTelegram className="footerIcon" />}
    />
    <IconButton
      as="a"
      aria-label="Twitter"
      className="footerButton"
      width={{ lg: '25px', base: '16px' }}
      borderRadius={'100px'}
      backgroundColor={'rgba(255, 255, 255, 0.05)'}
      icon={<FaTwitter className="footerIcon" />}
      href="https://twitter.com/WeFund_Official"
    />
    <IconButton
      width={{ lg: '25px', base: '16px' }}
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
      width={{ lg: '25px', base: '16px' }}
      href="https://wefund.app"
      borderRadius={'100px'}
      backgroundColor={'rgba(255, 255, 255, 0.05)'}
      icon={<CgWebsite className="footerIcon" />}
    />
  </ButtonGroup>
)

export default function Newfooter() {
  return (
    <Flex
      zIndex={'5'}
      color={'white'}
      margin={'0 auto'}
      position="relative"
      flexDirection="column"
      width={{ md: '90%', lg: '80%' }}
    >
      <Text
        mb={'1em'}
        fontSize={'30px'}
        fontWeight={'bold'}
        fontFamily="PilatExtended-Bold"
      >
        Get Updated News
      </Text>

      <Text
        fontSize={'18px'}
        fontWeight={'bold'}
        fontFamily="Sk-Modernist-Regular"
      >
        Want to know more about WeFund?
      </Text>

      <Flex width={{ lg: '100%' }} py={{ lg: '2em' }}>
        <Input
          type="text"
          color="#503E6D"
          rounded={'5px'}
          background={'#E5E7EB'}
          border="1px solid #A2A8B4"
          placeholder="Email Address"
          mr={{ lg: '10px', base: '0px' }}
          h={{ lg: '45px', base: '40px' }}
          w={{ lg: '100%', base: '100%' }}
          fontFamily="Sk-Modernist-Regular"
          fontSize={{ lg: '16px', base: '12px' }}
        />
        <Button
          backgroundColor={'#0084FF'}
          h={{ lg: '45px', base: '40px' }}
          fontFamily="Sk-Modernist-Regular"
          fontSize={{ lg: '16px', base: '12px' }}
        >
          Subscribe
        </Button>
      </Flex>

      <Flex
        justifyContent={'flex-end'}
        width={{ lg: '100%' }}
        // py={{ lg: '2em' }}
      >
        <Flex
          fontSize={{ lg: '16px', base: '14px' }}
          fontFamily="Sk-Modernist-Regular"
        >
          <Link href="/" mr="20px">
            Home
          </Link>
          <Link href="/explorer" mr="20px">
            Projects
          </Link>
          <Link href="/invest_step0" mr="20px">
            Invest In WeFund
          </Link>
          <Link href="/blog">Blog</Link>
        </Flex>
      </Flex>

      <Flex
        justifyContent={'space-between'}
        width={{ lg: '100%' }}
        py={{ lg: '2em' }}
      >
        <Text fontSize={{ lg: '18px' }} fontFamily="Sk-Modernist-Regular">
          &copy; {new Date().getFullYear()} WeFund. All rights reserved.
        </Text>
        <SocialMediaLinks />
      </Flex>
    </Flex>
  )
}
