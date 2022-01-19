import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme'
import { useNavigate } from '@reach/router'
import { Icon, Box, Flex, Text, Image, HStack } from '@chakra-ui/react'
import React, { useState } from 'react'

import { ImageTransition } from '../components/ImageTransition'

import { BsPhone } from 'react-icons/bs'

import { CheckIcon } from '@chakra-ui/icons'
export default function NewProject() {
  const [condition, setCondition] = useState(false)
  const [isPassport, setIsPassport] = useState(false)
  const [isDriving, setIsDriving] = useState(false)
  const [isID, setIsID] = useState(false)
  const [isResidence, setIsResidence] = useState(false)
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
          fontFamily: 'Sk-Modernist',
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
            style={{ fontFamily: 'Sk-Modernist' }}
          >
            <Flex
              mt="83px"
              justify="center"
              align="center"
              direction="column"
              style={{ fontFamily: 'PilatExtended' }}
            >
              <HStack mt="150px" mb="50px">
                <Box
                  style={{
                    paddingTop: '3px',
                    paddingLeft: '3px',
                    height: '24px',
                    width: '24px',
                    border: '3px solid #3BE489',
                    backgroundColor: ' #3BE489',
                    borderRadius: '50%',
                    display: 'inline-block',
                  }}
                >
                  <CheckIcon
                    color="#250E3F"
                    w={3}
                    h={3}
                    marginBottom={'20px'}
                  />
                </Box>
                <Text>Step 1</Text>
                <Box
                  style={{
                    height: '4px',
                    width: '63px',
                    background:
                      'linear-gradient(90deg, #3BE489 0%, rgba(59, 228, 137, 0) 100%)',
                  }}
                ></Box>
                <Box
                  style={{
                    height: '24px',
                    width: '24px',
                    border: '3px solid #3BE489',
                    borderRadius: '50%',
                    display: 'inline-block',
                  }}
                ></Box>
                <Text>Step 2</Text>
                <Box
                  style={{
                    height: '0px',
                    width: '63px',
                    border: '2px solid rgba(255, 255, 255, 0.3799999952316284)',
                    background: ' rgba(255, 255, 255, 0.3799999952316284)',
                  }}
                ></Box>
                <Box
                  style={{
                    height: '24px',
                    width: '24px',
                    border: '3px solid rgba(255, 255, 255, 0.3799999952316284)',
                    borderRadius: '50%',
                    display: 'inline-block',
                  }}
                ></Box>
                <Text>Final Step</Text>
              </HStack>
              <Text
                fontSize="22px"
                fontWeight={'300'}
                fontFamily={'Pilat Extended'}
              >
                Facial Identification
              </Text>
              <Text
                fontSize="16px"
                color="rgba(255, 255, 255, 0.54)"
                fontWeight={'normal'}
                mt={'20px'}
                textAlign={'center'}
                maxW={'465px'}
                lineHeight={'140%'}
                fontFamily={'Sk-Modernist'}
                mt={'15px'}
                mb={'15px'}
              >
                We would like to confirm your facial identification. Face the
                camera and ensure your face within the frame. Turn around to
                ensure all angle are captured
              </Text>

              <Flex direction={'column'}>
                <Image
                  alignSelf={'center'}
                  mt={'25px'}
                  mb={'25px'}
                  alt={'WeFund'}
                  src={'selfie.svg'}
                />

                {/* -----------------Next and back----------------- */}
                <Flex
                  direction={{ base: 'column', md: 'column', lg: 'row' }}
                  mt="10px"
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
                        Ready
                      </Box>
                    </ImageTransition>
                  </Flex>
                  <Flex
                    ml={{ base: '0px', md: '0px', lg: '10px' }}
                    mt={{ base: '10px', md: '10px', lg: '0px' }}
                  >
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
                <Flex
                  align={'center'}
                  alignSelf={'center'}
                  alignContent={'center'}
                  alignItems={'center'}
                  direction={'column'}
                  width={'100%'}
                >
                  <ImageTransition
                    unitid="back"
                    border1="linear-gradient(180deg, #DEDBDB 0%, #DEDBDB 20%)"
                    background1="linear-gradient(180deg, #DEDBDB 0%, #DEDBDB  20%)"
                    border2="linear-gradient(180deg, #DEDBDB 0%, #DEDBDB 100%)"
                    background2="linear-gradient(180deg, #1A133E 0%, #1A133E 20%)"
                    border3="linear-gradient(180deg, #DEDBDB 0%, #DEDBDB 20%)"
                    background3="linear-gradient(180deg, #171347 0%, #171347 20%)"
                    selected={false}
                    mt={'20px'}
                    alignSelf={'center'}
                    align={'center'}
                    width="100%"
                    height="60px"
                    rounded="10px"
                  >
                    <Box
                      variant="solid"
                      color="white"
                      justify="center"
                      align="center"
                      width={'450px'}
                      alignSelf={'center'}
                      onClick={() => onNext()}
                    >
                      <Icon as={BsPhone} h={4} w={4} mr={3} />
                      Or Continue with Phone
                    </Box>
                  </ImageTransition>
                </Flex>
              </Flex>
            </Flex>

            <Flex
              mt="83px"
              justify="center"
              align="center"
              direction="column"
            ></Flex>
          </Box>
        </Flex>
      </div>
    </ChakraProvider>
  )
}
