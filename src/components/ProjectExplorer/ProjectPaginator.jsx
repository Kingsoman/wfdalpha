import React,{ useRef, useState, useEffect, forwardRef, useCallback } from 'react'
import { Flex, Button, Icon } from '@chakra-ui/react'

import Pagination from '@choc-ui/paginator'

import { useStore } from '../../store'

export default function ProjectPaginator({ current, pageSize, onChangePaginator}) 
{
  const { state, dispatch } = useStore()

  const Prev = forwardRef((props, ref) => (
    <Button ref={ref} {...props}>
      Prev
    </Button>
  ))

  const Next = forwardRef((props, ref) => (
    <Button ref={ref} {...props}>
      Next
    </Button>
  ))

  const itemRender = (_, type) => {
    if (type === 'prev') {
      return Prev
    }
    if (type === 'next') {
      return Next
    }
  }

  return (
    <Flex
      p={50}
      w="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Pagination
        bg="linear-gradient(180deg, #FE8600 21.43%, #F83E00 147.62%)"
        current={current}
        onChange={(page) => onChangePaginator(page)}
        pageSize={pageSize}
        total={
          state.activeProjectData == ''
            ? 0
            : state.activeProjectData.length
        }
        itemRender={itemRender}
        paginationProps={{ display: 'flex' }}
      />
    </Flex>
  )
};
