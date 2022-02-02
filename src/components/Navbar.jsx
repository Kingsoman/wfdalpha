import React from 'react'
import {
  Box,
  Text,
  Icon,
  Flex,
  Image,
  VStack,
  HStack,
  ChakraProvider,
} from '@chakra-ui/react'
import theme from '../theme'
import '../styles/Navbar.css'
import { Link } from '@reach/router'
import ConnectWallet from './ConnectWallet'
import { RiAccountPinBoxFill } from 'react-icons/ri'
import { Container } from '../components/Container'
import { ButtonBackTransition } from '../components/ImageTransition'

export default function Navbar() {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Container>
        <VStack display={{ base: 'none', md: 'none', lg: 'block' }}>
          <Flex
            direction="row"
            justify="space-between"
            h="80px"
            zIndex="99"
            w="100%"
            position="relative"
            backdropFilter="blur(54px)"
            borderBottom="2px solid rgba(255, 255, 255, 0.103)"
          >
            <Flex w="50%" h="100%" align="center" justify="space-between">
              <Flex ml="90px">
                <Link className="navbar-brand" to="/">
                  <Image
                    alt="Wefund"
                    src="/media/WeFund-Logos-only.png"
                    h="30px"
                  />
                </Link>
                <Flex ml="10px" border="1px solid rgba(255,255,255, 0.2)" />
              </Flex>
              <DesktopNav />
            </Flex>
            <Flex mr="20px" align="center" justify="center" w="40%" h="100%">
              <ButtonBackTransition
                unitid="CreateYourProject"
                selected={false}
                width="197px"
                height="40px"
                rounded="33px"
              >
                <Link to="/create">
                  <Box
                    variant="solid"
                    color="white"
                    justify="center"
                    align="center"
                  >
                    Create Your Project
                  </Box>
                </Link>
              </ButtonBackTransition>

              <Flex w="197px" ml="20px" mr={'10px'}>
                <ConnectWallet />
              </Flex>
              <Link to="walletInfo">
                <Icon as={RiAccountPinBoxFill} fontSize={'45px'} />
              </Link>
            </Flex>
          </Flex>
        </VStack>
        <VStack display={{ base: 'block', md: 'block', lg: 'none' }}>
          <Flex
            h="60px"
            w="100%"
            zIndex="99"
            direction="row"
            position="relative"
            justify="space-between"
            backdropFilter="blur(54px)"
            borderBottom="2px solid rgba(255, 255, 255, 0.103)"
          >
            <Flex ml="30px" align="center">
              <Link className="navbar-brand" to="/">
                <Image
                  alt="Wefund"
                  src="/media/WeFund-Logos-only.png"
                  h="25px"
                />
              </Link>
            </Flex>
            <HStack>
              <Flex mr="10px" className="dropdown2">
                <Flex className="dropbtn">
                  <Image alt="menu1" src="/media/menuButton1.svg" h="20px" />
                </Flex>
                <div className="dropdown-content2">
                  <ConnectWallet />
                </div>
              </Flex>
              <Flex pr="30px" className="dropdown">
                <Flex className="dropbtn" mr={'20px'}>
                  <Image alt="menu2" src="/media/menuButton2.svg" h="20px" />
                </Flex>
                <Link to="walletInfo">
                  <Icon as={RiAccountPinBoxFill} fontSize={'30px'} />
                </Link>
                <div className="dropdown-content">
                  {NAV_ITEMS.map((navItem, index) => (
                    <Link to={navItem.href} key={index}>
                      {navItem.label}
                    </Link>
                  ))}
                  <Link to="/create">Create Project</Link>
                </div>
              </Flex>
            </HStack>
          </Flex>
        </VStack>
      </Container>
    </ChakraProvider>
  )
}
const DesktopNav = () => {
  return (
    <>
      {NAV_ITEMS.map((navItem, index) => (
        <Flex key={index} className="btn-group" cursor="pointer" align="center">
          <Link to={navItem.href} className="btn btn-danger">
            <Text
              color="rgba(255, 255, 255, 0.84)"
              fontSize="16px"
              lineHeight="18px"
            >
              {navItem.label}
            </Text>
          </Link>
        </Flex>
      ))}
    </>
  )
}

const NAV_ITEMS = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Projects',
    href: '/explorer',
  },
  // {
  //   label: 'Invest in WeFund',
  //   href: '/invest_step0',
  // },
  // {
  //   label: 'Dashboard',
  //   href: 'dashboard',
  // },
  //  {
  //    label: 'Career',
  //    href: '#',
  //  },
  //  {
  //    label: 'Contact',
  //    href: '#',
  //  },
  {
    label: 'Blog',
    href: '/blog',
  },
  // {
  //   label: 'FAQ',
  //   href: 'faq',
  // },
]
