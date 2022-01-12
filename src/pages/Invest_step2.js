import { ChakraProvider } from "@chakra-ui/react";
import theme from '../theme';
import { Box, Flex,  Input, InputGroup, HStack,  Image, InputRightElement, Img, Text
  } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import React, { useEffect, useState,  useCallback, useContext, useRef, } from 'react';
import { navigate } from '@reach/router'

import { ImageTransition, InputTransition, InputTransitiongrey } from "../components/ImageTransition";
import { useStore } from '../store'
import Notification from '../components/Notification'

export default function NewProject() {
  const [backAmount, setBackAmount] = useState('');
  const [wfdAmount, setWfdamount] = useState('');

  const {state, dispatch} = useStore();
  //------------notification setting---------------------------------
  const notificationRef = useRef();

  function onChangeBackamount(e){
    if(e.target.value != '' && e.target.value != parseInt(e.target.value).toString()){
      notificationRef.current.showNotification("Please input number only", "error", 4000);
      return;
    }
    setWfdamount(parseInt(parseInt(e.target.value)/0.06));
    setBackAmount(e.target.value);
  }

  function onNext(){
    dispatch({
      type: 'setInvestamount',
      message: backAmount,
    })
    dispatch({
      type: 'setInvestWfdamount',
      message: wfdAmount,
    })
    navigate('/invest_step3');
  }
  return (
    <ChakraProvider resetCSS theme={theme}>
      <div style={{background:"linear-gradient(90deg, #1F0021 0%, #120054 104.34%)", 
      width:'100%', color:'white', fontSize:'18px', fontFamily:'Sk-Modernist-Regular', fontWeight:'500' }}>
        <div style={{backgroundImage:"url('/createproject_banner_emphasis.svg')", width:'100%', zIndex:'10'}}>
        <div  style={{backgroundImage:"url('/createproject_banner.svg')", position:'absolute', top:'80px',  width:'100%', width:'100%', zIndex:'11',backgroundPosition:'center', backgroundRepeat:'no-repeat', backgroundSize:'cover',zIndex:'11'}}>
          <Flex pt='95px' justify="center">
            <Text fontSize='16px' fontWeight='normal' color={'rgba(255, 255, 255, 0.54)'}>Home &gt;&nbsp;</Text>
            <Text fontSize='16px' color={'rgba(255, 255, 255, 0.84)'}>Invest in WeFund</Text>
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
            style={{fontFamily:'PilatExtended-Regular'}}>
              <HStack  mt='150px' mb='50px' px='15px'>
                <Box style={{paddingTop: '3px', paddingLeft:'3px', height: '24px', width: '24px', border: '3px solid #3BE489', backgroundColor: ' #3BE489', borderRadius: '50%', display:'inline-block'}}>
                <CheckIcon color="#250E3F" w={3} h={3} marginBottom={'20px'}/>
                </Box>
                <Text>Step 1</Text>
                <Box style={{height: '4px', width: '63px', background: 'linear-gradient(90deg, #3BE489 0%, rgba(59, 228, 137, 0) 100%)'}}></Box>
                <Box style={{height: '24px', width: '24px', border: '3px solid rgba(255, 255, 255, 0.3799999952316284)', borderRadius: '50%', display:'inline-block'}}></Box>
                <Text>Step 2</Text>
                <Box style={{height: '0px', width: '63px', border: '2px solid rgba(255, 255, 255, 0.3799999952316284)', background: ' rgba(255, 255, 255, 0.3799999952316284)'}}></Box>
                <Box style={{height: '24px', width: '24px', border: '3px solid rgba(255, 255, 255, 0.3799999952316284)', borderRadius: '50%', display:'inline-block'}}></Box>
                <Text>Final Step</Text>
              </HStack>
                <Text fontSize={{base:'15px',md:'15px',lg:'22px'}} fontWeight={'300'}>Input your <span style={{color:'#00A3FF'}}>Investment Amount</span></Text>
            <Text fontSize={{base:'12px',md:'12px',lg:'16x'}} maxW={'390px'} color='rgba(255, 255, 255, 0.54)' fontWeight={'normal'} mt={'20px'} textAlign={'center'}>Please enter your UST amount and we will convert the WFD amount for you</Text>
            
            
          </Flex>
          {/* --------amount to back----------- */}
          <Flex direction={{base:'column',md:'column',lg:'column'}} ml={{base:'0px',md:'0px',lg:'0px'}} mt='40px' justify="center" align='center'>
          <Flex >
            <Text mb='20px'>UST amount you want to Invest</Text>
          </Flex>
          <InputTransition 
            unitid='backamount'
            selected={backAmount==''?false:true}
            width='300px' height='55px' rounded='md' mb='42px'
          >      
            <InputGroup 
              size={{base:'200px', lg:'sm'}} 
              style={{border:'0', background: 'rgba(255, 255, 255, 0.05)'}}
            >
              <Input type="text"  h='55px' 
                style={{border:'0', background:'transparent',  paddingLeft:'25px'}} 
                placeholder="Type here" 
                focusBorderColor="purple.800" 
                rounded="md"  
                value={backAmount} 
                onChange={(e)=>onChangeBackamount(e)}
              />
                <InputRightElement 
                  w={{base:'40px', lg:'60px'}}
                  h='55px' 
                  pr={{base:'15px', lg:'5px'}}
                  pointerEvents='none' 
                  children={<Text>UST</Text>} 
                />          
              </InputGroup>
          </InputTransition>
          <Flex>
            <Text mb='20px' >WFD Tokens You Will Receive</Text>
          </Flex>
          <InputTransition 
            unitid='WFDamount'
            selected={backAmount==''?false:true}
            width='300px' height='55px' rounded='md'
          >      
            <InputGroup 
              size={{base:'200px', lg:'sm'}} 
              style={{border:'0', background: 'rgba(255, 255, 255, 0.05)'}}
            >
              <Input type="text"  h='55px' 
                style={{border:'0', background:'transparent', paddingLeft:'25px'}} 
                placeholder="Type here" 
                focusBorderColor="purple.800" 
                rounded="md"  
                value={wfdAmount}
                onChange={(e)=>{}} 
              />
                <InputRightElement 
                  w={{base:'40px', lg:'60px'}}
                  h='55px' 
                  pr={{base:'15px', lg:'5px'}}
                  pointerEvents='none' 
                  children={<Text>WFD</Text>} 
                />                    
              </InputGroup>
          </InputTransition>

         
          </Flex>
          {/* -----------------Back Project----------------- */}
          <Flex w='100%' mt='60px'justify='center' mb='170px'>
            <ImageTransition 
              unitid='Invest2invest'
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
                  onClick = {()=>onNext()} >
                Invest
              </Box>
            </ImageTransition>
          </Flex>
        </Box>
        </Flex>
        <Notification ref={notificationRef}/>
      </div>
    </ChakraProvider>
  )
}