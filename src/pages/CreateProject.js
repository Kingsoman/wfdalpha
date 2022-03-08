import React, { useState, useRef, useEffect } from 'react'
import { MsgExecuteContract, WasmAPI } from '@terra-money/terra.js'
import {
  Box,
  Flex,
  Stack
} from '@chakra-ui/react'
import { navigate } from '@reach/router'
import {
  ButtonBackTransition,
  ButtonTransition,
} from '../components/ImageTransition'
import { useStore } from '../store'
import Footer from '../components/Footer'
import { 
  EstimateSend, 
  CheckNetwork, 
  FetchData, 
  Sleep,
  isNull,
  getVal,
  getMultiplyInteger,
  getInteger,
  getSeconds
} from '../components/Util'
import Notification from '../components/Notification'
import PageLayout from '../components/PageLayout'

import Payment from '../components/CreateProject/Payment'
import CustomInput from '../components/CreateProject/CustomInput'
import CustomTextarea from '../components/CreateProject/CustomTextarea'
import CustomNumberInput from '../components/CreateProject/CustomNumberInput'
import CustomSimpleNumberInput from '../components/CreateProject/CustomSimpleNumberInput'
import CustomSelect from '../components/CreateProject/CustomSelect'
import CustomEmailInput from '../components/CreateProject/CustomEmailInput'
import CustomUpload from '../components/CreateProject/CustomUpload'
import Website from '../components/CreateProject/Website'

import Milestones from '../components/CreateProject/Milestone/Milestones'
import TeamMembers from '../components/CreateProject/TeamMember/TeamMembers'
import Stages from '../components/CreateProject/Stage/Stages'

