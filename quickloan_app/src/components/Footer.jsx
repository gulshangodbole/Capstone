import {
    Box,
    Center,
    Grid,
    HStack,
    ListItem,
    Text,
    List,
    VStack,
  } from "@chakra-ui/react";
  import React, { useEffect } from "react";
  import { BsFacebook, BsTwitter, BsPinterest } from "react-icons/bs";
  import { GrLinkedinOption } from "react-icons/gr";
  import { Link } from "react-router-dom";

  
  const Footer = () => {
    
    return (
      <Box bg={"#5a287d"} color="white" p="30px" marginTop={"0px"}>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(1, 1fr)",
            md: "repeat(1, 1fr)",
            lg: "repeat(1, 1fr)",
            xl: "repeat(1, 1fr)",
          }}
          gap="700px"
  
           
          w={{
            base: "30px",
            sm: "300px",
            md: "700px",
            lg: "900px",
            xl: "1200px",
          }}
          justifyContent={"right"}
          m="auto"
        >

          <VStack
          display={{base:"block", sm:"block", md:"block", lg:"block", xl:"block"}}
            align={"left"}
            fontSize={"18px"}
          >
        
            <List display="flex" justifyContent="space-between" mb={"20px"}>
            <Link to='/support'><ListItem>Customer Care</ListItem></Link>
            <ListItem>Loans</ListItem>
            <ListItem>Loan Calculator</ListItem>
          </List>
          </VStack>

          
          {/* <Box w="200px" >
            <Image w={"200px"} h={"100px"} src={logo} alt="logo" mb="0px"/>
          </Box> */}
        
        </Grid>
          {/* <VStack 
          display={{base:"none", sm:"none", md:"block", lg:"block", xl:"block"}}
            align={"center"}
            
            textAlign={"left"}
            m="auto"
          >
            <Heading textAlign={"left"} fontSize={"25px"} marginBottom={"30px"}>
              We're on a mission.
            </Heading>
  
            <Text w="250px">
              At Money Mentor, we're using cutting-edge technology to transform
              the industry and deliver financial services that actually work for
              you.
            </Text>
          </VStack> */}
  
          {/* <VStack
            align={"center"}
            textAlign="left"
            fontSize={"17px"}
            m="auto"
        
          >
            <Heading size="md" marginBottom={"20px"}>Company</Heading>
  
            <UnorderedList listStyleType={"none"} spacing="18px">
              <ListItem>About Us</ListItem>
            </UnorderedList>
          </VStack> */}
  
          {/* <VStack
            align={"center"}
            fontSize={"17px"}
           
          >
            <Heading marginBottom={"20px"} textAlign={"left"} size="md">
              Products
            </Heading>
            <UnorderedList listStyleType={"none"} spacing="18px">
              <ListItem>Business Loans | Main</ListItem>
              <ListItem>Loan Calculator</ListItem>
            </UnorderedList>
          </VStack> */}
  
          
  <hr></hr>
        <Center mt="20px">
        
          <HStack fontSize={"30px"} spacing={"30px"}>
          
            <BsFacebook />
            <BsTwitter />
            <GrLinkedinOption />
          </HStack>
        </Center>
  
        <Center pt="20px">
          <Text>Copyright© 2023</Text>
        </Center>
      </Box>
    );
  };
  
  export default Footer;
