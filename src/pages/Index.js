import React, { useEffect, useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import Particles from 'react-tsparticles'

import AOS from 'aos'
import 'aos/dist/aos.css' // You can also use <link> for styles

import theme from '../theme'
import Footer from '../components/Footer'
import Team from '../components/Landing/Team'
import Hero from '../components/Landing/Hero'
import About from '../components/Landing/about'
import Splash from '../components/Landing/Splash'
import RoadMap from '../components/Landing/Roadmap'
import Industry from '../components/Landing/Industry'
import Partners from '../components/Landing/Partners'
import OurMissions from '../components/Landing/OurMissions'

import { Container } from '../components/Container'

export default () => {
  const [isSplash, setSplash] = useState(true)

  useEffect(() => {
    AOS.init({ duration: 1000 })
    setTimeout(() => setSplash(false), 3000)
  }, [])

  const styles = { position: 'relative', zIndex: -5 }

  const options = {
    fpsLimit: 60,
    interactivity: {
      events: {
        resize: false,
        onClick: { enable: false, mode: 'push' },
        onHover: { enable: false, mode: 'repulse' },
      },
      modes: {
        push: { quantity: 4 },
        repulse: { distance: 200, duration: 0.4 },
        bubble: {
          distance: 400,
          duration: 5,
          opacity: 0.6,
          size: 40,
        },
      },
    },
    particles: {
      color: { value: '#422E5F' },
      links: {
        color: '#422E5F',
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      collisions: { enable: true },
      move: {
        direction: 'none',
        enable: true,
        outMode: 'bounce',
        random: true,
        speed: 1,
        straight: false,
      },
      number: { density: { enable: true, area: 800 }, value: 80 },
      opacity: { value: 0.5 },
      shape: { type: 'circle' },
      size: { random: true, value: 5 },
    },
    detectRetina: false,
  }

  return (
    <ChakraProvider resetCSS theme={theme}>
      <Container>
        {isSplash ? (
          <Splash />
        ) : (
          <>
            <Hero />
            {/* <Particles options={options} style={styles} /> */}
            <About />
            <OurMissions />
            <Team />
            <Industry />
            <RoadMap />
            <Partners />
            <Footer />
          </>
        )}
      </Container>
    </ChakraProvider>
  )
}
