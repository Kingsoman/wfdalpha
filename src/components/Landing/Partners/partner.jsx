import * as React from 'react'
import { Image, Link, Center } from '@chakra-ui/react'

export default function Partner({ link, img }) {
  return (
    <Link href={link} bg={'#f0f3fa'}>
      <Center height={'100%'}>
        <Image src={img} />
      </Center>
    </Link>
  )
}
