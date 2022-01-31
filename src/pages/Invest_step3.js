import { CheckIcon } from "@chakra-ui/icons";
import {Fee, MsgExecuteContract, MsgSend, LCDClient,  } from '@terra-money/terra.js'
import {chakra, 
  Box, 
  Flex, 
  Text, 
  Input, 
  InputGroup,  
  Stack, 
  Image, 
  InputLeftElement, 
  Button, 
  HStack, 
  VStack, 
  Img
  } from "@chakra-ui/react";
import React, { useEffect, useState,  useCallback, useMemo, useRef, } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { navigate } from '@reach/router'

import { useStore } from '../store'
import { ImageTransition, ButtonTransition, InputTransition } from "../components/ImageTransition";
import Notification from '../components/Notification'
import Faq from '../components/FAQ'
import PageLayout from '../components/PageLayout'
import { EstimateSend, ParseParam, FetchData, isCommunityWallet } from "../components/Util";

let useConnectedWallet = {}
if (typeof document !== 'undefined') {
    useConnectedWallet =
        require('@terra-money/wallet-provider').useConnectedWallet
}

export default function Invest_step3() {
  const [signature, setSignature] = useState('');
  const [InsTitle, setInsTitle] = useState('');
  const [InsName, setInsName] = useState('');
  const [InsEmail, setInsEmail] = useState('');
  const {state, dispatch} = useStore();
  const canvasRef = useRef({});
  
  //------------parse URL for project id----------------------------
  let project_id = ParseParam();

  //---------------wallet connect-------------------------------------
  let connectedWallet = ''

  if (typeof document !== 'undefined') {
    connectedWallet = useConnectedWallet()
  }
  
  //----------init api, lcd-------------------------
  const lcd = useMemo(() => {
    if (!connectedWallet) {
      return null
    }
    return new LCDClient({
      URL: connectedWallet.network.lcd,
      chainID: connectedWallet.network.chainID,
    })
  }, [connectedWallet])

  //---------------notification setting---------------------------------
  const notificationRef = useRef();

  //----------------upload signature----------------------------
  function openUpload(){
    if(typeof document !== 'undefined') {
      let fileSelector = document.getElementById('fileSelector')
      fileSelector.click();
    }
  }

  function onChangeSignature(e){
    if(typeof document !== 'undefined') {
      let fileSelector = document.getElementById('fileSelector')
      var fileName = fileSelector.value;
      setSignature(fileName.substr(fileName.lastIndexOf('\\')+1, fileName.length-1));
      dispatch({
        type: 'setInvestsignature',
        message: e.target.files[0],
      })

      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = function () {
        canvasRef.current.fromDataURL(reader.result);
      };
      
    }    
  }
  //---------------on next------------------------------------

  async function onNext(){
    //----------verify connection--------------------------------
    CheckNetwork(connectedWallet, notificationRef, state);
    
    if(parseInt(state.investAmount) <= 0 )
    {
      showNotification("Please input UST amount", "error", 40000);
      return;
    }

    dispatch({
      type: 'setInvestname',
      message: InsName,
    })
    dispatch({
      type: 'setInvestemail',
      message: InsEmail,
    })
    dispatch({
      type: 'setInvesttitle',
      message: InsTitle
    })

    const currentDate = new Date();
    let date = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + 
          "/" + currentDate.getFullYear();
    dispatch({
      type: 'setInvestDate',
      message: date,
    })

    var formData = new FormData();
    formData.append("investName", InsName);
    formData.append("investTitle", InsTitle);
    formData.append("investEmail", InsEmail);
    formData.append("investAmount", state.investAmount);
    formData.append("investDate", date);
    formData.append("investSignature", canvasRef.current.toDataURL());
    // formData.append("file", state.investSignature);

    const requestOptions = {
      method: 'POST',
      body: formData,
    };

    notificatonRef.current.showNotification("Uploading", 'success', 100000)

    await fetch(state.request + '/pdfmake', requestOptions)
    .then((res) => res.json())
    .then((data) => {
      notificationRef.current.hideNotification();
      dispatch({
        type: 'setPdffile',
        message: data.data,
      })
      console.log(data);
    })
    .catch((e) =>{
      console.log("Error:"+e);
    })

    if(project_id == state.wefundID){
      let amount = parseInt(state.investAmount) * 10**6;

      const msg = new MsgSend(
        connectedWallet.walletAddress,
        'terra1zjwrdt4rm69d84m9s9hqsrfuchnaazhxf2ywpc',
        { uusd: amount }
      );

      await EstimateSend(connectedWallet, lcd, msg, "Invest success", notificationRef);
    }
    else{
      backProject();
    }
  }

  async function backProject()
  {
    let {projectData, communityData, configData} = await FetchData(api, notificationRef, state, dispatch);

    let _project_id = 1;
    if(project_id != null)
      _project_id = project_id;

    const oneprojectData = GetOneProject(projectData, _project_id);
    if(oneprojectData == ''){
      notificationRef.current.showNotification("Can't fetch project data", 'error', 6000);
      return;
    }

    const isCommunityMember = isCommunityWallet(state, _project_id);
    const targetAmount = parseInt(oneprojectData.project_collected)*(10**6)/2;

    let leftAmount = 0;
    if(isCommunityMember)
      leftAmount = targetAmount - oneprojectData.communitybacked_amount;
    else
      leftAmount = targetAmount - oneprojectData.backerbacked_amount;

    if(leftAmount <= 0){
      if(isCommunityMember)
        notificationRef.current.showNotification("Community allocation is already collected! You can't back this project.", 'error', 6000);
      else
        notificationRef.current.showNotification("Backer allocation is already collected! You can't back back this project.", 'error', 6000);
      return;
    }

    let wefundContractAddress = state.WEFundContractAddress;
    let BackProjectMsg = {
        back2_project: {
          backer_wallet: connectedWallet.walletAddress,
          project_id: `${_project_id}`
        },
    }

    let amount = parseInt(backAmount * 1000000 * 105 / 100);
    let msg = new MsgExecuteContract(
      connectedWallet.walletAddress,
      wefundContractAddress,
      BackProjectMsg,
      {uusd: amount}
    )

    EstimateSend(connectedWallet, lcd, msg, "Back to Project Success", notificationRef);
  }

  return (
    <PageLayout title="Back the Project" subTitle1="Invest" subTitle2="in WEFUND">
      <Box width='900px' bg='#FFFFFF0D' px='50px' style={{fontFamily:'Sk-Modernist'}} >

        <Flex mt='83px' justify='center' align='center' direction='column'
          style={{fontFamily:'PilatExtended-Regular'}}>
            <HStack  mt='150px' mb='50px'>
              <Box style={{paddingTop: '3px', paddingLeft:'3px', height: '24px', width: '24px', border: '3px solid #3BE489', backgroundColor: '#3BE489', borderRadius: '50%', display:'inline-block'}}>
              <CheckIcon color="#250E3F" w={3} h={3} marginBottom={'20px'}/>
              </Box>
              <Text>Step 1</Text>
              <Box style={{height: '0x', width: '63px', border: '2px solid #3BE489', background: ' #3BE489'}}></Box>
              <Box style={{paddingTop: '3px', paddingLeft:'3px', height: '24px', width: '24px', border: '3px solid #3BE489', backgroundColor: '#3BE489', borderRadius: '50%', display:'inline-block'}}>
              <CheckIcon color="#250E3F" w={3} h={3} marginBottom={'20px'}/>
              </Box>
              <Text>Step 2</Text>
              <Box style={{height: '4px', width: '63px', background: 'linear-gradient(90deg, #3BE489 0%, rgba(59, 228, 137, 0) 100%)'}}></Box>
              <Box style={{height: '24px', width: '24px', border: '3px solid rgba(255, 255, 255, 0.3799999952316284)', borderRadius: '50%', display:'inline-block'}}></Box>
              <Text>Final Step</Text>
            </HStack>
              <Text fontSize={{base:'16px',md:'16px',lg:'22px'}} fontWeight={'300'}>Please <span style={{color:'#00A3FF'}}>share with us</span> this information</Text>
          <Text fontSize={{base:'14px',md:'14px',lg:'16px'}} color='rgba(255, 255, 255, 0.54)' fontWeight={'normal'} mt={'20px'} textAlign={'center'}>Please fill in all fields to finalize the SAFT process</Text>
        </Flex>
        
        {/* -----------------Name and Title----------------- */}
        <Flex direction={{base:'column',md:'column',lg:'row'}} ml='0px' mt='40px' justify="center" align='center'>
          <Box align='center'>
            <Flex ml={{base:'0px',md:'0px',lg:'0px'}}>
              <Text mb='20px'>Name</Text>
            </Flex>
            <InputTransition 
              unitid='investorname'
              selected={InsName==''?false:true}
              width='100%' height='55px' rounded='md' width='290px'
            >      
              <InputGroup size="sm" style={{background: 'rgba(255, 255, 255, 0.05)'}}>
                <InputLeftElement style={{background: 'transparent', }} pointerEvents='none' color='gray.300' fontSize='1.2em' children=' ' />
                <Input style={{ }} type="text" h='55px'placeholder="Type Name" focusBorderColor="purple.800" rounded="md"  value={InsName} onChange={(e)=>{setInsName(e.target.value)}} />
              </InputGroup>
            </InputTransition>
          </Box>
          <Box align='center' ml={{base:'0px',md:'0px',lg:'30px'}}>
            <Flex ml={{base:'0px',md:'0px',lg:'0px'}} mt={{base:'40px', md:'40px', lg:'0px'}}>
              <Text mb='20px'>Title</Text>
            </Flex>
            <InputTransition 
              unitid='investortitle'
              selected={InsTitle==''?false:true}
              width='100%' height='55px' rounded='md' width='290px'
            >      
              <InputGroup size="sm" style={{background: 'rgba(255, 255, 255, 0.05)'}}>
                <InputLeftElement style={{background: 'transparent', }} pointerEvents='none' color='gray.300' fontSize='1.2em' children=' ' />
                <Input style={{ }} type="text" h='55px'placeholder="Your title" focusBorderColor="purple.800" rounded="md"  value={InsTitle} onChange={(e)=>{setInsTitle(e.target.value)}} />
              </InputGroup>
            </InputTransition>
          </Box>
        </Flex>
        
        <Flex direction={{base:'column',md:'column',lg:'row'}} mt='40px' justify="center" align='center'>
        <Box align='center' ml={{base:'0px',md:'0px',lg:'0px'}} mt={{base:'0px',md:'0px',lg:'-100px'}}>
            <Flex>
              <Text mb='20px'>Email</Text>
            </Flex>
            <InputTransition 
              unitid='investoremail'
              selected={InsEmail==''?false:true}
              width='100%' height='55px' rounded='md' width='290px'
            >      
              <InputGroup size="sm" style={{background: 'rgba(255, 255, 255, 0.05)'}}>
                <InputLeftElement style={{background: 'transparent', }} pointerEvents='none' color='gray.300' fontSize='1.2em' children=' ' />
                <Input style={{ }} type="email" h='55px'placeholder="example@email.com" focusBorderColor="purple.800" rounded="md"  value={InsEmail} onChange={(e)=>{setInsEmail(e.target.value)}} />
              </InputGroup>
            </InputTransition>
          </Box>
          <Box align='center' ml={{base:'0px',md:'0px',lg:'30px'}}>
            <Flex mt={{base:'40px', md:'40px', lg:'0px'}}>
              <Text mb='20px'>Signature</Text>
            </Flex>
            <Box>
              <Flex justify = 'center' w='300px' rounded="md" bg='white' >
                <SignatureCanvas ref={canvasRef} penColor='black'
                  canvasProps={{width: 300, height: 100}}/>
              </Flex>
              <Flex style={{cursor:'pointer'}} mt='20px' justify='left' fontSize='14px'>
                <ButtonTransition unitid="clear"
                  selected={false}
                  width='100px' height='40px' rounded='20px'
                >
                  <Box onClick={()=>{canvasRef.current.clear()}}>Clear</Box>
                </ButtonTransition>
                <ButtonTransition unitid="Open Signature"
                  selected={false}
                  width='150px' height='40px' rounded='20px' ml='40px'
                >
                  <Box onClick={()=>openUpload()}>Open Signature</Box>
                </ButtonTransition>
              </Flex>
            </Box>
            <input type='file' id="fileSelector" name='userFile' style={{display:'none'}}
              onChange={(e)=>onChangeSignature(e)}/>
            {/* 
            {signature == '' && 
              <InputGroup size="sm" width='290px'>
                <InputLeftElement width='290px' h='55px' pointerEvents='none' children={<IoCloudUploadOutline color='#00A3FF' width='30px' height='30px'/>} />
                <Input type="text" h='55px' bg='#FFFFFF' borderColor="#FFFFFF33" placeholder="Upload here" focusBorderColor="purple.800"  rounded="md"  
                onClick={()=>{openUpload()}}  /> 
              </InputGroup>}
            {signature != '' && 
              <InputGroup size="sm" width='290px'>
                <InputLeftElement h='55px' pointerEvents='none' children={<IoCheckbox color='00A3FF'  width='30px' height='30px' />} />
                <Input type="text" h='55px' bg='#FFFFFF' borderColor="#FFFFFF33" placeholder={signature} focusBorderColor="purple.800"  rounded="md"  
                onClick={()=>{openUpload()}} /> 
              </InputGroup>}
              */}
          </Box>
        </Flex>
        <Flex w='100%' mt='60px'justify='center' mb='170px'>
          <ImageTransition 
            unitid='submit'
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
              onClick={()=>onNext()}
            >
              Submit
            </Box>
          </ImageTransition>
        </Flex>
        <Faq/>
      </Box>
      <Notification ref={notificationRef} />
    </PageLayout>
  )
}