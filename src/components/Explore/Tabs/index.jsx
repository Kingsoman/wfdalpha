import Tab from './Tab'
import React from 'react'
import { Flex } from '@chakra-ui/react'

export default function Tabs({ activeTab, onChangeActivetab }) {
  return (
    <Flex
      cursor="pointer"
      justify="center"
      bg="rgba(255, 255, 255, 0.05)"
      mt={{ base: '25px', lg: '50px' }}
      width={{ base: '90%', md: '98%', lg: '80%' }}
    >
      <Tab
        activeTab={activeTab}
        value={'WeFundApproval'}
        lable={'WeFund Approval'}
        onChangeActivetab={onChangeActivetab}
      />
      <Tab
        activeTab={activeTab}
        value={'CommuntyApproval'}
        lable={'Communty Approval'}
        onChangeActivetab={onChangeActivetab}
      />
      <Tab
        activeTab={activeTab}
        value={'MileStoneFundraising'}
        lable={'Milestone Fundraising'}
        onChangeActivetab={onChangeActivetab}
      />
      <Tab
        activeTab={activeTab}
        value={'MileStoneDelivery'}
        lable={'Milestone Delivery'}
        onChangeActivetab={onChangeActivetab}
      />
      <Tab
        activeTab={activeTab}
        value={'ProjectComplete'}
        lable={'Project Complete'}
        onChangeActivetab={onChangeActivetab}
      />
    </Flex>
  )
}
