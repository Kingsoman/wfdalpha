import React from 'react'
import {
  Flex,
  Text,
  Box,
  Spacer
} from '@chakra-ui/react'

import {
  ImageTransition,
  ButtonBackTransition
} from '../../ImageTransition'

import MilestoneTitle from './MilestoneTitle'
import MilestoneType from './MilestoneType'
import MilestoneAmount from './MilestoneAmount'
import MilestoneDescription from './MilestoneDescription'
import MilestoneDate from './MilestoneDate'

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
      <Text fontSize={{ base: '12px', md: '21px', lg: '25px' }}>
        Create&nbsp;
      </Text>
      <Text
        fontSize={{ base: '12px', md: '21px', lg: '25px' }}
        color="#4790f5"
      >
        Milestones
      </Text>
      <Text fontSize={{ base: '12px', md: '21px', lg: '25px' }}>
        &nbsp;for the Project
      </Text>
    </Flex>
    {milestoneTitle.map((item, index) => {
      return (
        <Flex direction='column' key={index} mt='30px'>
          <Text
            fontSize={{ base: '14px', md: '21px', lg: '25px' }}
            color="#4790f5"
            mb = '10px'
          >
            Milestone - {index+1}
          </Text>
          <MilestoneTitle 
            index={index}
            milestoneTitle={milestoneTitle}
            setMilestoneTitle={setMilestoneTitle}
          />
          <Flex direction={{ base: 'column', md: 'row', lg: 'row' }} mt="40px">
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
          <Flex direction={{ base: 'column', md: 'row', lg: 'row' }} mt="40px" justify={'space-between'}>
            <MilestoneDate
              index={index}
              milestoneDate={milestoneStartdate}
              setMilestoneDate={setMilestoneStartdate}
              extra="Start"
            />
            <Spacer />
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
