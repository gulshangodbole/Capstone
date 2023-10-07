import {
    Heading,
    FormControl,
    FormLabel,
    Input
} from '@chakra-ui/react'


const LoanId = ({ loanId, handleLoanIdChange }) => {



    return (
        <>  
            <Heading>{}</Heading>
            <Heading w="100%" textAlign={'center'} fontFamily={"Archivoblack"} fontWeight="normal" mb="2%">
                Loan Details
            </Heading>
            <FormControl isRequired mt="2%">
                <FormLabel pl="3rem" fontFamily={"Archivobold"} htmlFor="loan-id">
                    Loan ID
                </FormLabel>
                <Input id="loan-id"
                    type="number"
                    fontFamily={"RNHouseSans"}
                    required
                    value={loanId}
                    onChange={handleLoanIdChange}
                />
                
            </FormControl>

        </>
    )
}


export default LoanId