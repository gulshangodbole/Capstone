import { useState } from 'react'
import {
    Progress,
    Box,
    ButtonGroup,
    Button,
    Flex,
} from '@chakra-ui/react'

import { useToast } from '@chakra-ui/react'
import LoanId from '../components/LoanId'
import LoanDetails from '../components/LoanDetails'
import PaymentDetails from '../components/PaymentDetails'


export default function Payment() {
    const toast = useToast()
    const [step, setStep] = useState(1)
    const [progress, setProgress] = useState(33.33)
    const [payAmount, setPayAmount] = useState(0);

    const [formData, setFormData] = useState({
        cardNumber: '',
        cardName: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: '',
    });

    const [loanId, setLoanId] = useState('');

    // get this loan amount from database
    const loanAmount = 100000
    // get loan term from database
    const loanTerm = 5
    // get due amount from database
    const dueAmount = 50000


    const handleLoanIdChange = (event) => {
        const value = event.target.value;
        setLoanId(value);
    };

    const handlePay = (e) =>  {
        e.preventDefault()

        // Add API to do the actual transaction


        toast({
            title: 'Payment Successful',
            description: "Amount is paid",
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: "top"
        })



    }

    const isCVVValid = formData.cvv.length !== 3;
    const isCardNumberValid = formData.cardNumber.length !== 20;


    const isLoanIdInput = loanId.length !== 10;

    return (
        <>
            <Box
                borderWidth="1px"
                rounded="lg"
                shadow="1px 1px 3px rgba(0,0,0,0.3)"
                maxWidth={1000}
                p={6}
                mx="auto"
                mt="50px"
                mb="170px"
                as="form">
                <Progress value={progress} mb="5%" mx="5%" colorScheme='purple' borderRadius="1rem" isAnimated></Progress>
                {step === 1 ? <LoanId loanId={loanId} handleLoanIdChange={handleLoanIdChange} />
                    : step === 2 ? <LoanDetails loanId={loanId} loanAmount={loanAmount} loanTerm={loanTerm} dueAmount={dueAmount} setPayAmount={setPayAmount} />
                        : <PaymentDetails formData={formData} setFormData={setFormData} />}
                <ButtonGroup mt="5%" w="100%">
                    <Flex pl="45px" w="100%" justifyContent="space-between">
                        <Flex>
                            <Button
                                onClick={() => {
                                    setStep(step - 1)
                                    setProgress(progress - 33.33)
                                }}
                                isDisabled={step === 1}
                                colorScheme="purple"
                                variant="solid"
                                w="7rem"
                                mr="5%">
                                Back
                            </Button>
                            <Button
                                w="7rem"
                                isDisabled={isLoanIdInput || step === 3}
                                onClick={() => {
                                    setStep(step + 1)
                                    if (step === 3) {
                                        setProgress(100)
                                    } else {
                                        setProgress(progress + 33.33)
                                    }
                                }}
                                colorScheme="purple"
                                variant="outline">
                                Next
                            </Button>
                        </Flex>
                        {step === 3 ? (
                            
                            <Button

                                colorScheme="green"
                                variant="solid"
                                isDisabled={
                                    !formData.cardNumber ||
                                    !formData.cardName ||
                                    !formData.expiryMonth ||
                                    !formData.expiryYear ||
                                    !formData.cvv ||
                                    isCardNumberValid ||
                                    isCVVValid
                                    
                                }
                                onClick={(e) => {handlePay(e)}}>
                                Pay | Rs. {payAmount}
                            </Button>
                        ) : null}
                    </Flex>
                </ButtonGroup>
            </Box>
        </>
    )
}