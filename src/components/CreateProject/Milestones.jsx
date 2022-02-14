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
  milestoneType,
  setMilestoneType,
  milestoneAmount,
  setMilestoneAmount,
  milestoneDescription,
  setMilestoneDescription,
  milestoneStartdate,
  setMilestoneStartdate,
  milestoneEnddate,
  setMilestoneEnddate,
  notificationRef
}) 
{
  function onNewMilestone() {
    let ar = [...milestoneTitle]
    ar.push('')
    setMilestoneTitle(ar)
  }
  function onCancelMilestone() {
    if (milestoneTitle.length <= 1) return
    let ar = [...milestoneTitle]
    ar.pop()
    setMilestoneTitle(ar)
  }
  return (
    <>
    <Flex
      mt="100px"
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
        <Flex direction='column' key={index} mt='30px'>
          <Text
            fontSize={{ base: '25px', md: '25px' }}
            color="#4790f5"
            mb = '10px'
          >
            Milestone { index + 1 }
          </Text>
          <MilestoneTitle 
            index={index}
            milestoneTitle={milestoneTitle}
            setMilestoneTitle={setMilestoneTitle}
          />
          <Flex direction="row" mt="30px" justify="space-between">
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
          />
          <Flex direction="row" mt="30px" mb='30px' justify="space-between">
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
        </Flex>
      )
    })}

    <Flex
      w="100%"
      mt="30px"
      pt="30px"
      pb="30px"
      mb="50px"
      justify="center"
      borderBottom={'1px solid rgba(255, 255, 255, 0.3)'}
    >
      <ButtonBackTransition
        unitid="AddNewMilestone"
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
          onClick={onNewMilestone}
        >
          Add Milestone
        </Box>
      </ButtonBackTransition>

      <ButtonBackTransition
        unitid="CancelMilestone"
        selected={false}
        width="250px"
        height="45px"
        rounded="33px"
        ml = '30px'
      >
        <Box
          variant="solid"
          color="white"
          justify="center"
          align="center"
          onClick={onCancelMilestone}
        >
          Cancel Milestone {milestoneTitle.length}
        </Box>
      </ButtonBackTransition>
    </Flex>
    </>
  )
};
