import { useState, useEffect } from 'react'
import {
    Progress,
    Box,
    ButtonGroup,
    Button,
    Flex,
    Spacer
} from '@chakra-ui/react'

import { useToast } from '@chakra-ui/react'
import LoanId from '../components/LoanId'
import LoanDetails from '../components/LoanDetails'
import PaymentDetails from '../components/PaymentDetails'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLoanById } from '../redux/BankApplication/action'
import { createPayment } from '../redux/PaymentRedux/action'
import { useLocation, useNavigate } from 'react-router-dom'


export default function Payment() {
    const toast = useToast()
    const navigate = useNavigate()
    const dispatch = useDispatch();


    const [step, setStep] = useState(1)
    const [progress, setProgress] = useState(33.33)
    const [errorMessage, setErrorMessage] = useState('');


    const [formData, setFormData] = useState({
        cardNumber: '',
        cardName: '',
        // format: MM/YYYY
        expiry: '',
        cvv: '',
    });

    const [loanId, setLoanId] = useState('');
    const [payAmount, setPayAmount] = useState(100);

    const { state } = useLocation();
    // console.log('state ', state)

    const { currentUser } = useSelector((store) => store.AuthReducer);
    const { loans, loan, notFound } = useSelector((store) => store.bankApplicationReducer);
    // console.log('loan: ', loan)

    useEffect(() => {
        console.log("state", state)
        if (state !== null) {
            setLoanId(state);
        }
    }, [state, setLoanId, dispatch])


    useEffect(() => {
        //dispatch(getLoanData(currentUser.userID))
        console.log("loan id". loanId)
        if(loanId!=null){
            dispatch(fetchLoanById(currentUser.userID, loanId))
        }
    }, [dispatch, loanId, currentUser.userID])


    const handleLoanIdChange = (event) => {
        const value = parseInt(event.target.value);
        setLoanId(value);
    };

    const handleNextButton = (e) => {
        e.preventDefault()
        console.log(loan)
        if (step === 1) {
            if (loan === null || loan.custId !== currentUser.userID) {
                toast({
                    title: 'Enter correct Loan ID',
                    description: "Loan ID is incorrect",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: "bottom"
                })
            }
            else if (loan.dueAmount === 0) {
                toast({
                    title: 'Payment Complete',
                    description: "All the dues of this loan is paid",
                    status: 'info',
                    duration: 3000,
                    isClosable: true,
                    position: "bottom"
                })
            }
            else {
                setStep(step + 1)
                setProgress(progress + 33.33)
            }
        } else if (step === 2) {
            setStep(step + 1)
            setProgress(progress + 33.33)

        } else {
            setProgress(100)
        }
    }

    const handleBackButton = (e) => {
        e.preventDefault()
        setStep(step - 1)
        setProgress(progress - 33.33)
    }


    const handlePay = (e) => {
        e.preventDefault()

        const paymentData = {
            "loanId": loanId,
            "amount": payAmount,
            "custId": currentUser.userID,
            "date": Date.now()
        }
        console.log(paymentData)

        // Add API to do the actual transaction
        dispatch(createPayment(paymentData)).then((res) => {
            console.log("RESPONSE", res)
            if (res === 1) {
                toast({
                    title: 'Payment Successful',
                    description: `${payAmount} paid successfully`,
                    status: 'success',
                    position: 'top',
                    duration: 4000,
                    isClosable: true,
                })
                setTimeout(() => {
                    navigate("/dashboard")
                }, 2000)
                // setFormvalue({ fullname: "", email: "", password: "" })

            } else if (res === -1) {
                return toast({
                    title: 'Payment Failed',
                    description: 'Cannot process transaction',
                    status: 'error',
                    position: 'top',
                    duration: 4000,
                    isClosable: true,
                })
            } else {
                return toast({
                    title: 'Payment Failed',
                    description: 'Cannot process the transaction',
                    status: 'error',
                    position: 'top',
                    duration: 4000,
                    isClosable: true,
                })
            }
        })
    }

    const isCVVValid = formData.cvv.length !== 3;
    const isCardNumberValid = formData.cardNumber.length !== 19;
    const isExpiryValid = formData.expiry.length !== 7

    return (
        <>
            <Box
                borderWidth="1px"
                rounded="lg"
                shadow="1px 2px 3px rgba(0,0,0,0.3)"
                maxWidth={800}
                p={6}
                mx="auto"
                mt="20px"
                mb="170px"
                as="form">
                <Progress value={progress} mb="5%" mx="5%" colorScheme='purple' borderRadius="1rem"
                    isAnimated></Progress>
                {step === 1 ?
                    <LoanId
                        loanId={loanId}
                        handleLoanIdChange={handleLoanIdChange}
                    /> :
                    step === 2 ?
                        <LoanDetails
                            loanId={loanId}
                            loanAmount={loan.loanAmount}
                            loanTerm={loan.loanTerm}
                            dueAmount={loan.dueAmount}
                            payAmount={payAmount}
                            setPayAmount={setPayAmount}
                            errorMessage={errorMessage}
                            setErrorMessage={setErrorMessage}
                        /> :
                        <PaymentDetails formData={formData} setFormData={setFormData} />}
                <ButtonGroup mt="5%" w="100%">
                    <Flex w="95%" >
                        <Spacer />
                        <Button
                            onClick={(e) => {
                                handleBackButton(e)
                            }}
                            fontFamily={"RNHouseSans"}
                            isDisabled={step === 1}
                            colorScheme="purple"
                            variant="solid"
                            w="7rem"
                            mr="2%">
                            Back
                        </Button>
                        {step === 3 ? (

                            <Button
                                fontFamily={"RNHouseSans"}
                                colorScheme="green"
                                variant="solid"
                                isDisabled={
                                    !formData.cardNumber ||
                                    !formData.cardName ||
                                    !formData.expiry ||
                                    !formData.cvv ||
                                    isCardNumberValid ||
                                    isExpiryValid ||
                                    isCVVValid
                                }
                                onClick={(e) => { handlePay(e) }}>
                                Pay | Rs. {payAmount}
                            </Button>
                        ) : (
                            <Button
                                fontFamily={"RNHouseSans"}
                                w="7rem"
                                isDisabled={errorMessage || step === 3}
                                onClick={(e) => {
                                    handleNextButton(e)
                                }}
                                colorScheme="purple"
                                variant="outline">
                                Next
                            </Button>
                        )}



                    </Flex>
                </ButtonGroup>
            </Box>
        </>
    )
}