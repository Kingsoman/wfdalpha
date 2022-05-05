import React, { useState, useRef, useEffect } from 'react'
import { MsgExecuteContract, WasmAPI } from '@terra-money/terra.js'
import {
  Box,
  Flex,
  Stack,
  Text
} from '@chakra-ui/react'
import { navigate } from '@reach/router'
import { toast } from 'react-toastify';

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
  getSeconds,
  getMonth,
  errorOption,
  successOption,
  ParseParam,
  GetOneProject,
  getTokenInfo,
} from '../components/Util'

import PageLayout from '../components/PageLayout'

import Payment from '../components/CreateProject/Payment'
import InputAddress from '../components/CreateProject/InputAddress';
import CustomInputReadOnly from '../components/CreateProject/CustomInputReadOnly';
import CustomInput from '../components/CreateProject/CustomInput'
import CustomTextarea from '../components/CreateProject/CustomTextarea'
import CustomPercentInput from '../components/CreateProject/CustomPercentInput'
import CustomCoinInput from '../components/CreateProject/CustomCoinInput'
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

  const [createDate, setCreateDate] = useState('')
  const [company, setCompany] = useState('');
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [ecosystem, setEcosystem] = useState('Terra')
  const [tokenName, setTokenName] = useState('')
  const [tokenAddress, setTokenAddress] = useState('')
  const [tokenBalance, setTokenBalance] = useState('');
  const [communityAlloc, setCommunityAlloc] = useState('');

  const [collectedAmount, setCollectedAmount] = useState('')

  const [teammemberDescription, setTeammemberDescription] = useState([''])
  const [teammemberLinkedin, setTeammemberLinkedin] = useState([''])
  const [teammemberRole, setTeammemberRole] = useState([''])
  const [teammemberName, setTeammemberName] = useState([''])

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
  const [serviceWefund, setServiceWefund] = useState('5')
  const [serviceCharity, setServiceCharity] = useState('0')
  const [website, setWebsite] = useState('')
  const [professionallink, setProfessionalLink] = useState('')

  const [milestoneTitle, setMilestoneTitle] = useState([''])
  const [milestoneAmount, setMilestoneAmount] = useState([''])
  const [milestoneDescription, setMilestoneDescription] = useState([''])
  const [milestoneStartdate, setMilestoneStartdate] = useState([''])
  const [milestoneEnddate, setMilestoneEnddate] = useState([''])

  useEffect(() => {
    setTimeout(CheckNetwork(state.connectedWallet, state), 1000);

    if (project_id > 0)
      fillItems()
  }, [state.connectedWallet])

  //----------init api, lcd-------------------------
  const api = new WasmAPI(state.lcd_client.apiRequester)

  //----------parse Param----------------------
  let project_id = ParseParam();

  async function fillItems() {
    if (project_id == null)
      return;

    let { projectData, communityData, configData } = await FetchData(api, state, dispatch)

    let data = GetOneProject(projectData, project_id);
    setCompany(data.project_company);
    setTitle(data.project_title);
    setDescription(data.project_description);
    setCollectedAmount(data.project_collected);
    setEcosystem(data.project_ecosystem);
    setCreateDate(data.project_createddate);
    setWebsite(data.project_website);
    setEmail(data.project_email);

    setCountry(data.country);
    setCofounderName(data.cofounder_name);
    setServiceWefund(data.service_wefund);
    setServiceCharity(data.service_charity);
    setProfessionalLink(data.professional_link);

    let _milestoneTitle = [], _milestoneAmount = [], _milestoneDescription = [], _milestoneStartdate = [], _milestoneEnddate = [];

    for (let i = 0; i < data.milestone_states.length; i++) {

      _milestoneTitle.push(data.milestone_states[i].milestone_name);
      _milestoneDescription.push(data.milestone_states[i].milestone_description);
      _milestoneStartdate.push(data.milestone_states[i].milestone_startdate);
      _milestoneEnddate.push(data.milestone_states[i].milestone_enddate);
      _milestoneAmount.push(data.milestone_states[i].milestone_amount);
    }
    setMilestoneTitle(_milestoneTitle);
    setMilestoneAmount(_milestoneAmount);
    setMilestoneDescription(_milestoneDescription);
    setMilestoneStartdate(_milestoneStartdate);
    setMilestoneEnddate(_milestoneEnddate);

    let _teamDescription = [], _teamLinkedIn = [], _teamRole = [], _teamName = [];

    for (let i = 0; i < data.teammember_states.length; i++) {
      _teamDescription.push(data.teammember_states[i].teammember_description);
      _teamLinkedIn.push(data.teammember_states[i].teammember_linkedin);
      _teamRole.push(data.teammember_states[i].teammember_role);
      _teamName.push(data.teammember_states[i].teammember_name);
    }

    setTeammemberDescription(_teamDescription);
    setTeammemberLinkedin(_teamLinkedIn);
    setTeammemberRole(_teamRole);
    setTeammemberName(_teamName);

    let _stageTitle = [], _stagePrice = [], _stageAmount = [],
      _stageSoon = [], _stageAfter = [], _stagePeriod = [];

    for (let i = 0; i < data.vesting.length; i++) {
      _stageTitle.push(data.vesting[i].stage_title);
      _stagePrice.push(parseFloat(data.vesting[i].stage_price) / 100);
      _stageAmount.push(data.vesting[i].stage_amount);
      _stageSoon.push(data.vesting[i].stage_soon);
      _stageAfter.push(getMonth(data.vesting[i].stage_after));
      _stagePeriod.push(getMonth(data.vesting[i].stage_period));
    }

    setStageTitle(_stageTitle);
    setStagePrice(_stagePrice);
    setStageAmount(_stageAmount);
    setStageVestingSoon(_stageSoon);
    setStageVestingAfter(_stageAfter);
    setStageVestingPeriod(_stagePeriod);
  }

  //---------------create project---------------------------------
  const checkInvalidation = async () => {
    if (CheckNetwork(state.connectedWallet, state) == false)
      return false;

    let { projectData, communityData, configData } = await FetchData(
      api,
      state,
      dispatch,
    )

    if (communityData == '') {
      toast('There are no community members!', errorOption);
      return false;
    }

    if (title.length == 0) {
      toast('Please fill in project name!', errorOption);
      return false;
    }

    if (parseInt(collectedAmount) < 6) {
      toast('Collected money must be at least 6 UST', errorOption);
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
        toast(data.data + 'SAFT Success', successOption);
      })
      .catch((e) => {
        console.log('Error:' + e)
        toast('SAFT failed', errorOption);
        err = true;
      })

    if (err) return '';
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
          toast('Whitepaper upload success', successOption);
        })
        .catch((e) => {
          console.log('Error:' + e)
          toast('Whitepaper upload failed', errorOption);
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
          toast(data.data + 'Logo upload success', successOption);
        })
        .catch((e) => {
          console.log('Error:' + e)
          toast('Logo upload failed', errorOption);
        })
    }
    return realLogo;
  }

  async function createProject() {
    if (CheckNetwork(state.connectedWallet, state) == false)
      return false;

    if (await checkInvalidation() == false)
      return false;

    toast('Please wait', successOption);

    let realSAFT = await createDocxTemplate();
    if (realSAFT == '')
      return false;

    let realWhitepaer = await uploadWhitepaper();
    let realLogo = await uploadLogo();
    //---------------execute contract----------------------------------
    let project_teammembers = []
    for (let i = 0; i < teammemberDescription.length; i++) {
      let teammember = {
        teammember_description: '',
        teammember_linkedin: '',
        teammember_role: '',
        teammember_name: ''
      }
      project_teammembers.push(teammember);
    }

    let vesting = []
    let stage = {
      stage_title: stageTitle[0],
      stage_price: '6',
      stage_amount: '10000',
      stage_soon: '20',
      stage_after: '5',
      stage_period: '6',
    }
    vesting.push(stage);

    let project_milestones = []
    let milestone = {
      milestone_step: '0',
      milestone_name: '',
      milestone_description: '',
      milestone_startdate: '',
      milestone_enddate: '',
      milestone_amount: collectedAmount.toString(),
      milestone_type: '',
      milestone_status: '0',
      milestone_votes: [],
    }
    project_milestones.push(milestone)

    let _createDate = createDate;

    if (_createDate == '') {
      const dt = new Date()
      const [month, day, year] = [dt.getMonth(), dt.getDate(), dt.getFullYear()]
      _createDate = day + '/' + ((month + 1) % 12) + '/' + year
    }

    let _projectID = project_id == null ? "0" : project_id.toString();

    let AddProjectMsg = {
      add_project: {
        creator_wallet: state.connectedWallet.walletAddress,
        project_id: _projectID,
        project_company: company,
        project_title: title,
        project_description: description,
        project_collected: collectedAmount.toString(),
        project_ecosystem: ecosystem,
        project_createddate: _createDate,
        project_saft: realSAFT,
        project_logo: realLogo,
        project_whitepaper: realWhitepaer,
        project_website: website,
        project_email: email,
        project_milestones: project_milestones,
        project_teammembers: project_teammembers,
        vesting: vesting,
        token_addr: tokenAddress,

        country: country,
        cofounder_name: cofounderName,
        service_wefund: serviceWefund,
        service_charity: serviceCharity,
        professional_link: professionallink
      },
    }

    let wefundContractAddress = state.WEFundContractAddress

    let add_msg = new MsgExecuteContract(
      state.connectedWallet.walletAddress,
      wefundContractAddress,
      AddProjectMsg,
    )

    let res = await EstimateSend(
      state.connectedWallet,
      state.lcd_client,
      [add_msg],
      project_id == null ? 'Create Project success' : "Modify Project success",
    )
    if (res == true) {
      await FetchData(api, state, dispatch, true)
      navigate('/explorer');
    }
  }

  return (
    <PageLayout title="Create Your Project" subTitle1="Create a" subTitle2="New Project">
      <Flex width="100%" justify="center" mb={'150px'} zIndex={'1'} mt='-30px'>
        <Box
          w={{ base: 'sm', sm: 'md', md: '2xl', lg: '2xl', xl: '3xl' }}
          background='rgba(255, 255, 255, 0.05)'
          border='1.5px solid rgba(255, 255, 255, 0.15)'
          borderTopColor='transparent'
          fontFamily='Sk-Modernist-Regular'
          paddingLeft='50px'
          paddingRight='50px'
          zIndex='1'
        >
          <Payment isUST={isUST} setIsUST={setIsUST} />
          <CustomInput
            typeText="Project Title"
            type={title}
            setType={setTitle}
            mt='30px'
          />
          <CustomTextarea
            typeText="Project Description"
            type={description}
            setType={setDescription}
            mt='30px'
          />
          <TeamMembers
            description={teammemberDescription}
            setDescription={setTeammemberDescription}
            name={teammemberName}
            setName={setTeammemberName}
            role={teammemberRole}
            setRole={setTeammemberRole}
            linkedin={teammemberLinkedin}
            setLinedin={setTeammemberLinkedin}
          />
          <Stack
            mt='30px'
            direction={{ base: 'column', md: 'column', lg: 'row' }}
            spacing='30px'
          >
            <CustomCoinInput
              typeText="Amount Required"
              type={collectedAmount}
              setType={setCollectedAmount}
              w={{ base: '100%', md: '50%', lg: '50%' }}
            />
            <CustomSelect
              typeText="Blockchain"
              type={ecosystem}
              setType={setEcosystem}
              options={['Terra', 'Ethereum', 'BSC', 'Harmony', 'Algorand', 'Solana', 'Avalanche']}
              w={{ base: '100%', md: '50%', lg: '50%' }}
            />
          </Stack>
          <CustomEmailInput
            typeText="Email"
            type={email}
            setType={setEmail}
          />
          <Stack
            mt='30px'
            direction={{ base: 'column', md: 'row', lg: 'row' }}
            spacing='30px'
          >
            <CustomSimpleNumberInput
              typeText="% for WeFund Service"
              type={serviceWefund}
              setType={setServiceWefund}
              w={{ base: '100%', md: '50%', lg: '50%' }}
            />
            <CustomSimpleNumberInput
              typeText='% for Charity'
              type={serviceCharity}
              setType={setServiceCharity}
              w={{ base: '100%', md: '50%', lg: '50%' }}
            />
          </Stack>
          <CustomUpload
            typeText='Whitepaper'
            type={whitepaper}
            setType={setWhitepaper}
          />
          <Flex w="100%" mt="30px" justify="center" mb="30px">
            <ButtonTransition
              unitid="submit"
              selected={false}
              width="400px"
              height="50px"
              rounded="33px"
              onClick={() => createProject()}
            >
              <Box
                variant="solid"
                color="white"
                justify="center"
                align="center"
              >
                Submit
              </Box>
            </ButtonTransition>
          </Flex>
        </Box>
      </Flex>
      <Footer />
    </PageLayout>
  )
}
