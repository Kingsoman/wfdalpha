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
    } else {
      notificationRef.current.showNotification(e.message, 'error', 4000)
      console.log(e.message);
    }
  })
  .catch((e) => {
    notificationRef.current.showNotification(e.message, 'error', 4000)
    console.log(e.message);
  })
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
export function AddExtraInfo(projectData, communityData){
  if(typeof projectData === 'undefined' || projectData == '')
    return '';

  for (let i = 0; i < projectData.length; i++) {
    let backedAmount = parseInt(projectData[i].backerbacked_amount) + parseInt(projectData[i].communitybacked_amount);
    projectData[i].backedPercent = parseInt(
      (backedAmount / 10 ** 6 / parseInt(projectData[i].project_collected)) *
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
