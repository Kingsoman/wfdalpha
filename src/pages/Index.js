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
<<<<<<< HEAD
        <Hero />
        <About />
        <OurMissions />
        <Industry />
        <RoadMap />
        <Footer />
=======
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
>>>>>>> parent of 29b13d2 (Merge branch 'hrd1' of https://github.com/WeFundOfficial/wfdalpha into Ahmed-Dev1)
      </Container>
    </ChakraProvider>
  )
}
