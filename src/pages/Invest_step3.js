import { CheckIcon } from "@chakra-ui/icons";
import { Fee, MsgExecuteContract, MsgSend, WasmAPI } from '@terra-money/terra.js'
import {
  chakra,
  Box,
  Flex,
  Text,
  Input,
  InputGroup,
  Select,
  InputLeftElement,
  HStack,
} from "@chakra-ui/react";
import React, { useEffect, useState, useRef, } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { navigate } from '@reach/router'
import { toast } from "react-toastify";

import { useStore } from '../store'
import {
  ImageTransition,
  ButtonTransition,
  InputTransition
} from "../components/ImageTransition";
import Faq from '../components/FAQ'
import PageLayout from '../components/PageLayout'
import {
  EstimateSend,
  ParseParam,
  FetchData,
  isCommunityWallet,
  CheckNetwork,
  GetOneProject,
  errorOption,
  successOption
} from "../components/Util";

export default function Invest_step3() {
  const [signature, setSignature] = useState('');
  const [InsTitle, setInsTitle] = useState('');
  const [InsName, setInsName] = useState('');
  const [InsEmail, setInsEmail] = useState('');
  const [chain, setChain] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [oneprojectData, setOneprojectData] = useState('');

  const { state, dispatch } = useStore();
  const canvasRef = useRef({});

  //------------parse URL for project id----------------------------
  let project_id = ParseParam();
  useEffect(() => {
    async function fetchData() {
      let { projectData, communityData, configData } = await FetchData(api, state, dispatch);

      const oneprojectData = GetOneProject(projectData, project_id);
      if (oneprojectData == '') {
        toast("Can't fetch project data", errorOption);
        console.log("can't fetch project data")
        return '';
      }
      setOneprojectData(oneprojectData);
      setChain(oneprojectData.project_ecosystem);
    }
    fetchData();
  },
    [project_id])

  //----------init api, lcd-------------------------
  const api = new WasmAPI(state.lcd_client.apiRequester)

  //----------------upload signature----------------------------
  function openUpload() {
    if (typeof document !== 'undefined') {
      let fileSelector = document.getElementById('fileSelector')
      fileSelector.click();
    }
  }

  function onChangeSignature(e) {
    if (typeof document !== 'undefined') {
      let fileSelector = document.getElementById('fileSelector')
      var fileName = fileSelector.value;
      setSignature(fileName.substr(fileName.lastIndexOf('\\') + 1, fileName.length - 1));
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
  function checkValication() {
    if (CheckNetwork(state.connectedWallet, state) == false)
      return false;

    if (parseInt(state.investAmount) <= 0) {
      toast("Please input UST amount", errorOption);
      return false;
    }
    if (state.presale == false && parseInt(state.investAmount) < 20000) {
      toast("Input UST amount for private sale of at least 20,000", errorOption);
      return false;
    }
    return true;
  }

  async function createSAFTPdf(date) {
    var formData = new FormData();
    formData.append("investName", InsName);
    formData.append("investTitle", InsTitle);
    formData.append("investEmail", InsEmail);
    formData.append("investAmount", state.investAmount);
    formData.append("investDate", date);
    formData.append("investSignature", canvasRef.current.toDataURL());
    formData.append("presale", state.presale);
    // formData.append("file", state.investSignature);

    const requestOptions = {
      method: 'POST',
      body: formData,
    };

    toast("Uploading", successOption)

    await fetch(state.request + '/pdfmake', requestOptions)
      .then((res) => res.json())
      .then((data) => {
        toast.dismiss()
        dispatch({
          type: 'setPdffile',
          message: data.data,
        })
        console.log(data);
      })
      .catch((e) => {
        console.log("Error:" + e);
      })
  }
  async function createSAFTDocx(date) {
    console.log(oneprojectData);
    var formData = new FormData();
    formData.append("docxTemplate", oneprojectData.project_saft);
    formData.append("purchaserName", InsName);
    formData.append("purchaserTitle", InsTitle);
    formData.append("purchaserEmail", InsEmail);
    formData.append("purchaserAmount", state.investAmount);
    formData.append("purchaserDate", date);
    formData.append("purchaserSignature", canvasRef.current.toDataURL());

    const requestOptions = {
      method: 'POST',
      body: formData,
    };

    toast("Uploading", successOption)

    await fetch(state.request + '/docxmake', requestOptions)
      .then((res) => res.json())
      .then((data) => {
        toast.dismiss();
        dispatch({
          type: 'setDocxfile',
          message: data.data,
        })
        console.log(data);
      })
      .catch((e) => {
        console.log("Error:" + e);
      })
  }
  async function onNext() {
    //----------verify connection--------------------------------
    if (checkValication() == false)
      return false;

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
    let date = currentDate.getDate() + "/" + (currentDate.getMonth() + 1) +
      "/" + currentDate.getFullYear();
    dispatch({
      type: 'setInvestDate',
      message: date,
    })

    if (project_id == state.wefundID) {
      await createSAFTPdf(date);

      let amount = parseInt(state.investAmount) * 10 ** 6;

      const msg = new MsgSend(
        state.connectedWallet.walletAddress,
        'terra1zjwrdt4rm69d84m9s9hqsrfuchnaazhxf2ywpc',
        { uusd: amount }
      );
      let memo = state.presale ? "Presale" : "Private sale";
      let res = await EstimateSend(state.connectedWallet, state.lcd_client, [msg], "Invest success ", memo);
      if (res == true)
        navigate('/invest_step4?project_id=' + project_id);
    }
    else {
      await createSAFTDocx(date);

      let res = await backProject();
      if (res == true)
        navigate('/invest_step4?project_id=' + project_id);
    }
  }

  async function backProject() {
    const targetAmount = parseInt(oneprojectData.project_collected) * (10 ** 6);

    let leftAmount = targetAmount - oneprojectData.backerbacked_amount;

    if (leftAmount <= 0) {
      toast("Backer allocation has already been collected! You can't back this project.", errorOption);
      return false;
    }

    let amount = parseInt(state.investAmount) * 10 ** 6;
    // let maxAmount;
    // if(leftAmount >= 100_000_000)
    //   maxAmount = leftAmount * 100 / 95 + 1_000_000;
    // else
    //   maxAmount = leftAmount + 5_000_000;

console.log(leftAmount);
console.log(amount);
    if (amount < 6_000_000) {
      toast("Investment amount should be at least 6 UST.", errorOption);
      return false;
    }
    // if (amount > maxAmount) {
    //   toast("Investment amount should be less than " + (maxAmount/10**6).toString() + " UST", errorOption);
    //   return false;
    // }

    let wefundContractAddress = state.WEFundContractAddress;
    let BackProjectMsg = {
      back2_project: {
        project_id: `${project_id}`,
        backer_wallet: state.connectedWallet.walletAddress,
        fundraising_stage: oneprojectData.fundraising_stage,
        token_amount: `${state.investWfdamount}`,
        otherchain: chain,
        otherchain_wallet: walletAddress,
      },
    }

    let msg = new MsgExecuteContract(
      state.connectedWallet.walletAddress,
      wefundContractAddress,
      BackProjectMsg,
      { uusd: amount }
    );

    return await EstimateSend(state.connectedWallet, state.lcd_client, [msg], "Back to Project Success");
  }
  const OtherChainWallet = () => {
    return (
      <Flex direction={{ base: 'column', md: 'column', lg: 'row' }} mt='40px' justify="center" align='center'>
        <Box align='center' ml={{ base: '0px', md: '0px', lg: '0px' }}>
          <Flex>
            <Text mb='20px'>Select Chain</Text>
          </Flex>
          <InputTransition
            unitid="chaintransition"
            selected={false}
            width="300px"
            height="45px"
            rounded="md"
          >
            <Select
              id="chainselect"
              style={{ background: 'transparent', border: '0' }}
              h="45px"
              shadow="sm"
              size="sm"
              w="100%"
              value={chain}
              rounded="md"
              onChange={(e) => {
                setChain(e.target.value)
              }}
            >
              <option style={{ backgroundColor: '#1B0645' }}>
                Ethereum
              </option>
              <option style={{ backgroundColor: '#1B0645' }}>
                BSC
              </option>
              <option style={{ backgroundColor: '#1B0645' }}>
                Solana
              </option>
              <option style={{ backgroundColor: '#1B0645' }}>
                Harmony
              </option>
              <option style={{ backgroundColor: '#1B0645' }}>
                Osmis
              </option>
              <option style={{ backgroundColor: '#1B0645' }}>
                Algorand
              </option>
              <option style={{ backgroundColor: '#1B0645' }}>
                Terra
              </option>
            </Select>
          </InputTransition>
        </Box>
        <Box align='center' ml={{ base: '0px', md: '0px', lg: '30px' }}>
          <Flex mt={{ base: '40px', md: '40px', lg: '0px' }}>
            <Text mb='20px'>Wallet Address</Text>
          </Flex>
          <Box>
            <InputTransition
              unitid="inputwallet"
              selected={false}
              width="300px"
              height="45px"
              rounded="md"
            >
              <Input
                background={'transparent'}
                border='0px'
                h='45px'
                type='text'
                placeholder='Paste wallet address here'
                boxShadow={''}
                rounded='md'
                value={walletAddress}
                onChange={(e) => { setWalletAddress(e.target.value) }}
              />
            </InputTransition>
          </Box>
        </Box>
      </Flex>
    )
  }
  return (
    <PageLayout title="Back the project" subTitle1="Invest" subTitle2="in WeFund">
      <Box
        width={{ base: '100%', sm: '80%', md: '80%', lg: '80%', xl: '70%' }}
        px='50px'
        style={{ fontFamily: 'Sk-Modernist-Regular' }}
      >
        <Flex
          mt='83px'
          justify='center'
          align='center'
          direction='column'
          style={{ fontFamily: 'PilatExtended-Regular' }}
        >
          <HStack mt='150px' mb='50px'>
            <Box
              width={{ base: '50px', md: '40px' }}
              style={{
                paddingTop: '3px',
                paddingLeft: '3px',
                height: '24px',
                border: '3px solid #3BE489',
                backgroundColor: '#3BE489',
                borderRadius: '50%',
                display: 'inline-block'
              }}
            >
              <CheckIcon color="#250E3F" w={3} h={3} marginBottom={'20px'} />
            </Box>
            <Text fontSize={{ base: '12px', sm: '16px', md: '22px', lg: '22px' }}>Step 1</Text>
            <Box style={{ height: '0x', width: '30%', border: '2px solid #3BE489', background: ' #3BE489' }}></Box>
            <Box
              width={{ base: '50px', md: '40px' }}
              style={{
                paddingTop: '3px',
                paddingLeft: '3px',
                height: '24px',
                border: '3px solid #3BE489',
                backgroundColor: '#3BE489',
                borderRadius: '50%',
                display: 'inline-block'
              }}>
              <CheckIcon color="#250E3F" w={3} h={3} marginBottom={'20px'} />
            </Box>
            <Text fontSize={{ base: '12px', sm: '16px', md: '22px', lg: '22px' }}>Step 2</Text>
            <Box style={{ height: '4px', width: '30%', background: 'linear-gradient(90deg, #3BE489 0%, rgba(59, 228, 137, 0) 100%)' }}></Box>
            <Box
              width={{ base: '50px', md: '40px' }}
              style={{
                height: '24px',
                border: '3px solid rgba(255, 255, 255, 0.3799999952316284)',
                borderRadius: '50%',
                display: 'inline-block'
              }}>
            </Box>
            <Text
              fontSize={{ base: '12px', sm: '16px', md: '22px', lg: '22px' }}>
              Final Step
            </Text>
          </HStack>
          <Text
            fontSize={{ base: '16px', md: '16px', lg: '22px' }}
            fontWeight={'300'}
          >
            Please <span style={{ color: '#00A3FF' }}>share with us</span> this information
          </Text>
          <Text
            fontSize={{ base: '14px', md: '14px', lg: '16px' }}
            color='rgba(255, 255, 255, 0.54)'
            fontWeight={'normal'}
            mt={'20px'}
            textAlign={'center'}
          >
            Please fill in all fields to finalize the SAFT process
          </Text>
        </Flex>

        {/* -----------------Name and Title----------------- */}
        <Flex direction={{ base: 'column', md: 'column', lg: 'row' }} ml='0px' mt='40px' justify="center" align='center'>
          <Box align='center'>
            <Flex ml={{ base: '0px', md: '0px', lg: '0px' }}>
              <Text mb='20px'>Name</Text>
            </Flex>
            <InputTransition
              unitid='investorname'
              selected={InsName == '' ? false : true}
              height='55px' rounded='md' width='290px'
            >
              <InputGroup size="sm" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                <InputLeftElement style={{ background: 'transparent', }} pointerEvents='none' color='gray.300' fontSize='1.2em' children=' ' />
                <Input style={{}} type="text" h='55px' placeholder="Type Name" rounded="md" value={InsName} onChange={(e) => { setInsName(e.target.value) }} />
              </InputGroup>
            </InputTransition>
          </Box>
          <Box align='center' ml={{ base: '0px', md: '0px', lg: '30px' }}>
            <Flex ml={{ base: '0px', md: '0px', lg: '0px' }} mt={{ base: '40px', md: '40px', lg: '0px' }}>
              <Text mb='20px'>Title</Text>
            </Flex>
            <InputTransition
              unitid='investortitle'
              selected={InsTitle == '' ? false : true}
              height='55px' rounded='md' width='290px'
            >
              <InputGroup size="sm" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                <InputLeftElement style={{ background: 'transparent', }} pointerEvents='none' color='gray.300' fontSize='1.2em' children=' ' />
                <Input style={{}} type="text" h='55px' placeholder="Your title" rounded="md" value={InsTitle} onChange={(e) => { setInsTitle(e.target.value) }} />
              </InputGroup>
            </InputTransition>
          </Box>
        </Flex>

        <Flex direction={{ base: 'column', md: 'column', lg: 'row' }} mt='40px' justify="center" align='center'>
          <Box align='center' ml={{ base: '0px', md: '0px', lg: '0px' }} mt={{ base: '0px', md: '0px', lg: '-100px' }}>
            <Flex>
              <Text mb='20px'>Email</Text>
            </Flex>
            <InputTransition
              unitid='investoremail'
              selected={InsEmail == '' ? false : true}
              height='55px' rounded='md' width='290px'
            >
              <InputGroup size="sm" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                <InputLeftElement style={{ background: 'transparent', }} pointerEvents='none' color='gray.300' fontSize='1.2em' children=' ' />
                <Input style={{}} type="email" h='55px' placeholder="example@email.com" rounded="md" value={InsEmail} onChange={(e) => { setInsEmail(e.target.value) }} />
              </InputGroup>
            </InputTransition>
          </Box>
          <Box align='center' ml={{ base: '0px', md: '0px', lg: '30px' }}>
            <Flex mt={{ base: '40px', md: '40px', lg: '0px' }}>
              <Text mb='20px'>Signature</Text>
            </Flex>
            <Box>
              <Flex justify='center' w='300px' rounded="md" bg='white' >
                <SignatureCanvas ref={canvasRef} penColor='black'
                  canvasProps={{ width: 300, height: 100 }} />
              </Flex>
              <Flex style={{ cursor: 'pointer' }} mt='20px' justify='left' fontSize='14px'>
                <ButtonTransition unitid="clear"
                  selected={false}
                  width='100px' height='40px' rounded='20px'
                  onClick={() => { canvasRef.current.clear() }}
                >
                  <Box >Clear</Box>
                </ButtonTransition>
                <ButtonTransition unitid="Open Signature"
                  selected={false}
                  width='150px' height='40px' rounded='20px' ml='40px'
                  onClick={() => openUpload()}
                >
                  <Box >Open Signature</Box>
                </ButtonTransition>
              </Flex>
            </Box>
            <input type='file' id="fileSelector" name='userFile' style={{ display: 'none' }}
              onChange={(e) => onChangeSignature(e)} />
          </Box>
        </Flex>
        {state.wefundID != project_id && <OtherChainWallet />}

        <Flex w='100%' mt='60px' justify='center' mb='170px'>
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
            onClick={() => onNext()}
          >
            <Box variant="solid" color="white" justify='center' align='center'>
              Submit
            </Box>
          </ImageTransition>
        </Flex>
        <Faq />
      </Box>
    </PageLayout>
  )
}