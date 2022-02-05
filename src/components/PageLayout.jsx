import React from 'react';
import { ChakraProvider } from "@chakra-ui/react";
import theme from '../theme';
import {
  Flex,
  Box, 
  Text, 
  } from "@chakra-ui/react";

export default function PageLayout(props) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <div 
        style={{background:"linear-gradient(90deg, #1F0021 0%, #120054 104.34%)", 
        width:'100%', 
        color:'white', 
        fontSize:'18px', 
        fontFamily:'Sk-Modernist-Regular', 
        fontWeight:'500' }}
      >
        <div 
          style={{backgroundImage:"url('/media/createproject_banner_emphasis.svg')", 
          width:'100%', 
          zIndex:'10'}}
        >
          <div 
            style={{backgroundImage:"url('/media/createproject_banner.svg')", 
            position:'absolute', 
            top:'80px', 
            width:'100%', 
            zIndex:'11', 
            backgroundPosition:'center', 
            backgroundRepeat:'no-repeat', 
            backgroundSize:'cover', 
            zIndex:'11'}}
          >
            <Flex 
              pt='95px' 
              justify="center"
            >
              <Text 
              fontSize='16px' 
              fontWeight='normal' 
              color={'rgba(255, 255, 255, 0.54)'}
              >
                Home &gt;&nbsp;
              </Text>
              <Text 
                fontSize='16px' 
                color={'rgba(255, 255, 255, 0.84)'}
              >
                {props.title}
              </Text>
            </Flex>
            <Flex 
              mt='11px' 
              pb='55px' 
              mb="20px" 
              justify='center'
              style={{fontFamily:'PilatExtended-Bold'}}
              >
              <Text 
              fontSize={{base:'25px',md:'25px',lg:'40px'}} 
              color='#4790f5'
              >
                {props.subTitle1}
              </Text>
              <Text 
                fontSize={{base:'25px',md:'25px',lg:'40px'}}
              >
                &nbsp;{props.subTitle2}
              </Text>
            </Flex>
          </div>
        </div>
        <Box 
          w='100%' 
          mt='250px'
          justify='center' 
        >
          <Box 
            w = '100%' 
            align='center'
          >
            {props.children}
          </Box>
        </Box>
      </div>
    </ChakraProvider>
  )
}