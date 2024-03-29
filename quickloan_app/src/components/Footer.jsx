import {Box, Center, Grid, HStack, List, ListItem, Text, VStack,} from "@chakra-ui/react";
import React from "react";
import {BsFacebook, BsTwitter} from "react-icons/bs";
import {GrLinkedinOption} from "react-icons/gr";
import {Link} from "react-router-dom";


const Footer = () => {
    const openFacebook = () => {
        const url = 'https://www.facebook.com/NatWest/'; // Replace with the URL you want to open
        window.open(url, '_blank'); // '_blank' opens the link in a new tab or window
    };
    const openTwitter = () => {
        const url = 'https://twitter.com/NatWestGroup'; // Replace with the URL you want to open
        window.open(url, '_blank'); // '_blank' opens the link in a new tab or window
    };
    const openLinkedIn = () => {
        const url = 'https://www.linkedin.com/company/natwest'; // Replace with the URL you want to open
        window.open(url, '_blank'); // '_blank' opens the link in a new tab or window
    };

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
                    display={{base: "block", sm: "block", md: "block", lg: "block", xl: "block"}}
                    align={"left"}
                    fontSize={"18px"}
                    fontFamily={"RNHouseSans"}
                >

                    <List display="flex" justifyContent="space-between" mb={"20px"}>
                        <Link to='/support'><ListItem>Customer Care</ListItem></Link>
                        <Link to='/dashboard'><ListItem>Loans</ListItem></Link>
                        <Link to='/calculator'><ListItem>Loan Calculator</ListItem></Link>
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

                    <button onClick={openFacebook}><BsFacebook/></button>
                    <button onClick={openTwitter}><BsTwitter/></button>
                    <button onClick={openLinkedIn}><GrLinkedinOption/></button>
                </HStack>
            </Center>

            <Center pt="20px">
                <Text>Copyright © Natwest 2023</Text>
            </Center>
        </Box>
    );
};

export default Footer;
