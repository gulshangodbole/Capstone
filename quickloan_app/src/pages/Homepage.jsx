import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Card,
    CardBody,
    Flex,
    Grid,
    Heading,
    Highlight,
    HStack,
    Image,
    List,
    ListIcon,
    ListItem,
    Spacer,
    Stack,
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    Stepper,
    StepSeparator,
    StepStatus,
    StepTitle,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Text,
    useSteps,
    VStack,
  } from "@chakra-ui/react";
  import { InfoIcon } from "@chakra-ui/icons";
  import React, { useEffect } from "react";
  import purplebg from "../Images/purplebg.jpg";
  import "aos/dist/aos.css";
  import Aos from "aos";
  import { GiReceiveMoney } from "react-icons/gi";
  import {useSelector} from 'react-redux';
  import styled, { keyframes } from "styled-components";
  import { BsFillCheckCircleFill } from "react-icons/bs";
  import { IoIosCall } from "react-icons/io";
  import { MdOutlineEmail } from "react-icons/md";
  import { Link } from "react-router-dom";
  import "react-alice-carousel/lib/alice-carousel.css";
  import banner from "../Images/loan_banner.png"
  import dena_bank from "../Images/dena_bank.jpg";
  import federal_bank from "../Images/federal_bank.png";
  import hdfc from "../Images/hdfc.jpg";
  import hsbc from "../Images/hsbc.png";
  import ICICI from "../Images/ICICI.jpg";
  import idbi from "../Images/idbi.jpg";
  import indian_bank from "../Images/indian_bank.jpg";
  import indusind from "../Images/indusind.png";
  import karnataka_bank from "../Images/karnataka_bank.jpg";
  import kotak from "../Images/kotak.png";
  import ImageScroller from "../components/ImageScroller";
  import { Provider, Carousel, LeftButton, RightButton } from "chakra-ui-carousel";

  
  const steps = [
    { title: "Find the best repayment plan using loan calculator", description: " " },
    { title: "Apply for loan with a few steps", description: "" },
    { title: "Pay as per your convenience", description: "" },
  ];
  
  const Homepage = () => {
    useEffect(() => {
      Aos.init();
    }, []);
  
    const { activeStep } = useSteps({
      index: 1,
      count: steps.length,
    });
    const { id } = useSelector((store) => {
      console.log('store:', store);
      return { id: store.AuthReducer.currentUser.id };
    });

    const elements = [
      {
        name: "Car Loan",
        img: ""
      },
      {
        name: "Home Improvement Loan",
        img: ""
      },
      {
        name: "Debt Consolidation Loan",
        img: ""
      },
      {
        name: "Wedding Loan",
        img: ""
      },
      {
        name: "Holiday Loan",
        img: ""
      }
    ];

  
    return (
      
      <Box>
        
        {/* Part-1 -------------------------------------------------------------------- */}
        <Flex
          p="20px"
          bgImage={purplebg}
          h={"500px"}
          align={"center"}
          m="auto"
          justify="space-around"
          flexDirection={{
            base: "column",
            sm: "column",
            md: "row",
            lg: "row",
            xl: "row",
          }}
          
        >
            
          <VStack
            p="20px"
            w={{
              base: "300px",
              sm: "300px",
              md: "800px",
              lg: "800px",
              xl: "800px",
            }}
            textAlign={"justify"}
            spacing="30px"
          >
            <Heading
              textAlign={{
                base: "center",
                sm: "center",
                md: "left",
                lg: "left",
                xl: "left",
              }}
              fontSize={{
                base: "21px",
                sm: "21px",
                md: "26px",
                lg: "36px",
                xl: "46px",
              }}
              letterSpacing={"1px"}
              fontFamily={"Archivoblack, sans-serif"}
              color={"white"}
            >
              Apply in a flash now for a 5 star rated loan
            </Heading>
            {id ? (
        <Link to={`verification`}><Button
        rightIcon={<GiReceiveMoney size="25px" />}
        colorScheme={"pink"}
        borderRadius={"20px"}
        variant='outline'
        size={{ base: "md", sm: "md", md: "lg", lg: "lg", xl: "lg" }}
      >
        Apply Now
      </Button></Link>
      ) : (
        <Link to="/login"><Button
        rightIcon={<GiReceiveMoney size="25px" />}
        colorScheme={"pink"}
        borderRadius={"20px"}
        variant='outline'
        size={{ base: "md", sm: "md", md: "lg", lg: "lg", xl: "lg" }}
      >
        Apply Now
      </Button></Link>
      )}
          </VStack>
  
          <Box
            w={{
              base: "300px",
              sm: "300px",
              md: "500px",
              lg: "500px",
              xl: "500px",
            }}
            data-aos="fade-left"
          >
            <FloatingImage  src={"https://images.assettype.com/fortuneindia%2F2022-06%2F1fa744fc-adb4-48fd-a40e-54e45a7edc8b%2FGettyImages_955530262.jpg?rect=0,66,2129,1198&w=1250&q=60"} />
          </Box>

        </Flex>

        {/* part-2 -------------------- */}
        <Box m="auto" mt="150px" bgColor={"#5a287d"} p="30px" marginTop={"-10px"}>
          <Heading
            mb="20px"
            fontSize={{
              base: "30px",
              sm: "30px",
              md: "35px",
              lg: "35px",
              xl: "40px",
            }}
            fontFamily={"RNHouseSans, sans-serif"}
            fontWeight={"500"}
            color="#fff"
          >Representative 7.1% APR</Heading>
          <Text noOfLines={[1, 2, 3]} color="#fff" mx="50px" fontFamily={"RNHouseSans, sans-serif"}>
            This rate is available on loans between £7,500 and £14,950. Other loan amounts are 
            available at alternative rates.  Your rate depends on your personal circumstances, 
            loan amount and term and may differ from this Representative APR
          </Text>
        </Box>
        
        <Box m="auto" mt="150px" bgColor={"#f2f2f8"} p="30px" marginTop={"-10px"}>
        <Flex px={"320px"}>
          <InfoIcon boxSize={7}/>
          <Spacer />
          <Text pt={"7px"} fontFamily={"RNHouseSans, sans-serif"} fontSize={"16px"}>To apply, you must be 18+ and a UK resident with a NatWest current account 
            (held for 3+ months).</Text>
        </Flex>

        </Box>
        

        {/* part-3 ---------------- */}
        <VStack
          w={{
            base: "300px",
            sm: "300px",
            md: "500px",
            lg: "500px",
            xl: "500px",
          }}
          m="auto"
          mt={"50px"}
          
        >
          <Heading fontFamily={"RNHouseSans"} data-aos="zoom-in-up" size="md" color={"orange"}>
            How It Works
          </Heading>
          <Heading
            data-aos="zoom-in-up"
            fontSize={{
              base: "28px",
              sm: "35px",
              md: "40px",
              lg: "40px",
              xl: "40px",
            }}
            fontFamily={"Archivobold, sans-serif"}
            color="black"
          >
            <Highlight
              query={["Effortless", "Seamless"]}
              styles={{
                px: "2",
                py: "1",
                color: "#5a287d",
              }}
              
            >
              Apply for Effortless and Seamless Loan
            </Highlight>
          </Heading>
        </VStack>
  
        <Flex
          p="20px"
          justifyContent={{
            base: "center",
            sm: "center",
            md: "center",
            lg: "space-evenly",
            xl: "space-evenly",
          }}
          flex
          m="auto"
          align={"center"}
          flexDirection={{
            base: "column",
            sm: "column",
            md: "column",
            lg: "row",
            xl: "row",
          }}
          
        >
          <Stepper
            data-aos="zoom-in-right"
            colorScheme={"purple"}
            size={"lg"}
            fontSize={{
              base: "25px",
              sm: "25px",
              md: "25px",
              lg: "25px",
              xl: "30px",
            }}
            fontFamily={"RNHouseSans, sans-serif"}
            textColor={"#5a287d"}
            index={activeStep}
            orientation="vertical"
            height="400px"
            gap="0"
          >
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator size="lg">
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>
  
                <Box
                  flexShrink="0"
                  w={{
                    base: "230px",
                    sm: "290px",
                    md: "450px",
                    lg: "350px",
                    xl: "400px",
                  }}
                >
                  <StepTitle
                    textAlign="left"
                    fontSize={{
                      base: "21px",
                      sm: "21px",
                      md: "30px",
                      lg: "25px",
                      xl: "30px",
                    }}
                  >
                    {step.title}
                  </StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </Box>
  
                <StepSeparator />
              </Step>
            ))}
          </Stepper>
  
          <Box
            mt="20px"
            w={{
              base: "300px",
              sm: "300px",
              md: "600px",
              lg: "500px",
              xl: "600px",
            }}
            borderRadius={"30px"}
            data-aos="fade-left"
          >
            <Image
              w="100%"
              borderRadius={"30px"}
              src={
                "https://i.pinimg.com/originals/e8/11/05/e811058549f7de3ab1b87d8ce59d94e2.gif"
              }
              alt="skeleton"
            />
          </Box>
        </Flex>
  
        {/* Part-3------ */}
        <ImageScroller/>
        <Box m="auto" mt="150px" bgColor={"#f2e6fa"} p="30px" marginTop={"10px"}>
          <Heading
            mb="70px"
            fontSize={{
              base: "35px",
              sm: "35px",
              md: "40px",
              lg: "40px",
              xl: "50px",
            }}
            fontFamily={"Archivobold"}
            data-aos="zoom-in"
            color="#5a287d"
          >
            Why get a loan from us?
          </Heading>
          {/* image-1---------*/}
          <Box
            data-aos="zoom-in"
            m="auto"
            w={{
              base: "500px",
              sm: "500px",
              md: "650px",
              lg: "800px",
              xl: "950px",
            }}
            display={{
              base: "none",
              sm: "none",
              md: "block",
              lg: "block",
              xl: "block",
            }}
            borderRadius={"20px"}
            boxShadow="rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"
          >
            <Image
              borderRadius={"20px"}
              w="100%"
              src={banner}
              alt="Happy family"
            />
          </Box>
  
          {/* image-2---- */}
  
          <Box
            data-aos="zoom-in"
            m="auto"
            w={{
              base: "300px",
              sm: "300px",
              // md: "650px",
              // lg: "800px",
              // xl: "950px",
            }}
            display={{
              base: "block",
              sm: "block",
              md: "none",
              lg: "none",
              xl: "none",
            }}
            borderRadius={"20px"}
            boxShadow="rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"
          >
            <Image
              borderRadius={"20px"}
              w="100%"
            //   src={family_1}
              alt="Happy family"
            />
          </Box>
          <HStack
            data-aos="zoom-in"
            pt="30px"
            px="10px"
            m="auto"
            gap={{ base: "20px", sm: "20px", md: "40px", lg: "20px", xl: "20px" }}
            justifyContent={{
              base: "center",
              sm: "center",
              md: "space-around",
              lg: "space-evenly",
              xl: "space-evenly",
            }}
            flexDirection={{
              base: "column",
              sm: "column",
              md: "row",
              lg: "row",
              xl: "row",
            }}
            w="80%"
          >
            <Box
              padding="30px"
              borderRadius={"10px"}
              boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
              backgroundColor={"white"}
              left="200"
              display={{
                base: "flex",
                sm: "flex",
                md: "block",
                lg: "block",
                xl: "block",
              }}
              flexDirection={{
                base: "column",
                sm: "column",
                md: "row",
                lg: "row",
                xl: "row",
              }}
            >
              <List spacing={3} textAlign="left" fontSize={"20px"} color="#5a287d">
                <ListItem fontSize={"30px"} fontFamily={"Archivobold"}>
                  <ListIcon
                    as={BsFillCheckCircleFill}
                    color="#5a287d"
                    fontSize={"30px"}
                  />
                  Get a free quote
                </ListItem>
                <ListItem fontSize={"30px"} fontFamily={"Archivobold"}>
                  <ListIcon
                    as={BsFillCheckCircleFill}
                    color="#5a287d"
                    fontSize={"30px"}
                  />
                  Apply in 10 minutes
                </ListItem>
                
                <ListItem fontSize={"30px"} fontFamily={"Archivobold"}>
                  <ListIcon
                    as={BsFillCheckCircleFill}
                    color="#5a287d"
                    fontSize={"30px"}
                  />
                  Highly rated
                </ListItem>
              </List>
            </Box>
  
            <Box
              pt={"20px"}
              fontSize={{
                base: "15px",
                sm: "15px",
                md: "15px",
                lg: "17px",
                xl: "17px",
              }}
              fontFamily={"RNHouseSans, sans-serif"}
              w={{
                base: "300px",
                sm: "300px",
                md: "500px",
                lg: "550px",
                xl: "550px",
              }}
              textAlign={"left"}
              color="#5a287d"
            >
              <Text>
                Check what you could borrow and your rate before you apply - without affecting
                your credit card score.
              </Text>
              <br />
              <Text>
                It takes minutes to apply online. It's also easy, as we fill out your info
                where we can.
              </Text>
              <br />
              <Text>
                Both Moneyfacts and Defaqto gave our loans five star - the best rating in 2021, 2022
                and 2023.
              </Text>
            </Box>
          </HStack>
        </Box>

        <Box mx="auto" mt="150px" mb="60px" p="30px" marginTop={"10px"}>
          <Heading
            mb="30px"
            fontSize={{
              base: "35px",
              sm: "35px",
              md: "40px",
              lg: "40px",
              xl: "50px",
            }}
            fontFamily={"Archivobold"}
            data-aos="zoom-in"
            color="#5a287d"
          >
            How long could you borrow for?
          </Heading>
          <Text mb="40px" fontFamily={"RNHouseSans"} data-aos="zoom-in">You could pay back your loan over one to 10 years - 
            it depends how much you're borrowing and what you're borrowing for.</Text>
          <TableContainer px="200px" data-aos="zoom-in">
            <Table >
              <Thead>
                <Tr>
                  <Th borderBottomWidth={"1px"} borderColor={"#00000"}><Text fontFamily={"RNHouseSans"} fontSize={"18px"}>Loan amount</Text></Th>
                  <Th borderBottomWidth={"1px"} borderColor={"#00000"}><Text fontFamily={"RNHouseSans"} fontSize={"18px"}>Time to pay back</Text></Th>
                </Tr>
                
              </Thead>
              <Tbody>
                <Tr>
                  <Td border={"none"}><Text fontFamily={"RNHouseSans"}>£1,000 - £7,450</Text></Td>
                  <Td border={"none"}><Text fontFamily={"RNHouseSans"}>1 to 5 years</Text></Td>
                </Tr>
                <Tr>
                  <Td border={"none"}><Text fontFamily={"RNHouseSans"}>£7,500 - £50,000</Text></Td>
                  <Td border={"none"}><Text fontFamily={"RNHouseSans"}>1 to 8 years</Text></Td>
                </Tr>
                <Tr>
                  <Td borderBottomWidth={"1px"} borderColor={"#00000"}><Text fontFamily={"RNHouseSans"}>£7,500 - £50,000 for home improvements</Text></Td>
                  <Td borderBottomWidth={"1px"} borderColor={"#00000"}><Text fontFamily={"RNHouseSans"}>1 to 10 years</Text></Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>

  
        {/* part-4 Banks ------ */}
  
        <Box mt="150px" textAlign={"center"} bgColor={"#fff"} p="20px" >
          <Heading color="#5a287d" data-aos="zoom-in-up" fontFamily={"Archivobold"}>
            Our Testimony
          </Heading>
  
          <Text fontFamily={"RNHouseSans"} fontSize={"22px"} mb="50px" data-aos="zoom-in-up">
            {" "}
            <span style={{ fontSize: "25px", fontWeight: "bold"}}>
              10000+ Customers
            </span>{" "}
            Trust Us to Provide{" "}
            <span style={{ fontSize: "25px", fontWeight: "bold" }}>
              Best Loans
            </span>
          </Text>
  
          <Grid
            templateColumns={{
              base: "repeat(2, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(5, 1fr)",
              xl: "repeat(5, 1fr)",
            }}
            w="80%"
            m="auto"
            alignItems={"center"}
            placeItems="center"
            textAlign={"center"}
            justifyItems="center"
          >
            <Box w="250px" h="150px" bgColor="#f2e6fa" borderRadius="20px" data-aos="zoom-in-up">
              <Text
                p={"20px"}
                w="100%"
                textAlign={"jsutify"}
                data-aos="zoom-in-up"
                fontFamily={"Archivoblack"}
                color={"#5a287d"}
              >"Natwest made getting a loan surprisingly simple and fast."</Text>
              
            </Box>
            <Text></Text>
            <Box w="250px" h="150px" bgColor="#f2e6fa" borderRadius="20px" data-aos="zoom-in-up">
            <Text
                p={"20px"}
                w="100%"
                textAlign={"jsutify"}
                data-aos="zoom-in-up"
                fontFamily={"Archivoblack"}
                color={"#5a287d"}
              >"I found the best loan rates and terms with ease on Natwest"</Text>
            </Box>
            <Text></Text>
            <Box w="250px" h="150px" bgColor="#f2e6fa" borderRadius="20px" data-aos="zoom-in-up">
            <Text
                p={"20px"}
                w="100%"
                textAlign={"jsutify"}
                data-aos="zoom-in-up"
                fontFamily={"Archivoblack"}
                color={"#5a287d"}
              >"Natwest's responsive customer support made all the difference."</Text>
            </Box>
            <Text></Text>
            <Box w="250px" h="150px" bgColor="#f2e6fa" borderRadius="20px" data-aos="zoom-in-up">
            <Text
                p={"20px"}
                w="100%"
                textAlign={"jsutify"}
                data-aos="zoom-in-up"
                fontFamily={"Archivoblack"}
                color={"#5a287d"}
              >"Getting approved for a loan was a breeze thanks to Natwest"</Text>
            </Box>
            <Text></Text>
            <Box w="250px" h="150px" bgColor="#f2e6fa" borderRadius="20px" data-aos="zoom-in-up">
            <Text
                p={"20px"}
                w="100%"
                textAlign={"jsutify"}
                data-aos="zoom-in-up"
                fontFamily={"Archivoblack"}
                color={"#5a287d"}
              >"Natwest delivered the funds I needed when I needed them."</Text>
            </Box>
            <Text></Text>
            <Box w="250px" h="150px" bgColor="#f2e6fa" borderRadius="20px" data-aos="zoom-in-up">
            <Text
                p={"20px"}
                w="100%"
                textAlign={"jsutify"}
                data-aos="zoom-in-up"
                fontFamily={"Archivoblack"}
                color={"#5a287d"}
              >"The transparency on Natwest gave me confidence in my choice."</Text>
            </Box>
            <Text></Text>
            <Box  w="250px" h="150px" bgColor="#f2e6fa" borderRadius="20px" data-aos="zoom-in-up">
            <Text
                p={"20px"}
                w="100%"
                textAlign={"jsutify"}
                data-aos="zoom-in-up"
                fontFamily={"Archivoblack"}
                color={"#5a287d"}
              >"I highly recommend Natwest for a hassle-free loan experience."</Text>
            </Box>
            <Text></Text>
            <Box w="250px" h="150px" bgColor="#f2e6fa" borderRadius="20px" data-aos="zoom-in-up">
            <Text
                p={"20px"}
                w="100%"
                textAlign={"jsutify"}
                data-aos="zoom-in-up"
                fontFamily={"Archivoblack"}
                color={"#5a287d"}
              >"Natwest provided me with flexible loan options that fit my needs."</Text>
            </Box>
            <Text></Text>
            <Box w="250px" h="150px" bgColor="#f2e6fa" borderRadius="20px" data-aos="zoom-in-up">
            <Text
                p={"20px"}
                w="100%"
                textAlign={"jsutify"}
                data-aos="zoom-in-up"
                fontFamily={"Archivoblack"}
                color={"#5a287d"}
              >"Thanks to Natwest, I had my loan approved in record time."</Text>
            </Box>
            <Text></Text>
            <Box w="250px" h="150px" bgColor="#f2e6fa" borderRadius="20px" data-aos="zoom-in-up">
            <Text
                p={"20px"}
                w="100%"
                textAlign={"jsutify"}
                data-aos="zoom-in-up"
                fontFamily={"Archivoblack"}
                color={"#5a287d"}
              >"Natwest's user-friendly interface made the process stress-free."</Text>
            </Box>
            <Text></Text>
          </Grid>
        </Box>
  
        {/* Part-5 ---- */}
  
        <Box mt="150px" >
          <Heading 
            data-aos="zoom-in-up" 
            color={"#5a287d"} 
            marginBottom={"50px"} 
            fontSize={"55px"}
            fontFamily={"Archivobold"}>
            More About Finance & Loans
          </Heading>
  
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              sm: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
              xl: "repeat(4, 1fr)",
            }}
            justifyContent="center"
            gap="30px"
            w="80%"
            m="auto"
            alignItems={"center"}
          >
            <Card
              data-aos="fade-right"
              data-aos-duration="1500"
              _hover={{
                boxShadow:
                  "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
              }}
              className="card"
              boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
            >
              <CardBody align="center">
                <Image src={"https://www.nerdwallet.com/assets/blog/wp-content/uploads/2019/10/GettyImages-578269652.jpg"} alt="article_1" borderRadius="lg" />
                <Stack textAlign={"left"}>
                  <Heading mt={"15px"} textAlign={"left"} color={"#5a287d"} size="md" fontFamily={"RNHouseSans"}>
                    Credit rating as a private customer
                  </Heading>
                  <Text color={"#5a287d"} ontFamily={"RNHouseSans"}>📆 July 24, 2023</Text>
                </Stack>
              </CardBody>
            </Card>
  
            <Card
              data-aos="fade-right"
              data-aos-duration="1500"
              _hover={{
                boxShadow:
                  "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
              }}
              boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
            >
              <CardBody align="center">
                <Image src={"https://as1.ftcdn.net/v2/jpg/01/84/82/72/1000_F_184827281_NdcaA8bOLVaQwOBzrGbrP3kmiSJ2mtD0.jpg"} alt="article_2" borderRadius="lg" />
                <Stack textAlign={"left"}>
                  <Heading mt={"15px"} textAlign={"left"} color={"#5a287d"} size="md" fontFamily={"RNHouseSans"}>
                    Get hold of your private loans with a promissory
                  </Heading>
                  <Text color={"#5a287d"} ontFamily={"RNHouseSans"}>📆 July 24, 2023</Text>
                </Stack>
              </CardBody>
            </Card>
  
            <Card
              data-aos="fade-right"
              data-aos-duration="1500"
              _hover={{
                boxShadow:
                  "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
              }}
              boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
            >
              <CardBody align="center">
                <Image src={"https://media.istockphoto.com/id/153136893/photo/couple-meeting-with-financial-advisor.jpg?b=1&s=170667a&w=0&k=20&c=Vk2CkL2YUpfZM2HdrL_pAYsIqFhlqUdM5sFIx37ct8c="} alt="article_3" borderRadius="lg" />
                <Stack textAlign={"left"}>
                  <Heading mt={"15px"} textAlign={"left"} color={"#5a287d"} size="md" fontFamily={"RNHouseSans"}>
                    What is APR and what can you actually use it?
                  </Heading>
                  <Text color={"#5a287d"} ontFamily={"RNHouseSans"}>📆 July 24, 2023</Text>
                </Stack>
              </CardBody>
            </Card>
  
            <Card
              data-aos="fade-right"
              data-aos-duration="1500"
              _hover={{
                boxShadow:
                  "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
              }}
              boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
            >
              <CardBody align="center">
                <Image src={"https://media.istockphoto.com/id/1328126737/photo/sign-a-house-sale-agreement.jpg?s=612x612&w=0&k=20&c=Jk7YWa38JMJ5L5b3-U84m2T9_9TIsfIS30rjiGI8t3k="} alt="article_4" borderRadius="lg" />
                <Stack textAlign={"left"}>
                  <Heading mt={"15px"} textAlign={"left"} color={"#5a287d"} size="md" fontFamily={"RNHouseSans"}>
                    Superfast loans for your dream home
                  </Heading>
                  <Text color={"#5a287d"} ontFamily={"RNHouseSans"}>📆 July 24, 2023</Text>
                </Stack>
              </CardBody>
            </Card>
          </Grid>
        </Box>
  
        {/* Part-6----------- */}
  
        <Box mt="150px" bgColor={"#f2e6fa"} p="30px" >
          <Flex
            m="auto"
            justifyContent={{
              base: "center",
              sm: "center",
              md: "center",
              lg: "space-evenly",
              xl: "space-evenly",
            }}
            placeItems="center"
            bgColor={"#f2e6fa"}
            flexDirection={{
              base: "column",
              sm: "column",
              md: "column",
              lg: "row",
              xl: "row",
            }}
            gap="20px"
          >
            <Box
              w={{
                base: "300px",
                sm: "300px",
                md: "500px",
                lg: "500px",
                xl: "500px",
              }}
              
            >
              <Heading textAlign={"left"} data-aos="zoom-in" textColor={"#5a287d"}>
                Our Advisors Are Ready To Help You
              </Heading>
  
              <Image
              data-aos="zoom-in-right"
                w={{
                  base: "300px",
                  sm: "300px",
                  md: "500px",
                  lg: "500px",
                  xl: "500px",
                }}
                src={"https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/179930863/original/f34cbc4acdebb9233cd7b78380ed02465174dabb/do-your-customer-service.jpg"}
                alt="women"
                borderRadius={"10px"}
              />
  
              <HStack
                flexDirection={{
                  base: "column",
                  sm: "column",
                  md: "row",
                  lg: "row",
                  xl: "row",
                }}
                mt="20px"
                spacing="30px"
                justifyContent={"center"}
                data-aos="zoom-in"
              >
                <Button
                  leftIcon={<IoIosCall />}
                  _hover={{ color: "white", backgroundColor: "#A555EC" }}
                  fontWeight={"bold"}
                  borderRadius="15px"
                  color="purple"
                >
                  01234-567890
                </Button>
  
                <Button
                  leftIcon={<MdOutlineEmail />}
                  _hover={{ color: "white", backgroundColor: "#A555EC" }}
                  fontWeight={"bold"}
                  borderRadius="15px"
                  color="purple"
                >
                  customer.care@natwest.com
                </Button>
              </HStack>
            </Box>
  
            <Box
              w={{
                base: "300px",
                sm: "300px",
                md: "600px",
                lg: "600px",
                xl: "600px",
              }}
              bgColor={"white"}
              p="20px"
              borderRadius={"20px"}
              mt="20px"
              data-aos="zoom-in"
            >
              <Accordion defaultIndex={[0]} allowMultiple>
                <AccordionItem>
                  <h2>
                    <AccordionButton textColor={"#5a287d"}>
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        fontWeight={"bold"}
                        fontSize="18px"
                      >
                        How much can I borrow
                      </Box>
                      <AccordionIcon />
                    </AccordionButton >
                  </h2>
                  <AccordionPanel textColor={"#5a287d"}>
                    The amount you can borrow depends on various factors,
                    including your income, credit score, existing debts, and the
                    lender's criteria. It's essential to consult with a financial
                    advisor or a loan officer to determine your borrowing capacity
                    accurately.
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
  
              <Accordion defaultIndex={[1]} allowMultiple>
                <AccordionItem>
                  <h2>
                    <AccordionButton textColor={"#5a287d"}>
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        fontWeight={"bold"}
                        fontSize="18px"
                      >
                        What are the requirements to get a loan offer?
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel textColor={"#5a287d"}>
                    <ul>
                      <li> You must be at least 18 years old</li>
                      <li> You must have permanent residence in India </li>
                      <li>
                        You are not registered in the RKI / Debtor Register (DBR)
                      </li>
                    </ul>
                    The offers you receive are preliminary offers, which are
                    provided that the information you have entered, are correct.
                    At the same time, you must sign the loan offer with NemID
                    before the bank can pay out your loan.
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
  
              <Accordion defaultIndex={[2]} allowMultiple>
                <AccordionItem>
                  <h2>
                    <AccordionButton textColor={"#5a287d"}>
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        fontWeight={"bold"}
                        fontSize="18px"
                      >
                        How can you reduce the cost of my loans?
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel textColor={"#5a287d"}>
                    Reducing the cost of your loans can save you money in the long
                    run and make repayment more manageable. Here are some
                    strategies to achieve that:
                    <ul>
                      <li>Shop Around for Competitive Rates</li>
                      <li>Improve Your Credit Score</li>
                      <li>Consider Refinancing</li>
                      <li>Make Larger Payments</li>
                      <li>Pay on Time</li>
                    </ul>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
  
              <Accordion defaultIndex={[3]} allowMultiple>
                <AccordionItem>
                  <h2>
                    <AccordionButton textColor={"#5a287d"}>
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        fontWeight={"bold"}
                        fontSize="18px"
                      >
                        What does it cost to use the Natwest platform?
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel textColor={"#5a287d"}>
                    The platform is absolutely free to use with no extra charges.
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
  
              <Accordion defaultIndex={[4]} allowMultiple>
                <AccordionItem>
                  <h2>
                    <AccordionButton textColor={"#5a287d"}>
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        fontWeight={"bold"}
                        fontSize="18px"
                      >
                        When is the loan paid out?
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel textColor={"#5a287d"}>
                    The amount you can borrow depends on various factors,
                    including your income, credit score, existing debts, and the
                    lender's criteria. It's essential to consult with a financial
                    advisor or a loan officer to determine your borrowing capacity
                    accurately.
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
  
              <Accordion defaultIndex={[5]} allowMultiple>
                <AccordionItem>
                  <h2>
                    <AccordionButton textColor={"#5a287d"}>
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        fontWeight={"bold"}
                        fontSize="18px"
                      >
                        When is the loan paid out?
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel textColor={"#5a287d"}>
                    The amount you can borrow depends on various factors,
                    including your income, credit score, existing debts, and the
                    lender's criteria. It's essential to consult with a financial
                    advisor or a loan officer to determine your borrowing capacity
                    accurately.
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
  
              <Accordion defaultIndex={[6]} allowMultiple>
                <AccordionItem>
                  <h2>
                    <AccordionButton textColor={"#5a287d"}>
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        fontWeight={"bold"}
                        fontSize="18px"
                      >
                        How long is the repayment period?
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel textColor={"#5a287d"}>
                    The amount you can borrow depends on various factors,
                    including your income, credit score, existing debts, and the
                    lender's criteria. It's essential to consult with a financial
                    advisor or a loan officer to determine your borrowing capacity
                    accurately.
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Box>
          </Flex>
        </Box>
  
      </Box>
    );
  };
  
  export default Homepage;
  
  const floatingAnimation = keyframes`
    0% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(0, 20px); 
    }
  `;
  const FloatingImage = styled.img`
    position: relative;
    border-radius: 10px;
    animation: ${floatingAnimation} 3s infinite ease-in-out;
    filter: drop-shadow(16px 16px 22px #000);
  `;
