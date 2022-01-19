import React from 'react'
import theme from '../theme'
import { ChakraProvider } from '@chakra-ui/react'

import Hero from '../components/Hero'
import About from '../components/about'
import Industry from '../components/Industry'
import OurMissions from '../components/OurMissions'
import RoadMap from '../components/Roadmap'
import Footer from '../components/Footer'
import { Container } from '../components/Container'
import '../styles/transition.scss'
import '../styles/transition.css'

export default () => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Container>
        <Hero />
        <About />
        <OurMissions />
        <Industry />
        <RoadMap />
        <Footer />
      </Container>
    </ChakraProvider>
  )
}
