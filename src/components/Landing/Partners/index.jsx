import * as React from 'react'
import Partner from './partner'
import { Box, SimpleGrid, Text } from '@chakra-ui/react'

export default function Partners() {
  return (
    <Box as="section" p="10" mb="28" zIndex="5" position="relative">
      <Box
        mx="auto"
        alignSelf="center"
        alignContent="center"
        px={{ base: '6', md: '8' }}
        maxW={{ base: 'xl', md: 'md', xl: 'xl' }}
      >
        <Text
          mt="35px"
          mb="35px"
          fontSize={{ base: '24px', md: '32px' }}
          color="#63CDFA"
          textAlign="center"
          style={{ fontFamily: 'PilatExtended-Bold' }}
        >
          Powered by
        </Text>
        <SimpleGrid
          spacing="5"
          align="center"
          columns={{ base: 1, sm: 2, md: 2 }}
        >
          <Partner
            link="https://terra.money/"
            img="/media/partners/terra.png"
          />
          <Partner
            link="https://anchorprotocol.com/"
            img="/media/partners/ANC.png"
          />
        </SimpleGrid>
      </Box>
      <Box
        mx="auto"
        maxW={{ base: 'xl', xl: '3xl' }}
        alignSelf="center"
        alignContent="center"
        px={{ base: '6', md: '8' }}
      >
        <Text
          mt="3em"
          mb="1em"
          fontSize={{ base: '24px', md: '32px' }}
          color="#63CDFA"
          textAlign="center"
          style={{ fontFamily: 'PilatExtended-Bold' }}
        >
          Projects under Fellowship Incubation
        </Text>
        <SimpleGrid
          spacing="5"
          align="center"
          columns={{ base: 1, sm: 2, md: 3 }}
        >
          <Partner
            link="https://youtube.com/channel/UCmNM2yxDyy6NonRrzGSXQVA"
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
        maxW={{ base: 'xl', xl: '3xl' }}
        alignSelf="center"
        alignContent="center"
        px={{ base: '6', md: '8' }}
      >
        <Text
          mt="3em"
          mb="1em"
          fontSize={{ base: '24px', md: '32px' }}
          color="#63CDFA"
          textAlign="center"
          style={{ fontFamily: 'PilatExtended-Bold' }}
        >
          Launchpad Partners
        </Text>
        <SimpleGrid
          spacing="5"
          align="center"
          columns={{ base: 1, sm: 2, md: 3 }}
        >
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
        maxW={{ base: 'xl', md: '4xl', xl: '7xl' }}
        alignSelf="center"
        alignContent="center"
        px={{ base: '6', md: '8' }}
      >
        <Text
          mt="3em"
          mb="1em"
          fontSize={{ base: '24px', md: '32px' }}
          color="#63CDFA"
          textAlign="center"
          style={{ fontFamily: 'PilatExtended-Bold' }}
        >
          Media Partners
        </Text>
        <SimpleGrid
          spacing="5"
          align="center"
          columns={{ base: 1, sm: 2, md: 3, lg: 5 }}
        >
          <Partner
            link="https://terraspaces.org/"
            img="/media/partners/terraspace.png"
          />
          <Partner
            link="https://twitter.com/cryptodiviners/"
            img="/media/partners/devine.png"
          />
          <Partner
            link="https://twitter.com/PejuangCryptoID"
            img="/media/partners/pejuangcrypto.png"
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
        maxW={{ base: 'xl', md: '4xl', xl: '7xl' }}
        alignSelf="center"
        alignContent="center"
        px={{ base: '6', md: '8' }}
      >
        <Text
          mt="3em"
          mb="1em"
          fontSize={{ base: '24px', md: '32px' }}
          color="#63CDFA"
          textAlign="center"
          style={{ fontFamily: 'PilatExtended-Bold' }}
        >
          Featured on
        </Text>
        <SimpleGrid
          spacing="5"
          align="center"
          columns={{ base: 2, sm: 2, md: 3, lg: 5 }}
        >
          <Partner
            link="https://thejakartapost.com/front-row/2022/02/14/wefund-to-bring-forth-open-democratized-crowdfunding.html"
            img="/media/partners/Jakpost.png"
          />
          <Partner
            link="https://cnnindonesia.com/teknologi/20220218213931-303-761215/wefund-manfaatkan-blockchain-terra-untuk-crowdfunding"
            img="/media/partners/CNN_Indonesia.png"
          />
          <Partner
            link="https://cryptodaily.io/wefund-project-overview/"
            img="/media/partners/Cryptodaily.png"
          />
          <Partner
            link="https://www.youtube.com/watch?v=srwWRK86ZTk"
            img="/media/partners/lunatic.png"
          />
          <Partner
            link="https://twitter.com/ETH_Daily/status/1462292597200719875"
            img="/media/partners/ethdaily.png"
          />
          <Partner
            link="https://twitter.com/bsc_daily/status/1465644599855124489"
            img="/media/partners/bscdaily.png"
          />
          <Partner
            link="https://twitter.com/PolygonDaily/status/1483137329175068672"
            img="/media/partners/polygondaily.png"
          />
          <Partner
            link="https://twitter.com/TerraLUNADaily/status/1461214295656517641"
            img="/media/partners/terradaily.png"
          />
          <Partner
            link="https://twitter.com/tyranoanalytics"
            img="/media/partners/tyrano.jpg"
          />
          <Partner
            link="https://twitter.com/solana_daily/status/1460133912861048841"
            img="/media/partners/solanadaily.jpg"
          />
          <Partner
            link="https://twitter.com/cardano_daily"
            img="/media/partners/cardanodaily.png"
          />
          <Partner
            link="https://twitter.com/bullcryptonews1/"
            img="/media/partners/bull.jpg"
          />
          <Partner
            link="https://twitter.com/"
            img="/media/partners/fantom.jpg"
          />
        </SimpleGrid>
      </Box>
    </Box>
  )
}
