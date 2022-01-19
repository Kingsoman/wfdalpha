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
          <Box width='900px' bg='#FFFFFF0D' px='50px' style={{fontFamily:'Sk-Modernist-Regular'}} >
            
            <Flex mt='83px' justify='center' align='center' direction='column'
              style={{fontFamily:'PilatExtended'}}>
                
                <Flex mt={'150px'} mb={'50px'}>
                    <Image alignSelf={'center'} alt={'WeFund'} src={ 'kyc1.svg' } />
                </Flex> 
                <Text fontSize='22px' fontWeight={'300'}>Lets Get Started</Text>
                <Text fontSize='16px' color='rgba(255, 255, 255, 0.54)' fontWeight={'normal'} mt={'20px'} textAlign={'center'} maxW={'465px'} lineHeight={'140%'} fontFamily={'Sk-Modernist-Regular'}>
                    To start the KYC process you will need to pay a $0.45 UST fee.
                    You will only need to do this once and it will apply to all launches.
                    <br/><br/>
                    Tapping below will initiate the transaction and open Terra Station.
                    Please accept the transaction to begin.
                </Text>
            </Flex>
          {/* --------This should be where next step be hidden and revealed visible----------- */}
          <Flex mt='83px' justify='center' align='center' direction='column'>
            
              {/* -----------------Next----------------- */}
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
                    Start
                  </Box>
              </ImageTransition>
            </Flex>

            
          </Flex>
          
          
        </Box>
        </Flex>
      </div>
    </ChakraProvider>
  )
}