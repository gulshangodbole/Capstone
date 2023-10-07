import { useEffect, useState } from 'react'

import {
    Stat,
    StatLabel,
    StatNumber,
    Heading,
    SimpleGrid,
    FormControl,
    GridItem,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input
} from '@chakra-ui/react'


function StatsCard(props) {
    const { title, stat } = props
    return (
        <Stat
            px={{ base: 4, md: 8 }}
            py={'5'}
            shadow={'md'}
            border={'none'}
            bgColor={"#CBC3E3"}
            rounded={'lg'}>
            <StatLabel color={"#710193"} fontFamily={"Archivobold"} fontWeight={'medium'} isTruncated>
                {title}
            </StatLabel>
            <StatNumber color={"#311432"} fontFamily={"RNHouseSans"} fontSize={'2xl'} fontWeight={'medium'}>
                {stat}
            </StatNumber>
        </Stat>
    )
}


const LoanDetails = ({ loanId, loanAmount, loanTerm, dueAmount, payAmount, setPayAmount, errorMessage, setErrorMessage }) => {


    const handleAmountChange = (e) => {
        const amount = parseFloat(e.target.value);
        setPayAmount(amount)

        // Check if the payment amount exceeds $25,000
        if (amount > dueAmount) {
            setErrorMessage('Payment amount cannot exceed Due Amount');
        } 
        
        else if (amount < 100){
            setErrorMessage('Minimum payment amount should be 100');
        }

        else {
            setErrorMessage('');
        }
    }

    return (
        <>
            <Heading w="100%" textAlign={'center'} fontFamily={"Archivoblack"} fontWeight="normal" mb="2%">
                Loan Details
            </Heading>

            <Stat px={{ base: 4, md: 8 }}
                py={'5'}
                shadow={'md'}
                border={'none'}
                bgColor={"#CBC3E3"}
                rounded={'lg'}>
                <StatLabel color={"#710193"} fontFamily={"Archivobold"} fontSize={'lg'} fontWeight={'medium'} isTruncated>Loan ID</StatLabel>
                <StatNumber color={"#311432"} fontFamily={"RNHouseSans"} fontSize={'4xl'} letterSpacing={"7px"} fontWeight={'medium'}>{loanId}</StatNumber>
            </Stat>

            <SimpleGrid mt="2%" columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
                <StatsCard title={'Loan Amount'} stat={loanAmount} />
                <StatsCard title={'Loan Term'} stat={loanTerm} />
                <StatsCard title={'Due Amount'} stat={dueAmount} />
            </SimpleGrid>


            <FormControl isRequired isInvalid={!!errorMessage} as={GridItem} colSpan={[6, 3]}>
                <FormLabel htmlFor="pay-amount"
                    fontFamily={"Archivobold"}
                    fontSize={"lg"}
                    mt="10%"
                    mb="2%"
                    pl="3rem"
                >
                    Amount to pay
                </FormLabel>
                <Input id="loan-id"
                    type="number"
                    fontFamily={"RNHouseSans"}
                    required
                    value={payAmount}
                    onChange={(e) => handleAmountChange(e)}
                />
                <FormErrorMessage pl="3rem">{errorMessage}</FormErrorMessage>
            </FormControl>


        </>
    )
}
export default LoanDetails