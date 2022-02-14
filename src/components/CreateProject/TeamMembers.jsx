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

import TeamMemberDescription from './TeamMember/TeamMemberDescription'
import TeamMemberInput from './TeamMember/TeamMemberInput'

export default function TeamMembers({
  description,
  setDescription,
  role,
  setRole,
  linkedin,
  setLinedin
}) 
{
  function onNewTeamMember() {
    let ar = [...description]
    ar.push('')
    setDescription(ar)
  }
  function onCancelTeamMember() {
    if (description.length <= 1) return
    let ar = [...description]
    ar.pop()
    setDescription(ar)
  }

  return (
    <>
    <Flex
      mt="100px"
      justify="center"
      style={{ fontFamily: 'PilatExtended-Bold' }}
    >
      <Text fontSize={{ base: '25px', md: '25px' }}>
        Team Members
      </Text>
    </Flex>
    {description.map((item, index) => {
      return (
        <Flex direction='column' key={index}>
          <Text
            fontSize={{ base: '25px', md: '25px' }}
            color="#4790f5"
            mb = '10px'
          >
            TeamMember { index + 1 }
          </Text>
          <TeamMemberDescription 
            index = {index}
            typeText= 'Description'
            type = {description}
            setType = {setDescription}
          />
          <Flex direction="row" mb='30px'>
            <TeamMemberInput 
              index = {index}
              typeText= 'Role'
              type = {role}
              setType = {setRole}
              style = {{width:'30%'}}
            />
            <TeamMemberInput 
              index = {index}
              typeText= 'Linkedin Link'
              type = {linkedin}
              setType = {setLinedin}
              style = {{width: '70%', marginLeft:'30px'}}
            />
          </Flex>
          {/* -----------------submit----------------- */}
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
          onClick={onNewTeamMember}
        >
          Add TeamMember
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
          onClick={onCancelTeamMember}
        >
          Cancel TeamMember {description.length}
        </Box>
      </ButtonBackTransition>
    </Flex>
    </>
  )
};
