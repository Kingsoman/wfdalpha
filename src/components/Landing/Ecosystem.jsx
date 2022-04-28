import React from 'react'
import { Flex, Box, Text, Image } from '@chakra-ui/react'

export default function Eco() {
    return (
<Flex
 width="100%"
 position="relative"
 alignItems="center"
 flexDirection="column"
 backgroundSize={'contain'}
 backgroundImage="/media/Home/40.png"
 padding={{ base: '5em', md: '8em', lg: '10em' }}>
    <Box boxSize='full'>
        <Image src='/media/partners/eco.jpg'/>
    </Box>
</Flex>
    )
}
