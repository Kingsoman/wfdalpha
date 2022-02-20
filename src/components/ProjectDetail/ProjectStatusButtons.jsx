import React from 'react'
import { Flex } from '@chakra-ui/react'

import {
  isWefundWallet,
  isCommunityWallet,
  isBackerWallet, 
  }  from '../../components/Util'

import { ButtonTransition } from '../../components/ImageTransition'
import { useStore } from '../../store'

export default function ProjectStatusButtons({
  data,
  WefundApprove,
  CommunityVote,
  onNext,
  MilestoneVote
}) 
{
  const { state, dispatch } = useStore()
  return (
    <>
      <Flex alignSelf={{ base: 'center', md: 'center', lg: 'flex-start'}} >
      {/* The Countdown and Vote*/}
        {/* <Flex>
          <Flex
            mt={{ base: '20px', md: '20px', lg: '00px' }}
            mr={{ base: '0px', md: '0px', lg: '25px' }}
            alignSelf={{ base: 'center', md: 'center', lg: 'flex-start'}}
          >
            <ImageTransition
              unitid="vote"
              border1="linear-gradient(180deg, #21EC77 0%, #2ECC711A 100%)"
              background1="linear-gradient(180deg,  #21EC77 0%, #2ECC711A 100%)"
              border2="linear-gradient(180deg,  #21EC77 0%, #2ECC711A 100%)"
              background2="linear-gradient(180deg, #1A133E 0%, #1A133E 100%)"
              border3="linear-gradient(180deg,  #21EC77 0%, #2ECC711A 100%)"
              background3="linear-gradient(180deg, #171347 0%, #171347 100%)"
              selected={false}
              width="90px"
              height="90px"
              rounded="15px"
            >
              <Box
                variant="solid"
                color="white"
                justify="center"
                align="center"
                onClick={() => {}}
              >
                Vote{' '}
              </Box>
            </ImageTransition>
          </Flex>
          <Flex 
            direction={{ base: 'column', md: 'column', lg: 'column' }} 
            ml={{ base: '0px', md: '0px', lg: '25px' }}
          >
            <Text>
              Voting Ends
            </Text>
            <HStack>
              <Box >
                <Text 
                  fontFamily={'Pilat Extended'}
                  fontWeight={'900'}
                  fontSize={'26px'}
                  lineHeight={'33px'}
                  textAlign={'center'}
                  color={'#FE8600'}
                  >
                  {data.leftTime}
                </Text>
                <Text
                  fontFamily={'Sk-Modernist-Regular'}
                  fontSize={'15px'}
                  color={'rgba(255, 255, 255, 0.7)'}>
                  Minutes
                </Text>
              </Box>
            </HStack>
          </Flex>
        </Flex> */}
        {data.project_status === '0' && isWefundWallet(state) && (
          <Flex justify={'center'}>
            <ButtonTransition
              unitid='Approve'
              selected={false}
              width="160px"
              height="50px"
              rounded="33px"
              onClick={() => WefundApprove(data.project_id)}
            >
              Approve Project
            </ButtonTransition>
          </Flex>
        )}
        {data.project_status === '1' && isCommunityWallet(state, data.project_id) && (
          <Flex justify={'center'}>
            <ButtonTransition
              unitid='voteyes'
              width="160px"
              height="50px"
              selected={false}
              rounded="33px"
              onClick={() => CommunityVote(data.project_id, true, data.leftTime)}
            >
              Vote Yes
            </ButtonTransition>
            <ButtonTransition
              unitid='voteno'
              selected={false}
              width="160px"
              height="50px"
              rounded="33px"
              onClick={() => CommunityVote(data.project_id, false, data.leftTime)}
            >
              Vote No
            </ButtonTransition>
          </Flex>
        )}
        {data.project_status === '2' && (
          <ButtonTransition
            unitid='backproject'
            width="160px"
            height="50px"
            selected={false}
            rounded="33px"
            mt="15px"
            mb="10px"
            onClick={onNext}
          >
            Back Project
          </ButtonTransition>
        )}
        {data.project_status === '3' &&  isBackerWallet(state, data.project_id) && (
          <Flex justify={'center'}>
            <ButtonTransition
              unitid='milestonevoteyes'
              width="160px"
              height="50px"
              selected={false}
              rounded="33px"
              onClick={() => MilestoneVote(data.project_id, true)}
            >
              Vote Yes
            </ButtonTransition>

            <ButtonTransition
              unitid='milestonevoteno'
              selected={false}
              width="160px"
              height="50px"
              rounded="33px"
              onClick={() => MilestoneVote(data.project_id, false)}
            >
              Vote No
            </ButtonTransition>
          </Flex>
        )}
      </Flex>
    </>
  )
};
