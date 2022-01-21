import { ChakraProvider } from "@chakra-ui/react";
import theme from '../theme';
import { useNavigate } from '@reach/router'
import {chakra, Icon, Box, Flex, Text, VStack, Image, Img, HStack, Select, 
  Input,
  InputGroup,
  InputLeftAddon,
  Textarea,
  InputLeftElement,
  InputRightElement
  } from "@chakra-ui/react";
import React, { useState} from 'react';
import { IoCloudUploadOutline, IoCheckbox, IoChevronUpOutline, IoChevronDownOutline, IoCheckmark } from 'react-icons/io5';

import { ImageTransition, InputTransition, InputTransitiongrey } from "../components/ImageTransition";
import { CheckIcon } from "@chakra-ui/icons";

export default function InvestKYC6() {
  const [condition, setCondition] = useState(false);
  const [isPassport, setIsPassport] = useState(false);
  const [isDriving, setIsDriving] = useState(false);
  const [isID, setIsID] = useState(false);
  const [isResidence, setIsResidence] = useState(false);
  const navigate = useNavigate();

  function onNext(){
    if(condition)
      navigate('/invest_step2');
  }
  return (
    <ChakraProvider resetCSS theme={theme}>
      <div style={{background:"linear-gradient(90deg, #1F0021 0%, #120054 104.34%)", 
      width:'100%', color:'white', fontSize:'18px', fontFamily:'Sk-Modernist', fontWeight:'500' }}>
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
                      <Box style={{paddingTop: '3px', paddingLeft:'3px', height: '24px', width: '24px', border: '3px solid #3BE489', backgroundColor: ' #3BE489', borderRadius: '50%', display:'inline-block'}}>
                    <CheckIcon color="#250E3F" w={3} h={3} marginBottom={'20px'}/>
                    </Box>
                        <Text>Step 1</Text>
                        <Box style={{height: '4px', width: '63px', background: 'linear-gradient(90deg, #3BE489 0%, rgba(59, 228, 137, 0) 100%)'}}></Box>
                        <Box style={{paddingTop: '3px', paddingLeft:'3px', height: '24px', width: '24px', border: '3px solid #3BE489', backgroundColor: ' #3BE489', borderRadius: '50%', display:'inline-block'}}>
                    <CheckIcon color="#250E3F" w={3} h={3} marginBottom={'20px'}/>
                    </Box>
                        <Text>Step 2</Text>
                        <Box style={{height: '4px', width: '63px', background: 'linear-gradient(90deg, #3BE489 0%, rgba(59, 228, 137, 0) 100%)'}}></Box>
                        <Box style={{paddingTop: '3px', paddingLeft:'3px', height: '24px', width: '24px', border: '3px solid #3BE489', backgroundColor: ' #3BE489', borderRadius: '50%', display:'inline-block'}}>
                    <CheckIcon color="#250E3F" w={3} h={3} marginBottom={'20px'}/>
                    </Box>
                        <Text>Final Step</Text>
                  </HStack>
                  
                  <Image alignSelf={'center'} mt={'25px'} mb={'25px'} alt={'WeFund'} src={ 'checkmark.svg' } />
                  <HStack mb={'20px'}>
                      <Image
                      src={
                        'popperleft.svg'
                      }
                      />
                      <Text fontSize='22px' fontWeight={'300'}>
                        Congratulations 
                      </Text>
                      <Image
                      src={
                        'popperright.svg'
                      } />
                  </HStack>
                  <Text fontSize='16px' color='rgba(255, 255, 255, 0.54)' fontWeight={'normal'} mt={'20px'} textAlign={'center'} maxW={'465px'} lineHeight={'140%'} fontFamily={'Sk-Modernist'} mt={'15px'} mb={'15px'}>
                      Your Identity is verified and now you can invest and hop onboard Wefund
                  </Text>
                
            <Flex direction={'column'}>
              
              {/* -----------------Next and back----------------- */}
            <Flex 
              direction={{base: 'column',md: 'column',lg: 'row',}} mt='50px' minHeight={'100px'} >
              <Flex 
                w='100%'  justify='center'>
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
                    <Box 
                      variant="solid" color="white" justify='center' align='center'
                      onClick={()=>onNext()}>
                      Proceed
                    </Box>
                </ImageTransition>
              </Flex>
              <Flex 
                ml={{ base: '0px', md: '0px', lg: '10px' }}
                mt={{ base: '10px', md: '10px', lg: '0px' }}>
                <ImageTransition
                  unitid="back"
                  border1="linear-gradient(180deg, #DEDBDB 0%, #DEDBDB 100%)"
                  background1="linear-gradient(180deg, #DEDBDB 0%, #DEDBD/B  100%)"
                  border2="linear-gradient(180deg, #DEDBDB 0%, #DEDBDB 100%)"
                  background2="linear-gradient(180deg, #1A133E 0%, #1A133E 100%)"
                  border3="linear-gradient(180deg, #DEDBDB 0%, #DEDBDB 100%)"
                  background3="linear-gradient(180deg, #171347 0%, #171347 100%)"
                  selected={false}
                  width="200px"
                  height="50px"
                  rounded="33px"
                >
                  <Box
                    variant="solid"
                    color="white"
                    justify="center"
                    align="center"
                    onClick={() => onNext()}
                  >
                    Back
                  </Box>
                </ImageTransition>
              </Flex>
            </Flex>
            </Flex>
            </Flex>
            
          <Flex mt='83px' justify='center' align='center' direction='column'>
          

            
          </Flex>
          
          
        </Box>
        </Flex>
      </div>
    </ChakraProvider>
  )
}