import React from 'react'
import {   
  CircularProgress,
  CircularProgressLabel, 
} from '@chakra-ui/react'
  
export default function CircularProgresses({ activeTab, data, sz }) 
{
  const released = data?.releasedPercent
  const backer = data?.backer_backedPercent
  return (
    <>
      {activeTab == 'Fundraising' && (
        <>
          <CircularProgress value={backer} size={sz} color="blue.600">
            <CircularProgressLabel>{backer}%</CircularProgressLabel>
          </CircularProgress>
        </>
      )}
      {activeTab == 'MileStoneDelivery' && (
        <CircularProgress value={released} size={sz} color="blue.600">
          <CircularProgressLabel>{released}%</CircularProgressLabel>
        </CircularProgress>
      )}
    </>
  )
};
