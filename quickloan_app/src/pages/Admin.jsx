import {
    Box,
    Button,
    Center,
    Select,
    SkeletonText,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { getUsersAction } from "../redux/AdminRedux/action";
import { fetchLoans } from "../redux/LoanRedux/action";

export const Admin = () => {
    const dispatch = useDispatch();
    const [loanData, setLoanData] = useState(true);
    const [loan, setLoan] = useState([]);
    const {loans, loading, error} = useSelector((state) => state.loansReducer);
    useEffect(() => {
        dispatch(getUsersAction);
        setLoan(loans);

        console.log(users);
    }, [loans]);

    const {users, loading1} = useSelector((store) => {
        // console.log(store)
        return {
            users: store.adminReducer.users,
            loading: store.adminReducer.loading,
        };
    }, shallowEqual);

    const handleLoans = async (id) => {
        await dispatch(fetchLoans(id));
        setLoanData(false);
        setPid(id);
    };

    const [loanStatuses, setLoanStatuses] = useState([]);

    useEffect(() => {
        // Initialize the selected status for each loan
        setLoanStatuses(loan.map((loan) => ({id: loan.id, status: loan.status})));
    }, [loan]);

    const handleChange = (event, id) => {
        const newStatus = event.target.value;
        setLoanStatuses((prevStatuses) =>
            prevStatuses.map((loan) =>
                loan.id === id ? {...loan, status: newStatus} : loan
            )
        );
    };

    const [data, setData] = useState(loan);
    const [pId, setPid] = useState(0);
    const [selectedStatus, setSelectedStatus] = useState({});
    const handleUpdateStatus = (id) => {
        const updatedLoanData = {
            ...data,
            loans: loan.map((loan) => {
                if (loan.id === id) {
                    const ans = loanStatuses.find((status) => status.id === id).status;
                    fetch(`http://localhost:8082/api/loan/${id}/status?status=${ans}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                        .then((response) => response.json())
                        .then((updatedData) => {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Status has been updated.",
                                showConfirmButton: false,
                                timer: 1500,
                            });
                            setData(updatedData);
                        })
                        .catch((error) => {
                            console.error("Error updating data:", error);
                        });
                    setSelectedStatus(ans);
                    return {
                        ...loan,
                        status: selectedStatus,
                    };
                }
                return loan;
            }),
        };
    };
    return (
        <Box>
            {loading && (
                <Box>
                    <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="10"/>
                </Box>
            )}

            {loading === false && (
                <TableContainer>
                    {loanData ? (
                        <Table variant="striped" colorScheme="purple">
                            <Thead>
                                <Tr>
                                    <Th>ID</Th>
                                    <Th>Name</Th>
                                    <Th>Conatct</Th>
                                    <Th>Email</Th>
                                    <Th>Income</Th>
                                    <Th>Credit Score</Th>
                                    <Th>Loans</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {users.map((el) => (
                                    <Tr key={el.userID}>
                                        <Td>{el.userID}</Td>
                                        <Td>{el.fullname}</Td>
                                        <Td>{el.contact}</Td>
                                        <Td>{el.email}</Td>
                                        <Td>{el.income}</Td>
                                        <Td>{el.creditscore}</Td>
                                        <Td>
                                            <Button
                                                colorScheme="blue"
                                                variant={"outline"}
                                                onClick={() => handleLoans(el.userID)}
                                            >
                                                ALL LOANS
                                            </Button>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    ) : (
                        <Box>
                            <Center m={"20px"}>
                                <Button
                                    colorScheme="purple"
                                    variant={"outline"}
                                    onClick={() => setLoanData(true)}
                                >
                                    BACK
                                </Button>
                            </Center>

                            <Table variant="striped" colorScheme="purple">
                                <Thead>
                                    <Tr>
                                        <Th>Loan ID</Th>
                                        <Th>Loan type</Th>
                                        <Th>Loan amount</Th>
                                        <Th>Loan Term</Th>
                                        <Th>Loan status</Th>
                                        <Th>Change status</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {loan.map((el) => (
                                        <Tr key={el.id}>
                                            <Td>{el.id}</Td>
                                            <Td>{el.loanType}</Td>
                                            <Td>{el.loanAmount}</Td>
                                            <Td>{el.loanTerm}</Td>
                                            <Td>
                                                <Select
                                                    placeholder="Select option"
                                                    value={selectedStatus.status}
                                                    onChange={(e) => handleChange(e, el.id)}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="rejected">Reject</option>
                                                    <option value="accepted">Accept</option>
                                                </Select>
                                            </Td>
                                            <Td>
                                                <Button
                                                    colorScheme="blue"
                                                    variant={"outline"}
                                                    onClick={() => handleUpdateStatus(el.id)}
                                                >
                                                    UPDATE
                                                </Button>
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </Box>
                    )}
                </TableContainer>
            )}
        </Box>
    );
};
