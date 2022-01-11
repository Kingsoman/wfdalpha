import { ChakraProvider } from "@chakra-ui/react";
import theme from '../theme';
import { useNavigate } from '@reach/router'
import {chakra, Box, Flex, Text, VStack, Image, Img, HStack
  } from "@chakra-ui/react";
import React, { useState} from 'react';
import { IoChevronUpOutline, IoChevronDownOutline, IoCheckmark } from 'react-icons/io5';

import { ImageTransition, InputTransition, InputTransitiongrey } from "../components/ImageTransition";
import ESign from './EsignEdit';
import Faq from '../components/FAQ';

export default function NewProject() {
  const [condition, setCondition] = useState(false);

  const navigate = useNavigate();

  function onNext(){
    if(condition)
      navigate('/invest_step2');
  }
  return (
    <ChakraProvider resetCSS theme={theme}>
      <div style={{background:"linear-gradient(90deg, #1F0021 0%, #120054 104.34%)", 
      width:'100%', color:'white', fontSize:'18px', fontFamily:'Sk-Modernist-Regular', fontWeight:'500' }}>
        <div style={{backgroundImage:"url('/createproject_banner_emphasis.svg')", width:'100%', zIndex:'10'}}>
        <div style={{backgroundImage:"url('/createproject_banner.svg')", position:'absolute', top:'80px',  width:'100%', width:'100%', zIndex:'11',backgroundPosition:'center', backgroundRepeat:'no-repeat', backgroundSize:'cover',zIndex:'11'}}>
          <Flex pt='95px' justify="center">
            <Text fontSize='16px' fontWeight='normal' color={'rgba(255, 255, 255, 0.54)'}>Home &gt;&nbsp;</Text>
            <Text fontSize='16px' color={'rgba(255, 255, 255, 0.84)'}>Back the Project</Text>
          </Flex>
          <Flex mt='11px' pb='55px' mb="20px" justify='center'
            style={{fontFamily:'PilatExtended-Bold'}}>
            <Text fontSize={{base:'25px',md:'25px',lg:'40px'}} color='#4790f5'>Invest</Text>
            <Text fontSize={{base:'25px',md:'25px',lg:'40px'}}>&nbsp;in WeFund</Text>
          </Flex>
        </div>
        </div>
        <Flex width='100%' justify='center' mt='80px' px='175px'>
          <Box width='900px' bg='#FFFFFF0D' px='50px' style={{fontFamily:'Sk-Modernist'}} >
            
            <Flex mt='83px' justify='center' align='center' direction='column'
              style={{fontFamily:'PilatExtended'}}>
                <HStack  mt='150px' mb='50px'>
                  <Box style={{height: '24px', width: '24px', border: '3px solid #3BE489', borderRadius: '50%', display:'inline-block'}}></Box>
                    <Text>Step 1</Text>
                  <Box style={{height: '0x', width: '63px', border: '2px solid rgba(255, 255, 255, 0.3799999952316284)', background: ' rgba(255, 255, 255, 0.3799999952316284)'}}></Box>
                  <Box style={{height: '24px', width: '24px', border: '3px solid rgba(255, 255, 255, 0.3799999952316284)', borderRadius: '50%', display:'inline-block'}}></Box>
                    <Text>Step 2</Text>
                  <Box style={{height: '0px', width: '63px', border: '2px solid rgba(255, 255, 255, 0.3799999952316284)', background: ' rgba(255, 255, 255, 0.3799999952316284)'}}></Box>
                  <Box style={{height: '24px', width: '24px', border: '3px solid rgba(255, 255, 255, 0.3799999952316284)', borderRadius: '50%', display:'inline-block'}}></Box>
                    <Text>Final Step</Text>
                </HStack>
              <Text fontSize='22px' fontWeight={'300'}>SAFT Form</Text>
              <Text fontSize='16px' color='rgba(255, 255, 255, 0.54)' fontWeight={'normal'} mt={'20px'} textAlign={'center'}>Please check and confirm the form and go next step</Text>
            </Flex>
          {/* --------amount to back----------- */}
          <Flex mt='83px' justify='center' align='center' direction='column'>
            <Flex >
              {/* <Image alignSelf={'flex-start'} alt={'WeFund'} src={ 'saft.svg' } /> */}
              <ESign/>
            </Flex>

            <Flex mt='25px' direction="row">
              {/* <Input type="checkbox"  h='55px' bg='#FFFFFF0D' borderColor="#FFFFFF33" placeholder="Type here" focusBorderColor="purple.800" rounded="md"  onChange={(e)=>{}} /> */}
              <InputTransition 
                unitid='conditioncheck'
                selected={false}
                width='24px' height='24px' rounded='md'
                onClick={()=>{setCondition(!condition)}}
              >
                {condition &&
                <IoCheckmark width='24px' height='24px' color='#FE8600'></IoCheckmark>
                }
              </InputTransition>

              <Text ml='10px' fontSize='14px' fontWeight='400'>I agree with all conditions of this Project and WeFund</Text>
            </Flex>
          </Flex>
          {/* -----------------Back Project----------------- */}
          <Flex w='100%' mt='60px'justify='center' mb='170px'>
            <ImageTransition 
              unitid='investnext'
              border1='linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)' 
              background1='linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)'
              border2='linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)'
              background2='linear-gradient(180deg, #1A133E 0%, #1A133E 100%)'
              border3="linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)"
              background3="linear-gradient(180deg, #171347 0%, #171347 100%)"
              selected={false}
              width='200px' height='50px' rounded='33px'
            >
                <Box variant="solid" color="white" justify='center' align='center'
                onClick={()=>onNext()}>
                  Next
                </Box>
            </ImageTransition>
          </Flex>
          
        </Box>
        </Flex>
      </div>
    </ChakraProvider>
  )
}