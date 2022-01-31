import { ChakraProvider } from "@chakra-ui/react";
import theme from '../theme';
import { useNavigate } from '@reach/router'
import { Box, Flex, Text, Img, HStack, Select } from "@chakra-ui/react";
import React, { useState } from 'react';
import { ImageTransition, InputTransition } from "../components/ImageTransition";

export default function InvestKYC3() {
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
      width:'100%', color:'white', fontSize:'18px', fontFamily:'Sk-Modernist-Regular', fontWeight:'500' }}>
        <div style={{backgroundImage:"url('/media/createproject_banner_emphasis.svg')", width:'100%', zIndex:'10'}}>
        <div style={{backgroundImage:"url('/media/createproject_banner.svg')", position:'absolute', top:'80px', width:'100%', zIndex:'11', backgroundPosition:'center', backgroundRepeat:'no-repeat', backgroundSize:'cover', zIndex:'11'}}>
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
                <Text fontSize='22px' fontWeight={'300'} fontFamily={'Pilat Extended'}>Document Identification</Text>
                <Text fontSize='16px' color='rgba(255, 255, 255, 0.54)' fontWeight={'normal'} mt={'20px'} textAlign={'center'} maxW={'465px'} lineHeight={'140%'} fontFamily={'Sk-Modernist-Regular'} mt={'15px'} mb={'15px'}>
                    Supply us with the document scans or picture
                </Text>
                {/* --------Country Options------------ */}
                <InputTransition
                  width={{ base: '200px', md: '200px', lg: '475px' }}
                  height="55px"
                  rounded="md"
                >
                  
                  <Select
                    style={{ background: 'transparent', border: '0' }}
                    h="55px"
                    focusBorderColor="purple.800"
                    shadow="sm"
                    size="sm"
                    width={{ base: '200px', md: '200px', lg: '475px' }}
                    rounded="md"
                  >
                      <option style={{backgroundColor: '#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Afganistan">Afghanistan</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Albania">Albania</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Algeria">Algeria</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="American Samoa">American Samoa</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Andorra">Andorra</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Angola">Angola</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Anguilla">Anguilla</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Antigua & Barbuda">Antigua & Barbuda</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Argentina">Argentina</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Armenia">Armenia</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Aruba">Aruba</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Australia">Australia</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Austria">Austria</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Azerbaijan">Azerbaijan</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Bahamas">Bahamas</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Bahrain">Bahrain</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Bangladesh">Bangladesh</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Barbados">Barbados</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Belarus">Belarus</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Belgium">Belgium</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Belize">Belize</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Benin">Benin</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Bermuda">Bermuda</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Bhutan">Bhutan</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Bolivia">Bolivia</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Bonaire">Bonaire</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Botswana">Botswana</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Brazil">Brazil</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="British Indian Ocean Ter">British Indian Ocean Ter</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Brunei">Brunei</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Bulgaria">Bulgaria</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Burkina Faso">Burkina Faso</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Burundi">Burundi</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Cambodia">Cambodia</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Cameroon">Cameroon</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Canada">Canada</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Canary Islands">Canary Islands</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Cape Verde">Cape Verde</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Cayman Islands">Cayman Islands</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Central African Republic">Central African Republic</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Chad">Chad</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Channel Islands">Channel Islands</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Chile">Chile</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="China">China</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Christmas Island">Christmas Island</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Cocos Island">Cocos Island</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Colombia">Colombia</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Comoros">Comoros</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Congo">Congo</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Cook Islands">Cook Islands</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Costa Rica">Costa Rica</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Cote DIvoire">Cote DIvoire</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Croatia">Croatia</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Cuba">Cuba</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Curaco">Curacao</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Cyprus">Cyprus</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Czech Republic">Czech Republic</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Denmark">Denmark</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Djibouti">Djibouti</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Dominica">Dominica</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Dominican Republic">Dominican Republic</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="East Timor">East Timor</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Ecuador">Ecuador</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Egypt">Egypt</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="El Salvador">El Salvador</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Equatorial Guinea">Equatorial Guinea</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Eritrea">Eritrea</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Estonia">Estonia</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Ethiopia">Ethiopia</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Falkland Islands">Falkland Islands</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Faroe Islands">Faroe Islands</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Fiji">Fiji</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Finland">Finland</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="France">France</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="French Guiana">French Guiana</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="French Polynesia">French Polynesia</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="French Southern Ter">French Southern Ter</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Gabon">Gabon</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Gambia">Gambia</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Georgia">Georgia</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Germany">Germany</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Ghana">Ghana</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Gibraltar">Gibraltar</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Great Britain">Great Britain</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Greece">Greece</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Greenland">Greenland</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Grenada">Grenada</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Guadeloupe">Guadeloupe</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Guam">Guam</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Guatemala">Guatemala</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Guinea">Guinea</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Guyana">Guyana</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Haiti">Haiti</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Hawaii">Hawaii</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Honduras">Honduras</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Hong Kong">Hong Kong</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Hungary">Hungary</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Iceland">Iceland</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Indonesia">Indonesia</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="India">India</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Iran">Iran</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Iraq">Iraq</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Ireland">Ireland</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Isle of Man">Isle of Man</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Israel">Israel</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Italy">Italy</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Jamaica">Jamaica</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Japan">Japan</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Jordan">Jordan</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Kazakhstan">Kazakhstan</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Kenya">Kenya</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Kiribati">Kiribati</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Korea North">Korea North</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Korea South">Korea South</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Kuwait">Kuwait</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Kyrgyzstan">Kyrgyzstan</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Laos">Laos</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Latvia">Latvia</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Lebanon">Lebanon</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Lesotho">Lesotho</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Liberia">Liberia</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Libya">Libya</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Liechtenstein">Liechtenstein</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Lithuania">Lithuania</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Luxembourg">Luxembourg</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Macau">Macau</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Macedonia">Macedonia</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Madagascar">Madagascar</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Malaysia">Malaysia</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Malawi">Malawi</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Maldives">Maldives</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Mali">Mali</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Malta">Malta</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Marshall Islands">Marshall Islands</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Martinique">Martinique</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Mauritania">Mauritania</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Mauritius">Mauritius</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Mayotte">Mayotte</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Mexico">Mexico</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Midway Islands">Midway Islands</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Moldova">Moldova</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Monaco">Monaco</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Mongolia">Mongolia</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Montserrat">Montserrat</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Morocco">Morocco</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Mozambique">Mozambique</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Myanmar">Myanmar</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Nambia">Nambia</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Nauru">Nauru</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Nepal">Nepal</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Netherland Antilles">Netherland Antilles</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Netherlands">Netherlands (Holland, Europe)</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Nevis">Nevis</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="New Caledonia">New Caledonia</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="New Zealand">New Zealand</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Nicaragua">Nicaragua</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Niger">Niger</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Nigeria">Nigeria</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Niue">Niue</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Norfolk Island">Norfolk Island</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Norway">Norway</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Oman">Oman</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Pakistan">Pakistan</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Palau Island">Palau Island</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Palestine">Palestine</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Panama">Panama</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Papua New Guinea">Papua New Guinea</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Paraguay">Paraguay</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Peru">Peru</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Phillipines">Philippines</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Pitcairn Island">Pitcairn Island</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Poland">Poland</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Portugal">Portugal</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Puerto Rico">Puerto Rico</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Qatar">Qatar</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Republic of Montenegro">Republic of Montenegro</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Republic of Serbia">Republic of Serbia</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Reunion">Reunion</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Romania">Romania</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Russia">Russia</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Rwanda">Rwanda</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="St Barthelemy">St Barthelemy</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="St Eustatius">St Eustatius</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="St Helena">St Helena</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="St Kitts-Nevis">St Kitts-Nevis</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="St Lucia">St Lucia</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="St Maarten">St Maarten</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="St Pierre & Miquelon">St Pierre & Miquelon</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="St Vincent & Grenadines">St Vincent & Grenadines</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Saipan">Saipan</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Samoa">Samoa</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Samoa American">Samoa American</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="San Marino">San Marino</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Sao Tome & Principe">Sao Tome & Principe</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Saudi Arabia">Saudi Arabia</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Senegal">Senegal</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Seychelles">Seychelles</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Sierra Leone">Sierra Leone</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Singapore">Singapore</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Slovakia">Slovakia</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Slovenia">Slovenia</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Solomon Islands">Solomon Islands</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Somalia">Somalia</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="South Africa">South Africa</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Spain">Spain</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Sri Lanka">Sri Lanka</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Sudan">Sudan</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Suriname">Suriname</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Swaziland">Swaziland</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Sweden">Sweden</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Switzerland">Switzerland</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Syria">Syria</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Tahiti">Tahiti</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Taiwan">Taiwan</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Tajikistan">Tajikistan</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Tanzania">Tanzania</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Thailand">Thailand</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Togo">Togo</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Tokelau">Tokelau</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Tonga">Tonga</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Trinidad & Tobago">Trinidad & Tobago</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Tunisia">Tunisia</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Turkey">Turkey</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Turkmenistan">Turkmenistan</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Turks & Caicos Is">Turks & Caicos Is</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Tuvalu">Tuvalu</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Uganda">Uganda</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="United Kingdom">United Kingdom</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Ukraine">Ukraine</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="United Arab Erimates">United Arab Emirates</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="United States of America">United States of America</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Uraguay">Uruguay</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Uzbekistan">Uzbekistan</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Vanuatu">Vanuatu</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Vatican City State">Vatican City State</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Venezuela">Venezuela</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Vietnam">Vietnam</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Virgin Islands (Brit)">Virgin Islands (Brit)</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Virgin Islands (USA)">Virgin Islands (USA)</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Wake Island">Wake Island</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Wallis & Futana Is">Wallis & Futana Is</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Yemen">Yemen</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Zaire">Zaire</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Zambia">Zambia</option>
                      <option style={{backgroundColor:'#1B0645',border: '1.5px solid rgba(255, 255, 255, 0.2)', height: '55px', fontFamily:'Sk-Modernist-Regular', fontSize:'15px' }} value="Zimbabwe">Zimbabwe</option>    
                  </Select>
                </InputTransition>

                <Text fontSize='16px' color='rgba(255, 255, 255, 0.54)' fontWeight={'normal'} mt={'20px'} textAlign={'center'} maxW={'465px'} lineHeight={'140%'} fontFamily={'Sk-Modernist-Regular'} mt={'35px'} mb={'10px'}>
                    Select document to provide
                </Text>
                
            <Flex direction={{ base: 'column', md: 'column', lg: 'row' }}>
              {/* ----Passport--- */}
            <ImageTransition
                unitid="passport"
                width="120px"
                height="50px"
                rounded="10px"     
                direction="row"
                selected={isPassport}
                onClick={() => {
                  setIsPassport(true)
                  setIsDriving(false)
                  setIsID(false)
                  setIsResidence(false)
                }}
              >
                <HStack>
                <Img
                  mt="20px"
                  mb="20px"
                  boxSize="20px"
                  objectFit="cover"
                  src={isPassport ? '/group_dot.svg' : '/group_undot.svg'}
                />
                <Text mt="13px">Passport</Text>
                </HStack>
              </ImageTransition>

              {/* ----Driving--- */}
              <ImageTransition
                unitid="driving"
                width="120px"
                height="50px"
                rounded="10px"
                direction="row"
                selected={isDriving}
                ml="20px"
                onClick={() => {
                  setIsPassport(false)
                  setIsDriving(true)
                  setIsID(false)
                  setIsResidence(false)
                }}
              >
                <HStack>
                <Img
                  mt="20px"
                  mb="20px"
                  boxSize="20px"
                  objectFit="cover"
                  src={isDriving ? '/group_dot.svg' : '/group_undot.svg'}
                />
                <Text mt="13px">Driving</Text>
                </HStack>
              </ImageTransition>
              
              {/* ----ID--- */}
              <ImageTransition
                unitid="isid"
                width="120px"
                height="50px"
                rounded="10px"
                direction="row"                
                selected={isID}
                ml="20px"
                onClick={() => {
                  setIsPassport(false)
                  setIsDriving(false)
                  setIsID(true)
                  setIsResidence(false)
                }}
              >
                <HStack>
                <Img
                  mt="20px"
                  mb="20px"
                  boxSize="20px"
                  objectFit="cover"
                  src={isID ? '/group_dot.svg' : '/group_undot.svg'}
                />
                <Text mt="13px">ID Card</Text>
                </HStack>
              </ImageTransition>
              
              {/* ----Residence--- */}
              <ImageTransition
                unitid="residence"
                width="120px"
                height="50px"
                rounded="10px"
                direction="row"                
                selected={isResidence}
                ml="20px"
                onClick={() => {
                  setIsPassport(false)
                  setIsDriving(false)
                  setIsID(false)
                  setIsResidence(true)
                }}
              >
                <HStack>
                <Img
                  mt="20px"
                  mb="20px"
                  boxSize="20px"
                  objectFit="cover"
                  src={isResidence ? '/group_dot.svg' : '/group_undot.svg'}
                />
                <Text mt="13px">Residence</Text>
                </HStack>
              </ImageTransition>
            </Flex>
            </Flex>
            
          <Flex mt='83px' justify='center' align='center' direction='column'>
          
              {/* -----------------Next and back----------------- */}
            <Flex 
              direction={{base: 'column',md: 'column',lg: 'row',}} mt='10px' minHeight={'300px'}>
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
                      Start
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
          
          
        </Box>
        </Flex>
      </div>
    </ChakraProvider>
  )
}