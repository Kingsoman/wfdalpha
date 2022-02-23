import * as React from 'react'
import Partner from './partner'
import { Box, SimpleGrid, Text } from '@chakra-ui/react'

export default function Partners() {
  return (
    <Box as="section" p="10" mb={'28'} zIndex={'5'} position={'relative'}>
      <Box
        mx="auto"
        maxW="3xl"
        alignSelf={'center'}
        alignContent={'center'}
        px={{ base: '6', md: '8' }}
      >
        <Text
          mt={'35px'}
          mb={'35px'}
          fontSize={{ base: "24px", md: "36px" }}
          color={'white'}
          textAlign={'center'}
          style={{ fontFamily: 'PilatExtended-Bold' }}
        >
          Powered by
        </Text>
        <SimpleGrid spacing="5" align="center" columns={{ base: 1, md: 2 }}>
          <Partner
            link="https://www.terra.money/"
            img="/media/partners/terra.png"
          />
          <Partner
            link="https://www.anchorprotocol.com/"
            img="/media/partners/ANC.png"
          />
        </SimpleGrid>
      </Box>
      <Box
        mx="auto"
        maxW="5xl"
        alignSelf={'center'}
        alignContent={'center'}
        px={{ base: '6', md: '8' }}
      >
        <Text
          mt={'35px'}
          mb={'35px'}
          fontSize={{ base: "24px", md: "36px" }}
          color={'white'}
          textAlign={'center'}
          style={{ fontFamily: 'PilatExtended-Bold' }}
        >
          Project Partner under Fellowship Incubation
        </Text>
        <SimpleGrid spacing="5" align="center" columns={{ base: 1, md: 3 }}>
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
            link="https://www.lynxverse.io/"
            img="/media/partners/lynx-dark.png"
          />
          <Partner
            link="https://www.portalkripto.com/"
            img="/media/partners/Portalkripto.png"
          />
        </SimpleGrid>
      </Box>
      <Box
        mx="auto"
        maxW="5xl"
        alignSelf={'center'}
        alignContent={'center'}
        px={{ base: '6', md: '8' }}
      >
        <Text
          mt={'35px'}
          mb={'35px'}
          fontSize={{ base: "24px", md: "36px" }}
          color={'white'}
          textAlign={'center'}
          style={{ fontFamily: 'PilatExtended-Bold' }}
        >
          Launchpad Partner
        </Text>
        <SimpleGrid spacing="5" align="center" columns={{ base: 1, md: 3 }}>
          <Partner
            link="https://kommunitas.net/"
            img="/media/partners/Kommunitas.png"
          />
          <Partner
            link="https://www.lunapad.co/"
            img="/media/partners/lunapad.png"
          />
          <Partner
            link="https://www.ftmlaunch.com/"
            img="/media/partners/FL.png"
          />
        </SimpleGrid>
      </Box>
      <Box
        mx="auto"
        maxW="7xl"
        alignSelf={'center'}
        alignContent={'center'}
        px={{ base: '6', md: '8' }}
      >
        <Text
          mt={'35px'}
          mb={'35px'}
          fontSize={{ base: "24px", md: "36px" }}
          color={'white'}
          textAlign={'center'}
          style={{ fontFamily: 'PilatExtended-Bold' }}
        >
          Media Partner
        </Text>
        <SimpleGrid spacing="5" align="center" columns={{ base: 1, md: 4 }}>
          <Partner
            link="https://terraspaces.org/"
            img="/media/partners/terraspace.jpg"
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
            link="https://www.portalkripto.com/"
            img="/media/partners/Portalkripto.png"
          />
          <Partner
            link="https://twitter.com/CryptoNews_Indo"
            img="/media/partners/cryptonews.png"
          />
        </SimpleGrid>
      </Box>
      <Box
        mx="auto"
        maxW="7xl"
        alignSelf={'center'}
        alignContent={'center'}
        px={{ base: '6', md: '8' }}
      >
        <Text
          mt={'35px'}
          mb={'35px'}
          fontSize={{ base: "24px", md: "36px" }}
          color={'white'}
          textAlign={'center'}
          style={{ fontFamily: 'PilatExtended-Bold' }}
        >
          Featured on
        </Text>
        <SimpleGrid spacing="5" align="center" columns={{ base: 1, md: 4 }}>
          <Partner
            link="https://www.thejakartapost.com/front-row/2022/02/14/wefund-to-bring-forth-open-democratized-crowdfunding.html"
            img="/media/partners/Jakpost.png"
          />
          <Partner
            link="https://www.cnnindonesia.com/teknologi/20220218213931-303-761215/wefund-manfaatkan-blockchain-terra-untuk-crowdfunding"
            img="/media/partners/CNN_Indonesia.png"
          />
          <Partner
            link="https://cryptodaily.io/wefund-project-overview/"
            img="/media/partners/Cryptodaily.png"
          />
        </SimpleGrid>
      </Box>
    </Box>
  )
}
