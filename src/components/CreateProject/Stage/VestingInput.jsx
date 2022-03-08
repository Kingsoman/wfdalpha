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
} from '../../ImageTransition'

import {
  isNull
} from '../../Util'

export default function VestingINput({typeText, index, soon, setSoon, period, setPeriod, after, setAfter}) {
  function onChangeSoon(e) {
    if (e.target.value.length < 5000) {
      let ar=[...soon];
      ar[index] = e.target.value;
      setSoon(ar); 
    }
  }
  function onChangePeriod(e) {
    if (e.target.value.length < 5000) {
      let ar=[...period];
      ar[index] = e.target.value;
      setPeriod(ar); 
    }
  }
  function onChangeAfter(e) {
    if (e.target.value.length < 5000) {
      let ar=[...after];
      ar[index] = e.target.value;
      setAfter(ar); 
    }
  }
  return (
    <Box mt="40px" fontSize={{base:'12px', md:'13px', lg:'14px'}}>
      <Stack direction={{base:'column', md:'colum', lg:"row"}}>
        <HStack>
          <InputTransition
            unitid={"inputtransitionunlock" + typeText}
            selected={isNull(soon[index]) ? false : true}
            width="30px"
            height="30px"
            rounded="md"
          >
            <Input
              style={{ border: '0', background: 'transparent' }}
              type="text"
              h="30px"
              rounded="md"
              value={soon[index]}
              padding='4px'
              onChange={(e) => onChangeSoon(e)}
            />
          </InputTransition>
          <Text style={{margin:"0px"}}>% unlocked at TGE, then unlocked monthly over&nbsp;</Text>
        </HStack>
        <HStack>
          <InputTransition
            unitid={"inputtransitionmonth" + typeText}
            selected={isNull(period[index])? false : true}
            width="30px"
            height="30px"
            rounded="md"
          >
            <Input
              style={{ border: '0', background: 'transparent' }}
              type="text"
              h="30px"
              rounded="md"
              value={period[index]}
              padding='4px'
              onChange={(e) => onChangePeriod(e)}
            />
          </InputTransition>
          <Text m='0px'>months, starting from &nbsp;</Text>
        </HStack>
        <HStack>
          <InputTransition
            unitid={"inputtransitionafter" + typeText}
            selected={isNull(after[index]) ? false : true}
            width="30px"
            height="30px"
            rounded="md"
          >
            <Input
              style={{ border: '0', background: 'transparent' }}
              type="text"
              h="30px"
              rounded="md"
              value={after[index]}
              padding='4px'
              onChange={(e) => onChangeAfter(e)}
            />
          </InputTransition>
          <Text m='0px'>months after TGE</Text>
        </HStack>
      </Stack>
    </Box>
  )
}
