import { Box, SimpleGrid, Image, Text } from '@chakra-ui/react'
import * as React from 'react'

export default function Partners() {
  return (
    <Box as="section" p="10" mb={'28'} z-zIndex={'5'}>
      <Box
        maxW="7xl"
        mx="auto"
        px={{
          base: '6',
          md: '8',
        }}
        alignSelf={'center'}
        alignContent={'center'}
      >
        <Text fontSize="36px" color={'white'}
                style={{ fontFamily: 'PilatExtended-Bold' }} textAlign={'center'} mb={'25px'}>Our Partners</Text>
        <SimpleGrid
          ml={'50px'}
          columns={{
            base: 1,
            md: 4,
          }}
          spacing="5"
        >
          <a href='https://kommunitas.net/'
          alignItems="center"
          justifyContent="center"
          alignContent='center'>
            <Image src="/media/Kommunitas.png" 
            />
          </a>
          <a href='https://www.youtube.com/channel/UCmNM2yxDyy6NonRrzGSXQVA'
          alignItems="center"
          justifyContent="center"
          alignContent='center'>
            <Image src="/media/pandai.png" />
          </a>
          <a href='https://linktr.ee/DanceroNFT'
          alignItems="center"
          justifyContent="center"
          alignContent='center'>
            <Image src="/media/dancero.jpg" />
          </a>
          <a href='https://baksomania.com/'
          alignItems="center"
          justifyContent="center"
          alignContent='center'>
            <Image src="/media/Baksomania.png" />
          </a>
          <a href='https://moggiesverse.com/'
          alignItems="center"
          justifyContent="center"
          alignContent='center'>
            <Image src="/media/Moggie.jpg" />
          </a>
          <a href='https://www.pinecone.community/#/home'
          alignItems="center"
          justifyContent="center"
          alignContent='center'>
            <Image src="/media/pinecone.png" />
          </a>
          <a href='https://terraspaces.org/'
          alignItems="center"
          justifyContent="center"
          alignContent='center'>
            <Image src="/media/terraspace.jpg" />
          </a>
          <a href='https://www.lunapad.co/'
          alignItems="center"
          justifyContent="center"
          alignContent='center'>
            <Image src="/media/lunapad.png" />
          </a>
        </SimpleGrid>
      </Box>
    </Box>
  )
}
