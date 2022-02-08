import React from 'react'
import ReactDOM from 'react-dom'

let Wallet = {}
if (typeof document !== 'undefined') {
  Wallet = require('@terra-money/wallet-provider').WalletProvider
}
// Your top level component
import App from './App'

const mainnet = {
  name: 'mainnet',
  chainID: 'columbus-4',
  lcd: 'https://lcd.terra.dev',
}

const testnet = {
  name: 'testnet',
  chainID: 'tequila-0004',
  lcd: 'https://tequila-lcd.terra.dev',
}

// Export your top level component as JSX (for static rendering)
export default App

// Render your app
if (typeof document !== 'undefined') {
  const target = document.getElementById('root')

  const renderMethod = ReactDOM.render
  let inProduction = true
  const render = (Comp) => {
    renderMethod(
      <Wallet
        // defaultNetwork={testnet}
        defaultNetwork={mainnet}
        walletConnectChainIds={{ 0: testnet, 1: mainnet }}
        connectorOpts={{
          bridge: inProduction
            ? 'https://walletconnect.terra.dev/'
            : 'https://tequila-walletconnect.terra.dev/',
        }}
      >
        <Comp />
      </Wallet>,
      target,
    )
  }

  render(App)
}
