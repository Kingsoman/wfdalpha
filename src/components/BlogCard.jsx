import React from "react"
import {ShortenText} from "./Util"
import {ToText}from "./Util"
import {
    chakra,
    Box,
    Image,
    Flex,
    Link,
    SimpleGrid,
    Icon
  } from "@chakra-ui/react";
  import {
    BsArrowUpRight,
  } from 'react-icons/bs'
  import {ImageTransition, ButtonTransition} from '../components/ImageTransition'
  

export default function BlogCard(props) {
  const monthShortname = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const splitDate = props.pubDate.split(" ");
  const date = splitDate[0];
  const splitMonth = date.split("-");
  const finalDate =
    monthShortname[Number(splitMonth[1] - 1)] +
    " " +
    splitMonth[2] +
    "," +
    " " +
    splitMonth[0];
  const d = new Date();

  return (
    <Box
    mx="auto"
    rounded="lg"
    shadow="md"
    bg={'rgba(20, 48, 124, 0.74)'}
    border={'2px solid rgba(255, 255, 255, 0.05)'}
    backdropFilter={'blur(150px)'}
    maxW="2xl"
    maxH="4xl"
    minH="4xl"
  >
    <Image
      roundedTop="lg"
      w="full"
      h={64}
      fit="cover"
      src={props.thumbnail}
      alt="Article"
    />

    <Box p={6}>
      <Box>
        <Link
          href = {props.link}
          display="block"
          color={"white"}
          fontWeight="bold"
          fontSize="2xl"
          mt={2}
          _hover={{ color: "blue.600", textDecor: "underline" }}
          minH = {'150px'}
          
        >
           {ShortenText(props.title, 0, 100)}
        </Link>
        <chakra.p
          mt={2}
          fontSize="sm"
          color={"gray.200"}
          minH = {'350px'}
          maxH= {'350px'}
          overflow= {'hidden'}
        >
          {`${ToText(props.description.substring(0, 1000))}...`}
        </chakra.p>
      </Box>

      <Box mt={4}>
        <Flex alignItems="center">
          <Flex alignItems="center">
            <Link
              mx={2}
              fontWeight="bold"
              color={"gray.200"}
              
            >
              {props.author}
            </Link>
          </Flex>
          <chakra.span
            mx={1}
            fontSize="sm"
            color={"gray.200"}
          >
            {finalDate}
          </chakra.span>
          <a href={props.link}>
          <Flex
            ml={{ base: '0px', md: '0px', lg: '45px' }}
            alignSelf={{ base: 'center', md: 'center', lg: 'flex-end'}}
          >
            <ImageTransition
              unitid={ShortenText(props.title, 0, 10)}
              border1="linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)"
              background1="linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)"
              border2="linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)"
              background2="linear-gradient(180deg, #1A133E 0%, #1A133E 100%)"
              border3="linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)"
              background3="linear-gradient(180deg, #171347 0%, #171347 100%)"
              selected={false}
              width="145px"
              height="45px"
              rounded="33px"
            >
              <Box
                variant="solid"
                color="white"
                justify="center"
                align="center"
                pl={'10px'}
                
              
              >
                Read More{' '}
                <Icon as={BsArrowUpRight} h={4} w={4} mr={3} />
              </Box>
            </ImageTransition>
          </Flex>
          </a>
        </Flex>
      </Box>
    </Box>
    
  </Box>
  );
}
