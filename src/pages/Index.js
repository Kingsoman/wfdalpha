import React, { useEffect } from 'react'
import { ChakraProvider } from '@chakra-ui/react'

import '../styles/home.css'

import AOS from 'aos'
import 'aos/dist/aos.css' // You can also use <link> for styles

import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader

import theme from '../theme'
import Footer from '../components/Footer'
import Team from '../components/Landing/Team'
import Hero from '../components/Landing/Hero'
import About from '../components/Landing/about'
import RoadMap from '../components/Landing/Roadmap'
import Problem from '../components/Landing/Problem'
import { Container } from '../components/Container'
import Works from '../components/Landing/HowItWorks'
import Partners from '../components/Landing/Partners'
import UpcomingProject from '../components/Landing/ComingSoonCarousel'

export default () => {
  useEffect(() => AOS.init({ duration: 1000 }), [])

  return (
    <ChakraProvider resetCSS theme={theme}>
      <Container>
        <Hero />
        <About />
        <Problem />
        <Works />
        <RoadMap />
        <UpcomingProject />
        <Partners />
        <Team />
        <Footer />
      </Container>
    </ChakraProvider>
  )
}
