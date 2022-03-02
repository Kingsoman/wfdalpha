import React, { createContext, useContext, useReducer } from 'react'
import { LCDClient } from '@terra-money/terra.js'

const StoreContext = createContext()

//  WFD
// terra1pkytkcanua4uazlpekve7qyhg2c5xwwjr4429d

const initialState = {
  net: 'testnet',
  // net: 'mainnet',

  WEFundContractAddress: "terra16n9af2cd5rf03w9v88zp4ua6zsk4k803zvh5fe", //testnet v2.3
	// WEFundContractAddress: 'terra1fv5syzr26rzuuycff4dzy0fvash59u53tvjdr6', //mainnet v2.3
  
  VestingContractAddress: "terra15tpq4hvvl0mmr72n290m3lzl4nm4kz5w0np804", //testnet

  presale: true,
  referralCount: 0,
  referralLink: '',
  projectData: '',
  activeProjectData: '',
  oneprojectData: '',
  communityData: '',
  configData: '',
  connectedWallet: [],
  timer: '',
  wallet: {},
  allNativeCoins: [],
  config: {},
  ustBalance: 0,
  contractBalance: {},
  lcd_client: new LCDClient({ //testnet
      URL: 'https://bombay-lcd.terra.dev/',
      chainID: 'bombay-12',
  }),
  // lcd_client: new LCDClient({ //mainnet
  //   URL: 'https://lcd.terra.dev',
  //   chainID: 'columbus-4',
  // }),
  investAmount: '0',
  investWfdamount: '',
  investName: '',
  investEmail: '',
  investTitle: '',
  investDate: '',
  investSignature: '',
  request: 'https://wefund-nodejs-gwb6v.ondigitalocean.app',
  // request: 'http://0b3d-188-43-136-33.ngrok.io',
  pdfFile: '',
  whitepaper: '',
  logo: '',
  wefundID: 1,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'setNet':
      return { ...state, net: action.message }
    case 'setLcdClient':
      return { ...state, lcd_client: action.message }
    case 'setWefundContract':
      return { ...state, WEFundContractAddress: action.message }
    case 'setVestingContract':
      return { ...state, VestingContractAddress: action.message }
    case 'setPresale':
      return { ...state, presale: action.message }
    case 'setReferralCount':
      return { ...state, referralCount: action.message }
    case 'setReferralLink':
      return { ...state, referralLink: action.message }
    case 'setConnectedWallet':
      return { ...state, connectedWallet: action.message }
    case 'setTimer':
      return { ...state, timer: action.message }
    case 'setConfigData':
      return { ...state, configData: action.message }
    case 'setCommunityData':
      return { ...state, communityData: action.message }
    case 'setActiveProjectData':
      return { ...state, activeProjectData: action.message }
    case 'setLogo':
      return { ...state, logo: action.message }
    case 'setWhitepaper':
      return { ...state, whitepaper: action.message }
    case 'setInvestDate':
      return { ...state, investDate: action.message }
    case 'setInvestWfdAmount':
      return { ...state, investWfdamount: action.message}
    case 'setDocxfile':
      return { ...state, docxFile: action.message }
    case 'setPdffile':
      return { ...state, pdfFile: action.message }
    case 'setInvestname':
      return { ...state, investName: action.message }
    case 'setInvestemail':
      return { ...state, investEmail: action.message }
    case 'setInvesttitle':
      return { ...state, investTitle: action.message }
    case 'setInvestsignature':
      return { ...state, investSignature: action.message }
    case 'setInvestamount':
      return { ...state, investAmount: action.message }
    case 'setContractBalance':
      return { ...state, contractBalance: action.message }
    case 'setProjectdata':
      return { ...state, projectData: action.message }
    case 'setOneprojectdata':
      return { ...state, oneprojectData: action.message }
    case 'setWallet':
      return { ...state, wallet: action.message }
    case 'setAllNativeCoins':
      return { ...state, allNativeCoins: action.message }
    case 'setConfig':
      return { ...state, config: action.message }
    case 'setUstBalance':
      return { ...state, ustBalance: action.message }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => useContext(StoreContext)
