import React from 'react'
import {
  Flex,
  Text,
  Box,
  Stack
} from '@chakra-ui/react'

import VestingInput from './VestingInput'
import StageSimpleNumberInput from './StageSimpleNumberInput'

export default function Stages({
  stages,
  stagePrice,
  setStagePrice,
  stageAmount,
  setStageAmount,
  stageVestingSoon,
  setStageVestingSoon,
  stageVestingAfter,
  setStageVestingAfter,
  stageVestingPeriod,
  setStageVestingPeriod,
  notificationRef
}) 
{
  return (
    <>
    {stages.map((item, index) => {
      return (
        <Flex direction='column' key={index}>
          <Stack 
            mt = '30px' 
            direction={{base:'column', md:'row', lg:'row'}} 
            spacing='30px'
          >
            <StageSimpleNumberInput
              index = {index}
              typeText = {`Price set at ${item}`}
              type={stagePrice} 
              setType={setStagePrice}
              notificationRef={notificationRef}
              w = {{base:'100%', md:'50%', lg:'50%'}}
            />
            <StageSimpleNumberInput
              index = {index}
              typeText = {`Token Amount at ${item}`}
              type={stageAmount} 
              setType={setStageAmount}
              notificationRef={notificationRef}
              w = {{base:'100%', md:'50%', lg:'50%'}}
            />
          </Stack>
          <VestingInput
            index = {index}
            typeText = {`${index}`}
            soon={stageVestingSoon}
            setSoon={setStageVestingSoon}
            after={stageVestingAfter}
            setAfter={setStageVestingAfter}
            period={stageVestingPeriod}
            setPeriod={setStageVestingPeriod}
          />
        </Flex>
      )
    })}
    </>
  )
};
