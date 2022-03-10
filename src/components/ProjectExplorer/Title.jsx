import React from 'react'
import { Box, chakra } from '@chakra-ui/react'
import { useStore } from '../../store'
import {
  GetProjectStatus, GetProjectStatusString
} from '../Util'

export default function Title({ data, activeTab }) {
  const { state, dispatch } = useStore();
  return (
    <Box>
      <chakra.h1
        mb={'15px'}
        color="white"
        fontSize="lg"
        fontWeight="bold"
      >
        Project Status: Under&nbsp;
        {GetProjectStatusString(GetProjectStatus(activeTab))}
      </chakra.h1>
      <chakra.h1
        color="white"
        fontSize="lg"
        fontWeight="bold"
        textAlign="left"
      >
        {data.project_title}
      </chakra.h1>
    </Box>
  )
};
