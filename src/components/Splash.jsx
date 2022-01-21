import React from 'react'
import { Flex, Image } from '@chakra-ui/react'
import ScrollAnimation from 'react-animate-on-scroll'

export default function Splash() {
  return (
    <Flex id="Splash">
      <ScrollAnimation animateIn="fadeIn">
        <div className="loaderContainer">
          <div className="loader">
            <div className="loader2"></div>
          </div>
          <Image src="WeFund%20Logos%20only.png" id="SplashLoaderLogo" />
        </div>
      </ScrollAnimation>
    </Flex>
  )
}
