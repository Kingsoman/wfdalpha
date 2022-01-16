import React, { useEffect, useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme'

import Hero from '../components/Hero'
import About from '../components/about'
import Splash from '../components/Splash'
import Footer from '../components/Footer'
import RoadMap from '../components/Roadmap'
import Industry from '../components/Industry'
import OurMissions from '../components/OurMissions'
import { Container } from '../components/Container'
import '../styles/transition.scss'
import '../styles/transition.css'

export default () => {
  const [isSplash, setSplash] = useState(false)

  useEffect(() => {
    setSplash(true)
    setTimeout(() => setSplash(false), 3000)
  }, [])

  return (
    <ChakraProvider resetCSS theme={theme}>
      <Container>
        {isSplash ? (
          <Splash />
        ) : (
          <>
            <Hero />
            <About />
            <OurMissions />
            <Industry />
            <RoadMap />
            <Footer />
          </>
        )}
      </Container>
    </ChakraProvider>
  )
}
