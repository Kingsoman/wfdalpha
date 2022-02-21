import * as React from 'react'
import Partner from './partner'
import { Box, SimpleGrid, Text } from '@chakra-ui/react'

export default function Partners() {
  return (
    <Box as="section" p="10" mb={'28'} zIndex={'5'} position={'relative'}>
      <Box
        mx="auto"
        maxW="7xl"
        alignSelf={'center'}
        alignContent={'center'}
        px={{ base: '6', md: '8' }}
      >
        <Text
          mb={'35px'}
          fontSize="36px"
          color={'white'}
          textAlign={'center'}
          style={{ fontFamily: 'PilatExtended-Bold' }}
        >
          Our Partners
        </Text>
        <SimpleGrid spacing="5" align="center" columns={{ base: 1, md: 4 }}>
          <Partner
            link="https://kommunitas.net/"
            img="/media/partners/Kommunitas.png"
          />
          <Partner
            link="https://www.youtube.com/channel/UCmNM2yxDyy6NonRrzGSXQVA"
            img="/media/partners/pandai.png"
          />
          <Partner
            link="https://linktr.ee/DanceroNFT"
            img="/media/partners/dancero.jpg"
          />
          <Partner
            link="https://baksomania.com/"
            img="/media/partners/Baksomania.png"
          />
          <Partner
            link="https://moggiesverse.com/"
            img="/media/partners/Moggie.jpg"
          />
          <Partner
            link="https://terraspaces.org/"
            img="/media/partners/terraspace.jpg"
          />
          <Partner
            link="https://www.lunapad.co/"
            img="/media/partners/lunapad.png"
          />
          <Partner
            link="https://www.lynxverse.io/"
            img="/media/partners/lynx-dark.png"
          />
          <Partner
            link="https://www.ftmlaunch.com/"
            img="/media/partners/FL.png"
          />
          <Partner
            link="https://twitter.com/cryptodiviners/"
            img="/media/partners/devine.png"
          />
          <Partner
            link="https://twitter.com/PejuangCryptoID"
            img="/media/partners/pejuangcrypto.jpg"
          />
          <Partner
            link="https://twitter.com/CryptoNews_Indo"
            img="/media/partners/cryptonews.png"
          />
        </SimpleGrid>
      </Box>
    </Box>
  )
}
