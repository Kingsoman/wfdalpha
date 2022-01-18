import React from 'react'
import theme from '../theme'
import { ChakraProvider } from '@chakra-ui/react'

import Particles from 'react-tsparticles'
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
        <Particles 
                
                options={{
  
                    fpsLimit: 60,
                    interactivity: {
                      events: {
                        onClick: {
                          enable: true,
                          mode: "push",
                        },
                        onHover: {
                          enable: true,
                          mode: "repulse",
                        },
                        resize: true,
                      },
                      modes: {
                        bubble: {
                          distance: 400,
                          duration: 2,
                          opacity: 0.8,
                          size: 40,
                        },
                        push: {
                          quantity: 4,
                        },
                        repulse: {
                          distance: 200,
                          duration: 0.4,
                        },
                      },
                    },
                    particles: {
                      color: {
                        value: "#ffffff",
                      },
                      links: {
                        color: "#ffffff",
                        distance: 150,
                        enable: true,
                        opacity: 0.5,
                        width: 1,
                      },
                      collisions: {
                        enable: true,
                      },
                      move: {
                        direction: "none",
                        enable: true,
                        outMode: "bounce",
                        random: false,
                        speed: 6,
                        straight: false,
                      },
                      number: {
                        density: {
                          enable: true,
                          area: 800,
                        },
                        value: 80,
                      },
                      opacity: {
                        value: 0.5,
                      },
                      shape: {
                        type: "circle",
                      },
                      size: {
                        random: true,
                        value: 5,
                      },
                    },
                    detectRetina: true,
                  }}
                />
        <About />
        <OurMissions />
        <Industry />
        <RoadMap />
        <Footer />
      </Container>
    </ChakraProvider>
  )
}
