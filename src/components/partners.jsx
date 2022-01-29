import { Box, SimpleGrid, Image, Text } from '@chakra-ui/react'
import * as React from 'react'

export default function Partners() {
  return (
    <Box as="section" p="10" mb={'28'}>
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
            md: 3,
          }}
          spacing="5"
        >
          <a href='https://wefund.app/'>
            <Image src="/media/horizontallogo.svg" />
          </a>
          <a href='https://wefund.app/'>
            <Image src="/media/horizontallogo.svg" />
          </a>
          <a href='https://wefund.app/'>
            <Image src="/media/horizontallogo.svg" />
          </a>
          <a href='https://wefund.app/'>
            <Image src="/media/horizontallogo.svg" />
          </a>
          <a href='https://wefund.app/'>
            <Image src="/media/horizontallogo.svg" />
          </a>
          <a href='https://wefund.app/'>
            <Image src="/media/horizontallogo.svg" />
          </a>
        </SimpleGrid>
      </Box>
    </Box>
  )
}
