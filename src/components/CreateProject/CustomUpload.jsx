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

export default function CustomUpload({typeText, type, setType, w}) 
{
  function openUpload() {
    if (typeof document !== 'undefined') {
      let fileSelector = document.getElementById('fileSelector'+typeText)
      fileSelector.click()
    }
  }
  function onChangeType(e) {
    setType(e.target.files[0]);
  }

  return (
    <Box w={w}>
      <Flex justify="space-between">
        <Text mb="20px">{typeText}</Text>
      </Flex>
      {isNull(type) && (
        <InputGroup size="sm" w='100%'>
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
        <InputGroup size="sm" w = '100%'>
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
        id={"fileSelector" + typeText}
        name="userFile"
        style={{ display: 'none' }}
        onChange={(e) => onChangeType(e)}
      />
    </Box>
  )
}
