import React, { useEffect, useState, useRef } from 'react'
import { Link, navigate } from '@reach/router'
import { WasmAPI, LCDClient, MsgExecuteContract } from '@terra-money/terra.js'
import {
  Box,
  Flex,
  Text,
  Input,
  HStack,
  VStack,
  Stack,
  Button,
  Image,
  Checkbox,
  SimpleGrid
} from '@chakra-ui/react'
import { IoBan } from 'react-icons/io5';
import { useStore } from '../store'
import { InputTransition, ButtonTransition, } from '../components/ImageTransition'
import CardBox from '../components/Staking/CardBox'
import PageLayout from '../components/PageLayout'
import Footer from '../components/Footer'
import Notification from '../components/Notification'
import { EstimateSend, FetchData, Set2Mainnet, Set2Testnet } from '../components/Util'

let constants = [
  {
    wallet: "terra1qvyj7tqs35hckd395rglc7lsyf2acuhgdcmj77",
    card_type: "platium",
    card_number: "3",
    metadata: ""
  },
  {
    wallet: "terra1qvyj7tqs35hckd395rglc7lsyf2acuhgdcmj77",
    card_type: "gold",
    card_number: "3",
    metadata: ""
  },  
  {
    wallet: "terra1qvyj7tqs35hckd395rglc7lsyf2acuhgdcmj77",
    card_type: "silver",
    card_number: "3",
    metadata: ""
  },  
  {
    wallet: "terra1qvyj7tqs35hckd395rglc7lsyf2acuhgdcmj77",
    card_type: "bronze",
    card_number: "3",
    metadata: ""
  },  
  {
    wallet: "terra1qvyj7tqs35hckd395rglc7lsyf2acuhgdcmj77",
    card_type: "gold",
    card_number: "3",
    metadata: ""
  },
];
export default function Cards() {
  const { state, dispatch } = useStore();
  const [cards, setCards] = useState(constants);

  const notificationRef = useRef();
  const api = new WasmAPI(state.lcd_client.apiRequester)

  //-----------fetch project data=-------------------------
  async function fetchContractQuery() {
    try {
      let cardInfo = await api.contractQuery(
        state.WFDTokenAddress,
        {
          get_card_info: {}
        }
      )
      // setCards(cardInfo);

      console.log(cardInfo)
    }
    catch (e) {
      console.log(e)
    }
  }

  //---------initialize fetching---------------------
  useEffect(() => {
    fetchContractQuery();
  }, [state.connectedWallet])

  function getCardTitle(cardType) {
    let title = "No Holder";
    switch (cardType.toLowerCase()) {
      case "platium": title = "Platium"; break;
      case "gold": title = "Gold"; break;
      case "silver": title = "Silver"; break;
      case "bronze": title = "Bronze"; break;
    }
    return title;
  }
  function getImagePath(card_type){
    let url;
    switch( card_type?.toLowerCase() ){
      case "platium": url = "/media/Card/Platinum.png"; break;
      case "gold": url = "/media/Card/Gold.png"; break;
      case "silver": url = "/media/Card/Silver.png"; break;
      case "bronze": url = "/media/Card/Bronze.png"; break;
    }
    return url;
  }
  return (
    <PageLayout title="Cards" subTitle1="Card" subTitle2="Holders">
      <SimpleGrid 
      columns={{
        base: 1,
        md: 2,
        lg: 2,
        xl: 3,
    }}
      spacing={10}
      >
        {cards.map((item, index) => (
          <Box h='300px' direction="column" id={index}>
            <Image 
              src={getImagePath(item.card_type)} 
              h={{
                base: '150px',
                sm: '200px'}} 
            />
            <Text>{getCardTitle(item.card_type)}</Text>
            <Text>Card Holder: {item.wallet}</Text>
          </Box>
        ))}
      </SimpleGrid>

      <Footer />
      <Notification ref={notificationRef} />
    </PageLayout>
  )
}
