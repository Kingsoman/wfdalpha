import React from 'react'
import { Flex, Text } from '@chakra-ui/react'

import {
  isWefundWallet,
  isCommunityWallet,
  isBackerWallet, 
  }  from '../../Util'

import { ButtonTransition } from '../../ImageTransition'
import { useStore } from '../../../store'

export default function StatusButtons({
  index,
  data,
  activeTab,
  WefundApprove,
  CommunityVote,
  MilestoneVote
}) 
{
  const { state, dispatch } = useStore()
  return (
    <>
      {activeTab === 'CommuntyApproval' && (
        <Text py={2} color={'gray.400'}>
          Community Voting will be finished in{' '}
          {data.leftTime} minutes
        </Text>
      )}
      {activeTab === 'MileStoneDelivery' && (
        <Text py={2} color={'gray.400'}>
          Project Milestone step -{' '}
          {parseInt(data.project_milestonestep) + 1}
        </Text>
      )}
      {activeTab === 'WeFundApproval' && isWefundWallet(state) && (
        <Flex justify={'center'}>
          <ButtonTransition
            unitid={'Approve' + index}
            selected={false}
            width="180px"
            height="40px"
            rounded="30px"
            onClick={() => {
              WefundApprove(data.project_id)
            }}
          >
            <Text fontSize={'15px'}>
              Approve Project
            </Text>
          </ButtonTransition>
        </Flex>
      )}
      {activeTab === 'CommuntyApproval' && isCommunityWallet(state, data.project_id) && (
        <Flex justify={'space-between'}>
          <ButtonTransition
            unitid={'visit' + index}
            width="120px"
            height="40px"
            selected={false}
            rounded="30px"
            onClick={() =>
              CommunityVote(
                data.project_id,
                true,
                data.leftTime,
              )
            }
          >
            <Text fontSize={'15px'}>Vote Yes</Text>
          </ButtonTransition>

          <ButtonTransition
            unitid={'view' + index}
            selected={false}
            width="120px"
            height="40px"
            rounded="30px"
            onClick={() =>
              CommunityVote(
                data.project_id,
                false,
                data.leftTime,
              )
            }
          >
            <Text fontSize={'15px'}>Vote No</Text>
          </ButtonTransition>
        </Flex>
      )}
      {activeTab === 'MileStoneFundraising' && (
        <ButtonTransition
          unitid={'visit' + index}
          width="180px"
          height="40px"
          selected={false}
          rounded="30px"
          mb="10px"
          onClick={() =>
            navigate(
              `/back?project_id=${data.project_id}`,
            )
          }
        >
          <Text fontSize={'15px'}>Back Project</Text>
        </ButtonTransition>
      )}
      {activeTab === 'MileStoneDelivery' && isBackerWallet(state, data.project_id) && (
        <Flex justify={'space-between'}>
          <ButtonTransition
            unitid={'milestonevoteyes' + index}
            width="120px"
            height="40px"
            selected={false}
            rounded="30px"
            onClick={() =>
              MilestoneVote(data.project_id, true)
            }
          >
            <Text fontSize={'15px'}>Vote Yes</Text>
          </ButtonTransition>

          <ButtonTransition
            unitid={'milestonevoteno' + index}
            selected={false}
            width="120px"
            height="40px"
            rounded="30px"
            onClick={() =>
              MilestoneVote(data.project_id, false)
            }
          >
            <Text fontSize={'15px'}>Vote No</Text>
          </ButtonTransition>
        </Flex>
      )}
    </>
  )
};
