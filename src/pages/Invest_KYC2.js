import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme'
import { useNavigate } from '@reach/router'
import { Box, Flex, Text, Image } from '@chakra-ui/react'
import React, { useState } from 'react'
import { IoCheckmark } from 'react-icons/io5'

import { ImageTransition, InputTransition } from '../components/ImageTransition'

export default function NewProject() {
  const [condition, setCondition] = useState(false)

  const navigate = useNavigate()

  function onNext() {
    if (condition) navigate('/invest_step2')
  }
  return (
    <ChakraProvider resetCSS theme={theme}>
      <div
        style={{
          background: 'linear-gradient(90deg, #1F0021 0%, #120054 104.34%)',
          width: '100%',
          color: 'white',
          fontSize: '18px',
          fontFamily: 'Sk-Modernist-Regular',
          fontWeight: '500',
        }}
      >
        <div
          style={{
            backgroundImage: "url('/createproject_banner_emphasis.svg')",
            width: '100%',
            zIndex: '10',
          }}
        >
          <div
            style={{
              backgroundImage: "url('/createproject_banner.svg')",
              position: 'absolute',
              top: '80px',
              width: '100%',
              width: '100%',
              zIndex: '11',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              zIndex: '11',
            }}
          >
            <Flex pt="95px" justify="center">
              <Text
                fontSize="16px"
                fontWeight="normal"
                color={'rgba(255, 255, 255, 0.54)'}
              >
                Home &gt;&nbsp;
              </Text>
              <Text fontSize="16px" color={'rgba(255, 255, 255, 0.84)'}>
                Back the Project
              </Text>
            </Flex>
            <Flex
              mt="11px"
              pb="55px"
              mb="20px"
              justify="center"
              style={{ fontFamily: 'PilatExtended-Bold' }}
            >
              <Text
                fontSize={{ base: '25px', md: '25px', lg: '40px' }}
                color="#4790f5"
              >
                Invest
              </Text>
              <Text fontSize={{ base: '25px', md: '25px', lg: '40px' }}>
                &nbsp;in WeFund
              </Text>
            </Flex>
          </div>
        </div>
        <Flex width="100%" justify="center" mt="80px" px="175px">
          <Box
            width="900px"
            bg="#FFFFFF0D"
            px="50px"
            style={{ fontFamily: 'Sk-Modernist-Regular' }}
          >
            <Flex
              mt="83px"
              justify="center"
              align="center"
              direction="column"
              style={{ fontFamily: 'PilatExtended' }}
            >
              <Flex mt={'150px'} mb={'50px'}>
                <Image alignSelf={'center'} alt={'WeFund'} src={'kyc2.svg'} />
              </Flex>
              <Text
                fontSize="22px"
                fontWeight={'300'}
                fontFamily={'Pilat Extended'}
              >
                Lets Get You Verified
              </Text>
              <Text
                fontSize="16px"
                color="rgba(255, 255, 255, 0.54)"
                fontWeight={'normal'}
                mt={'20px'}
                textAlign={'center'}
                maxW={'465px'}
                lineHeight={'140%'}
                fontFamily={'Sk-Modernist-Regular'}
                mt={'15px'}
              >
                Before you start please prepare valid documents needed for
                identification
                <br />
                <br />
                Wefund also require you to confirm your acceptance of your
                personal data handling by us
              </Text>
            </Flex>

            <Flex mt="83px" justify="center" align="center" direction="column">
              <Flex mt="25px" direction="row">
                {/* <Input type="checkbox"  h='55px' bg='#FFFFFF0D' borderColor="#FFFFFF33" placeholder="Type here" focusBorderColor="purple.800" rounded="md"  onChange={(e)=>{}} /> */}
                <InputTransition
                  unitid="conditioncheck"
                  selected={false}
                  width="24px"
                  height="24px"
                  rounded="md"
                  onClick={() => {
                    setCondition(!condition)
                  }}
                >
                  {condition && (
                    <IoCheckmark
                      width="24px"
                      height="24px"
                      color="#FE8600"
                    ></IoCheckmark>
                  )}
                </InputTransition>

                <Text ml="10px" fontSize="14px" fontWeight="400">
                  I agree to all condition of the{' '}
                  <span style={{ color: '#00A3FF' }} mb="25px">
                    Personal Data Processing{' '}
                  </span>
                </Text>
              </Flex>
              {/* -----------------Next and back----------------- */}
              <Flex
                direction={{ base: 'column', md: 'column', lg: 'row' }}
                mt="50px"
                minHeight={'800px'}
              >
                <Flex w="100%" justify="center">
                  <ImageTransition
                    unitid="investnext"
                    border1="linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)"
                    background1="linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)"
                    border2="linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)"
                    background2="linear-gradient(180deg, #1A133E 0%, #1A133E 100%)"
                    border3="linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)"
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
                      Start
                    </Box>
                  </ImageTransition>
                </Flex>
                <Flex ml={{ base: '0px', md: '0px', lg: '10px' }}>
                  <ImageTransition
                    unitid="back"
                    border1="linear-gradient(180deg, #DEDBDB 0%, #DEDBDB 100%)"
                    background1="linear-gradient(180deg, #DEDBDB 0%, #DEDBD/B  100%)"
                    border2="linear-gradient(180deg, #DEDBDB 0%, #DEDBDB 100%)"
                    background2="linear-gradient(180deg, #1A133E 0%, #1A133E 100%)"
                    border3="linear-gradient(180deg, #DEDBDB 0%, #DEDBDB 100%)"
                    background3="linear-gradient(180deg, #171347 0%, #171347 100%)"
                    selected={false}
                    width="250px"
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
