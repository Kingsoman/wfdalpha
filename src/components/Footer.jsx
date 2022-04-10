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
      backgroundColor={'rgba(255, 255, 255, 0.05)'}
      width={{ lg: '25px', base: '18px' }}
      href="https://medium.com/@wefundofficial"
      icon={<FaMedium className="footerIcon" />}
    />
    <IconButton
      as="a"
      aria-label="Youtube"
      className="footerButton"
      borderRadius={'100px'}
      width={{ lg: '25px', base: '18px' }}
      backgroundColor={'rgba(255, 255, 255, 0.05)'}
      icon={<FaYoutube className="footerIcon" />}
      href="https://youtube.com/channel/UCjwo-9Yj7NQSmSqiY6FvEdw"
    />
    <IconButton
      as="a"
      aria-label="Telegram"
      className="footerButton"
      borderRadius={'100px'}
      width={{ lg: '25px', base: '18px' }}
      backgroundColor={'rgba(255, 255, 255, 0.05)'}
      href="https://t.me/wefundofficial"
      icon={<FaTelegram className="footerIcon" />}
    />
    <IconButton
      as="a"
      aria-label="Twitter"
      className="footerButton"
      borderRadius={'100px'}
      width={{ lg: '25px', base: '18px' }}
      backgroundColor={'rgba(255, 255, 255, 0.05)'}
      icon={<FaTwitter className="footerIcon" />}
      href="https://twitter.com/WeFund_Official"
    />
    <IconButton
      as="a"
      width={{ lg: '25px', base: '18px' }}
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
      width={{ lg: '25px', base: '18px' }}
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
      mt={{ base: '3em', md: 'auto', lg: 'auto' }}
      width={{ base: '100%', md: '80vw', lg: '66vw' }}
      textAlign={{ base: 'center', md: 'auto', lg: 'auto' }}
    >
      <Text
        mb={'1em'}
        fontWeight={'bold'}
        fontFamily="PilatExtended-Bold"
        fontSize={{ base: '22px', md: '30px', lg: '30px' }}
      >
        Get Updated News
      </Text>

      <Text
        fontWeight={'bold'}
        fontFamily="Sk-Modernist-Regular"
        fontSize={{ base: '16px', md: '18px', lg: '18px' }}
      >
        Want to know more about WeFund?
      </Text>

      <Flex
        width={{ lg: '100%' }}
        alignItems={{ base: 'center' }}
        py={{ base: '2em', md: '2em', lg: '2em' }}
        flexDirection={{ base: 'column', md: 'row', lg: 'row' }}
      >
        <Input
          type="text"
          color="#503E6D"
          rounded={'5px'}
          background={'#E5E7EB'}
          border="1px solid #A2A8B4"
          placeholder="Email Address"
          mr={{ lg: '10px', base: '5px' }}
          h={{ lg: '45px', base: '40px' }}
          w={{ lg: '100%', base: '100%' }}
          fontFamily="Sk-Modernist-Regular"
          fontSize={{ lg: '16px', md: '16px', base: '14px' }}
        />
        <Button
          backgroundColor={'#0084FF'}
          h={{ lg: '45px', base: '40px' }}
          fontFamily="Sk-Modernist-Regular"
          mt={{ base: '5px', md: '0', lg: '0' }}
          fontSize={{ lg: '16px', md: '16px', base: '14px' }}
        >
          Subscribe
        </Button>
      </Flex>

      <Flex
        width={{ lg: '100%' }}
        justifyContent={{ base: 'center', md: 'flex-end', lg: 'flex-end' }}
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
        alignItems="center"
        width={{ lg: '100%' }}
        justifyContent="space-between"
        py={{ base: '2em', md: '2em', lg: '2em' }}
        flexDirection={{ base: 'column', md: 'row', lg: 'row' }}
      >
        <Text fontSize={{ lg: '18px' }} fontFamily="Sk-Modernist-Regular">
          &copy; {new Date().getFullYear()} WeFund. All rights reserved.
        </Text>
        <SocialMediaLinks />
      </Flex>
    </Flex>
  )
}
