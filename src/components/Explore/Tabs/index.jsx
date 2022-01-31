import Tab from './Tab'
import React from 'react'
import { Flex } from '@chakra-ui/react'

export default function Tabs({ activeTab, onChangeActivetab }) {
  return (
    <Flex
      mt="50px"
      cursor="pointer"
      justify="center"
      width={{ lg: '80%' }}
      bg={'rgba(255, 255, 255, 0.05)'}
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
