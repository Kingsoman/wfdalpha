import React from 'react'
import {
  Flex,
  Text,
  InputGroup,
  InputLeftElement,
  Input,
  Box,
} from '@chakra-ui/react';

import { IoCloudUploadOutline, IoCheckbox } from 'react-icons/io5';
import {isNull} from '../Util'

export default function CustomUpload({typeText, type, setType, setFile}) 
{
  function openUpload() {
    if (typeof document !== 'undefined') {
      let fileSelector = document.getElementById('fileSelector')
      fileSelector.click()
    }
  }
  function onChangeType(e) {
    setType(e.target.files[0]);
console.log(e.target.files[0]);
  }

  return (
    <Box mt='30px' w="48%">
      <Flex justify="space-between">
        <Text mb="20px">{typeText}</Text>
      </Flex>
      {isNull(type) && (
        <InputGroup size="sm">
          <InputLeftElement
            h="55px"
            pointerEvents="none"
            children={
              <IoCloudUploadOutline
                color="#00A3FF"
                width="30px"
                height="30px"
              />
            }
          />
          <Input
            type="text"
            h="55px"
            bg="#FFFFFF"
            borderColor="#FFFFFF33"
            placeholder="Upload here"
            focusBorderColor="purple.800"
            rounded="md"
            onClick={(e) => {
              openUpload()
            }}
          />
        </InputGroup>
      )}
      {!isNull(type) && (
        <InputGroup size="sm">
          <InputLeftElement
            h="55px"
            pointerEvents="none"
            children={
              <IoCheckbox color="00A3FF" width="30px" height="30px" />
            }
          />
          <Input
            type="text"
            h="55px"
            bg="#FFFFFF"
            borderColor="#FFFFFF33"
            placeholder={type.name}
            focusBorderColor="purple.800"
            rounded="md"
            onClick={(e) => {
              openUpload()
            }}
          />
        </InputGroup>
      )}
      <input
        type="file"
        id="fileSelector"
        name="userFile"
        style={{ display: 'none' }}
        onChange={(e) => onChangeType(e)}
      />
    </Box>
  )
}
