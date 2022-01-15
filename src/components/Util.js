import { Fee, MsgExecuteContract, WasmAPI, LCDClient} from '@terra-money/terra.js'

export async function EstimateSend(connectedWallet, lcd, msg, message, notificationRef)
{
  const obj = new Fee(10_000, { uusd: 4500})
  const accountInfo = await lcd.auth.accountInfo(
    connectedWallet.walletAddress
  );
console.log(obj.gasPrices());
  let txOptions = 
  {
    msgs: [msg],
    memo: '',
    gasPrices: obj.gasPrices(),
    gasAdjustment: 1.7,
  };

  const rawFee = await lcd.tx.estimateFee(
    [
      {
        sequenceNumber: accountInfo.getSequenceNumber(),
        publicKey: accountInfo.getPublicKey(),
      },
    ],
    txOptions
  );

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