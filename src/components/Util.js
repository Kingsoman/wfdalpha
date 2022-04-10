import { Fee, MsgExecuteContract, WasmAPI, LCDClient } from '@terra-money/terra.js'
import { useStore } from '../store'
import React, { useRef, useState, useEffect, forwardRef, useCallback } from 'react'
import { WEFUND_MAIN, WEFUND_TEST, VESTING_MAIN, VESTING_TEST, STAKING_MAIN, STAKING_TEST, WFDTOKEN_MAIN, WFDTOKEN_TEST } from '../store'
import { toast } from 'react-toastify'

export const successOption = {
    position: "top-right",
    type: "success",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};

export const errorOption = {
  position: "top-right",
  type: "error",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export async function EstimateSend(connectedWallet, lcd, msgs, message, memo = '') {
console.log(msgs);
//   const obj = new Fee(10_000, { uusd: 4500 })
//   let accountInfo;
//   let abort = false;
//   await lcd.auth.accountInfo(
//     connectedWallet.walletAddress
//   )
//     .then((e) => {
//       accountInfo = e;
//     })
//     .catch((e) => {
//       toast(e.message, errorOption)
//       console.log(e.message);
//       abort = true;
//     })
//   if (abort == true)
//     return false;
// console.log(accountInfo);
//   let txOptions =
//   {
//     msgs: msgs,
//     memo: memo,
//     gasPrices: obj.gasPrices(),
//     gasAdjustment: 1.7,
//   };

//   let rawFee;
//   await lcd.tx.estimateFee(
//     [
//       {
//         sequenceNumber: accountInfo.getSequenceNumber(),
//         publicKey: accountInfo.getPublicKey(),
//       },
//     ],
//     txOptions
//   )
//     .then((e) => {
//       rawFee = e;
//       toast("Estimate success", successOption)
//     })
//     .catch((e) => {
//       toast(e.message, errorOption)
//       console.log(e.message);
//       abort = true;
//     })
//   if (abort == true)
//     return false;

  return await connectedWallet
    .post({
      msgs: msgs,
      // fee: rawFee,
      // gasPrices: obj.gasPrices(),
      // gasAdjustment: 1.7,
      memo: memo,
    })
    .then(async (e) => {
console.log(e);
      if (e.success) {
        toast("Successs! Please wait", successOption);
      } else {
        toast(e.message, errorOption);
        console.log(e.message);
        return false;
      }

      let count = 10;
      let height = 0;
      while(count > 0){
        await lcd.tx.txInfo(e.result.txhash)
        .then((e) => {
          console.log(e)
          if(e.height > 0){
            toast.dismiss();
            toast(message, successOption);
            height = e.height;
          }
        })
        .catch((e)=>{
          // console.log(e)
        })
        if(height > 0) break;
        await Sleep(1000);
        count--;
console.log(count);
      }
      return true;
    })
    .catch((e) => {
      toast(e.message, errorOption);
      console.log(e.message);
      return false;
    })
}
export function GetProjectStatusString(mode) {
  let projectstatus = "Error";

  switch (mode) {
    case "WefundVote":
      projectstatus = 'WeFundApproval';
      break;
    case "Whitelist":
      projectstatus = 'WhitelistOpen';
      break;
    case "Fundraising":
      projectstatus = 'Fundraising';
      break;
    case "Releasing":
      projectstatus = 'MileStoneDelivery';
      break;
    case "Done":
      projectstatus = 'ProjectComplete';
      break;
  }
  return projectstatus;
}
export function GetProjectStatus(mode) {
  let projectstatus = 0;
  switch (mode) {
    case 'WeFundApproval':
      projectstatus = "WefundVote";
      break;
    case 'WhitelistOpen':
      projectstatus = "Whitelist";
      break;
    case 'Fundraising':
      projectstatus = "Fundraising";
      break;
    case 'MileStoneDelivery':
      projectstatus = "Releasing";
      break;
    case 'ProjectComplete':
      projectstatus = "Done";
      break;
  }
  return projectstatus;
}
export function AddExtraInfo(state, projectData, communityData) {
  if (typeof projectData === 'undefined' || projectData == '')
    return '';

  for (let i = 0; i < projectData.length; i++) {
    let backer_backedAmount = parseInt(projectData[i].backerbacked_amount);
    projectData[i].backer_backedPercent = parseInt(
      (backer_backedAmount / 10 ** 6 / parseInt(projectData[i].project_collected)) *
      100,
    );

    let released = 0;
    for (let j = 0; j < projectData[i].milestone_states.length; j++) {
      if (projectData[i].milestone_states[j].milestone_status == 2) {
        released++;
      }
    }
    projectData[i].releasedPercent = parseInt(released / projectData[i].milestone_states.length * 100);
  }

  return projectData;
}
export function CheckNetwork(connectedWallet, state) {
  //----------verify connection--------------------------------
  if (connectedWallet == '' || typeof connectedWallet == 'undefined') {
    toast("Please connect wallet first!", errorOption);
    console.log("Please connect wallet first!");
    return false;
  }
  else {
    toast.dismiss();
  }

  if (state.net == 'mainnet' && connectedWallet.network.name == 'testnet') {
    toast("Please switch to mainnet!", errorOption);
    console.log("Please switch to mainnet!");
    return false;
  }
  if (state.net == 'testnet' && connectedWallet.network.name == 'mainnet') {
    toast("Please switch to Testnet!", errorOption);
    console.log("Please switch to testnet!");
    return false;
  }
  return true;
}

export function GetProjectIndex(projectData, project_id) {
  const isProject = (element) => element.project_id == project_id;
  const index = projectData.findIndex(isProject);
  return index;
}

export async function FetchData(api, state, dispatch, force = false) {
  let projectData, communityData, configData;
  //-----------------fetch community members-----------------
  try{
    communityData = state.communityData;
    if (state.communityData == '' || force == true) {
      communityData = await api.contractQuery(
        state.WEFundContractAddress,
        {
          get_communitymembers: {},
        }
      )

      if (communityData == '') {
          toast("Can't fetch Community Data", errorOption);
      } else {
        dispatch({
          type: 'setCommunityData',
          message: communityData,
        })

      }
    }
  }
  catch(e){}
  //-----------------fetch config-----------------------
  try{
    configData = state.configData;
    if (state.configData == '' || force == true) {
      configData = await api.contractQuery(
        state.WEFundContractAddress,
        {
          get_config: {},
        }
      )

      if (configData == '') {
        toast("Can't fetch Config Data", errorOption);
      } else {
        dispatch({
          type: 'setConfigData',
          message: configData,
        })
      }
    }
  } catch(e) {}
  //---------------fetch project Data---------------------
  try{
    projectData = state.projectData;
    if (state.projectData == '' || force == true) {
      projectData = await api.contractQuery(
        state.WEFundContractAddress,
        {
          get_all_project: {
          },
        }
      )

      if (projectData == '') {
        toast("Can't fetch Project Data", 'error', errorOption);
        console.log("Can't fetch project Data");
      } else {
        //----------fake--------------------------
        let fakeone = GetOneProject(projectData, state.wefundID);
        if(fakeone != ''){
          fakeone.project_collected = 600000;
          fakeone.communitybacked_amount = 192000 * 10 ** 6;
          projectData[GetProjectIndex(projectData, state.wefundID)] = fakeone;
          //------------------------------------

          projectData = AddExtraInfo(state, projectData, communityData);
          dispatch({
            type: 'setProjectData',
            message: projectData,
          })
        }
      }
    }
  }catch(e){}
console.log(projectData);

  try{
    if( state.cardInfo == '' || force == true){
      let tokenInfo = await api.contractQuery(
        state.WFDTokenAddress,
        {
          token_info: {}
        }
      )

      let userInfo = await api.contractQuery(
        state.StakingContractAddress,
        {
          get_user_info: { wallet: state.connectedWallet.walletAddress }
        }
      )

      userInfo.amount = parseInt(userInfo.amount) / (10 ** parseInt(tokenInfo.decimals));
      dispatch({
        type: 'setCardInfo',
        message: userInfo,
      })

    }
  }catch(e){ }

  return { projectData, communityData, configData };
}
export function GetOneProject(projectData, project_id) {
  if (projectData == '')
    return '';
  const isProject = (element) => element.project_id == project_id;
  const index = projectData?.findIndex(isProject);
  if (index == -1)
    return '';
  return projectData[index];
}
export function isWefundWallet(state) {
  if (state.connectedWallet.walletAddress == state.configData.wefund)
    return true;
  return false;
}
export function isCardHolder(state, project_id){
  if(state.cardInfo == '')
    return false;

  let one = GetOneProject(state.projectData, project_id)
  if (one == '')
    return false;

  for(let i=0; i<one.whitelist.length; i++){
    let info = one.whitelist[i];
    if(info.wallet == state.connectedWallet.walletAddress)
      return false;
  }
  return true;
}
export function isBackable(state, project_id){
  if(project_id == state.wefundID)//WFD
    return true;

  let one = GetOneProject(state.projectData, project_id)
  if (one == '')
    return false;
console.log("backable")
console.log(one);

  for(let i=0; i<one.whitelist.length; i++){
    let info = one.whitelist[i];
    if(info.wallet == state.connectedWallet.walletAddress && info.backed < info.allocation) {
console.log(info);
        return true;
      }
  }

  return false;
}
export function getAllocation(state, project_id){
  let one = GetOneProject(state.projectData, project_id)
  if(project_id == state.wefundID)//WFD
    return parseInt(one.project_collected);

  if (one == '')
    return 0;

  console.log(state.connectedWallet.walletAddress)
  for(let i=0; i<one.whitelist.length; i++){
    let info = one.whitelist[i];
    console.log(info)
    if(info.wallet == state.connectedWallet.walletAddress &&
      parseInt(info.backed) < parseInt(info.allocation)) {
        return Math.floor((parseInt(info.allocation) - parseInt(info.backed))/(10**6))+1;
      }
  }

  return 0;
}
export function isCommunityWallet(state) {
  if(state.communityData == '')
    return false;

  for (let j = 0; j < state.communityData.length; j++) {
    if (state.connectedWallet.walletAddress == state.communityData[j]) {
      return true;
    }
  }

  return false;
}
export function isCreatorWallet(state, project_id) {
  let one = GetOneProject(state.projectData, project_id)
  if (one == '')
    return false;

  if (one.creator_wallet == state.connectedWallet.walletAddress)
    return true;

  return false;
}
export function isBackerWallet(state, project_id) {
  let one = GetOneProject(state.projectData, project_id)
  if (one == '')
    return false;

  if(isCommunityWallet(state))
    return false;

  for (let j = 0; j < one.backer_states.length; j++) {
    if (state.connectedWallet.walletAddress == one.backer_states[j].backer_wallet) {
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

export function ParseParam() {
  let queryString, urlParams, project_id = 1;
  if (typeof window != 'undefined') {
    queryString = window.location.search
    urlParams = new URLSearchParams(queryString)
    project_id = urlParams.get('project_id')
  }

  return project_id;
}
export function isNull(val) {
  if (typeof val == 'undefined' || val == '')
    return true;
  return false;
}
export function getVal(val) {
  return isNull(val) ? '' : val;
}
export function getInteger(val) {
  return isNull(val) ? "0" : parseInt(val).toString();
}
export function getMultiplyInteger(val) {
  return isNull(val) ? "0" : parseInt(parseFloat(val) * 100).toString();
}
export function getSeconds(val) {
  let month = 60 * 60 * 24 * 30;
  return (parseInt(getInteger(val)) * month).toString();
}
export function getMonth(val) {
  let month = 60 * 60 * 24 * 30;
  return (getInteger(val) / month).toString();
}
export function getStageTitle(data)
{
  let index = parseInt(data.fundraising_stage);
  return data.vesting[index].stage_title;
}

export function Set2Mainnet(state, dispatch)
{
  window.localStorage.setItem('net', "mainnet");
console.log("set to mainnet")
  dispatch({
    type: 'setNet',
    message: "mainnet"
  })
  let lcdClient = new LCDClient({ //mainnet
    URL: 'https://lcd.terra.dev',
    chainID: 'columbus-5',
    gasPrices: { uusd: 0.45 },
  })
  dispatch({
    type: 'setLcdClient',
    message: lcdClient
  })
  dispatch({
    type: 'setWefundContract',
    message: WEFUND_MAIN
  })
  dispatch({
    type: 'setVestingContract',
    message: VESTING_MAIN
  })
  dispatch({
    type: 'setStakingContract',
    message: STAKING_MAIN
  })
  dispatch({
    type: 'setWFDTokenContract',
    message: WFDTOKEN_MAIN
  })

}

export function Set2Testnet(state, dispatch)
{
  window.localStorage.setItem('net', "testnet");
console.log("set to testnet");
  dispatch({
    type: 'setNet',
    message: "testnet"
  })
  let lcdClient = new LCDClient({ //testnet
    URL: 'https://bombay-lcd.terra.dev/',
    chainID: 'bombay-12',
    gasPrices: { uusd: 0.45 },
  })
  dispatch({
    type: 'setLcdClient',
    message: lcdClient
  })
  dispatch({
    type: 'setWefundContract',
    message: WEFUND_TEST
  })
  dispatch({
    type: 'setVestingContract',
    message: VESTING_TEST
  })
  dispatch({
    type: 'setStakingContract',
    message: STAKING_TEST
  })
  dispatch({
    type: 'setWFDTokenContract',
    message: WFDTOKEN_TEST
  })  
}