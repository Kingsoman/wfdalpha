import * as React from 'react'
import { Image, Link, Flex } from '@chakra-ui/react'

export default function Partner({ link, img }) {
  return (
    <Link href={link}>
      <Flex
        mb={'1em'}
        overflow="hidden"
        width={{ base: '23vw', md: '20vw', lg: '14.5vw' }}
        height={{ base: '23vw', md: '20vw', lg: '14.5vw' }}
        borderRadius={{ base: '15px', md: '20px', lg: '25px' }}
        background={'linear-gradient(180deg, #FFFFFF 0%, #A98FE0 100%)'}
      >
        <Image src={img} objectFit="contain" />
      </Flex>
    </Link>
  )
}
