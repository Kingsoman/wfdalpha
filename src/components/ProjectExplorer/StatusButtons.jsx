import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { Link, navigate } from '@reach/router'

import {
  isWefundWallet,
  isCommunityWallet,
  isBackerWallet, 
  }  from '../Util'

import { ButtonTransition } from '../ImageTransition'
import { useStore } from '../../store'

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
      {activeTab === 'WeFundApproval' && isWefundWallet(state) && (
        <Flex w={'330px'} justify={'space-between'}>
          <ButtonTransition
            unitid={'Approve' + index}
            selected={false}
            width="150px"
            height="45px"
            rounded="33px"
            onClick={() =>
              WefundApprove(data.project_id)
            }
          >
            <Text
              fontSize={{
                base: '14px',
                lg: '16px',
              }}
            >
              Approve Project
            </Text>
          </ButtonTransition>
        </Flex>
      )}
      {activeTab === 'CommuntyApproval' && isCommunityWallet(state, data.project_id) && (
        <Flex w={'330px'} justify={'space-between'}>
          <ButtonTransition
            unitid={'visit' + index}
            width="150px"
            height="45px"
            fontSize={{ base: '14px', lg: '16px' }}
            selected={false}
            rounded="33px"
            onClick={() =>
              CommunityVote(
                data.project_id,
                true,
                data.leftTime,
              )
            }
          >
            <Text
              fontSize={{
                base: '14px',
                lg: '16px',
              }}
            >
              Vote Yes
            </Text>
          </ButtonTransition>

          <ButtonTransition
            unitid={'view' + index}
            selected={false}
            width="150px"
            height="45px"
            fontSize={{ base: '14px', lg: '16px' }}
            rounded="33px"
            onClick={() =>
              CommunityVote(
                data.project_id,
                false,
                data.leftTime,
              )
            }
          >
            <Text
              fontSize={{
                base: '14px',
                lg: '16px',
              }}
            >
              Vote No
            </Text>
          </ButtonTransition>
        </Flex>
      )}
      {activeTab === 'MileStoneFundraising' && (
        <ButtonTransition
          mb="10px"
          rounded="33px"
          selected={false}
          unitid={'visit' + index}
          width="150px"
          height="45px"
          fontSize={{ base: '14px', lg: '16px' }}
          onClick={() => {
            navigate(
              '/invest_step1?project_id=' +
                data.project_id,
            )
          }}
        >
          <Text
            fontSize={{
              base: '14px',
              lg: '16px',
            }}
          >
            Back Project
          </Text>
        </ButtonTransition>
      )}
      {activeTab === 'MileStoneDelivery' && isBackerWallet(state, data.project_id) && (
        <Flex w={'330px'} justify={'space-between'}>
          <ButtonTransition
            unitid={'milestonevoteyes' + index}
            width="150px"
            height="45px"
            fontSize={{ base: '14px', lg: '16px' }}
            selected={false}
            rounded="33px"
            onClick={() =>
              MilestoneVote(data.project_id, true)
            }
          >
            <Text
              fontSize={{
                base: '14px',
                lg: '16px',
              }}
            >
              Vote Yes
            </Text>
          </ButtonTransition>

          <ButtonTransition
            unitid={'milestonevoteno' + index}
            selected={false}
            width="150px"
            height="45px"
            fontSize={{ base: '14px', lg: '16px' }}
            rounded="33px"
            onClick={() =>
              MilestoneVote(data.project_id, false)
            }
          >
            <Text
              fontSize={{
                base: '14px',
                lg: '16px',
              }}
            >
              Vote No
            </Text>
          </ButtonTransition>
        </Flex>
      )}
    </>
  )
};
