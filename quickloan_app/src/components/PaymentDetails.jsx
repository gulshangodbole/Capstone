import { useState } from 'react';
import {
    Heading,
    Flex,
    FormLabel,
    FormControl,
    Input,
    Text
} from '@chakra-ui/react';

const PaymentDetails = ({formData, setFormData}) => {

    const [isNumberInvalid, setIsNumberInvalid] = useState(false);
    const [isExpiryInvalid, setIsExpiryInvalid] = useState(false);



    const handleInputChange = (e) => {
        console.log(e.target.name)
        console.log(e.target.value)
        let { name, value } = e.target;
        if ((name === 'cvv') || (name === 'cardNumber') || (name === 'expiry')) {
            if (name === 'cvv') {
                const formattedCvv = value.replace(/\D/g, '').substring(0, 3);
                setFormData({ ...formData, cvv: formattedCvv });
            }
            else if (name === 'cardNumber') {

                console.log('inside if statement')
                console.log('value ', value)
                console.log('value length', value.length)
                console.log('char at 4 ', value.charAt(0))
                console.log('char at 3 ', value.charAt(3))


                const formattedValue = value.replace(/\D/g, '').substring(0, 16);

                // Add spaces every four digits
                let formattedWithSpaces = '';
                for (let i = 0; i < formattedValue.length; i++) {
                    if (i > 0 && i % 4 === 0) {
                        formattedWithSpaces += ' ';
                    }
                    formattedWithSpaces += formattedValue[i];
                }
                setFormData({ ...formData, cardNumber: formattedWithSpaces });

            }
            else if (name === 'expiry') {

                // Handle backspace key to allow removing the slash
                if (value.length === 3 && value.charAt(2) === '/') {
                    value = value.slice(0, 2);
                }
                const formattedDate = value.replace(/\D/g, '');

                if (formattedDate.length <= 2) {
                    const month = formattedDate.slice(0, 2);
                    if (parseInt(month) < 0 || parseInt(month) > 12) {
                        setIsExpiryInvalid(true)
                        return;
                    }
                    if(month === '00'){
                        setIsExpiryInvalid(true);
                        return;
                    }
                    else {
                        setIsExpiryInvalid(false)
                        setFormData({ ...formData, expiry: month })
                    }
                }
                else {
                    const year = formattedDate.slice(2);
                    if (year.length === 1 && !year.startsWith('2')) {
                        setIsExpiryInvalid(true);
                        return;
                    }
                    if (year.length > 1 && !year.startsWith('20')) {
                        setIsExpiryInvalid(true);
                        return;
                    }
                    if(year.length === 4 && parseInt(year)<2023 ){
                        setIsExpiryInvalid(true);
                        return;
                    }

                    const formattedDateInFormat = `${formattedDate.slice(0, 2)}/${formattedDate.slice(2, 6)}`;
                    setIsExpiryInvalid(false)
                    setFormData({ ...formData, expiry: formattedDateInFormat });
                }
            }
        }

        else {
            setFormData({ ...formData, [name]: value });
        }
        console.log(formData)
    };

    return (
        <>
            <Heading mb="5%" w="100%" textAlign={'center'} fontFamily={"Archivoblack"} fontWeight="normal">
                Payment Method
            </Heading>

            <FormControl>
                <FormLabel htmlFor="cardNumber" fontWeight={'bold'} fontFamily={"RNHouseSans"} ml="5%" mt="2%">
                    Card Number
                </FormLabel>
                <Input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    fontFamily={"RNHouseSans"}
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="XXXX XXXX XXXX XXXX"
                    required
                />
            </FormControl>
            <FormControl mt={"2%"}>
                <FormLabel htmlFor="cardName" fontWeight={'bold'} fontFamily={"RNHouseSans"} ml="5%" mt="4%">
                    Card Name
                </FormLabel>
                <Input
                    type="text"
                    id="cardName"
                    name="cardName"
                    fontFamily={"RNHouseSans"}
                    value={formData.cardName}
                    onChange={handleInputChange}
                    placeholder="Enter Card Name"
                    required
                />
            </FormControl>
            <Flex mt={"2%"} px={"18px"}>
                <FormControl>
                    <FormLabel htmlFor="expiry" fontWeight={'bold'} fontFamily={"RNHouseSans"} ml="5%" mt="10%">
                        Expiry
                    </FormLabel>
                    <Input
                        type={"text"}
                        id="expiry"
                        name="expiry"
                        value={formData.expiry}
                        fontFamily={"RNHouseSans"}
                        onChange={handleInputChange}
                        placeholder="MM/YYYY"
                        required
                    />
                    
                    {isExpiryInvalid && 
                        (<Text color={"red"} fontSize={"sm"} ml={'-8em'}>
                        *Enter valid Expiry Date
                        </Text>)
                    }
                        
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="cvv" fontWeight={'bold'} fontFamily={"RNHouseSans"} ml="5%" mt="10%">
                        CVV
                    </FormLabel>
                    <Input
                        type={"password"}
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        fontFamily={"RNHouseSans"}
                        onChange={handleInputChange}
                        placeholder="***"
                        required
                    />
                </FormControl>
            </Flex>
        </>
    )
}

export default PaymentDetails