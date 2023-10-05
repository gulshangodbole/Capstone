import { useState } from 'react'

import {
    Stat,
    StatLabel,
    StatNumber,
    Heading,
    SimpleGrid,
    FormControl,
    GridItem,
    FormLabel,
    Slider,
    SliderMark,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb
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
            <StatLabel color={"#710193"} fontWeight={'medium'} isTruncated>
                {title}
            </StatLabel>
            <StatNumber color={"#311432"} fontSize={'2xl'} fontWeight={'medium'}>
                {stat}
            </StatNumber>
        </Stat>
    )
}


const LoanDetails = ({ loanId, loanAmount, loanTerm, dueAmount, setPayAmount }) => {

    const [sliderValue, setSliderValue] = useState(0);

    const labelStyles = {
        mt: '2',
        ml: '-2.5',
        fontSize: 'sm',
    }

    return (
        <>
            <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
                Loan Details
            </Heading>

            <Stat px={{ base: 4, md: 8 }}
                py={'5'}
                shadow={'md'}
                border={'none'}
                bgColor={"#CBC3E3"}
                rounded={'lg'}>
                <StatLabel color={"#710193"} fontSize={'lg'} fontWeight={'medium'} isTruncated>Loan ID</StatLabel>
                <StatNumber color={"#311432"} fontSize={'4xl'} letterSpacing={"7px"} fontWeight={'medium'}>{loanId}</StatNumber>
            </Stat>

            <SimpleGrid mt="2%" columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
                <StatsCard title={'Loan Amount'} stat={loanAmount} />
                <StatsCard title={'Loan Term'} stat={loanTerm} />
                <StatsCard title={'Due Amount'} stat={dueAmount} />
            </SimpleGrid>

            <FormControl px={"20px"} as={GridItem} colSpan={[6, 3]}>

                <FormLabel
                    htmlFor="pay-amount"
                    fontSize={"lg"}
                    mt="10%"
                    mb="5%"
                    pl="45px"
                >
                    Amount to Pay
                </FormLabel>

                <Slider
                    id="slider"
                    defaultValue={0}
                    colorScheme='purple'
                    size={"lg"}
                    onChange={(val) => setSliderValue(val)}
                    onChangeEnd={(val) => setPayAmount(val * dueAmount * 0.01)}
                >
                    <SliderMark value={0} {...labelStyles}>
                        0
                    </SliderMark>
                    <SliderMark value={100} {...labelStyles}>
                        {dueAmount}
                    </SliderMark>
                    <SliderMark
                        value={sliderValue}
                        textAlign='center'
                        mt='-10'
                        ml='-5'
                        w='12'
                    >
                        {sliderValue * dueAmount * 0.01}
                    </SliderMark>
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb boxSize={5} />
                </Slider>

            </FormControl>


        </>
    )
}
export default LoanDetails