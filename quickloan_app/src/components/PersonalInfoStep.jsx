import React from 'react'
import {Box, Button, Center, FormControl, FormLabel, Input, Text, Flex} from '@chakra-ui/react'
import {useSelector} from 'react-redux'

export const PersonalInfoStep = ({userInfo, handleChange, onNext}) => {

    const currentUser = useSelector(store => store.AuthReducer.currentUser)
    const isContactInValid = userInfo.contact.toString().length != 10;
    return (
        <Center>
            <Box w={{base: "200px", sm: "150px", md: "300px", lg: "420px", xl: "700px"}}>
                <Text mt={{base: "50px", sm: "50px", lg: "0px", md: "0px", xl: "0px"}} fontSize={"20px"}
                      fontWeight={"bold"} color={"#283593"}>Personal Information</Text>

                <FormControl isRequired m={"20px"}>
                    <FormLabel>Full Name</FormLabel>
                    <Input type='text' placeholder='Full Name' name={"fullname"} value={userInfo.fullname}
                           onChange={handleChange} required/>
                </FormControl>
                <FormControl isRequired m={"20px"}>
                    <FormLabel>Contact Number</FormLabel>
                    <Input type='tel' placeholder='Contact Number' name={"contact"} value={userInfo.contact}
                           onChange={handleChange} required/>
                           {isContactInValid && (
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
                                Contact must be 10 digits
                            </Text>
                        </Flex>
                    )}
                </FormControl>
                <FormControl isRequired m={"20px"}>
                    <FormLabel>Email</FormLabel>
                    <Input type='email' placeholder='Email' name={"email"} value={userInfo.email}
                           onChange={handleChange} required/>
                </FormControl>
                <FormControl isRequired m={"20px"}>
                    <FormLabel>Address</FormLabel>
                    <Input type='text' placeholder='Address' name={"address"} value={userInfo.address}
                           onChange={handleChange} required/>
                </FormControl>
                <Center>
                    <Button variant={'outline'} onClick={onNext} colorScheme='purple' isDisabled={isContactInValid}>Next</Button>
                </Center>
            </Box>
        </Center>
    )
}
