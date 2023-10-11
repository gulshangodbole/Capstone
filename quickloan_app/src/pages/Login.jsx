import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import bcrypt from 'bcryptjs';
// import blackbgEar from "../Assets/black.jpg";
// import "animate.css";
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
} from "@chakra-ui/react";
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../redux/Authentication/action"
import login_bg from "../Images/purplebg.jpg"

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const toast = useToast();
    const location = useLocation();
    const {user} = useSelector((store) => store.AuthReducer);
    const {isAuth} = useSelector((store) => store.AuthReducer);
    const {isError} = useSelector((store) => store.AuthReducer);
    const [logindata, setLoginData] = useState({
        email: "",
        password: "",
    });

    const handleLogin = (e) => {
        e.preventDefault();
        if (!logindata.email || !logindata.password) {
            toast({
                title: "Failed!!",
                description: "Please fill all the fields.",
                status: "error",
                position: "top",
                // duration: 3000,
                isClosable: true,
            });
        } else {
            const hashFormValue = {
                email: logindata.email,
                password: bcrypt.hashSync(logindata.password, '$2a$10$CwTycUXWue0Thq9StjUM0u'),
                loans: []
            }
            dispatch(login(hashFormValue)).then((res) => {
                if (res) {
                    toast({
                        title: "Success",
                        description: "User LoggedIn Successful",
                        status: "success",
                        position: "top",
                        // duration: 4000,
                        isClosable: true,
                    });
                } else {
                    toast({
                        title: "Failed!!",
                        description: "Incorrect details",
                        status: "error",
                        position: "top",
                        //  duration: 4000,
                        isClosable: true,
                    });
                }
            });
        }
    };

    useEffect(() => {
        if (isAuth) {
            if(logindata.email === "admin@gmail.com")
                navigate(location.state?.from ? location.state.from : "/admin");
            else
                navigate(location.state?.from ? location.state.from : "/dashboard");
        }
    }, [isAuth, location.state, navigate]);
    const [submissiondisbled, setSubmissiondisbled] = useState(false);
    return (
        <>
            <Box
                style={{
                    backgroundImage: `url(${login_bg})`,
                    backgroundSize: "cover",
                }}
            >
                <form
                    onSubmit={handleLogin}
                    style={{
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        minHeight: "100vh",


                    }}

                >
                    <Flex
                        style={{
                            backgroundImage: `url(${login_bg})`,
                            backgroundSize: "cover",
                        }}
                        align={"center"}
                        justify={"center"}
                        p="50px"
                        paddingTop={10}
                        bg={useColorModeValue("gray.50", "gray.800")}
                    >
                        <Stack
                            borderRadius={"none"}
                            className="animate__animated animate__pulse"
                            w={{
                                base: "90%",
                                sm: "90%",
                                md: "80%",
                                lg: "50%",
                                xl: "40%",
                                "2xl": "40%",
                            }}
                        >
                            <Stack align={"center"}>
                                <Heading color={"black"} fontSize={"4xl"} textAlign={"center"}>
                                    LOGIN
                                </Heading>
                            </Stack>
                            <Box
                                rounded={"lg"}
                                bg={useColorModeValue("white", "gray.700")}
                                boxShadow={"lg"}
                                p={8}
                            >
                                <Stack spacing={4}>
                                    <FormControl id="email">
                                        <FormLabel>Email address</FormLabel>
                                        <Input
                                            borderRight={"none"}
                                            borderTop={"none"}
                                            focusBorderColor="none"
                                            placeholder={"Your email address"}
                                            _placeholder={{opacity: 1, color: "#a0a0a0"}}
                                            _focus={{
                                                bg: "whiteAlpha.300",
                                                borderColor: "#FFB300",
                                            }}
                                            type="email"
                                            value={logindata.email}
                                            onChange={(e) =>
                                                setLoginData((prev) => ({
                                                    ...prev,
                                                    email: e.target.value,
                                                }))
                                            }
                                        />
                                    </FormControl>
                                    <FormControl id="password">
                                        <FormLabel>Password</FormLabel>
                                        <InputGroup>
                                            <Input
                                                borderRight={"none"}
                                                borderTop={"none"}
                                                focusBorderColor="none"
                                                placeholder={"Your password"}
                                                _placeholder={{opacity: 1, color: "#a0a0a0"}}
                                                _focus={{
                                                    bg: "whiteAlpha.300",
                                                    borderColor: "#FFB300",
                                                }}
                                                value={logindata.password}
                                                onChange={(e) =>
                                                    setLoginData((prev) => ({
                                                        ...prev,
                                                        password: e.target.value,
                                                    }))
                                                }
                                                type={showPassword ? "text" : "password"}
                                            />
                                            <InputRightElement h={"full"}>
                                                <Button
                                                    variant={"ghost"}
                                                    onClick={() =>
                                                        setShowPassword((showPassword) => !showPassword)
                                                    }
                                                >
                                                    {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                    </FormControl>
                                    <Stack spacing={10} pt={2}>
                                        <Button
                                            type="submit"
                                            isDisabled={submissiondisbled}
                                            style={{
                                                background:
                                                    "linear-gradient(to top left, #171616 100%, #363431 51%)",
                                            }}
                                            loadingText="Submitting"
                                            size="lg"
                                            bg={"blue.400"}
                                            color={"white"}
                                            _hover={{
                                                bgGradient: "linear(to-r,  #363431,#171616)",
                                                border: "1px solid #FFB300 ",
                                                color: "#FFB300",
                                            }}
                                        >
                                            LOGIN
                                        </Button>
                                    </Stack>
                                    <Stack pt={6}>
                                        <Text align={"center"}>
                                            Not registered?{" "}
                                            <Link
                                                href="/signup"
                                                color={"rgb(255,189,89)"}
                                                fontWeight={"600"}
                                            >
                                                Signup
                                            </Link>
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

export default Login;