export default function CreateProject() {
  const { state, dispatch } = useStore()
  const [isUST, setIsUST] = useState(true)

  const [logo, setLogo] = useState('')
  const [whitepaper, setWhitepaper] = useState('')

  const [company, setCompany] = useState('');
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [ecosystem, setEcosystem] = useState('Terra')
  const [tokenName, setTokenName] = useState('')
  const [tokenAddress, setTokenAddress] = useState('')

  const [collectedAmount, setCollectedAmount] = useState('')

  const [teammemberDescription, setTeammemberDescription] = useState([''])
  const [teammemberLinkedin, setTeammemberLinkedin] = useState([''])
  const [teammemberRole, setTeammemberRole] = useState([''])

  const [stageTitle, setStageTitle] = useState(['Seed'])
  const [stagePrice, setStagePrice] = useState([''])
  const [stageAmount, setStageAmount] = useState([''])
  const [stageVestingSoon, setStageVestingSoon] = useState([''])
  const [stageVestingAfter, setStageVestingAfter] = useState([''])
  const [stageVestingPeriod, setStageVestingPeriod] = useState([''])

  const [country, setCountry] = useState('')
  const [cofounderName, setCofounderName] = useState('')
  const [signature, setSignature] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [serviceWefund, setServiceWefund] = useState(5)
  const [serviceCharity, setServiceCharity] = useState(0)
  const [website, setWebsite] = useState('')
  const [proffesionallink, setProfesisonalLink] = useState('')

  const [milestoneTitle, setMilestoneTitle] = useState([''])
  const [milestoneType, setMilestoneType] = useState([''])
  const [milestoneAmount, setMilestoneAmount] = useState([''])
  const [milestoneDescription, setMilestoneDescription] = useState([''])
  const [milestoneStartdate, setMilestoneStartdate] = useState([''])
  const [milestoneEnddate, setMilestoneEnddate] = useState([''])

  useEffect(() => {
    CheckNetwork(state.connectedWallet, notificationRef, state);
  }, [state.connectedWallet])
  
  //----------init api, lcd-------------------------
  const api = new WasmAPI(state.lcd_client.apiRequester)

  //------------notification setting---------------------------------
  const notificationRef = useRef()

  //---------------create project---------------------------------
  const checkInvalidation = async () => {
    if(CheckNetwork(state.connectedWallet, notificationRef, state) == false)
      return false;
  
    let { projectData, communityData, configData } = await FetchData(
      api,
      notificationRef,
      state,
      dispatch,
    )

    if (communityData == '') {
      notificationRef.current.showNotification(
        'There are no community members!',
        'error',
        4000,
      )
      return false;
    }

    if (title.length == 0) {
      notificationRef.current.showNotification(
        'Please fill in project name!',
        'error',
        4000,
      )
      return false;
    }

    if (parseInt(collectedAmount) < 6) {
      notificationRef.current.showNotification(
        'Collected money must be at least 6 UST',
        'error',
        4000,
      )
      return false;
    }

    let total_release = 0
    for (let i = 0; i < milestoneTitle.length; i++) {
      if (milestoneTitle[i] == '') {
        notificationRef.current.showNotification(
          'Please fill in milestone title!',
          'error',
          4000,
        )
        return false;
      }
      if (milestoneStartdate[i] == '') {
        notificationRef.current.showNotification(
          'Please fill in milestone Start Date!',
          'error',
          4000,
        )
        return false;
      }
      if (milestoneEnddate[i] == '') {
        notificationRef.current.showNotification(
          'Please fill in milestone End Date!',
          'error',
          4000,
        )
        return false;
      }
      if (parseInt(milestoneAmount[i]) < 6) {
        notificationRef.current.showNotification(
          'Collected money must be at least 6 UST',
          'error',
          4000,
        )
        return false;
      }
      total_release += parseInt(milestoneAmount[i])
    }
    if (total_release != parseInt(collectedAmount)) {
      notificationRef.current.showNotification(
        'Milestone total amount must equal collected amount',
        'error',
        4000,
      )
      return false;
    }
    return true;
  }

  const createDocxTemplate = async () => {
    var formData = new FormData()
    formData.append('tokenName', tokenName);
    formData.append('company', company);
    formData.append('title', title);
    formData.append('address', address);
    formData.append('description', description);
    formData.append('ecosystem', ecosystem);
    formData.append('priceSeed', stagePrice[0]);
    formData.append('pricePresale', stagePrice[1]);
    formData.append('priceIDO', stagePrice[2]);
    formData.append('cofounderName', cofounderName);
    formData.append('country', country);
    formData.append('email', email);
    formData.append('file', signature);

    const requestOptions = {
      method: 'POST',
      body: formData,
    }

    let realSAFT = '', err = false;
    await fetch(state.request + '/docxtemplatemake', requestOptions)
      .then((res) => res.json())
      .then((data) => {
        realSAFT = data.data
        notificationRef.current.showNotification(data.data + 'SAFT Success', 'success', 1000)
      })
      .catch((e) => {
        console.log('Error:' + e)
        notificationRef.current.showNotification('SAFT failed', 'error', 1000)
        err = true;
      })

    if(err) return '';
    return realSAFT;
  }

  const uploadWhitepaper = async () => {
    let realWhitepaper = ''
    if (!isNull(whitepaper) != '') {
      var formData = new FormData()
      formData.append('title', title)
      formData.append('file', whitepaper)

      const requestOptions = {
        method: 'POST',
        body: formData,
      }

      await fetch(state.request + '/uploadWhitepaper', requestOptions)
        .then((res) => res.json())
        .then((data) => {
          realWhitepaper = data.data;
          notificationRef.current.showNotification(
            'Whitepaper upload success',
            'success',
            1000,
          )
        })
        .catch((e) => {
          console.log('Error:' + e)
          notificationRef.current.showNotification(
            'Whitepaper upload failed',
            'error',
            1000,
          )
        })
    }
    return realWhitepaper;
  }

  const uploadLogo = async () => {
    //---------upload logo-------------------------------------------------
    let realLogo = ''
    if (logo != '') {
      var formData = new FormData()
      formData.append('title', title)
      formData.append('file', logo)

      const requestOptions = {
        method: 'POST',
        body: formData,
      }

      await fetch(state.request + '/uploadLogo', requestOptions)
        .then((res) => res.json())
        .then((data) => {
          realLogo = data.data
          notificationRef.current.showNotification(
            data.data + 'Logo upload success',
            'success',
            1000,
          )
        })
        .catch((e) => {
          console.log('Error:' + e)
          notificationRef.current.showNotification(
            'Logo upload failed',
            'error',
            1000,
          )
        })
    }
    return realLogo;
  }

  async function createProject() {
    if(CheckNetwork(state.connectedWallet, notificationRef, state) == false)
      return false;

    if(await checkInvalidation() == false)
      return false;

    notificationRef.current.showNotification('Please wait', 'success', 10000)

    let realSAFT = await createDocxTemplate();
    if(realSAFT == '') 
      return false;

    let realWhitepaer = await uploadWhitepaper();
    let realLogo = await uploadLogo();
    //---------------execute contract----------------------------------
    let project_teammembers = []
    for (let i = 0; i < teammemberDescription.length; i++) {
      let teammember = {
        teammember_description: getVal(teammemberDescription[i]),
        teammember_linkedin: getVal(teammemberLinkedin[i]),
        teammember_role: getVal(teammemberRole[i]),
      }
      project_teammembers.push(teammember);
    }

    let vesting = []
    let distribution_token_amount = 0;
    for (let i = 0; i < stageTitle.length; i++){
      let stage = {
        stage_title: stageTitle[i],
        stage_price: getMultiplyInteger(stagePrice[i]),
        stage_amount: getInteger(stageAmount[i]),
        stage_soon: "20",//getInteger(stageVestingSoon[i]),
        stage_after: "60",//getSeconds(stageVestingAfter[i]),
        stage_period: "1800"//getSeconds(stageVestingPeriod[i]),
      }
      vesting.push(stage);
      distribution_token_amount += parseInt(getInteger(stageAmount[i]));
    }

    let project_milestones = []
    for (let i = 0; i < milestoneTitle.length; i++) {
      let milestone = {
        milestone_step: `${i}`,
        milestone_name: milestoneTitle[i],
        milestone_description: getVal(milestoneDescription[i]),
        milestone_startdate: getVal(milestoneStartdate[i]),
        milestone_enddate: getVal(milestoneEnddate[i]),
        milestone_amount: getVal(milestoneAmount[i]),
        milestone_status: '0',
        milestone_votes: [],
      }
      project_milestones.push(milestone)
    }

    const dt = new Date()
    const [month, day, year] = [dt.getMonth(), dt.getDate(), dt.getFullYear()]
    const createdate = day + '/' + ((month + 1) % 12) + '/' + year

    let AddProjectMsg = {
      add_project: {
        creator_wallet: state.connectedWallet.walletAddress,
        project_company: company,
        project_title: title,
        project_description: description,
        project_collected: collectedAmount,
        project_ecosystem: ecosystem,
        project_createddate: createdate,
        project_saft: realSAFT,
        project_logo: realLogo,
        project_whitepaper: realWhitepaer,
        project_website: website,
        project_email: email,
        project_milestones: project_milestones,
        project_teammembers: project_teammembers,
        vesting: vesting,
        token_addr: tokenAddress
      },
    }

    let wefundContractAddress = state.WEFundContractAddress

    let add_msg = new MsgExecuteContract(
      state.connectedWallet.walletAddress,
      wefundContractAddress,
      AddProjectMsg,
    )
    let msgs = [add_msg];

    if(tokenAddress != ""){
      let token_info = await api.contractQuery(
        tokenAddress,
        {
          token_info: {},
        }
      )
      distribution_token_amount = distribution_token_amount * (10**token_info.decimals);
      let ApproveMsg = {
        increase_allowance: {
          spender: wefundContractAddress,
          amount: distribution_token_amount.toString()
        }
      }

      let approve_msg = new MsgExecuteContract(
        state.connectedWallet.walletAddress,
        tokenAddress,
        ApproveMsg,
      )
      msgs.push(approve_msg);
    }

    let res = await EstimateSend(
      state.connectedWallet,
      state.lcd_client,
      msgs,
      'Create Project success',
      notificationRef,
    )
console.log(res);
    if(res == true){
      await Sleep(2000)
      await FetchData(api, notificationRef, state, dispatch, true)

      navigate('/explorer');
    }
  }

  return (
    <PageLayout title="Create Your Project" subTitle1="Create a" subTitle2="New Project">
      <Flex width="100%" justify="center" mb={'150px'} zIndex={'1'} mt = '-30px'>
        <Box
          w = {{base:'sm',sm:'md',md:'2xl',lg:'2xl',xl:'3xl'}}
          background = 'rgba(255, 255, 255, 0.05)'
          border = '1.5px solid rgba(255, 255, 255, 0.15)'
          borderTopColor =  'transparent'
          fontFamily = 'Sk-Modernist-Regular'
          paddingLeft = '50px'
          paddingRight = '50px'
          zIndex = '1'
        >
          <Payment isUST={isUST} setIsUST={setIsUST}/>
          <CustomInput
            typeText = "Company Name"
            type={company} 
            setType={setCompany}
            mt='30px'
          />
          <CustomInput
            typeText = "Project Title"
            type={title} 
            setType={setTitle}
            mt='30px'
          />
          <CustomTextarea
            typeText = "Project Description"
            type={description} 
            setType={setDescription}
            mt='30px'
          />
          <TeamMembers
            description = {teammemberDescription}
            setDescription = {setTeammemberDescription}
            role = {teammemberRole}
            setRole = {setTeammemberRole}
            linkedin = {teammemberLinkedin}
            setLinedin = {setTeammemberLinkedin}
          />
          <Stack 
            mt = '30px'
            direction={{base:'column', md:'column', lg:'row'}}
            spacing='30px'
          >
            <CustomNumberInput
              typeText = "Amount Required"
              type = {collectedAmount}
              setType = {setCollectedAmount}
              notificationRef={notificationRef}
              w = {{base:'100%', md:'50%', lg:'50%'}}
            />
            <CustomSelect
              typeText = "Blockchain"
              type = {ecosystem}
              setType = {setEcosystem}
              options = {['Terra', 'Ethereum', 'BSC', 'Harmony', 'Solana']}
              w = {{base:'100%', md:'50%', lg:'50%'}}
            />
          </Stack>
          <Stack 
            mt = '30px'
            direction={{base:'column', md:'column', lg:'row'}}
            spacing='30px'
          >
            <CustomInput
              typeText = "Token Name"
              type={tokenName} 
              setType={setTokenName}
              w = {{base:'100%', md:'50%', lg:'50%'}}
            />
            <CustomInput
              typeText = "Token Address"
              type={tokenAddress} 
              setType={setTokenAddress}
              w = {{base:'100%', md:'50%', lg:'50%'}}
            />
          </Stack>
          <Stages
            stageTitle = {stageTitle}
            setStageTitle = {setStageTitle}
            stagePrice = {stagePrice}
            setStagePrice = {setStagePrice}
            stageAmount = {stageAmount}
            setStageAmount = {setStageAmount} 
            stageVestingSoon = {stageVestingSoon}
            setStageVestingSoon = {setStageVestingSoon}
            stageVestingAfter = {stageVestingAfter}
            setStageVestingAfter = {setStageVestingAfter}
            stageVestingPeriod = {stageVestingPeriod}
            setStageVestingPeriod = {setStageVestingPeriod}
          />
          <Stack
            mt = '30px'
            direction={{base:'column', md:'row', lg:'row'}}
            spacing='30px'
          >
            <CustomInput
              typeText = "Country"
              type={country} 
              setType={setCountry}
              w = {{base:'100%', md:'50%', lg:'50%'}}
            />
            <CustomInput
              typeText = "Founder Name"
              type={cofounderName} 
              setType={setCofounderName}
              w = {{base:'100%', md:'50%', lg:'50%'}}
            />
          </Stack>
          <Stack
            mt = '30px' 
            direction={{base:'column', md:'row', lg:'row'}} 
            spacing='30px'
          >
            <CustomInput
              typeText = "Address"
              type={address} 
              setType={setAddress}
              w = {{base:'100%', md:'50%', lg:'50%'}}
            />
            <CustomEmailInput
              typeText = "Email"
              type = {email}
              setType = {setEmail}
              w = {{base:'100%', md:'50%', lg:'50%'}}
            />
          </Stack>
          <Stack 
            mt = '30px' 
            direction={{base:'column', md:'row', lg:'row'}} 
            spacing='30px'
          >
            <CustomSimpleNumberInput
              typeText = "% for WeFund Service"
              type = {serviceWefund}
              setType = {setServiceWefund}
              w = {{base:'100%', md:'50%', lg:'50%'}}
            />
            <CustomSimpleNumberInput
              typeText = '% for Charity'
              type = {serviceCharity}
              setType= {setServiceCharity}
              w = {{base:'100%', md:'50%', lg:'50%'}}
            />
          </Stack>
          <Stack 
            mt = '30px' 
            direction={{base:'column', md:'row', lg:'row'}} 
            spacing='30px'
          >
            <CustomUpload
              typeText = 'Signature'
              type = {signature}
              setType = {setSignature}
              w = {{base:'100%', md:'50%', lg:'50%'}}
            />
            <CustomUpload
              typeText = 'Whitepaper'
              type = {whitepaper}
              setType = {setWhitepaper}
              w = {{base:'100%', md:'50%', lg:'50%'}}
            />
          </Stack>
          <Website
            typeText = "Project website"
            type = {website}
            setType = {setWebsite}
          />
          <Website
            typeText = "LinkedIn or similar"
            type = {proffesionallink}
            setType = {setProfesisonalLink}
          />
          <Milestones
            milestoneTitle = {milestoneTitle}
            setMilestoneTitle = {setMilestoneTitle}
            milestoneType = {milestoneType}
            setMilestoneType = {setMilestoneType}
            milestoneAmount = {milestoneAmount}
            setMilestoneAmount = {setMilestoneAmount}
            milestoneDescription = {milestoneDescription}
            setMilestoneDescription = {setMilestoneDescription}
            milestoneStartdate = {milestoneStartdate}
            setMilestoneStartdate = {setMilestoneStartdate}
            milestoneEnddate = {milestoneEnddate}
            setMilestoneEnddate = {setMilestoneEnddate}
            notificationRef={notificationRef}
          />
          <Flex w="100%" mt="30px" justify="center" mb="30px">
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
        </Box>
      </Flex>
      <Footer />
      <Notification ref={notificationRef}/>
    </PageLayout>
  )
}
