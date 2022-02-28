import { ChakraProvider } from '@chakra-ui/react'
import {
  Box,
  Flex,
  Text,
  Icon,
  Image,
  Input,
  HStack,
  VStack,
  Button,
} from '@chakra-ui/react'
import { WasmAPI, LCDClient, MsgExecuteContract } from '@terra-money/terra.js'
import Pagination from '@choc-ui/paginator'

import React, { useEffect, useState, useMemo, useRef, forwardRef } from 'react'

import { useStore } from '../store'
import theme from '../theme'
import {
  InputTransition,
  ButtonTransition,
} from '../components/ImageTransition'
import Footer from '../components/Footer'
import Notification from '../components/Notification'
import {EstimateSend, FetchData} from '../components/Util'

let useConnectedWallet = {}
if (typeof document !== 'undefined') {
  useConnectedWallet =
    require('@terra-money/wallet-provider').useConnectedWallet
}

export default function ExplorerProject() {
  const { state, dispatch } = useStore()
  const [wallet, setWallet] = useState('');
  //-------------paginator------------------------------
  const [current, setCurrent] = useState(1);
  const pageSize = 10;
  const [postCommunityData, setPostCommunityData] = useState('');

  const Prev = forwardRef((props, ref) => (
    <Button ref={ref} {...props}>
      Prev
    </Button>
  ));
  const Next = forwardRef((props, ref) => (
    <Button ref={ref} {...props}>
      Next
    </Button>
  ));

  const itemRender = (_, type) => {
    if (type === "prev") {
      return Prev;
    }
    if (type === "next") {
      return Next;
    }
  };
  function onChangePaginator(page){
    if(state.communityData == ''){
      setPostCommunityData('');
      return;
    }
    const offset = (page - 1) * pageSize;
    setPostCommunityData(state.communityData.slice(offset, offset+pageSize));
  }

  //-----------connect to wallet ---------------------
  let connectedWallet = ''
  if (typeof document !== 'undefined') {
    connectedWallet = useConnectedWallet()
  }
  //------------notification setting---------------------------------
  const notificationRef = useRef();

  //----------init api, lcd-------------------------
  const api = new WasmAPI(state.lcd_client.apiRequester)

  //-----------fetch project data=-------------------------
  async function fetchContractQuery() {
    try {
      let {projectData, communityData, configData} = await FetchData(api, notificationRef, state, dispatch);
console.log(communityData);
      //-----------------initialize--------------------------
      setCurrent(1);
      setPostCommunityData(communityData.slice(0, pageSize));
    } catch (e) {
      console.log(e)
    }
  }

  //------------Add/remove community member-----------------
  function addCommunityMember(){
    let CommunityMsg = {
      add_communitymember: {
        wallet: wallet,
      },
    }
  
    let wefundContractAddress = state.WEFundContractAddress
    let msg = new MsgExecuteContract(
      connectedWallet.walletAddress,
      wefundContractAddress,
      CommunityMsg,
    )
    EstimateSend(connectedWallet, state.lcd_client, [msg], "Add Community success", notificationRef);
  }

  function removeCommunityMember(wallet){
    let CommunityMsg = {
      remove_communitymember: {
        wallet: wallet.member,
      },
    }
  
    let wefundContractAddress = state.WEFundContractAddress
    let msg = new MsgExecuteContract(
      connectedWallet.walletAddress,
      wefundContractAddress,
      CommunityMsg,
    )
    EstimateSend(connectedWallet, state.lcd_client, [msg], "Remove Community success", notificationRef);
  }
  
  //---------initialize fetching---------------------
  useEffect(() => {
    fetchContractQuery();
  }, [connectedWallet])

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
            boxShadow: '0px 5px 50px 0px #000000A6',
            width: '100%',
            zIndex: '10',
          }}
        >
          <div
            style={{
              backgroundImage: "url('/media/createproject_banner.svg')",
              width: '100%',
              zIndex: '11',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
          >
            <Flex pt="64px" justify="center">
              <Text
                fontSize="16px"
                fontWeight="normal"
                color={'rgba(255, 255, 255, 0.54)'}
              >
                Home &gt;&nbsp;
              </Text>
              <Text fontSize="16px" color={'rgba(255, 255, 255, 0.84)'}>
                Dashboard
              </Text>
            </Flex>
            <Flex
              mt="11px"
              pb="75px"
              mb="75px"
              justify="center"
              style={{ fontFamily: 'PilatExtended-Bold' }}
            >
              <Text
                fontSize={{ base: '25px', md: '25px', lg: '40px' }}
                fontWeight={'900'}
              >
                Admin&nbsp;
              </Text>
              <Text
                fontSize={{ base: '25px', md: '25px', lg: '40px' }}
                color="#4790f5"
                fontWeight={'900'}
              >
                Dashboard
              </Text>
            </Flex>
          </div>
        </div>

        {/* Projects Incubated */}

        <Flex width={{ lg: '100%' }} justify="center" mt="50px" px="175px">
          <Box style={{ fontFamily: 'Sk-Modernist-Regular' }}>
            <Flex
              width={{ lg: '100%' }}
              justify="center"
              px="175px"
              zIndex={'1'}
            >
              <VStack paddingBottom={'50px'}>
                <Flex
                  w={{ lg: '1225px' }}
                  background = 'rgba(255, 255, 255, 0.05)'
                  borderRadius = '3xl'
                  borderTopColor = 'transparent'
                  fontFamily = 'Sk-Modernist-Regular'
                  pl='20px'
                  pr='20px'
                  justify={'center'}
                >
                  {/* ------------------project desktop---------- */}
                  <VStack
                    display={{ base: 'none', md: 'none', lg: 'block' }}
                    maxW={{ base: '0px', md: '0px', lg: '2560px' }}
                    maxH={{ base: '0px', md: '0px', lg: '9999px' }}
                    w='800px'
                  >
                    {/* ------------------project snippet detail---------- */}
                    {postCommunityData != '' &&
                      postCommunityData.map((member, index) => (
                        <HStack
                          w="100%"
                          h = "80px"
                          key={index}
                          justify="space-between"
                        >
                          <Text>{member}</Text>
                          <ButtonTransition
                            unitid={'Removemember' + index}
                            selected={false}
                            width="140px"
                            height="35px"
                            rounded="33px"
                            onClick={() => removeCommunityMember({member})}
                          >
                            Remove
                          </ButtonTransition>
                        </HStack>
                      ))}
                      <HStack
                        w="100%"
                        h='80px'
                        spacing="100px"
                        justify="space-between"
                      >
                        <InputTransition
                          unitid="wallet"
                          selected={wallet == '' ? false : true}
                          width="100%"
                          height="55px"
                          rounded="md"
                        >
                          <Input
                            style={{ border: '0', background: 'transparent' }}
                            type="text"
                            h="55px"
                            rounded="md"
                            value={wallet}
                            onChange={(e)=>setWallet(e.target.value)}
                          />
                        </InputTransition>
                        <Box w='140px'>
                          <ButtonTransition
                            unitid='addmember'
                            selected={false}
                            width="140px"
                            height="35px"
                            rounded="33px"
                            onClick={() => addCommunityMember()}
                          >
                            Add
                          </ButtonTransition>
                        </Box>
                      </HStack>
                  </VStack>
                  {/* ------------------project mobile---------- */}
                  <VStack
                    display={{
                      base: 'block',
                      md: 'block',
                      lg: 'none',
                    }}
                    align='center'
                  >
                    {/* ------------------project snippet detail---------- */}
                    <Flex
                      borderTop="1px solid rgba(255, 255, 255, 0.1)"
                      boxSizing="border-box"
                      shadow="lg"
                      rounded="lg"
                      align={'center'}
                      direction={'column'}
                    >
                      {postCommunityData != '' &&
                      postCommunityData.map((member, index) => (
                          <Flex
                            width={'300px'}
                            direction={'column'}
                            mt="20px"
                            key={index}
                            align='center'
                          >
                            <Text fontSize='13px' mb='10px'>{member}</Text>
                            <ButtonTransition
                              unitid={'Removemember' + index}
                              selected={false}
                              width="120px"
                              height="30px"
                              rounded="30px"
                              onClick={() => removeCommunityMember({member})}
                            >
                              Remove
                            </ButtonTransition>
                          </Flex>
                      ))}
                      <InputTransition
                        unitid="wallet"
                        selected={wallet == '' ? false : true}
                        width="100%"
                        height="30px"
                        rounded="md"
                        mt='20px'
                      >
                        <Input
                          style={{ border: '0', background: 'transparent' }}
                          type="text"
                          h="30px"
                          rounded="md"
                          value={wallet}
                          fontSize='13px'
                          onChange={(e)=>setWallet(e.target.value)}
                        />
                      </InputTransition>
                      <Box w='120px' mt='20px'>
                        <ButtonTransition
                          unitid='addmember'
                          selected={false}
                          width="120px"
                          height="30px"
                          rounded="30px"
                          onClick={() => addCommunityMember()}
                        >
                          Add
                        </ButtonTransition>
                      </Box>
                    </Flex>
                  </VStack>
                </Flex>
                <Flex
                  w="1000px"
                  p={50}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Pagination
                    bg={
                      'linear-gradient(180deg, #FE8600 21.43%, #F83E00 147.62%)'
                    }
                    current={current}
                    onChange={(page) => onChangePaginator(page)}        
                    pageSize={pageSize}
                    total={state.communityData == ''? 0 : state.communityData.length}
                    itemRender={itemRender}
                    paginationProps={{ display: 'flex' }}
                  />
                </Flex>
              </VStack>
            </Flex>
          </Box>
        </Flex>
        <Footer/>
        <Notification  ref={notificationRef}/>        
      </div>
    </ChakraProvider>
  )
}
