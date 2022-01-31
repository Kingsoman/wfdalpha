import React, { useState, useRef} from 'react';
import { ChakraProvider } from "@chakra-ui/react";
import theme from '../theme';
import { useNavigate } from '@reach/router'
import {
  Flex,
  Input,
  Button,
  Text, 
  VStack, 
  Image, 
  Img, 
  HStack
  } from "@chakra-ui/react";

import PageLayout from '../components/PageLayout'
import { IoCheckmark } from 'react-icons/io5';

import { InputTransition, ButtonTransition } from "../components/ImageTransition";
import { useStore } from '../store'

export default function InvestStep1() {
  const [showInput, setShowInput] = useState(false);
  const passRef = useRef();
  const navigate = useNavigate();
  const { state, dispatch } = useStore();

  function onPresale(){
    dispatch({
      type: 'setWefundRate',
      message: 0.06,
    })
    navigate('/invest_step1?project_id=' + state.wefundID);
  }
  function onSeed(){
    setShowInput(!showInput);
  }

  function onConfirm(){
    const CryptoJS = require('crypto-js');
    if(CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(passRef.current.value)) === 'd2VmdW5kMjAyMg==')
    {
      dispatch({
        type: 'setWefundRate',
        message: 0.09,
      })
      navigate('/invest_step1?project_id=' + state.wefundID);
    }
  }
  return (
    <PageLayout title="Back the Project" subTitle1="Invest" subTitle2="in WEFUND">
      <ButtonTransition 
        unitid='presale'
        selected={false}
        width='200px' 
        height='50px'
        rounded='33px'
        onClick = {onPresale}
      >
        PreSale
      </ButtonTransition>

      <ButtonTransition 
        unitid='Seed'
        selected={false}
        width='200px' 
        height='50px'
        rounded='33px'
        onClick = {onSeed}
        mt = '50px'
      >
        Seed
      </ButtonTransition>
      <Flex 
        display={showInput? 'block' : 'none'} 
        mt='30px'
      >
        <InputTransition
          unitid="inputpassword"
          selected = {false}
          width= "300px"
          height= "45px"
          rounded= "md"
        >
          <Input
            background={'transparent'}
            border = '0px'
            h= '45px'
            type={'password'}
            placeholder='Enter password'
            boxShadow={''}
            rounded= 'md'
            ref= {passRef}
          />
        </InputTransition>
        <Button 
          w='120px'
          h='35px'
          mt= '15px'
          onClick={onConfirm}
          background={'blue'}
        >
          Ok
        </Button>
      </Flex>
    </PageLayout>
  )
}