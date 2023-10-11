import React from 'react'
import {
    Alert,
    AlertIcon,
    Box,
    Button,
    Center,
    FormControl,
    FormLabel,
    HStack,
    Input,
    Select,
    Text,
    Flex,
    VStack
} from '@chakra-ui/react'

export const LoanSpecificationsStep = ({alert, userInfo, handleChange, handleSubmit, onPrevious}) => {
    const isLoanAmountInValid = userInfo.loanAmount < 0;
    const isLoanTermInValid = userInfo.loanTerm > 72 || userInfo.loanTerm < 12;
    
    return (
        <Center>
            <VStack>
                <Box>
                    {alert ? <Alert status='error'>
                        <AlertIcon/>
                        Please fill all form details before submitting !!!
                    </Alert> : ""}
                </Box>
                <Box w={{base: "200px", sm: "200px", md: "500px", lg: "600px", xl: "700px"}}>

                    <Text mt={"50px"} fontSize={"20px"} fontWeight={"bold"} color={"#283593"}>Loan Specifications</Text>

                    <FormControl isRequired m={"20px"} >
                        <FormLabel>Loan Type</FormLabel>
                        <Select
                            
                            placeholder='Select Loan Type'
                            name={"loanType"}
                            value={userInfo.loanType}
                            onChange={handleChange}
                            marginLeft={{base: "10px", sm: "10px", md: "20px", lg: "30px", xl: "35px"}}
                            w={{base: "180px", sm: "180px", md: "455px", lg: "540px", xl: "630px"}}
                        >
                            <option value='personalloan'>Personal Loan</option>
                            <option value='homeloan'>Home Loan</option>
                            <option value='educationloan'>Education Loan</option>
                            <option value='businessloan'>Business Loan</option>
                        </Select>
                    </FormControl>

                    <FormControl isRequired m={"20px"}>
                        <FormLabel>Loan Amount Requested</FormLabel>
                        
                        <Input
                            type='number'
                            placeholder='0 ₹'
                            name={"loanAmount"}
                            value={userInfo.loanAmount}
                            onChange={handleChange}
                        />
                         {isLoanAmountInValid && (
                        <Flex>
                            <Text
                                color={"red"}
                                pl={"3em"}
                                fontSize={{
                                    base: "10px",
                                    sm: "12px",
                                    md: "15px",
                                    lg: "15px",
                                    xl: "15px",
                                }}
                            >
                                Enter positive amount
                            </Text>
                        </Flex>
                    )}
                        
                    </FormControl>

                    <FormControl isRequired m={"20px"}>
                        <FormLabel>Desired Loan Term</FormLabel>
                        <Input
                            type='number'
                            placeholder='Desired Loan Term (in months)'
                            name={"loanTerm"}
                            value={userInfo.loanTerm}
                            onChange={handleChange}
                        />
                        {isLoanTermInValid && (
                        <Flex>
                            <Text
                                color={"red"}
                                pl={"3em"}
                                fontSize={{
                                    base: "10px",
                                    sm: "12px",
                                    md: "15px",
                                    lg: "15px",
                                    xl: "15px",
                                }}
                            >
                                Enter term between 12 to 72 months
                            </Text>
                        </Flex>
                    )}
                    </FormControl>

                    <FormControl isRequired m={"20px"}>
                        <FormLabel>Purpose of the Loan</FormLabel>
                        <Input
                            
                            type='text'
                            placeholder='For example: Home Renovation'
                            name={"loanPurpose"}
                            value={userInfo.loanPurpose}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <HStack display={"flex"} justifyContent={"space-around"}>
                        <Button variant={'outline'} onClick={onPrevious} colorScheme='purple'>Prev</Button>
                        <Button isDisabled={alert || isLoanAmountInValid || isLoanTermInValid} variant={'solid'} onClick={handleSubmit} colorScheme='green'>Submit</Button>
                    </HStack>
                </Box>
            </VStack>
        </Center>
    )
}
