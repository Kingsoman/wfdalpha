import { readFileSync } from "fs";

import {
  LCDClient,
  MnemonicKey,
  MsgInstantiateContract,
  MsgStoreCode,
  MsgExecuteContract,
  Fee
} from "@terra-money/terra.js";


const VESTING_PATH =
  "../Vesting.wasm";
const WEFUND_PATH =
  "../wefund17.wasm";

// Get the wallet seed phrase from the environment variable.
const TERRA_SEED = process.env.TERRA_SEED
const mk = new MnemonicKey({
  mnemonic:
    TERRA_SEED,
});

// const terra = new LCDClient({
//   URL: 'https://bombay-lcd.terra.dev',
//   chainID: 'bombay-12',
//   gasPrices: { uusd: 0.45 },
// });
const terra = new LCDClient({ //mainnet
  URL: 'https://lcd.terra.dev',
  chainID: 'columbus-5',
  gasPrices: { uusd: 0.45 },
});
const wallet = terra.wallet(mk);

let vestingAddress = "terra1clufns3djy7fye5k3sq3m4y3777e85jw5v2ygk";
let wefundAddress = "terra15aa92np7epcx8nmkzvhtphws2g0mmfvllj2tyd";

run();


async function run() {

  if (vestingAddress == "") {
    console.log("Deploying Vesting Contract");
    const vestingCodeId = await upload(VESTING_PATH);
    await sleep(12000);
    console.log("instatiating vesting contract");

    vestingAddress = await instantiate(vestingCodeId, {})
    await sleep(12000);
  }
  if (wefundAddress == "") {
    console.log("Deploying WeFund contract");
    const wefundCodeId = await upload(WEFUND_PATH);
    await sleep(12000);
    console.log("instatiating wefund contract");

    wefundAddress = await instantiate(wefundCodeId, {})
    await sleep(12000);
  }

  console.log("configuring");
  let result = await config();

  console.log("reading contract");
  result = await terra.wasm.contractQuery(vestingAddress, { "get_owner": {} })
  console.log(result);

  result = await terra.wasm.contractQuery(wefundAddress, { "get_config": {} })
  console.log(result);
}

async function config() {
  console.log("vesting_contract:" + vestingAddress);
  console.log("wefund_contract:" + wefundAddress);

  try {
    let vesting_config = new MsgExecuteContract(
      mk.accAddress,
      vestingAddress,
      { "set_config": { "admin": wefundAddress } }
    );

    let res = await EstimateSend([vesting_config], "setting");
    // console.log(res.raw_log);

    await sleep(12000);

    let wefund_config = new MsgExecuteContract(
      mk.accAddress,
      wefundAddress,
      { "set_config": { "vesting_contract": vestingAddress } }
    );

    res = await EstimateSend([wefund_config], "setting");
    // console.log(res.raw_log);
  }
  catch (e) {
    console.log(e.message);
    process.exit(1);
  }
}

async function upload(contractPath) {
  const wasm = readFileSync(contractPath);
  const tx = new MsgStoreCode(mk.accAddress, wasm.toString("base64"));
  try {
    const storeResult = await EstimateSend([tx], `Storing ${contractPath}`);
    console.log(storeResult.raw_log);

    const codeId = extractCodeId(storeResult.raw_log);
    return codeId;
  } catch (error) {
    console.error("Error:" + error);
    process.exit(1);
  }
}

async function instantiate(codeId, instantiateMsg) {
  try {
    const instantiate = new MsgInstantiateContract(
      mk.accAddress,
      mk.accAddress,
      codeId,
      instantiateMsg
    );
    const instantiateResult = await EstimateSend([instantiate], "instantiating");
    console.log(instantiateResult.raw_log);

    return extractContractAddress(instantiateResult.raw_log);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

function extractCodeId(logs) {
  // TODO improve parsing
  const parsed = JSON.parse(logs);
  return Number(parsed[0]["events"][1]["attributes"][1]["value"]);
}

function extractContractAddress(logs) {
  const parsed = JSON.parse(logs);
  return parsed[0]["events"][0]["attributes"][0]["value"];
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function EstimateSend(msgs, memo) {
  try {
    // const obj = new Fee(10_000, { uusd: 4500 });
    // console.log(obj.gasPrices);
    // let accountInfo;
// console.log(msgs);

    // await terra.auth.accountInfo(
    //   mk.accAddress
    // )
    // .then((e) => {
    //   accountInfo = e;
    // })
// console.log(accountInfo);

    // let txOptions =
    // {
    //   msgs: msgs,
    //   memo: memo,
    //   gasPrices: obj.gasPrices(),
    //   gasAdjustment: 1.7,
    // };

    // let rawFee;
    // await terra.tx.estimateFee(
    //   [
    //     {
    //       sequenceNumber: accountInfo.getSequenceNumber(),
    //       publicKey: accountInfo.getPublicKey(),
    //     },
    //   ],
    //   txOptions
    // )
    // .then((e) => {
    //   rawFee = e;
    // })
// console.log(rawFee);

    const res = await wallet
      .createAndSignTx({
        msgs: msgs,
        memo: memo,
        // fee: rawFee,
        // gasPrice: obj.gasPrices(),
        // gasAdjustment: 1.7
      })
      .then((tx) => terra.tx.broadcast(tx))

    return res;
  }
  catch (e) {
    console.error(e);
    process.exit(1);
  }
}
export default {};