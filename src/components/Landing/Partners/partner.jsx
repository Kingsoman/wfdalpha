import * as React from 'react'
import { Image, Link, Flex } from '@chakra-ui/react'

export default function Partner({ link, img }) {
  return (
    <Link href={link}>
      <Flex
        width="19vw"
        height="20em"
        backgroundColor="#f0f3fa"
        borderRadius={{ md: '10px', lg: '10px' }}
      >
        <Image src={img} objectFit="contain" />
      </Flex>
    </Link>
  )
}