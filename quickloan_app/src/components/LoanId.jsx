import {
    Heading,
    FormControl,
    FormLabel,
    Input
} from '@chakra-ui/react'


const LoanId = ({ loanId, handleLoanIdChange }) => {



    return (
        <>
            <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
                Loan Details
            </Heading>
            <FormControl mt="2%">
                <FormLabel pl="3rem" htmlFor="loan-id" fontWeight={'bold'}>
                    Loan ID
                </FormLabel>
                <Input id="loan-id"
                    type="number"
                    required
                    value={loanId}
                    onChange={handleLoanIdChange}
                />
            </FormControl>

        </>
    )
}


export default LoanId