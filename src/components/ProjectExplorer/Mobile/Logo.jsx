import React from 'react'
import { Flex, Img } from '@chakra-ui/react'
import { useStore } from '../../../store'

export default function MobileLogo({ data }) 
{
  const {state, dispatch} = useStore();
  return (
    <Flex
      mx="6px"
      p="10px"
      width="100%"
      bg="#FFFFFF"
      height="200px"
      align="center"
      justify="center"
      borderRadius={'2xl'}
      boxShadow={'0px 4px 4px rgba(0, 0, 0, 0.25)'}
    >
      <object
        data="/logo.png"
        type="image/png"
        style={{ width: '40%' }}
      >
        <Img
          w="100%"
          objectFit="contain"
          src={`${state.request}/download?filename=${data.project_logo}`}
        />
      </object>
    </Flex>
  )
};
