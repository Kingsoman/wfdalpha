import React from 'react'
import { Flex, Box, Icon } from '@chakra-ui/react'
import { BsArrowUpRight } from 'react-icons/bs'
import { Link, useNavigate } from '@reach/router'

import { 
  ButtonBackTransition, 
  ButtonOrangeBackTransition 
} from '../../components/ImageTransition'


export default function MainButtons({ index, data }) 
{
  return (
    <Flex w={'305px'} justify={'space-between'}>
      <ButtonBackTransition
        unitid={'visit' + index}
        width="150px"
        height="45px"
        selected={false}
        rounded="33px"
      >
        <Flex
          color="white"
          align="center"
          justify="center"
          fontSize={{ base: '14px', lg: '16px' }}
          onClick={() =>
            window.open(
              data.project_website,
              '_blank',
              'noopener,noreferrer',
            )
          }
        >
          Visit Website
          <Icon
            ml={'5px'}
            as={BsArrowUpRight}
            h={{ base: 3, lg: 4 }}
            w={{ base: 3, lg: 4 }}
          />
        </Flex>
      </ButtonBackTransition>

      <ButtonOrangeBackTransition
        unitid={'view' + index}
        selected={false}
        width="150px"
        height="45px"
        rounded="33px"
      >
        <Link
          to={`/detail?project_id=${data.project_id}`}
          fontSize={{ base: '14px', lg: '16px' }}
          color="white"
        >
          View Project
        </Link>
      </ButtonOrangeBackTransition>
    </Flex>
  )
};
