import { Fee, MsgExecuteContract, WasmAPI, LCDClient} from '@terra-money/terra.js'

export async function EstimateSend(connectedWallet, lcd, msg, message, notificationRef, memo='')
{
console.log(msg);
  const obj = new Fee(10_000, { uusd: 4500})
  let accountInfo;
  let abort = false;
  await lcd.auth.accountInfo(
    connectedWallet.walletAddress
  )
  .then((e) => {
    accountInfo = e;
  })
  .catch((e) => {
    notificationRef.current.showNotification(e.message, 'error', 4000)
    console.log(e.message);
    abort = true;
  })
  if(abort == true) 
    return false;

  let txOptions = 
  {
    msgs: [msg],
    memo: memo,
    gasPrices: obj.gasPrices(),
    gasAdjustment: 1.7,
  };

  let rawFee; 
  await lcd.tx.estimateFee(
    [
      {
        sequenceNumber: accountInfo.getSequenceNumber(),
        publicKey: accountInfo.getPublicKey(),
      },
    ],
    txOptions
  )
  .then((e) => {
    rawFee = e;
    notificationRef.current.showNotification("Estimate success", 'success', 4000)
  })
  .catch((e) => {
    notificationRef.current.showNotification(e.message, 'error', 4000)
    console.log(e.message);
    abort = true;
  })
  if(abort == true)
    return false;

  await connectedWallet
  .post({
    msgs: [msg],
    fee: rawFee,
    gasPrices: obj.gasPrices(),
    gasAdjustment: 1.7,
    memo: memo,
  })
  .then((e) => {
    if (e.success) {
      notificationRef.current.showNotification(message, 'success', 4000)
    } else {
      notificationRef.current.showNotification(e.message, 'error', 4000)
      console.log(e.message);
    }
  })
  .catch((e) => {
    notificationRef.current.showNotification(e.message, 'error', 4000)
    console.log(e.message);
    abort = true;
  })
  if(abort == true)
    return false;
  return true;
}
export function GetProjectStatusString(mode){
  let projectstatus = 0;
  switch(mode){
    case '0':
      projectstatus = 'WeFundApproval';
      break;
    case '1':
      projectstatus = 'CommuntyApproval';
      break;
    case '2':
      projectstatus = 'MileStoneFundraising';
      break;
    case '3':
      projectstatus = 'MileStoneDelivery';
      break;
    case '4':
      projectstatus = 'ProjectComplete';
      break;
  }
  return projectstatus;
}
export function GetProjectStatus(mode){
  let projectstatus = 0;
  switch(mode){
    case 'WeFundApproval':
      projectstatus =0;
      break;
    case 'CommuntyApproval':
      projectstatus = 1;
      break;
    case 'MileStoneFundraising':
      projectstatus = 2;
      break;
    case 'MileStoneDelivery':
      projectstatus = 3;
      break;
    case 'ProjectComplete':
      projectstatus = 4;
      break;
  }
  return projectstatus;
}
export function AddExtraInfo(state, projectData, communityData){
  if(typeof projectData === 'undefined' || projectData == '')
    return '';

  for (let i = 0; i < projectData.length; i++) {
    let backer_backedAmount = parseInt(projectData[i].backerbacked_amount);
    projectData[i].backer_backedPercent = parseInt(
      (backer_backedAmount / 10 ** 6 / parseInt(projectData[i].project_collected)) *
        100,
    );
    
    let community_backedAmount = parseInt(projectData[i].communitybacked_amount);

    projectData[i].community_backedPercent = parseInt(
      (community_backedAmount / 10 ** 6 / parseInt(projectData[i].project_collected)) *
        100,
    );

    let communityVoted = 0;
    for(let j=0; j < projectData[i].community_votes.length; j++){
      if(projectData[i].community_votes[j].voted){
          communityVoted++;
      }
    }
    projectData[i].communityVotedPercent = parseInt(communityVoted / communityData.length * 100);

    let released = 0;
    for(let j=0; j < projectData[i].milestone_states.length; j++){
      if(projectData[i].milestone_states[j].milestone_status == 2){
        released++;
      }
    }
    projectData[i].releasedPercent = parseInt(released / projectData[i].milestone_states.length * 100);
  }

  return projectData;
}
export function CheckNetwork(connectedWallet, notificationRef, state)
{
  //----------verify connection--------------------------------
  if (connectedWallet == '' || typeof connectedWallet == 'undefined') {
    notificationRef.current.showNotification('Please connect wallet first!', 'error', 6000)
    console.log("Please connect wallet first!");
    return false;
  }

  if (state.net == 'mainnet' && connectedWallet.network.name == 'testnet') {
    notificationRef.current.showNotification('Please switch to mainnet!', 'error', 4000);
    console.log("Please switch to mainnet!");
    return false;
  }
  if (state.net == 'testnet' && connectedWallet.network.name == 'mainnet') {
    notificationRef.current.showNotification('Please switch to testnet!', 'error', 4000);
    console.log("Please switch to testnet!");
    return false;
  }
  return true;
}

