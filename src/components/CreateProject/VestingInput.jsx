import React, {useState} from 'react'
import {
  Flex,
  Text,
  Input,
  Box,
  Stack,
  HStack
} from '@chakra-ui/react'

import {
  InputTransition,
} from '../ImageTransition'

export default function VestingINput({typeText, unlock, setUnlock, month, setMonth, after, setAfter}) {
  return (
    <Box mt="40px" fontSize={{base:'12px', md:'13px', lg:'14px'}}>
      <Stack direction={{base:'column', md:'colum', lg:"row"}}>
        <HStack>
          <InputTransition
            unitid={"inputtransitionunlock" + typeText}
            selected={unlock == '' ? false : true}
            width="30px"
            height="30px"
            rounded="md"
          >
            <Input
              style={{ border: '0', background: 'transparent' }}
              type="text"
              h="30px"
              rounded="md"
              value={unlock}
              padding='4px'
              onChange={(e) => setUnlock(e.target.value)}
            />
          </InputTransition>
          <Text>% unlock at TGE, then monthly unlock over&nbsp;</Text>
        </HStack>
        <HStack>
          <InputTransition
            unitid={"inputtransitionmonth" + typeText}
            selected={month == '' ? false : true}
            width="30px"
            height="30px"
            rounded="md"
          >
            <Input
              style={{ border: '0', background: 'transparent' }}
              type="text"
              h="30px"
              rounded="md"
              value={month}
              padding='4px'
              onChange={(e) => setMonth(e.target.value)}
            />
          </InputTransition>
          <Text>month, starting from &nbsp;</Text>
        </HStack>
        <HStack>
          <InputTransition
            unitid={"inputtransitionafter" + typeText}
            selected={after == '' ? false : true}
            width="30px"
            height="30px"
            rounded="md"
          >
            <Input
              style={{ border: '0', background: 'transparent' }}
              type="text"
              h="30px"
              rounded="md"
              value={after}
              padding='4px'
              onChange={(e) => setAfter(e.target.value)}
            />
          </InputTransition>
          <Text>month after TGE</Text>
        </HStack>
      </Stack>
    </Box>
  )
}
