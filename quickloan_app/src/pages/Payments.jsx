import {useEffect} from 'react'
import {Box, Table, TableCaption, Tbody, Td, Th, Thead, Tr,} from "@chakra-ui/react";
import {useDispatch, useSelector} from 'react-redux'
import {fetchPaymentsByCust} from '../redux/PaymentRedux/action'


export default function LoanPayments() {
    const dispatch = useDispatch();
    const {currentUser} = useSelector((store) => store.AuthReducer);
    const {payment, payments, isLoading, error} = useSelector((state) => state.paymentReducer);

    useEffect(() => {
        console.log(currentUser);
        dispatch(fetchPaymentsByCust(currentUser.userID));
    }, [dispatch, currentUser])
    return (
        <>
            <Box
                borderWidth="1px"
                rounded="lg"
                shadow="1px 2px 3px rgba(0,0,0,0.3)"
                maxWidth={1000}
                p={6}
                mx="auto"
                mt="50px"
                mb="170px"
                as="form">
                {isLoading ? (
                    <p>Loading...</p>
                ) : payments === null || payments.length === 0 ? (
                    <h2>No Payments</h2>
                ) : (
                    <Table variant="striped" colorScheme="purple">
                        <TableCaption fontFamily={"Archivoblack"} fontSize={"35px"} placement="top">Last 10
                            Payments</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Payment ID</Th>
                                <Th>Loan ID</Th>
                                <Th>Payment Amount</Th>
                                <Th>Payment Date</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {payments
                                .sort((a, b) => new Date(b.date) - new Date(a.date))
                                .slice(0, 10)
                                .map((p) => (
                                    <Tr key={p.paymentId}>
                                        <Td>{p.paymentId}</Td>
                                        <Td>{p.loanId}</Td>
                                        <Td>{p.amount}</Td>
                                        <Td>{p.date.split("T")[0]}</Td>
                                    </Tr>
                                ))}
                        </Tbody>
                    </Table>
                )}
            </Box>
        </>
    )
}