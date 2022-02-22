import React from 'react'
import { Flex, Img } from '@chakra-ui/react'
import { useStore } from '../../store'

export default function Logo({ data }) 
{
  const {state, dispatch} = useStore();
  return (
    <Flex
      m="6px"
      p="10px"
      width="40%"
      bg="#FFFFFF"
      height="270px"
      align="center"
      justify="center"
      maxWidth={'270px'}
      borderRadius={'2xl'}
      boxShadow={'0px 4px 4px rgba(0, 0, 0, 0.25)'}
    >
      <object
        data="/logo.png"
        type="image/png"
        style={{ width: '80%' }}
      >
        <Img
          w={'100%'}
          objectFit={'contain'}
          src={`${state.request}/download?filename=${data.project_logo}`}
        />
      </object>
    </Flex>
  )
};
