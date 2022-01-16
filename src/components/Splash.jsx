import React from 'react'
import { Flex, Image } from '@chakra-ui/react'

export default function Splash() {
  return (
    <Flex id="Splash">
      <div class="loaderContainer">
        <div class="loader">
          <div class="loader2"></div>
        </div>
        <Image src="WeFund%20Logos%20only.png" id="SplashLoaderLogo" />
      </div>
    </Flex>
  )
}
