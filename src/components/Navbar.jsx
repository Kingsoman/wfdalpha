import React from 'react'
import ConnectWallet from './ConnectWallet'
import { Link } from '@reach/router'
import { ChakraProvider, Image, Flex, Box, Text } from '@chakra-ui/react'

import theme from '../theme'
import { ButtonBackTransition } from '../components/ImageTransition'
import { Container } from '../components/Container'
import '../styles/Navbar.css'

export default function Navbar() {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Container>
        <Flex 
          id="mainContainer"
          direction={{base:'column', md:'column', lg:'row'}}
          justify={{base:'center', md:'center', lg:'space-between'}}
          h={{base:'150px', md:'150px', lg:'80px'}}
        >
          <Flex 
            w={{base:'100%', md:'100%', lg:'40%'}}
            h={{base:'50%', md:'50%', lg:'100%'}}
            align='center'
            justify={{base:'center', md:'center', lg:'space-between'}}
          >
            <Flex ml='20px'>
              <Link className="navbar-brand" to="/">
                <Image
                  alt={'Wefund'}
                  src={'/WeFund%20Logos%20only.png'}
                  width={'56px'}
                />
              </Link>
            </Flex>
            <Flex
              width= '30px'
              transform= 'rotate(90deg)'
              border= '1px solid rgba(255,255,255, 0.2)'
            />
            <DesktopNav />
          </Flex>
          <Flex
            mr='20px'
            align='center'
            justify='center'
            w={{base:'100%', md:'100%', lg:'40%'}}
            h={{base:'50%', md:'50%', lg:'100%'}}
          >
            <ButtonBackTransition
              unitid="Create Your Project"
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

            <Flex w='197px' ml='20px'>
              <ConnectWallet />
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </ChakraProvider>
  )
}
const DesktopNav = () => {
  return (
    <>
      {NAV_ITEMS.map((navItem, index) => (
        <Flex
          key={index}
          className="btn-group"
          cursor='pointer'
          ml = {{base:'50px', md:'50px', lg:'0px'}}
          align = 'center'
        >
          {!navItem.childitem && (
            <Link
              to={navItem.href}
              className="btn btn-danger"
            >
              <Text 
                color='rgba(255, 255, 255, 0.84)'
                fontSize='15px'
                lineHeight='18px'
              >
              {navItem.label}
              </Text>
            </Link>
          )}
          {navItem.children && (
            <>
              <div
                className={
                  'btn btn-danger ' +
                  (navItem.children ? 'dropdown-toggle' : '')
                }
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                  color: 'rgba(255, 255, 255, 0.84)',
                  height: '20px',
                  top: '25px',
                  fontSize: '15px',
                  lineHeight: '18px',
                }}
              >
                {navItem.label}
              </div>
              <ul
                className="dropdown-menu"
                style={{
                  width: '380px',
                  padding: '10px',
                  backgroundColor: 'black',
                }}
              >
                {navItem.children.map((childitem, index) => (
                  <li key={index}>
                    <div style={{ margin: '20px' }}>
                      <Link to={childitem.href} className="navitem">
                        <p
                          style={{
                            marginBottom: '5px',
                            fontSie: 'large',
                          }}
                        >
                          {childitem.label}
                        </p>
                        <p
                          style={{
                            marginTop: '0px',
                            fontSize: 'small',
                          }}
                        >
                          {childitem.subLabel}
                        </p>
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </Flex>
      ))}
    </>
  )
}

const NAV_ITEMS = [
  // {
  //   label: 'Projects',
  //   children: [
  //     {
  //       label: 'Explore Project',
  //       subLabel: 'Explore Project that you might be passionate about!',
  //       href: '/explorer',
  //     },
  //     {
  //       label: 'See Our Guidelines on Creating A Project',
  //       subLabel: 'Wnat to fund your project? Or open up investment opportunities for your project? See here',
  //       href: '/create',
  //     },
  //   ],
  //   href: '',
  // },
  // {
  //   label: 'Career',
  //   children: [
  //     {
  //       label: 'Job Board',
  //       subLabel: 'Join our team',
  //       href: '#',
  //     },
  //     {
  //       label: 'Freelance Projects',
  //       subLabel: 'An exclusive list for contract work, 1-4 weeks',
  //       href: '#',
  //     },
  //   ],
  //   href: '',
  // },
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Projects',
    href: 'explorer',
  },
  {
    label: 'Invest in WeFund',
    href: 'invest_step1',
  },
  {
    label: 'Dashboard',
    href: 'dashboard',
  }
]
