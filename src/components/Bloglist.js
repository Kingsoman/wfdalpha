import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import {
  SimpleGrid, chakra, Box, Flex, Text, 
} from "@chakra-ui/react";
import axios from "axios";
import BlogCard from "./BlogCard";
class Bloglist extends React.Component {
  constructor(props) {
    super(props);
    this.state = { itemRows: [], avatar: "", profileLink: "" };
  }
  mediumURL =
    "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@wefundofficial";

  async componentDidMount() {
    await axios
      .get(this.mediumURL)
      .then(async (res) => await res.data)
      .then((data) => {
        // create two-dimensional array with 3 elements per inner array
        const avatar = data.feed.image;
        const profileLink = data.feed.link;
        const res = data.items; //This is an array with the content. No feed, no info about author etc..
        const posts = res.filter((item) => item.categories.length > 0);

        this.setState({ avatar: avatar, profileLink: profileLink });
        const itemRows = [];
        posts.forEach((item, i) => {
          item["avatar"] = this.state.avatar; // push avatar inside the json
          item["profilelink"] = this.state.profileLink; // push profile link inside the JSON
          const row = Math.floor(i / 3);
          if (!itemRows[row]) itemRows[row] = [];
          itemRows[row].push(item);
        });

        this.setState({ itemRows: itemRows });
      });
  }
  render() {
    const { itemRows } = this.state;

    return (
        <ChakraProvider>
            <div 
            style=
            {{background:"linear-gradient(90deg, #1F0021 0%, #120054 104.34%)", 
            width:'100%', 
            color:'white', 
            fontSize:'18px', 
            fontFamily:'Sk-Modernist-Regular', 
            fontWeight:'500' }}>
                <div 
                style=
                {{backgroundImage:"url('/media/createproject_banner_emphasis.svg')", 
                width:'100%', 
                zIndex:'10'}}>
                <div 
                style=
                {{backgroundImage:"url('/media/createproject_banner.svg')", 
                position:'absolute', 
                top:'80px', 
                width:'100%', 
                zIndex:'11', 
                backgroundPosition:'center', 
                backgroundRepeat:'no-repeat', 
                backgroundSize:'cover', 
                zIndex:'11'}}>
                <Flex 
                pt='95px' 
                justify="center">
                    <Text 
                    fontSize='16px' 
                    fontWeight='normal' 
                    color={'rgba(255, 255, 255, 0.54)'}>
                        Home &gt;&nbsp;
                    </Text>
                    <Text 
                    fontSize='16px' 
                    color={'rgba(255, 255, 255, 0.84)'}>
                        Blog
                    </Text>
                </Flex>
                <Flex 
                    mt='11px' pb='55px'
                    mb="20px" justify='center'
                    style={{fontFamily:'PilatExtended-Bold'}}>
                    <Text 
                    fontSize={{base:'25px',md:'25px',lg:'40px'}} 
                    color='#4790f5'>
                        Blog Stories
                    </Text>
                    <Text fontSize={{base:'25px',md:'25px',lg:'40px'}}>   
                        &nbsp;of WeFund
                    </Text>
                </Flex>
                </div>
                </div>
                <SimpleGrid
                p={{
                    base: 10,
                    md: 10,
                    lg: 50
                }}
                mt={'300px'}
                w="full"
                alignItems="center"
                justifyContent="center"
                alignContent='center'
                spacing="6"
                columns={{
                    base: 1,
                    md: 3,
                }}
                >
                    {itemRows.map((row, id) =>
                    row.map((item, key) => <BlogCard {...item} key={key} />)
                    )}
                </SimpleGrid>
            </div>
        </ChakraProvider>
    );
  }
}
export default Bloglist;