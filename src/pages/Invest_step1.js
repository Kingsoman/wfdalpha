import { ChakraProvider } from "@chakra-ui/react";
import theme from '../theme';
import { useNavigate } from '@reach/router'
import {
  chakra, 
  Box, 
  Flex, 
  Text, 
  VStack, 
  Image, 
  Img, 
  HStack
  } from "@chakra-ui/react";
import React, { useState} from 'react';
import { IoCheckmark } from 'react-icons/io5';

import { 
  ImageTransition, 
  InputTransition 
} from "../components/ImageTransition";
import PDFTemplate from '../components/Pdf';
import PageLayout from '../components/PageLayout';
import { ParseParam } from "../components/Util";
import { useStore } from '../store';

export default function InvestStep1() {
  const [condition, setCondition] = useState(false);
  const navigate = useNavigate();
  const {state, dispatch} = useStore();

  //------------parse URL for project id----------------------------
  let project_id = ParseParam();

  function onNext(){
    if(condition)
      navigate('/invest_step2?project_id=' + project_id);
  }
  return (
    <PageLayout title="Back the Project" subTitle1="Invest" subTitle2="in WeFund">
      <Box 
        width={{base:'500px', md:'500px', lg:'100%'}} 
        bg='#FFFFFF0D' 
        px='50px' 
        style={{fontFamily:'Sk-Modernist-Regular'}} 
      >
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

        <Flex mt='83px' justify='center' align='center' direction='column'>
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
          <Flex >
            <PDFTemplate presale={state.presale} project_id={project_id}/>
          </Flex>
        </Flex>
      </Box>
   </PageLayout>
  )
}