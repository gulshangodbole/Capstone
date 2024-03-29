import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {useDispatch, useSelector} from 'react-redux';
import {submitForm} from "../redux/SupportRedux/action";
import {Box, Button, Flex, Heading, Icon, Input, Stack, Text, Textarea} from '@chakra-ui/react';
import {FaEnvelope, FaMobile, FaUser} from 'react-icons/fa';
import {motion} from 'framer-motion';


export const Support = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formData = useSelector((store) => store.supportReducer);
    const [formvalue, setFormvalue] = useState({
        name: "",
        email: "",
        contact: "",
        message: "",
        status: "Open"
    });


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (formvalue.contact.length != 10) {
                alert('Please enter a valid 10-digit contact number.');
                return;
            }
            const response = await dispatch(submitForm(formvalue));
            console.log(response.status)
            if (response.status === "Open") {
                console.log('Form submitted successfully');
                //window.alert("Submitted your concern!");
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Your query has reached us! We\'ll get back to you as soon as we can',
                    showConfirmButton: false,
                    timer: 2500
                })
                navigate(`/dashboard`);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Sorry! We are unable to take your query now. Please try again later.',
                showConfirmButton: false,
                timer: 2500
            })
            navigate(`/dashboard`);
        }

    };

    return (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.5}}>
            <Flex
                direction="column"
                align="center"
                justify="center"
                minH="100vh"
                bgGradient="radial(at center,  #993399, #3f1d67)"
            >
                <Stack spacing={6} align="center">
                    <Box p={6} w={['100%', '100%', '100%', '600px']} rounded="lg" boxShadow="xl" bg="gray.100"
                         color="gray.800">
                        <Heading size="2xl" fontWeight="bold" color="#3f1d67" mb={4}>
                            Contact Us
                        </Heading>
                        <Text fontSize="lg" color="gray.600" fontWeight="bold" mb={4}>
                            We're here to help!
                        </Text>
                        <form style={{width: '100%'}} onSubmit={handleSubmit}>
                            <Stack spacing={4}>
                                <Flex align="center">
                                    <Icon as={FaUser} boxSize={6} color="purple.600"/>
                                    <Input
                                        type="text"
                                        placeholder="Name"
                                        ml={4}
                                        flex="1"
                                        bg="white"
                                        border="none"
                                        _focus={{bg: 'gray.200', border: 'none'}}
                                        py={4}
                                        required
                                        value={formvalue.name}
                                        onChange={(e) => setFormvalue((prev) => ({...prev, name: e.target.value}))}
                                    />
                                </Flex>
                                <Flex align="center">
                                    <Icon as={FaEnvelope} boxSize={6} color="purple.600"/>
                                    <Input
                                        type="email"
                                        placeholder="Email"
                                        ml={4}
                                        flex="1"
                                        bg="white"
                                        border="none"
                                        _focus={{bg: 'gray.200', border: 'none'}}
                                        py={4}
                                        required
                                        value={formvalue.email}
                                        onChange={(e) => setFormvalue((prev) => ({...prev, email: e.target.value}))}
                                    />
                                </Flex>
                                <Flex align="center">
                                    <Icon as={FaMobile} boxSize={6} color="purple.600"/>
                                    <Input
                                        type="text"
                                        placeholder="Contact No."
                                        ml={4}
                                        flex="1"
                                        bg="white"
                                        border="none"
                                        _focus={{bg: 'gray.200', border: 'none'}}
                                        py={4}
                                        required
                                        value={formvalue.contact}
                                        onChange={(e) => setFormvalue((prev) => ({...prev, contact: e.target.value}))}
                                    />
                                </Flex>
                                <Textarea
                                    placeholder="Type your query"
                                    flex="1"
                                    bg="white"
                                    border="none"
                                    _focus={{bg: 'gray.200', border: 'none'}}
                                    py={4}
                                    required
                                    value={formvalue.message}
                                    onChange={(e) => setFormvalue((prev) => ({...prev, message: e.target.value}))}
                                />
                                <Button
                                    colorScheme="purple"
                                    type="submit"
                                    bg="purple.600"
                                    _hover={{bg: 'purple.700'}}
                                >
                                    Submit
                                </Button>
                            </Stack>
                        </form>
                    </Box>
                </Stack>
            </Flex>
        </motion.div>
    )
}
