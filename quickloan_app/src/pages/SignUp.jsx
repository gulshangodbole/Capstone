import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import bcrypt from 'bcryptjs'
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Link,
    Stack,
    Text,
    useColorModeValue,
    useToast
} from '@chakra-ui/react'
import login_bg from '../Images/purplebg.jpg'
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons';
import {useDispatch, useSelector} from 'react-redux'
import {signup} from "../redux/Authentication/action"


export function SignUp() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false);
    const toast = useToast()
    const {user} = useSelector((store) => store.AuthReducer)
    const {errorMessage} = useSelector((store) => store.AuthReducer)
    const [formvalue, setFormvalue] = useState({
        fullname: "",
        email: "",
        password: ""
    })

    const [submissiondisbled, setSubmissiondisbled] = useState(false)

    // console.log(value)

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!formvalue.fullname || !formvalue.email || !formvalue.password) {
            return toast({
                title: 'Register Failed!',
                description: "Please fill all the inputs",
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: "top"
            })
        }

        if (formvalue.password.length < 6) {
            return toast({
                title: 'Failed!!',
                description: "Password must be of 6 characters",
                status: 'error',
                position: 'top',
                duration: 4000,
                isClosable: true,
            })
        }

        if (!formvalue.password.split("").includes("@")) {
            return toast({
                title: 'Failed!!',
                description: "Password must contains at least one speacial character.",
                status: 'warning',
                position: 'top',
                duration: 4000,
                isClosable: true,
            })
        }

        const hashFormValue = {
            fullname: formvalue.fullname,
            email: formvalue.email,
            password: bcrypt.hashSync(formvalue.password, '$2a$10$CwTycUXWue0Thq9StjUM0u'),
        }
        dispatch(signup(hashFormValue)).then((res) => {
            console.log("RESPONSE", res)
            if (res === 1) {
                toast({
                    title: 'Success',
                    description: 'User Registered Successful',
                    status: 'success',
                    position: 'top',
                    duration: 4000,
                    isClosable: true,
                })
                setTimeout(() => {
                    navigate("/login")
                }, 3000)
                setFormvalue({fullname: "", email: "", password: ""})

            } else if (res === -1) {
                return toast({
                    title: 'Failed',
                    description: 'User Already Exists',
                    status: 'error',
                    position: 'top',
                    duration: 4000,
                    isClosable: true,
                })
            } else {
                return toast({
                    title: 'Failed',
                    description: 'User Already Exists',
                    status: 'error',
                    position: 'top',
                    duration: 4000,
                    isClosable: true,
                })
            }
        })


    }

    return (
        <>
            <Box position={"relative"} style={{
                backgroundImage: `url(${login_bg})`,
                backgroundSize: "cover",
            }}>


                <form style={{
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    minHeight: '100vh'


                }} onSubmit={handleSubmit}
                >


                    <Flex
                        style={{
                            backgroundImage: `url(${login_bg})`,
                            backgroundSize: "cover"

                        }}


                        align={'center'}
                        justify={'center'}
                        p="50px"
                        bg={useColorModeValue('gray.50', 'gray.800')}>
                        <Stack borderRadius={"none"} className="animate__animated animate__pulse"
                               w={{base: "90%", sm: "90%", md: "80%", lg: "50%", xl: "40%", "2xl": "40%"}}>
                            <Stack align={'center'}>
                                <Heading color={"black"} fontSize={'4xl'} textAlign={'center'}>
                                    SIGN UP
                                </Heading>

                            </Stack>
                            <Box

                                rounded={'lg'}
                                bg={useColorModeValue('white', 'gray.700')}
                                boxShadow={'lg'}
                                p={8}>
                                <Stack spacing={4}>

                                    <Box>
                                        <FormControl id="fullname">
                                            <FormLabel>Enter
                                                Full Name</FormLabel>
                                            <Input
                                                borderRight={"none"}
                                                borderTop={"none"}
                                                focusBorderColor='none'
                                                placeholder={'Enter your fullname'}
                                                // bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                                                _placeholder={{opacity: 1, color: '#a0a0a0'}}
                                                _focus={{
                                                    bg: 'whiteAlpha.300',
                                                    borderColor: "#FFB300"
                                                }} type="text" value={formvalue.fullname}
                                                onChange={(e) => setFormvalue((prev) => ({
                                                    ...prev,
                                                    fullname: e.target.value
                                                }))}/>
                                        </FormControl>
                                    </Box>
                                    {/* <Box>
                    <FormControl id="lastname" >
                      <FormLabel>Enter lastname</FormLabel>
                      <Input
                        borderRight={"none"}
                        borderTop={"none"}
                        focusBorderColor='none'
                        placeholder={'Enter your lastname'}
                        // bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                        _placeholder={{ opacity: 1, color: '#a0a0a0' }}
                        _focus={{
                          bg: 'whiteAlpha.300',
                          borderColor: "#FFB300"
                        }} type="text" value={formvalue.lastname} onChange={(e) => setFormvalue((prev) => ({ ...prev, lastname: e.target.value }))} />
                    </FormControl>
                  </Box> */}
                                    <FormControl id="email">
                                        <FormLabel>Email address</FormLabel>
                                        <Input
                                            borderRight={"none"}
                                            borderTop={"none"}
                                            focusBorderColor='none'
                                            placeholder={'Enter email address'}
                                            // bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                                            _placeholder={{opacity: 1, color: '#a0a0a0'}}
                                            _focus={{
                                                bg: 'whiteAlpha.300',
                                                borderColor: "#FFB300"
                                            }} type="email" value={formvalue.email}
                                            onChange={(e) => setFormvalue((prev) => ({
                                                ...prev,
                                                email: e.target.value
                                            }))}/>
                                    </FormControl>
                                    <FormControl id="password">
                                        <FormLabel>Password</FormLabel>
                                        <InputGroup>
                                            <Input borderRight={"none"}
                                                   borderTop={"none"}
                                                   focusBorderColor='none'
                                                   placeholder={'Enter password'}
                                                // bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                                                   _placeholder={{opacity: 1, color: '#a0a0a0'}}
                                                   _focus={{
                                                       bg: 'whiteAlpha.300',
                                                       borderColor: "#FFB300"
                                                   }} value={formvalue.password}
                                                   onChange={(e) => setFormvalue((prev) => ({
                                                       ...prev,
                                                       password: e.target.value
                                                   }))} type={showPassword ? 'text' : 'password'}/>
                                            <InputRightElement h={'full'}>
                                                <Button
                                                    variant={'ghost'}
                                                    onClick={() =>
                                                        setShowPassword((showPassword) => !showPassword)
                                                    }>
                                                    {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                    </FormControl>
                                    <Stack spacing={10} pt={2}>
                                        <Button
                                            type="submit"
                                            isDisabled={submissiondisbled}
                                            style={{background: "linear-gradient(to top left, #171616 100%, #363431 51%)"}}
                                            // bgGradient='linear(to-r, #171616, #363431)'
                                            loadingText="Submitting"
                                            size="lg"
                                            bg={'blue.400'}
                                            color={'white'}
                                            _hover={{
                                                // bg: 'blue.500',
                                                bgGradient: 'linear(to-r,  #363431,#171616)',
                                                border: "1px solid #FFB300 ",
                                                color: "#FFB300"
                                            }}>
                                            SIGN UP
                                        </Button>
                                    </Stack>
                                    <Stack pt={6}>
                                        <Text align={'center'}>
                                            Already a user? <Link href="/login" color={'rgb(255,189,89)'}
                                                                  fontWeight={"600"}>Login</Link>
                                        </Text>
                                    </Stack>
                                </Stack>
                            </Box>
                        </Stack>
                    </Flex>
                </form>

            </Box>


        </>
    );
}


