import React, {
    createContext,
    useContext,
    useReducer,
    useCallback,
} from 'react'
import {
    MsgExecuteContract,
    LCDClient,
    WasmAPI,
    BankAPI,
} from '@terra-money/terra.js'

const StoreContext = createContext()

const initialState = {
    net: 'testnet',
    // net: 'mainnet',

    WEFundContractAddress: "terra17e7t7m9wxm4twr90cfgwrvtx7p40vnr2ywrdra", //testnet
    // WEFundContractAddress: "terra1qcm9957c2gyghkaqgsk0h5mw6xf6ym4xdu7kmu",
    projectData: '',
    activeProjectData: '',
    oneprojectData: '',
    communityData: '',
    configData: '',
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
    // lcd_client: new LCDClient({
    //     URL: 'https://lcd.terra.dev',
    //     chainID: 'columbus-4',
    // }),
    investAmount: '',
    investWfdamount: '',
    investName: '',
    investEmail: '',
    investTitle: '',
    investDate: '',
    investSignature: '',
    request: 'https://wefund-nodejs-gwb6v.ondigitalocean.app',
    // request: 'http://508d-87-116-164-143.ngrok.io',
    pdfFile: '',
    whitepaper: '',
    logo: '',
    fakeid: 0,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'setTimer':
        return {
            ...state,
            timer: action.message,
        }
    case 'setConfigData':
        return {
            ...state,
            configData: action.message,
        }
    case 'setCommunityData':
        return {
            ...state,
            communityData: action.message,
        }
    case 'setActiveProjectData':
        return {
            ...state,
            activeProjectData: action.message,
        }
    case 'setLogo':
        return {
            ...state,
            logo: action.message,
        }
    case 'setWhitepaper':
        return {
            ...state,
            whitepaper: action.message,
        }
    case 'setInvestDate':
        return {
            ...state,
            investDate: action.message,
        }
    case 'setInvestWfdAmount':
        return {
            ...state,
            investWfdamount: action.message,
        }
    case 'setPdffile':
        return {
            ...state,
            pdfFile: action.message,
        }
    case 'setInvestname':
        return {
            ...state,
            investName: action.message,
        }
    case 'setInvestemail':
        return {
            ...state,
            investEmail: action.message,
        }
    case 'setInvesttitle':
        return {
            ...state,
            investTitle: action.message,
        }
    case 'setInvestsignature':
        return {
            ...state,
            investSignature: action.message,
        }        
    case 'setInvestamount':
        return {
            ...state,
            investAmount: action.message,
        }
    case 'setContractBalance' :
        return {
            ...state,
            contractBalance: action.message,
        }
    case 'setProjectdata' :
        return {
            ...state,
            projectData: action.message,
        }
    case 'setOneprojectdata':
        return {
            ...state,
            oneprojectData: action.message,
        }
    case 'setWallet' :
        return {
            ...state,
            wallet: action.message,
        }
    case 'setAllNativeCoins':
        return {
            ...state,
            allNativeCoins: action.message,
        }
    case 'setConfig':
        return {
            ...state,
            config: action.message,
        }
    case 'setUstBalance':
        return {
            ...state,
            ustBalance: action.message,
        }
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
