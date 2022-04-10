import * as React from 'react'
import { Image, Link, Flex } from '@chakra-ui/react'

export default function Partner({ link, img }) {
  return (
    <Link href={link}>
      <Flex
        backgroundColor="#f0f3fa"
        width={{ md: '20vw', lg: '14.5vw' }}
        height={{ md: '20vw', lg: '14.5vw' }}
      >
        <Image src={img} objectFit="contain" />
      </Flex>
    </Link>
  )
}
