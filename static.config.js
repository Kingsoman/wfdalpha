// This file is used to configure:
// - static-site generation
// - Document shell (index.html)
// - ...tons of other things!

// Get started at https://react-static.js.org

export default {
    disablePreload: true,
    silent: true,
    plugins: ['react-static-plugin-sass'],
    getSiteData: async ({ dev }) => ({
        title: 'WeFund is Decentralized crowdfunding for the crypto-startup project industry and beyond implemented for a real-life use case. The vision of WeFund is to become the connector of the blockchain ecosystem that exists on the market. to fulfill this vision, WeFund s initial development stage would be in the Terra ecosystem and will continue to use another ecosystem such as Solana, Etherium, Cardano, etc in near future',
        lastBuilt: Date.now(),
    }),
    //maxThreads: 1, // Remove this when you start doing any static generation
    getRoutes: async ({ dev }) => [
        //  simple route
        {
            path: '/',
            template: 'src/pages/Index',
        },
        {
            path: 'create',
            template: 'src/pages/CreateProject',
        },
        {
            path: 'back',
            template: 'src/pages/BackProject',
        },
        {
            path: 'explorer',
            template: 'src/pages/ExploreComingSoon',
        },
        {
            path: 'detail',
            template: 'src/pages/ProjectDetail',
        },
        // A 404 component
        {
            path: 'invest_step1',
            template: 'src/pages/Invest_step1',
        },
        {
            path: 'invest_step2',
            template: 'src/pages/Invest_step2',
        },
        {
            path: 'invest_step3',
            template: 'src/pages/Invest_step3',
        },
        {
            path: 'invest_step4',
            template: 'src/pages/Invest_step4',
        },
        {
            path: 'invest_kyc1',
            template: 'src/pages/Invest_KYC1',
        },
        
        {
            path: 'invest_kyc2',
            template: 'src/pages/Invest_KYC2',
        },
        
        {
            path: 'invest_kyc3',
            template: 'src/pages/Invest_KYC3',
        },
        
        {
            path: 'invest_kyc4',
            template: 'src/pages/Invest_KYC4',
        },
        
        {
            path: 'invest_kyc5',
            template: 'src/pages/Invest_KYC5',
        },
        
        {
            path: 'usercenter',
            template: 'src/pages/UserInfoCenter',
        },
        {
            path: '404',
            template: 'src/pages/NotFound',
        },
    ],
}
