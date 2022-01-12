import React, { Component, Suspense, useContext } from 'react'
import { Root, Routes } from 'react-static'
import { Router, Link } from '@reach/router'
import './styles/base.scss'
import { Head } from 'react-static'
import { popper } from '@popperjs/core'

let bootstrap = {}
if (typeof document !== 'undefined') {
    bootstrap = require('bootstrap')
}
import { StoreProvider } from './store'

import { ChakraProvider } from "@chakra-ui/react";
import theme from './theme';

import Navbar from './components/Navbar'
import Index from 'pages/Index'
import ExplorerProject from 'pages/ExplorerProject'
import CreateProject from 'pages/CreateProject'
import BackProject from 'pages/BackProject'
import DetailProject from 'pages/ProjectDetail'
import Invest_step1 from 'pages/Invest_step1'
import Invest_step2 from 'pages/Invest_step2'
import Invest_step3 from 'pages/Invest_step3'
import Invest_step4 from 'pages/Invest_step4'
import NotFound from 'pages/NotFound'

class App extends Component {
 
    render() {
        return (
            <Suspense
                fallback={
                    <div className="vh-100 d-flex">
                        <div className="align-self-center w-100 text-center">
                            <img src="logo.png" className="img-fluid mb-4" />
                            <p
                                style={{
                                    color: '#f038f0',
                                    textTransform: 'uppercase',
                                    fontSize: '36px',
                                    fontWeight: '300',
                                    textShadow: '0px 0px 26px #ff36ff',
                                    fontFamily: "'Monoton', cursive",
                                }}
                                className="loading_animation"
                            >
                                Loading...{' '}
                            </p>
                        </div>
                    </div>
                }
            >
                <Root>
                    <Head>
                        <meta charSet="UTF-8" />
                        <meta
                            name="viewport"
                            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                        />
                        <title>
                            WeFund - Community Crowdfunding Cross-Chain Incubator
                        </title>
                        <link
                            rel="icon"
                            type="image/x-icon"
                            href="/favicon.ico"
                        />
                        <link
                            data-hid="shortcut-icon"
                            rel="shortcut icon"
                            href="/favicon.ico"
                        />
                        <meta property="og:title" content="WeFund" />
                        <meta
                            property="og:image"
                            content="/favicon.png"
                        />
                        <meta property="og:image:alt" content="WeFund icon" />
                        <meta property="og:type" content="website" />
                        <meta
                            property="og:site_name"
                            content="WeFund Interface"
                        />
                        <meta
                            property="og:description"
                            content="WeFund is decentralized crowdfunding for the crypto-startup project industry and beyond, implemented for real-life use cases. The vision of WeFund is to become the connector of the blockchain ecosystem that exists on the market. to fulfill this vision, WeFund's initial development stage would be in the Terra ecosystem and will continue to use another ecosystem such as Solana, Ethereum, Cardano, etc in the near future!"
                        />
                        <meta name="twitter:card" content="summary" />
                        <meta name="twitter:site" content="WeFund" />
                        <meta
                            name="twitter:title"
                            content="WeFund - Community Crowdfunding Cross-Chain Incubator"
                        />
                        <meta
                            name="twitter:description"
                            content="WeFund is decentralized crowdfunding for the crypto-startup project industry and beyond, implemented for real-life use cases. The vision of WeFund is to become the connector of the blockchain ecosystem that exists on the market. to fulfill this vision, WeFund's initial development stage would be in the Terra ecosystem and will continue to use another ecosystem such as Solana, Ethereum, Cardano, etc in the near future"
                        />
                        <meta
                            name="twitter:image"
                            content="/favicon.png"
                        />
                    </Head>
                    <StoreProvider>
                    <ChakraProvider resetCSS theme={theme}>
                        {/* <Routes default /> */}
                        {/* <AppRouter /> */}
                        <Navbar/>
                        <Router>
                            <Index path="/" />
                            <CreateProject path="create" />
                            <BackProject path="back" />
                            <ExplorerProject path="explorer" />
                            <DetailProject path="detail" />
                            <Invest_step1 path="invest_step1" />
                            <Invest_step2 path='invest_step2' />
                            <Invest_step3 path='invest_step3' />
                            <Invest_step4 path='invest_step4' />
                            <NotFound default />
                        </Router>
                    </ChakraProvider>
                    </StoreProvider>
                </Root>
            </Suspense>
        )

    }
}

export default App
