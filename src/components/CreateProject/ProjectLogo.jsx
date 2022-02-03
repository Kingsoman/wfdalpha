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

export default function ProjectLogo({logo, setLogo}) 
{
  const { state, dispatch } = useStore();

  function openLogoUpload() {
    if (typeof document !== 'undefined') {
      let fileSelector = document.getElementById('fileLogoSelector')
      fileSelector.click()
    }
  }
  function changeLogo(e) {
    if (typeof document !== 'undefined') {
      let fileSelector = document.getElementById('fileLogoSelector')
      var fileName = fileSelector.value
      setLogo(
        fileName.substr(fileName.lastIndexOf('\\') + 1, fileName.length - 1),
      )

      dispatch({ type: 'setLogo', message: e.target.files[0] })
    }
  }

  return (
    <Box w="48%">
      <Flex justify="space-between">
        <Text mb="20px">Project Logo</Text>
      </Flex>
      {logo == '' && (
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
              openLogoUpload()
            }}
          />
        </InputGroup>
      )}
      {logo != '' && (
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
            placeholder={logo}
            focusBorderColor="purple.800"
            rounded="md"
            onClick={(e) => {
              openLogoUpload()
            }}
          />
        </InputGroup>
      )}
      <input
        type="file"
        id="fileLogoSelector"
        name="userFile"
        style={{ display: 'none' }}
        onChange={(e) => changeLogo(e)}
      />
    </Box>
  )
}
