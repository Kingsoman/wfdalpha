import React, { useState } from 'react'
import {
  Flex,
  Text,
  InputGroup,
  Input,
  Box,
} from '@chakra-ui/react'
import { MsgExecuteContract, WasmAPI } from '@terra-money/terra.js'

import { toast } from 'react-toastify';
import { errorOption, getTokenInfo } from "../Util"
import {
  InputTransition,
} from '../ImageTransition'
import { useStore } from '../../store'

export default function InputAddress({ typeText, type, setType, setTokenName, setTokenBalance, w, mt }) {
  const { state, dispatch } = useStore();
  //----------init api, lcd-------------------------
  const api = new WasmAPI(state.lcd_client.apiRequester)

  async function onChangeType(e) {
    setType(e.target.value);

    if (e.target.value.length < 44)
      return;

    let res = await getTokenInfo(api, state, e.target.value)
    if (res == false)
      return;

    setTokenName(res.symbol);
    setTokenBalance(res.balance);
  }

  return (
    <Box w={w} mt={mt}>
      <Flex justify="space-between">
        <Text mb="20px">{typeText}</Text>
        <Text fontSize="15px" opacity="0.5">
          {type?.length}/100 words
        </Text>
      </Flex>
      <InputTransition
        unitid={"inputtransition" + typeText}
        selected={type == '' ? false : true}
        width="100%"
        height="55px"
        rounded="md"
      >
        <InputGroup
          style={{ background: 'rgba(255, 255, 255, 0.05)' }}
          size="sm"
          border="0px"
        >
          <Input
            style={{ border: '0', background: 'transparent' }}
            type="text"
            h="55px"
            rounded="md"
            value={type}
            onChange={(e) => onChangeType(e)}
          />
        </InputGroup>
      </InputTransition>
    </Box>
  )
}
