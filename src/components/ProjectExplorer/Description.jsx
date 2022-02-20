import React from 'react'
import { chakra, Flex } from '@chakra-ui/react'
  
export default function Description({ data }) 
{
  return (
    <Flex flexDirection={'column'} w="60%">
      <chakra.p
        py={2}
        fontSize="15px"
        color={'gray.400'}
      >
        Date -{' '}
        <span style={{ color: '#FE8600' }}>
          {data.project_createddate}
        </span>
      </chakra.p>

      <chakra.p py={2} color={'gray.400'}>
        {data.project_description.substr(0, 250)}
      </chakra.p>
    </Flex>
  )
};
