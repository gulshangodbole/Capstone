import { useEffect, useState } from 'react';
import {
    Heading,
    Flex,
    FormLabel,
    FormControl,
    Input,
    Text,
    Image
} from '@chakra-ui/react';
import visa from '../Images/visa.png';
import amex from '../Images/amex.png';
import unionpay from '../Images/unionpay.png';
import jcb from '../Images/jcb.png';
import discover from '../Images/discover.png';
import dinersClub from '../Images/diners-club.png';
import mastercard from '../Images/mastercard.png';
import rupay from '../Images/rupay.png';
import defaultCard from '../Images/card-default.png';

import valid from 'card-validator';


const PaymentDetails = ({ formData, setFormData }) => {

    const [isNumberInvalid, setIsNumberInvalid] = useState(false);
    const [isExpiryInvalid, setIsExpiryInvalid] = useState(false);
    const [imageSrc, setImageSrc] = useState(defaultCard);

    const cardTypeToImage = (cardType) => {
        if (cardType === 'visa') {
            return visa;
        }
        if (cardType === 'mastercard') {
            return mastercard;
        }
        if (cardType === 'american-express') {
            return amex;
        }
        if (cardType === 'diners-club') {
            return dinersClub;
        }
        if (cardType === 'discover') {
            return discover;
        }
        if (cardType === 'jcb') {
            return jcb;
        }
        if (cardType === 'unionpay') {
            return unionpay;
        }
        if (cardType === 'maestro') {
            return rupay;
        }
        return defaultCard;

    }


    const handleInputChange = (e) => {
        // console.log(e.target.name)
        // console.log(e.target.value)
        let { name, value } = e.target;
        if ((name === 'cvv') || (name === 'cardNumber') || (name === 'expiry')) {
            if (name === 'cvv') {
                const formattedCvv = value.replace(/\D/g, '').substring(0, 3);
                setFormData({ ...formData, cvv: formattedCvv });
            }
            else if (name === 'cardNumber') {

                const formattedValue = value.replace(/\D/g, '').substring(0, 16);

                // Add spaces every four digits
                let formattedWithSpaces = '';
                for (let i = 0; i < formattedValue.length; i++) {
                    if (i > 0 && i % 4 === 0) {
                        formattedWithSpaces += ' ';
                    }
                    formattedWithSpaces += formattedValue[i];
                }

                const cardValid = valid.number(formattedWithSpaces);
                // console.log(cardValid);
                if (cardValid.card === null) {
                    setImageSrc(defaultCard)
                }

                else if (cardValid.card !== null) {
                    setImageSrc(cardTypeToImage(cardValid.card.type))
                }

                console.log(cardValid)
                if (
                    formattedWithSpaces.length === 19 &&
                    cardValid.isPotentiallyValid === false &&
                    cardValid.isValid === false
                ) {

                    setIsNumberInvalid(true);
                    return;
                }

                setIsNumberInvalid(false);
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
                    if (month === '00') {
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
                    if (year.length === 4 && parseInt(year) < 2023) {
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
        // console.log(formData)
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
                <Flex>
                    <Input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        ml={{
                            base: "15px",
                            sm: "35px",
                            md: "35px",
                            lg: "35px",
                            xl: '35px',
                        }}
                        fontFamily={"RNHouseSans"}
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="XXXX XXXX XXXX XXXX"
                        required
                    />
                    <Image
                        boxSize={'71px'}
                        src={imageSrc}
                        mr={{
                            base: "20px",
                            sm: "40px",
                            md: "40px",
                            lg: "40px",
                            xl: '40px',
                        }}
                        mt={'-12px'} />
                </Flex>
                {isNumberInvalid &&
                    (
                        <Flex>
                            <Text
                                color={"red"}
                                pl={"3em"}
                                fontSize={{
                                    base: "10px",
                                    sm: "12px",
                                    md: "15px",
                                    lg: "15px",
                                    xl: "15px",
                                }}
                            >
                                Enter valid Card Number
                            </Text>
                        </Flex>
                    )
                }
            </FormControl>
            <FormControl>
                <FormLabel htmlFor="cardName" fontWeight={'bold'} fontFamily={"RNHouseSans"} ml="5%" mt="4%">
                    Name on Card
                </FormLabel>
                <Input
                    type="text"
                    id="cardName"
                    name="cardName"
                    fontFamily={"RNHouseSans"}
                    value={formData.cardName}
                    onChange={handleInputChange}
                    placeholder="Enter Name on Card"
                    required
                />
            </FormControl>

            <Flex mt={"2%"}
                px={{
                    base: "4px",
                    sm: "15px",
                    md: "15px",
                    lg: "18px",
                    xl: "18px",
                }}>
                <FormControl flex={2} mt="5%">
                    <FormLabel htmlFor="expiry" fontWeight={'bold'} fontFamily={"RNHouseSans"} ml="4%" >
                        Expiry
                    </FormLabel>
                    <Input
                        type={"text"}
                        ml={"-2%"}
                        mb={"15px"}
                        id="expiry"
                        name="expiry"
                        value={formData.expiry}
                        fontFamily={"RNHouseSans"}
                        onChange={handleInputChange}
                        placeholder="MM/YYYY"
                        required
                    />

                    {isExpiryInvalid &&
                        (<Flex>
                            <Text
                                color={"red"}
                                pl={"1.5em"}
                                fontSize={{
                                    base: "10px",
                                    sm: "12px",
                                    md: "15px",
                                    lg: "15px",
                                    xl: "15px",
                                }}
                            >
                                Enter valid month and year
                            </Text>
                        </Flex>)
                    }

                </FormControl>
                <FormControl flex={1} mt="5%">
                    <FormLabel htmlFor="cvv" fontWeight={'bold'} fontFamily={"RNHouseSans"} ml="5%">
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