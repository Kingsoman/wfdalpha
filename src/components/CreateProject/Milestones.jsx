import React from 'react'
import {
  Flex,
  Text,
  Box,
} from '@chakra-ui/react'

import {
  ImageTransition,
  ButtonBackTransition
} from '../ImageTransition'

import MilestoneTitle from './Milestone/MilestoneTitle'
import MilestoneType from './Milestone/MilestoneType'
import MilestoneAmount from './Milestone/MilestoneAmount'
import MilestoneDescription from './Milestone/MilestoneDescription'
import MilestoneDate from './Milestone/MilestoneDate'

export default function Milestones({
  milestoneTitle,
  setMilestoneTitle,
  milestoneTitleLen,
  setMilestoneTitleLen,
  milestoneType,
  setMilestoneType,
  milestoneAmount,
  setMilestoneAmount,
  milestoneDescription,
  setMilestoneDescription,
  milestoneDescriptionLen,
  setMilestoneDescriptionLen,
  milestoneStartdate,
  setMilestoneStartdate,
  milestoneEnddate,
  setMilestoneEnddate,
  onCancelMilestone,
  notificationRef
}) 
{
  return (
    <>
    <Flex
      mt="100px"
      mb="20px"
      justify="center"
      style={{ fontFamily: 'PilatExtended-Bold' }}
    >
      <Text fontSize={{ base: '25px', md: '25px' }}>
        Create Project&nbsp;
      </Text>
      <Text
        fontSize={{ base: '25px', md: '25px' }}
        color="#4790f5"
      >
        Milestones
      </Text>
    </Flex>
    {milestoneTitle.map((item, index) => {
      return (
        <Flex direction='column' key={index}>
          <Text
            fontSize={{ base: '25px', md: '25px' }}
            color="#4790f5"
            mb = '30px'
          >
            Milestone { index + 1 }
          </Text>
          <MilestoneTitle 
            index={index}
            milestoneTitle={milestoneTitle}
            setMilestoneTitle={setMilestoneTitle}
            milestoneTitleLen={milestoneTitleLen}
            setMilestoneTitleLen={setMilestoneTitleLen}
          />
          <Flex direction="row" mt="40px" justify="space-between">
            <MilestoneType
              index={index}
              milestoneType={milestoneType}
              setMilestoneType={setMilestoneType}
            />
            <MilestoneAmount
              index={index}
              milestoneAmount={milestoneAmount}
              setMilestoneAmount={setMilestoneAmount}
              notificationRef={notificationRef}
            />
          </Flex>
          <MilestoneDescription
            index={index}
            milestoneDescription = {milestoneDescription}
            setMilestoneDescription = {setMilestoneDescription}
            milestoneDescriptionLen = {milestoneDescriptionLen}
            setMilestoneDescriptionLen = {setMilestoneDescriptionLen}
          />
          <Flex direction="row" mt="40px" justify="space-between">
            <MilestoneDate
              index={index}
              milestoneDate={milestoneStartdate}
              setMilestoneDate={setMilestoneStartdate}
              extra="Start"
            />
            <MilestoneDate
              index={index}
              milestoneDate={milestoneEnddate}
              setMilestoneDate={setMilestoneEnddate}
              extra="End"
            />
          </Flex>
          <Flex 
            w="100%" 
            mt="50px"
            pb="50px" 
            justify="space-between"
            borderBottom={'1px solid rgba(255, 255, 255, 0.3)'}
          >
            <ButtonBackTransition
              unitid={`milestonecancel${index}`}
              selected={false}
              width="250px"
              height="45px"
              rounded="33px"
            >
              <Box
                variant="solid"
                color="white"
                justify="center"
                align="center"
                onClick = {()=> onCancelMilestone()}
              >
                Cancel Milestone { index + 1 }
              </Box>
            </ButtonBackTransition>
          </Flex>
          {/* -----------------submit----------------- */}
        </Flex>
      )
    })}
    </>
  )
};
