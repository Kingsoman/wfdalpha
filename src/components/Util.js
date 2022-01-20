import { Fee, MsgExecuteContract, WasmAPI, LCDClient} from '@terra-money/terra.js'

export async function EstimateSend(connectedWallet, lcd, msg, message, notificationRef)
{
  const obj = new Fee(10_000, { uusd: 4500})
  const accountInfo = await lcd.auth.accountInfo(
    connectedWallet.walletAddress
  );

  let txOptions = 
  {
    msgs: [msg],
    memo: '',
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
    return;
  })

  await connectedWallet
  .post({
    msgs: [msg],
    fee: rawFee,
    gasPrices: obj.gasPrices(),
    gasAdjustment: 1.7,
  })
  .then((e) => {
    if (e.success) {
      notificationRef.current.showNotification(message, 'success', 4000)
      return true;
    } else {
      notificationRef.current.showNotification(e.message, 'error', 4000)
      console.log(e.message);
    }
  })
  .catch((e) => {
    notificationRef.current.showNotification(e.message, 'error', 4000)
    console.log(e.message);
  })
  return false;
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
    return
  }

  if (state.net == 'mainnet' && connectedWallet.network.name == 'testnet') {
    notificationRef.current.showNotification('Please switch to mainnet!', 'error', 4000)
    return
  }
  if (state.net == 'testnet' && connectedWallet.network.name == 'mainnet') {
    notificationRef.current.showNotification('Please switch to testnet!', 'error', 4000)
    return
  }
}

export function GetProjectIndex(projectData, project_id){
  const isProject = (element) => element.project_id == project_id;
  const index = projectData.findIndex(isProject);
  return index;
}

export async function FetchData(api, notificationRef, state, dispatch)
{
  let projectData, communityData, configData;
  //-----------------fetch community members-----------------
  communityData = state.communityData;
  if(state.communityData == ''){
    communityData = await api.contractQuery(
      state.WEFundContractAddress,
      {
        get_communitymembers: {},
      }
    )

    if(communityData == ''){
      notificationRef.current.showNotification("Can't fetch Community Data", 'error', 6000);
      return;
    }
    dispatch({
      type: 'setCommunityData',
      message: communityData,
    })
  }
  //-----------------fetch config-----------------------
  configData = state.configData;
  if(state.configData == ''){
    configData = await api.contractQuery(
      state.WEFundContractAddress,
      {
        get_config: {},
      }
    )

    if(configData == ''){
      notificationRef.current.showNotification("Can't fetch Config Data", 'error', 6000);
      return;
    }
    dispatch({
      type: 'setConfigData',
      message: configData,
    })
  }
  //---------------fetch project Data---------------------
  projectData = state.projectData;
  if(state.projectData == ''){
    projectData = await api.contractQuery(
      state.WEFundContractAddress,
      {
          get_all_project: {
          },
      }
    )
    
    if(projectData == ''){
      notificationRef.current.showNotification("Can't fetch Project Data", 'error', 6000);
      return;
    }

    //----------fake--------------------------
    let fakeone = GetOneProject(projectData, state.fakeid);
    fakeone.project_collected = 60000;
    fakeone.communitybacked_amount = 19200;
    projectData[GetProjectIndex(projectData, state.fakeid)] = fakeone;
    //------------------------------------

    projectData = AddExtraInfo(state, projectData, communityData);

    dispatch({
      type: 'setProjectdata',
      message: projectData,
    })  
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