export function GetProjectIndex(projectData, project_id){
  const isProject = (element) => element.project_id == project_id;
  const index = projectData.findIndex(isProject);
  return index;
}

export async function FetchData(api, notificationRef, state, dispatch, force = false)
{
  let projectData, communityData, configData;
  //-----------------fetch community members-----------------
  communityData = state.communityData;
  if(state.communityData == '' || force == true){
    communityData = await api.contractQuery(
      state.WEFundContractAddress,
      {
        get_communitymembers: {},
      }
    )

    if(communityData == ''){
      if(notificationRef)
      notificationRef.current.showNotification("Can't fetch Community Data", 'error', 6000);
    }else{
      dispatch({
        type: 'setCommunityData',
        message: communityData,
      })

    }
  }
  //-----------------fetch config-----------------------
  configData = state.configData;
  if(state.configData == '' || force == true){
    configData = await api.contractQuery(
      state.WEFundContractAddress,
      {
        get_config: {},
      }
    )

    if(configData == ''){
      if(notificationRef)
      notificationRef.current.showNotification("Can't fetch Config Data", 'error', 6000);
    }else{
      dispatch({
        type: 'setConfigData',
        message: configData,
      })
    }
  }

  //---------------fetch project Data---------------------
  projectData = state.projectData;
  if(state.projectData == '' || force == true){
    projectData = await api.contractQuery(
      state.WEFundContractAddress,
      {
          get_all_project: {
          },
      }
    )
    
    if(projectData == ''){
      if(notificationRef)
      notificationRef.current.showNotification("Can't fetch Project Data", 'error', 6000);
    }else{
      //----------fake--------------------------
      let fakeone = GetOneProject(projectData, state.wefundID);
      fakeone.project_collected = 60000;
      fakeone.communitybacked_amount = 19200*10**6;
      projectData[GetProjectIndex(projectData, state.wefundID)] = fakeone;
      //------------------------------------

      projectData = AddExtraInfo(state, projectData, communityData);
      dispatch({
        type: 'setProjectdata',
        message: projectData,
      })  
    }
  }
console.log(projectData);
  return {projectData, communityData, configData};
}
export function GetOneProject(projectData, project_id){
  const isProject = (element) => element.project_id == project_id;
  const index = projectData.findIndex(isProject);
  if(index == -1)
    return '';
  return projectData[index];
}
export function isWefundWallet(state){
  if(state.connectedWallet.walletAddress == state.configData.wefund)
    return true;
  return false;
}
export function isCommunityWallet(state, project_id){
  let one = GetOneProject(state.projectData, project_id)
  if(one == '')
    return false;

  for(let j=0; j<one.community_votes.length; j++){
    if(state.connectedWallet.walletAddress == one.community_votes[j].wallet){
      return true;
    }
  }

  return false;
}
export function isBackerWallet(state, project_id){
  let one = GetOneProject(state.projectData, project_id)
  if(one == '')
    return false;

  for(let j=0; j<one.backer_states.length; j++){
    if(state.connectedWallet.walletAddress == one.backer_states[j].backer_wallet){
      return true;
    }
  }

  return false;
}

export function Sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function ToText(node) {
  let tag = document.createElement("div");
  tag.innerHTML = node;
  node = tag.innerText;
  return node;
}

export function ShortenText(text, startingPoint, maxLength) {
  return text.length > maxLength
    ? text.slice(startingPoint, maxLength)
    : text;
}

export function ParseParam(){
  let queryString, urlParams, project_id = 1;
  if (typeof window != 'undefined') {
    queryString = window.location.search
    urlParams = new URLSearchParams(queryString)
    project_id = urlParams.get('project_id')
  }

  return project_id;
}
export function isNull(val){
  if(typeof val == 'undefined' || val == '')
    return true;
  return false;
}
export function getVal(val){
  return isNull(val)? '' : val;
}