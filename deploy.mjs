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

const LCD_TEST = new LCDClient({
  URL: 'https://bombay-lcd.terra.dev',
  chainID: 'bombay-12',
  gasPrices: { uusd: 0.45 },
});
const LCD_MAIN = new LCDClient({ //mainnet
  URL: 'https://lcd.terra.dev',
  chainID: 'columbus-5',
  gasPrices: { uusd: 0.45 },
});
const MARKET_TEST = "terra15dwd5mj8v59wpj0wvt233mf5efdff808c5tkal"
const MARKET_MAIN = "terra1sepfj7s0aeg5967uxnfk4thzlerrsktkpelm5s"
const AUST_TEST = "terra1ajt556dpzvjwl0kl5tzku3fc3p3knkg9mkv8jl"
const AUST_MAIN = "terra1hzh9vpxhsk8253se0vv5jj6etdvxu3nv8z07zu"

const net = "test"
let terra = net=="main"? LCD_MAIN : LCD_TEST;
let wallet = terra.wallet(mk);

let vestingAddress = "terra1055p3nlct3pg4xr2gxkvmec9d055wwfy56gf07";
let wefundAddress = "terra1505s4p4ztdw3rxp9syjdrq73xuwmzmtts9phd5";

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
      { 
        "set_config": 
        { 
          "vesting_contract": vestingAddress,
          "anchor_market": net=="main"? MARKET_MAIN : MARKET_TEST,
          "aust_token": net=="main"? AUST_MAIN : AUST_TEST
        } 
      }
    );

    let wefund_add = new MsgExecuteContract(
      mk.accAddress,
      wefundAddress,
      initMsg
    );
    res = await EstimateSend([wefund_config, wefund_add], "setting");

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

export const initMsg = 
{
  "add_project": {
    "cofounder_name": "",
    "country": "",
    "creator_wallet": "terra1qvyj7tqs35hckd395rglc7lsyf2acuhgdcmj77",
    "project_collected": "600000",
    "project_company": "A.I WeFund",
    "project_createddate": "28/3/2022",
    "project_description": "WeFund is a community crowdfunding incubator for blockchain and real-world projects. WeFund's mission is to host high-quality projects that align with WeFund's investor community. Community-driven decisions on the platform for 100% transparency. Project funds managed exclusively on Terra's Anchor protocol using smart contracts and following project milestones.\n\n",
    "project_ecosystem": "Terra",
    "project_email": "",
    "project_id": "0",
    "project_logo": "",
    "project_milestones": [
      {
        "milestone_amount": "600000",
        "milestone_description": "",
        "milestone_enddate": "2022-03-31",
        "milestone_name": "1",
        "milestone_startdate": "2022-03-01",
        "milestone_status": "0",
        "milestone_step": "0",
        "milestone_type": "1",
        "milestone_votes": []
      }
    ],
    "project_saft": "WeFund_SAFT.docx",
    "project_teammembers": [
      {
        "teammember_description": "He is the person behind the development of the Fan$quad smart contract that was deployed on Col-4 during the hackathon organized by Terraform Labs. He has a wealth of experience in coding, with a deep understanding of C, C++, Javascript, VBA, Java, Python, Rust language (to name a few). In 2018 he moved his focus into Solidity, PHP, & HTML 5, to follow his vision of creating advanced Web 3.0 applications integrated with the blockchain. His role is to ensure delivery of smart contracts, web app, and technical infrastructure, as well as managing the business side of the project. From the business side, he had several businesses before such as a Natural Mosquito Solution based on Bali, hotel & restaurant (Ristorante-Bar Lanca) in Switzerland, and a smart-home startup to reduce electricity consumption. Most of the businesses he founded had an ROI within less than 1 year.\n\n",
        "teammember_linkedin": "",
        "teammember_name": "Andrea Bello ",
        "teammember_role": "Co-Founder & CEO & Co-CTO"
      },
      {
        "teammember_description": "A dynamic individual who worked at Tencent as an operation specialist, in the partnership division. Before Tencent, she was senior partnership manager at Bigo. She previously held a senior account executive position at one of the digital marketing agencies under Jet Group and was a manager at Waves, who successfully helped founders to raise $1.2M in pre-seed funding, before turning her attention to crypto. She is one of the founding partners and driving forces behind the concept of WeFund. She was on the core team behind the hackathon project of Fan$quad together with the other ex co-founder.\n\n",
        "teammember_linkedin": "",
        "teammember_name": "Ika Afifah ",
        "teammember_role": "Co-Founder & CMO"
      },
      {
        "teammember_description": "World explorer, entrepreneur, and blockchain technology enthusiast. Came from a career in Silicon Valley building web applications during the dot-com boom. Wanting to do it all over again, this time helping to build Web 3.0.\n\n",
        "teammember_linkedin": "",
        "teammember_name": "Jason Galvin ",
        "teammember_role": "Co-CTO"
      },
      {
        "teammember_description": "Comes from a background in investment and corporate finance. After completing his education, he worked as a Business Analyst for a large tech company in Seattle, Washington USA building AI applications to identify high-risk sale transactions. He now is an Investment Manager for a prestigious silicon valley venture capital firm located in Jakarta, Indonesia managing investment deals in the Southeast Asia region.\n\n",
        "teammember_linkedin": "",
        "teammember_name": "Austin Taylor ",
        "teammember_role": "COO"
      }
    ],
    "project_title": "WeFund",
    "project_website": "",
    "project_whitepaper": "",
    "service_charity": "0",
    "service_wefund": "5",
    "professional_link": "",
    "token_addr": "",
    "vesting": [
      {
        "stage_after": "0",
        "stage_amount": "0",
        "stage_period": "0",
        "stage_price": "0",
        "stage_soon": "0",
        "stage_title": "Seed"
      }
    ]
  }
}