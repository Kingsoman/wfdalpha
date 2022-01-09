import React, { useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Fee, MsgExecuteContract } from '@terra-money/terra.js'
import {
  Box,
  Flex,
  Text,
  Input,
  InputGroup,
  InputLeftAddon,
  Textarea,
  Select,
  InputLeftElement,
  InputRightElement,
  Img,
} from '@chakra-ui/react'
import { IoCloudUploadOutline, IoCheckbox } from 'react-icons/io5'
import {
  ButtonBackTransition,
  ButtonTransition,
  ImageTransition,
  InputTransition,
} from '../components/ImageTransition'
import theme from '../theme'
import { useStore } from '../store'
import Notification from '../components/Notification'
import Footer from '../components/Footer'

let useConnectedWallet = {}
if (typeof document !== 'undefined') {
  useConnectedWallet =
    require('@terra-money/wallet-provider').useConnectedWallet
}

export default function CreateProject() {
  const { state, dispatch } = useStore()
  const [isUST, setIsUST] = useState(true)

  const [whitepaper, setWhitepaper] = useState('')
  const [logo, setLogo] = useState('')

  const [prjCategory, setPrjCategory] = useState('Crypto')
  const [prjName, setPrjName] = useState('')
  const [prjDescription, setPrjDescription] = useState('')
  const [prjWebsite, setPrjWebsite] = useState('')
  const [prjTeamdescription, setPrjTeamDescription] = useState('')
  const [prjEmail, setPrjEmail] = useState('')
  const [prjAmount, setPrjAmount] = useState('')
  const [prjSubcategory, setPrjSubcategory] = useState('Lending')
  const [prjChain, setPrjChain] = useState('Terra')

  const [prjNameLen, setPrjNameLen] = useState(0)
  const [prjDescriptionLen, setPrjDescriptionLen] = useState(0)
  const [prjTeamdescriptionLen, setPrjTeamDescriptionLen] = useState(0)

  //---------------wallet connect-------------------------------------
  let connectedWallet = ''

  if (typeof document !== 'undefined') {
    connectedWallet = useConnectedWallet()
  }

  //---------------notification setting---------------------------------
  const [notification, setNotification] = useState({
    type: 'success',
    message: '',
    show: false,
  })

  function hideNotification() {
    setNotification({
      message: notification.message,
      type: notification.type,
      show: false,
    })
  }

  function showNotification(message, type, duration) {
    // console.log('fired notification')
    setNotification({
      message: message,
      type: type,
      show: true,
    })
    console.log(notification)
    // Disable after $var seconds
    setTimeout(() => {
      setNotification({
        message: message,
        type: type,
        show: false,
      })
      // console.log('disabled',notification)
    }, duration)
  }

  //---------------input functions------------------------------
  function openUpload() {
    if (typeof document !== 'undefined') {
      let fileSelector = document.getElementById('fileSelector')
      fileSelector.click()
    }
  }
  function changeWhitepaper(e) {
    if (typeof document !== 'undefined') {
      let fileSelector = document.getElementById('fileSelector')
      var fileName = fileSelector.value
      setWhitepaper(
        fileName.substr(fileName.lastIndexOf('\\') + 1, fileName.length - 1),
      )

      dispatch({
        type: 'setWhitepaper',
        message: e.target.files[0],
      })
    }
  }

  function openLogoUpload() {
    if (typeof document !== 'undefined') {
      let fileSelector = document.getElementById('fileLogoSelector')
      fileSelector.click()
    }
  }
  function changeLogo(e) {
    if (typeof document !== 'undefined') {
      let fileSelector = document.getElementById('fileLogoSelector')
      var fileName = fileSelector.value
      setLogo(
        fileName.substr(fileName.lastIndexOf('\\') + 1, fileName.length - 1),
      )

      dispatch({ type: 'setLogo', message: e.target.files[0] })
    }
  }
  //---------------validate function-------------------------------
  function onChangePrjName(e) {
    setPrjNameLen(e.target.value.length)
    if (e.target.value.length < 100) {
      setPrjName(e.target.value)
    }
  }
  function onChangePrjDescription(e) {
    setPrjDescriptionLen(e.target.value.length)
    if (e.target.value.length < 3000) setPrjDescription(e.target.value)
  }
  function onChangePrjTeamDescription(e) {
    setPrjTeamDescriptionLen(e.target.value.length)
    if (e.target.value.length < 5000) setPrjTeamDescription(e.target.value)
  }
  function onChangePrjAmount(e) {
    if (
      e.target.value != '' &&
      e.target.value != parseInt(e.target.value).toString()
    ) {
      showNotification('Please input number only', 'error', 4000)
      return
    }
    setPrjAmount(e.target.value)
  }
  //---------------create project---------------------------------
  async function createProject() {
    //----------verify connection--------------------------------
    if (connectedWallet == '' || typeof connectedWallet == 'undefined') {
      showNotification('Please connect wallet first!', 'error', 6000)
      return
    }

    console.log(connectedWallet)
    if (state.net == 'mainnet' && connectedWallet.network.name == 'testnet') {
      showNotification('Please switch to mainnet!', 'error', 4000)
      return
    }
    if (state.net == 'testnet' && connectedWallet.network.name == 'mainnet') {
      showNotification('Please switch to testnet!', 'error', 4000)
      return
    }

    if (prjNameLen == 0) {
      showNotification('Please fill project name!', 'error', 4000)
      return
    }
    console.log(parseInt(prjAmount))

    if (parseInt(prjAmount) < 100) {
      showNotification('Collected money at least 100 UST', 'error', 4000)
      return
    }
    //----------upload whitepaper---------------------------------------
    showNotification('Please wait', 'success', 10000)

    let realWhitepaer = ''
    if (whitepaper != '') {
      var formData = new FormData()
      formData.append('projectName', prjName)
      formData.append('file', state.whitepaper)

      const requestOptions = {
        method: 'POST',
        body: formData,
      }

      await fetch(state.request + '/uploadWhitepaper', requestOptions)
        .then((res) => res.json())
        .then((data) => {
          realWhitepaer = data.data
          showNotification(
            data.data + 'Whitepaper upload Success',
            'success',
            1000,
          )
        })
        .catch((e) => {
          console.log('Error:' + e)
          showNotification('upload whitepaper failed', 'error', 1000)
        })
    }
    //---------upload logo-------------------------------------------------
    let realLogo = ''
    if (logo != '') {
      var formData = new FormData()
      formData.append('projectName', prjName)
      formData.append('file', state.logo)

      const requestOptions = {
        method: 'POST',
        body: formData,
      }

      await fetch(state.request + '/uploadLogo', requestOptions)
        .then((res) => res.json())
        .then((data) => {
          realLogo = data.data
          showNotification(data.data + 'Logo upload Success', 'success', 1000)
        })
        .catch((e) => {
          console.log('Error:' + e)
          showNotification('upload logo failed', 'error', 1000)
        })
    }
    //---------------execute contract----------------------------------
    let wefundContractAddress = state.WEFundContractAddress

    const obj = new Fee(10_000, { uusd: 4500 })

    let AddProjectMsg = {
      add_project: {
        creator_wallet: connectedWallet.walletAddress,
        project_category: prjCategory,
        project_chain: prjChain,
        project_collected: prjAmount,
        project_createddate: '',
        project_deadline: '',
        project_description: prjDescription,
        project_email: prjEmail,
        project_icon: realLogo,
        project_name: prjName,
        project_subcategory: prjSubcategory,
        project_teamdescription: prjTeamdescription,
        project_website: prjWebsite,
        project_whitepaper: realWhitepaer,
      },
    }
    // console.log(AddProjectMsg);

    let msg = new MsgExecuteContract(
      connectedWallet.walletAddress,
      wefundContractAddress,
      AddProjectMsg,
    )

    // console.log(JSON.stringify(msg));

    await connectedWallet
      .post({
        msgs: [msg],
        // fee: obj,
        gasPrices: obj.gasPrices(),
        gasAdjustment: 1.7,
      })
      .then((e) => {
        if (e.success) {
          // console.log("Add Project success");
          // console.log(e);
          showNotification('Create Project Success', 'success', 4000)
        } else {
          // console.log("project add error");
          showNotification(e.message, 'error', 4000)
        }
      })
      .catch((e) => {
        // console.log("error" + e);
        showNotification(e.message, 'error', 4000)
      })
  }

  return (
    <ChakraProvider resetCSS theme={theme}>
      <div
        style={{
          background: 'linear-gradient(90deg, #1F0021 0%, #120054 104.34%)',
          width: '100%',
          color: 'white',
          fontSize: '18px',
          fontWeight: '500',
          paddingBottom: '2em',
          fontFamily: 'Sk-Modernist-Regular',
        }}
      >
        <div
          style={{
            backgroundImage: "url('/createproject_banner_emphasis.svg')",
            boxShadow: '0px 5px 50px 0px #000000A6',
            width: '100%',
            zIndex: '10',
          }}
        >
          <div
            style={{
              backgroundImage: "url('/createproject_banner.svg')",
              width: '100%',
              zIndex: '11',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              zIndex: '11',
            }}
          >
            <Flex pt="80px" justify="center">
              <Text
                fontSize="16px"
                fontWeight="400"
                color={'rgba(255, 255, 255, 0.54)'}
              >
                Home &gt;&nbsp;
              </Text>
              <Text fontSize="16px">Create Your Project</Text>
            </Flex>
            <Flex
              mt="11px"
              pb="90px"
              justify="center"
              style={{ fontFamily: 'PilatExtended-Bold' }}
            >
              <Text fontSize={{ base: '25px', md: '25px', lg: '40px' }}>
                Create a&nbsp;
              </Text>
              <Text
                fontSize={{ base: '25px', md: '25px', lg: '40px' }}
                color="#4790f5"
              >
                New Project
              </Text>
            </Flex>
          </div>
        </div>
        <Flex
          width="100%"
          justify="center"
          mb={'150px'}
          zIndex={'1'}
        >
          <div
            style={{
              width: '900px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1.5px solid rgba(255, 255, 255, 0.15)',
              borderTopColor: 'transparent',
              fontFamily: 'Sk-Modernist-Regular',
              paddingLeft: '50px',
              paddingRight: '50px',
              zIndex: '1',
            }}
          >
            {/* --------Select UST or WFD------------------ */}
            <Text fontSize="18px" pt="50px">
              Select Payment Method
            </Text>

            <Flex direction="row" mt="40px">
              {/* ------------UST---------------------- */}
              <ImageTransition
                unitid="coinust"
                border1="linear-gradient(180deg, #00A3FF 0%, rgba(0, 71, 255, 0) 100%)"
                background1="linear-gradient(180deg, #2B226B 0%, #1B0131 100%)"
                border2="linear-gradient(180deg, rgba(255, 255, 255, 0.54) 0%, rgba(255, 255, 255, 0) 100%)"
                background2="linear-gradient(180deg, #31173A 0%, #421D50 0.01%, #21052C 100%)"
                border3="linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)"
                background3="linear-gradient(180deg, #171347 0%, #171347 100%)"
                selected={isUST}
                width="120px"
                height="160px"
                rounded="10px"
                onClick={() => {
                  setIsUST(true)
                }}
              >
                <Img
                  mt="23px"
                  boxSize="50px"
                  objectFit="cover"
                  src="/UST.svg"
                  alt="UST Avatar"
                />
                <Text mt="13px">UST</Text>
                <Img
                  mt="15px"
                  mb="20px"
                  boxSize="20px"
                  objectFit="cover"
                  src={isUST ? '/group_dot.svg' : '/group_undot.svg'}
                  alt="UST Avatar"
                />
              </ImageTransition>

              {/* --------------------------WFD------------------------- */}
              <ImageTransition
                unitid="coinwfd"
                border1="linear-gradient(180deg, #00A3FF 0%, rgba(0, 71, 255, 0) 100%)"
                background1="linear-gradient(180deg, #2B226B 0%, #1B0131 100%)"
                border2="linear-gradient(180deg, rgba(255, 255, 255, 0.54) 0%, rgba(255, 255, 255, 0) 100%)"
                background2="linear-gradient(180deg, #31173A 0%, #421D50 0.01%, #21052C 100%)"
                border3="linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)"
                background3="linear-gradient(180deg, #171347 0%, #171347 100%)"
                selected={!isUST}
                width="120px"
                height="160px"
                rounded="10px"
                ml="20px"
                onClick={() => {
                  setIsUST(false)
                }}
              >
                <Img
                  mt="23px"
                  height="35px"
                  objectFit="cover"
                  src="/WeFund Logos only.png"
                  alt="UST Avatar"
                />
                <Text mt="13px">WFD</Text>
                <Img
                  mt="25px"
                  mt="15px"
                  boxSize="20px"
                  objectFit="cover"
                  src={isUST ? '/group_undot.svg' : '/group_dot.svg'}
                  alt="UST Avatar"
                />
              </ImageTransition>
            </Flex>
            {/* --------project name-------------- */}
            <Box mt="40px">
              <Flex justify="space-between">
                <Text mb="20px">Project Name</Text>
                <Text fontSize="15px" opacity="0.5">
                  {prjNameLen}/100 words
                </Text>
              </Flex>
              <InputTransition
                unitid="projectname"
                selected={prjName == '' ? false : true}
                width="100%"
                height="55px"
                rounded="md"
              >
                <InputGroup
                  style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                  size="sm"
                  border="0px"
                >
                  <Input
                    style={{ border: '0', background: 'transparent' }}
                    type="text"
                    h="55px"
                    rounded="md"
                    value={prjName}
                    placeholder="Type here"
                    onChange={(e) => onChangePrjName(e)}
                  />
                </InputGroup>
              </InputTransition>
            </Box>
            {/* ------------project description--------------- */}
            <Box mt="40px">
              <Flex justify="space-between">
                <Text mb="20px">Project Description</Text>
                <Text fontSize="15px" opacity="0.5">
                  {prjDescriptionLen}/3000 words
                </Text>
              </Flex>
              <InputTransition
                unitid="projectdescription"
                selected={prjDescription == '' ? false : true}
                width="100%"
                height="175px"
                rounded="md"
              >
                <Textarea
                  style={{ border: '0', background: 'transparent' }}
                  value={prjDescription}
                  onChange={(e) => {
                    onChangePrjDescription(e)
                  }}
                  rounded="md"
                  placeholder="Type here"
                  size="sm"
                  h="175px"
                />
              </InputTransition>
            </Box>
            {/* ---------------project website------------------- */}
            <Box w="100%" mt="50px">
              <Flex justify="space-between">
                <Text mb="20px">Project Website</Text>
              </Flex>
              <InputTransition
                unitid="projectwebsite"
                selected={prjWebsite == '' ? false : true}
                width="100%"
                height="55px"
                rounded="md"
              >
                <InputGroup
                  size="sm"
                  style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                >
                  <InputLeftAddon
                    h="55px"
                    style={{ background: 'transparent', border: '0' }}
                    children="http://"
                    color="white"
                    rounded="md"
                  />
                  <Input
                    type="text"
                    h="55px"
                    style={{ background: 'transparent', border: '0' }}
                    placeholder="Type here"
                    rounded="md"
                    value={prjWebsite}
                    onChange={(e) => {
                      setPrjWebsite(e.target.value)
                    }}
                  />
                </InputGroup>
              </InputTransition>
            </Box>
            <Flex direction="row" mt="40px" justify="space-between">
              {/* ---------------upload---------------------------------- */}
              <Box w="48%">
                <Flex justify="space-between">
                  <Text mb="20px">Project Whitepaper</Text>
                </Flex>
                {whitepaper == '' && (
                  <InputGroup size="sm">
                    <InputLeftElement
                      h="55px"
                      pointerEvents="none"
                      children={
                        <IoCloudUploadOutline
                          color="#00A3FF"
                          width="30px"
                          height="30px"
                        />
                      }
                    />
                    <Input
                      type="text"
                      h="55px"
                      bg="#FFFFFF"
                      borderColor="#FFFFFF33"
                      placeholder="Upload here"
                      focusBorderColor="purple.800"
                      rounded="md"
                      onClick={(e) => {
                        openUpload()
                      }}
                    />
                  </InputGroup>
                )}
                {whitepaper != '' && (
                  <InputGroup size="sm">
                    <InputLeftElement
                      h="55px"
                      pointerEvents="none"
                      children={
                        <IoCheckbox color="00A3FF" width="30px" height="30px" />
                      }
                    />
                    <Input
                      type="text"
                      h="55px"
                      bg="#FFFFFF"
                      borderColor="#FFFFFF33"
                      placeholder={whitepaper}
                      focusBorderColor="purple.800"
                      rounded="md"
                      onClick={(e) => {
                        openUpload()
                      }}
                    />
                  </InputGroup>
                )}
                <input
                  type="file"
                  id="fileSelector"
                  name="userFile"
                  style={{ display: 'none' }}
                  onChange={(e) => changeWhitepaper(e)}
                />
              </Box>
              {/* -------------------Project Icon------------------- */}
              <Box w="48%">
                <Flex justify="space-between">
                  <Text mb="20px">Project Logo</Text>
                </Flex>
                {logo == '' && (
                  <InputGroup size="sm">
                    <InputLeftElement
                      h="55px"
                      pointerEvents="none"
                      children={
                        <IoCloudUploadOutline
                          color="#00A3FF"
                          width="30px"
                          height="30px"
                        />
                      }
                    />
                    <Input
                      type="text"
                      h="55px"
                      bg="#FFFFFF"
                      borderColor="#FFFFFF33"
                      placeholder="Upload here"
                      focusBorderColor="purple.800"
                      rounded="md"
                      onClick={(e) => {
                        openLogoUpload()
                      }}
                    />
                  </InputGroup>
                )}
                {logo != '' && (
                  <InputGroup size="sm">
                    <InputLeftElement
                      h="55px"
                      pointerEvents="none"
                      children={
                        <IoCheckbox color="00A3FF" width="30px" height="30px" />
                      }
                    />
                    <Input
                      type="text"
                      h="55px"
                      bg="#FFFFFF"
                      borderColor="#FFFFFF33"
                      placeholder={logo}
                      focusBorderColor="purple.800"
                      rounded="md"
                      onClick={(e) => {
                        openLogoUpload()
                      }}
                    />
                  </InputGroup>
                )}
                <input
                  type="file"
                  id="fileLogoSelector"
                  name="userFile"
                  style={{ display: 'none' }}
                  onChange={(e) => changeLogo(e)}
                />
              </Box>
            </Flex>
            {/* --------------project Team description------- */}
            <Box mt="40px">
              <Flex justify="space-between">
                <Text mb="20px">Project Team Description</Text>
                <Text fontSize="15px" opacity="0.5">
                  {prjTeamdescriptionLen}/5000 words
                </Text>
              </Flex>
              <InputTransition
                unitid="prjTeamdescription"
                selected={prjTeamdescription == '' ? false : true}
                width="100%"
                height="175px"
                rounded="md"
                style={{ background: 'transparent', border: '0' }}
              >
                <Textarea
                  style={{ background: 'transparent', border: '0' }}
                  h="165px"
                  value={prjTeamdescription}
                  onChange={(e) => {
                    onChangePrjTeamDescription(e)
                  }}
                  placeholder="Type here"
                  size="sm"
                  rounded="md"
                />
              </InputTransition>
            </Box>
            {/* ------------------project category---------- */}
            <Flex w="100%" justify="space-between" alignItems="center">
              <Box mt="40px" w="30%">
                <Flex justify="space-between">
                  <Text mb="20px">Project Category</Text>
                </Flex>

                <InputTransition
                  unitid="projectcategory"
                  selected={prjCategory == '' ? false : true}
                  width="100%"
                  height="55px"
                  rounded="md"
                >
                  <Select
                    id="sub_category"
                    style={{ background: 'transparent', border: '0' }}
                    h="55px"
                    name="sub_category"
                    autoComplete="sub_category"
                    focusBorderColor="purple.800"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                    onChange={(e) => {
                      setPrjCategory(e.target.value)
                    }}
                  >
                    <option selected style={{ backgroundColor: '#1B0645' }}>
                      Crypto
                    </option>
                    <option style={{ backgroundColor: '#1B0645' }}>
                      Sport Industry
                    </option>
                    <option style={{ backgroundColor: '#1B0645' }}>
                      Pro Enviroment Projects
                    </option>
                    <option style={{ backgroundColor: '#1B0645' }}>
                      Game Industry
                    </option>
                    <option style={{ backgroundColor: '#1B0645' }}>
                      Charity Projects
                    </option>
                    <option style={{ backgroundColor: '#1B0645' }}>
                      Real Estate Industry
                    </option>
                    <option style={{ backgroundColor: '#1B0645' }}>
                      Creative Industry
                    </option>
                    <option style={{ backgroundColor: '#1B0645' }}>
                      Others
                    </option>
                  </Select>
                </InputTransition>
              </Box>
              {/* -------------------project sub category--------------- */}
              <Box mt="40px" w="30%">
                <Flex justify="space-between">
                  <Text mb="20px">Project Sub Category</Text>
                </Flex>
                <InputTransition
                  unitid="projectsubcategory"
                  selected={prjSubcategory == '' ? false : true}
                  width="100%"
                  height="55px"
                  rounded="md"
                >
                  <Select
                    id="sub_category"
                    style={{ background: 'transparent', border: '0' }}
                    h="55px"
                    name="sub_category"
                    autoComplete="sub_category"
                    focusBorderColor="purple.800"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                    onChange={(e) => {
                      setPrjSubcategory(e.target.value)
                    }}
                  >
                    <option selected style={{ backgroundColor: '#1B0645' }}>
                      Protocol
                    </option>
                    <option style={{ backgroundColor: '#1B0645' }}>Dao</option>
                    <option style={{ backgroundColor: '#1B0645' }}>
                      Community
                    </option>
                    <option style={{ backgroundColor: '#1B0645' }}>
                      Launchped/Incubator
                    </option>
                    <option style={{ backgroundColor: '#1B0645' }}>
                      Finance
                    </option>
                    <option style={{ backgroundColor: '#1B0645' }}>NFT</option>
                    <option style={{ backgroundColor: '#1B0645' }}>
                      Game/Metaverse
                    </option>
                  </Select>
                </InputTransition>
              </Box>

              {/* ------------------------blockchain category----------------- */}
              <Box mt="40px" w="30%">
                <Flex justify="space-between">
                  <Text mb="20px">Blockchain</Text>
                </Flex>
                <InputTransition
                  unitid="projectchain"
                  selected={prjChain == '' ? false : true}
                  width="100%"
                  height="55px"
                  rounded="md"
                  background="rgba(255, 255, 255, 0.05)"
                >
                  <Select
                    id="sub_category"
                    style={{ background: 'parent', border: '0' }}
                    h="55px"
                    name="sub_category"
                    autoComplete="sub_category"
                    focusBorderColor="purple.800"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                    onChange={(e) => {
                      setPrjChain(e.target.value)
                    }}
                  >
                    <option selected style={{ backgroundColor: '#1B0645' }}>
                      Terra
                    </option>
                    <option style={{ backgroundColor: '#1B0645' }}>
                      Solana
                    </option>
                    <option style={{ backgroundColor: '#1B0645' }}>
                      Ethereum
                    </option>
                    <option style={{ backgroundColor: '#1B0645' }}>
                      Polygon
                    </option>
                    <option style={{ backgroundColor: '#1B0645' }}>
                      Avalanche
                    </option>
                    <option style={{ backgroundColor: '#1B0645' }}>
                      Others
                    </option>
                  </Select>
                </InputTransition>
              </Box>
            </Flex>
            {/* -------------------------email------------------------ */}
            <Flex direction="row" mt="40px" justify="space-between">
              <Box w="100%">
                <Flex justify="space-between">
                  <Text mb="20px">Email</Text>
                </Flex>
                <InputTransition
                  unitid="projectemail"
                  selected={prjEmail == '' ? false : true}
                  width="100%"
                  height="55px"
                  rounded="md"
                >
                  <InputGroup
                    size="sm"
                    style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                  >
                    <InputLeftElement
                      style={{ background: 'transparent', border: '0' }}
                      pointerEvents="none"
                      color="gray.300"
                      fontSize="1.2em"
                      children=" "
                    />
                    <Input
                      style={{ background: 'transparent', border: '0' }}
                      type="email"
                      h="55px"
                      placeholder="example@email.com"
                      focusBorderColor="purple.800"
                      rounded="md"
                      value={prjEmail}
                      onChange={(e) => {
                        setPrjEmail(e.target.value)
                      }}
                    />
                  </InputGroup>
                </InputTransition>
              </Box>
              <Box ml="24px" w="100%">
                <Flex justify="space-between">
                  <Text mb="20px">Amount Required</Text>
                </Flex>
                <InputTransition
                  unitid="projectamount"
                  selected={prjEmail == '' ? false : true}
                  width="100%"
                  height="55px"
                  rounded="md"
                >
                  <InputGroup
                    size="sm"
                    style={{ background: 'rgba(255, 255, 255, 0.05' }}
                  >
                    <Input
                      style={{ border: '0', background: 'transparent' }}
                      type="text"
                      h="55px"
                      placeholder="Type here"
                      focusBorderColor="purple.800"
                      rounded="md"
                      value={prjAmount}
                      onChange={(e) => {
                        onChangePrjAmount(e)
                      }}
                    />
                    <InputRightElement
                      style={{ border: '0', background: 'transparent' }}
                      w="125px"
                      h="55px"
                      pointerEvents="none"
                      align="center"
                      color="blue.200"
                    />
                    <Select
                      id="peg"
                      style={{ border: '0', background: 'transparent' }}
                      h="55px"
                      w="140px"
                      name="peg"
                      autoComplete="peg"
                      focusBorderColor="purple.800"
                      shadow="sm"
                      size="sm"
                      rounded="md"
                      fontSize="16px"
                      value=""
                      onChange={(e) => {
                        setPrjChain(e.target.value)
                      }}
                    >
                      <option selected style={{ backgroundColor: '#1B0645' }}>
                        ($)UST
                      </option>
                    </Select>
                  </InputGroup>
                </InputTransition>
              </Box>
            </Flex>

            {/* -----------------Create New Milestone----------------- */}
            <Flex
              mt="100px"
              mb="20px"
              justify="center"
              style={{ fontFamily: 'PilatExtended-Bold' }}
            >
              <Text fontSize={{ base: '25px', md: '25px' }}>Create&nbsp;</Text>
              <Text fontSize={{ base: '25px', md: '25px' }} color="#4790f5">
                Milestones
              </Text>
              <Text fontSize={{ base: '25px', md: '25px' }}>
                &nbsp;for the Project
              </Text>
            </Flex>
            <Box mt="40px">
              <Flex justify="space-between">
                <Text mb="20px">Milestone Title</Text>
                <Text fontSize="15px" opacity="0.5">
                  {prjNameLen}/100 words
                </Text>
              </Flex>
              <InputTransition
                unitid="projectname"
                selected={prjName == '' ? false : true}
                width="100%"
                height="55px"
                rounded="md"
              >
                <InputGroup
                  style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                  size="sm"
                  border="0px"
                >
                  <Input
                    style={{ border: '0', background: 'transparent' }}
                    type="text"
                    h="55px"
                    rounded="md"
                    value={prjName}
                    placeholder="Type here"
                    onChange={(e) => onChangePrjName(e)}
                  />
                </InputGroup>
              </InputTransition>
            </Box>
            <Flex direction="row" mt="40px" justify="space-between">
              <Box w="100%">
                <Flex justify="space-between">
                  <Text mb="20px">Milestone Type</Text>
                </Flex>
                <InputTransition
                  unitid="projectemail"
                  width="100%"
                  height="55px"
                  rounded="md"
                >
                  <InputGroup
                    size="sm"
                    style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                  >
                    <InputLeftElement
                      style={{ background: 'transparent', border: '0' }}
                      pointerEvents="none"
                      color="gray.300"
                      fontSize="1.2em"
                      children=" "
                    />
                    <Input
                      style={{ background: 'transparent', border: '0' }}
                      type="email"
                      h="55px"
                      placeholder="Type here"
                      focusBorderColor="purple.800"
                      rounded="md"
                      value={prjEmail}
                      onChange={(e) => setPrjEmail(e.target.value)}
                    />
                  </InputGroup>
                </InputTransition>
              </Box>
              <Box ml="24px" w="100%">
                <Flex justify="space-between">
                  <Text mb="20px">Amount Required</Text>
                </Flex>
                <InputTransition
                  unitid="projectamount"
                  selected={prjEmail == '' ? false : true}
                  width="100%"
                  height="55px"
                  rounded="md"
                >
                  <InputGroup
                    size="sm"
                    style={{ background: 'rgba(255, 255, 255, 0.05' }}
                  >
                    <Input
                      style={{ border: '0', background: 'transparent' }}
                      type="text"
                      h="55px"
                      placeholder="Type here"
                      focusBorderColor="purple.800"
                      rounded="md"
                      value={prjAmount}
                      onChange={(e) => {
                        onChangePrjAmount(e)
                      }}
                    />
                    <InputRightElement
                      style={{ border: '0', background: 'transparent' }}
                      w="125px"
                      h="55px"
                      pointerEvents="none"
                      align="center"
                      color="blue.200"
                    />
                    <Select
                      id="peg"
                      style={{ border: '0', background: 'transparent' }}
                      h="55px"
                      w="140px"
                      name="peg"
                      autoComplete="peg"
                      focusBorderColor="purple.800"
                      shadow="sm"
                      size="sm"
                      rounded="md"
                      fontSize="16px"
                      value=""
                      onChange={(e) => {
                        setPrjChain(e.target.value)
                      }}
                    >
                      <option selected style={{ backgroundColor: '#1B0645' }}>
                        ($)UST
                      </option>
                    </Select>
                  </InputGroup>
                </InputTransition>
              </Box>
            </Flex>
            <Box mt="40px">
              <Flex justify="space-between">
                <Text mb="20px">Milestone Description</Text>
                <Text fontSize="15px" opacity="0.5">
                  {prjTeamdescriptionLen}/5000 words
                </Text>
              </Flex>
              <InputTransition
                unitid="prjTeamdescription"
                selected={prjTeamdescription == '' ? false : true}
                width="100%"
                height="175px"
                rounded="md"
                style={{ background: 'transparent', border: '0' }}
              >
                <Textarea
                  style={{ background: 'transparent', border: '0' }}
                  h="165px"
                  value={prjTeamdescription}
                  onChange={(e) => onChangePrjTeamDescription(e)}
                  placeholder="Type here"
                  size="sm"
                  rounded="md"
                />
              </InputTransition>
            </Box>
            <Flex direction="row" mt="40px" justify="space-between">
              <Box w="48%">
                <Flex justify="space-between">
                  <Text mb="20px">Milestone Duration</Text>
                </Flex>
                <InputTransition
                  unitid="projectemail"
                  width="100%"
                  height="55px"
                  rounded="md"
                >
                  <InputGroup
                    size="sm"
                    style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                  >
                    <InputLeftElement
                      style={{ background: 'transparent', border: '0' }}
                      pointerEvents="none"
                      color="gray.300"
                      fontSize="1.2em"
                      children=" "
                    />
                    <Input
                      style={{ background: 'transparent', border: '0' }}
                      type="date"
                      h="55px"
                      placeholder="Start Date ( dd - mm - yyyy )"
                      focusBorderColor="purple.800"
                      rounded="md"
                      value={prjEmail}
                      onChange={(e) => setPrjEmail(e.target.value)}
                    />
                  </InputGroup>
                </InputTransition>
              </Box>
              <Box w="48%" pt={'45px'}>
                <InputTransition
                  unitid="projectemail"
                  width="100%"
                  height="55px"
                  rounded="md"
                >
                  <InputGroup
                    size="sm"
                    style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                  >
                    <InputLeftElement
                      style={{ background: 'transparent', border: '0' }}
                      pointerEvents="none"
                      color="gray.300"
                      fontSize="1.2em"
                      children=" "
                    />
                    <Input
                      style={{ background: 'transparent', border: '0' }}
                      type="date"
                      h="55px"
                      placeholder="Start Date ( dd - mm - yyyy )"
                      focusBorderColor="purple.800"
                      rounded="md"
                      value={prjEmail}
                      onChange={(e) => setPrjEmail(e.target.value)}
                    />
                  </InputGroup>
                </InputTransition>
              </Box>
            </Flex>
            <Flex w="310px" mt="50px" justify="space-between" mb="50px">
              <ButtonBackTransition
                unitid="submit"
                selected={false}
                width="150px"
                height="45px"
                rounded="33px"
              >
                <Box
                  variant="solid"
                  color="white"
                  justify="center"
                  align="center"
                >
                  Save
                </Box>
              </ButtonBackTransition>
              <ButtonBackTransition
                unitid="submit"
                selected={false}
                width="150px"
                height="45px"
                rounded="33px"
              >
                <Box
                  variant="solid"
                  color="white"
                  justify="center"
                  align="center"
                >
                  Cancel
                </Box>
              </ButtonBackTransition>
            </Flex>
            {/* -----------------submit----------------- */}
            <Flex w="100%" justify="center">
              <ButtonBackTransition
                unitid="submit"
                selected={false}
                width="250px"
                height="45px"
                rounded="33px"
              >
                <Box
                  variant="solid"
                  color="white"
                  justify="center"
                  align="center"
                  onClick={() => createProject()}
                >
                  Add New Milestone
                </Box>
              </ButtonBackTransition>
            </Flex>
            <Flex w="100%" mt="50px" justify="center" mb="50px">
              <ButtonTransition
                unitid="submit"
                selected={false}
                width="400px"
                height="50px"
                rounded="33px"
              >
                <Box
                  variant="solid"
                  color="white"
                  justify="center"
                  align="center"
                  onClick={() => createProject()}
                >
                  Submit
                </Box>
              </ButtonTransition>
            </Flex>
          </div>
        </Flex>
        <Footer />
        <Notification
          notification={notification}
          close={() => hideNotification()}
        />
      </div>
    </ChakraProvider>
  )
}
