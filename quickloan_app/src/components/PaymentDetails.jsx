import {
    Heading,
    SimpleGrid,
    Flex,
    FormControl,
    Input,
    Select
} from '@chakra-ui/react';

const PaymentDetails = ({ formData, setFormData }) => {


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if ((name === 'cvv') || (name === 'cardNumber')) {
            if (name === 'cvv') {
                const cvv = value.slice(0, 3);
                setFormData({ ...formData, cvv });
            }
            else if (name === 'cardNumber') {
                const formattedValue = value.replace(/\D/g, '').substring(0, 16);
                const formattedWithSpaces = formattedValue.replace(/(\d{4})/g, '$1 ');
                setFormData({ ...formData, cardNumber: formattedWithSpaces });
            }

        }

        else {
            setFormData({ ...formData, [name]: value });
        }
        
    };

    return (
        <>
            <Heading mb="5%" w="100%" textAlign={'center'} fontFamily={"Archivoblack"} fontWeight="normal">
                Payment Method
            </Heading>
            <SimpleGrid columns={1} spacing={6}>
                <Flex justify="space-between">
                    <FormControl flex={3} mr={2}>
                        <Input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            fontFamily={"RNHouseSans"}
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            placeholder="Card Number"
                            required
                        />
                    </FormControl>
                    <FormControl flex={2}>
                        <Input
                            type="text"
                            id="cardName"
                            name="cardName"
                            fontFamily={"RNHouseSans"}
                            value={formData.cardName}
                            onChange={handleInputChange}
                            placeholder="Name On Card"
                            required
                        />
                    </FormControl>
                </Flex>
                <Flex mt={4} justify="space-between">
                    <FormControl flex={1} mr={2}>
                        <Select
                            id="expiryMonth"
                            name="expiryMonth"
                            value={formData.expiryMonth}
                            onChange={handleInputChange}
                            pl={"1.5rem"}
                            fontFamily={"RNHouseSans"}
                            placeholder="Select Expiry Month"
                            bgColor= "#f4f4f4"
                            required
                        >
                            <option value="01">01</option>
                            <option value="02">02</option>
                            <option value="03">03</option>
                            <option value="04">04</option>
                            <option value="05">05</option>
                            <option value="06">06</option>
                            <option value="07">07</option>
                            <option value="08">08</option>
                            <option value="09">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>

                        </Select>
                    </FormControl>
                    <FormControl flex={1} mr={2}>
                        <Select
                            id="expiryYear"
                            name="expiryYear"
                            fontFamily={"RNHouseSans"}
                            value={formData.expiryYear}
                            onChange={handleInputChange}
                            bgColor= "#f4f4f4"
                            placeholder="Select Expiry Year"
                            required
                        >
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                            <option value="2027">2027</option>
                            <option value="2028">2028</option>
                            <option value="2029">2029</option>
                            <option value="2030">2030</option>
                            <option value="2031">2031</option>
                            <option value="2032">2032</option>
                            <option value="2033">2033</option>

                        </Select>
                    </FormControl>
                    <FormControl flex={1}>
                        <Input
                            type="number"
                            id="cvv"
                            name="cvv"
                            value={formData.cvv}
                            fontFamily={"RNHouseSans"}
                            onChange={handleInputChange}
                            placeholder="CVV"
                            required
                        />
                    </FormControl>
                </Flex>
            </SimpleGrid>
        </>
    )
}

export default PaymentDetails