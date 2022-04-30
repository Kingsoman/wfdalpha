import * as React from 'react'
import { Image, Link, Flex } from '@chakra-ui/react'

export default function Partner({ link, img }) {
  return (
    <Link href={link}>
      <Flex
        mb={'1.5em'}
        mx={'0.15em'}
        overflow="hidden"
        width={{ base: '100px', lg: '180px' }}
        height={{ base: '100px', lg: '180px' }}
        borderRadius={{ base: '10px', lg: '20px' }}
        background={'linear-gradient(180deg, #FFFFFF 0%, #A98FE0 100%)'}
      >
        <Image src={img} objectFit="contain" />
      </Flex>
    </Link>
  )
}
