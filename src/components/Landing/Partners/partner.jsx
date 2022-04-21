import * as React from 'react'
import { Image, Link, Flex } from '@chakra-ui/react'

export default function Partner({ link, img }) {
  return (
    <Link href={link}>
      <Flex
        mb={'1em'}
        overflow="hidden"
        width={{ base: '120px', lg: '220px' }}
        height={{ base: '120px', lg: '220px' }}
        borderRadius={{ base: '15px', lg: '25px' }}
        background={'linear-gradient(180deg, #FFFFFF 0%, #A98FE0 100%)'}
      >
        <Image src={img} objectFit="contain" />
      </Flex>
    </Link>
  )
}
