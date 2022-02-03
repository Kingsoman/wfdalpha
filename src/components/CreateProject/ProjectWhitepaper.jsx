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
import { useStore } from '../../store';

export default function ProjectWhitepaper({whitepaper, setWhitepaper}) 
{
  const { state, dispatch } = useStore();

  function openUpload() {
    if (typeof document !== 'undefined') {
      let fileSelector = document.getElementById('fileSelector')
      fileSelector.click()
    }
  }
  function changeWhitepaper(e) {
    if (typeof document !== 'undefined') {
      let fileSelector = document.getElementById('fileSelector')
      var fileName = fileSelector.value
      setWhitepaper(
        fileName.substr(fileName.lastIndexOf('\\') + 1, fileName.length - 1),
      )

      dispatch({
        type: 'setWhitepaper',
        message: e.target.files[0],
      })
    }
  }

  return (
    <Box w="48%">
      <Flex justify="space-between">
        <Text mb="20px">Project Whitepaper</Text>
      </Flex>
      {whitepaper == '' && (
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
      {whitepaper != '' && (
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
            placeholder={whitepaper}
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
        onChange={(e) => changeWhitepaper(e)}
      />
    </Box>
  )
}
