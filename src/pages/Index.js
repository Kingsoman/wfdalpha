import React, { useEffect, useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme'

import Particles from 'react-tsparticles'
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

import AOS from 'aos'
import 'aos/dist/aos.css' // You can also use <link> for styles

export default () => {
  const [isSplash, setSplash] = useState(true)

  useEffect(() => {
    AOS.init({ duration: 1000 })
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
