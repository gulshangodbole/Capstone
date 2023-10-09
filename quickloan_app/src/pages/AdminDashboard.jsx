import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Box, Button, Select, Table, TableCaption, Tbody, Td, Th, Thead, Tr,} from "@chakra-ui/react";
import Swal from "sweetalert2";

import {fetchPendingLoans} from "../redux/LoanRedux/action";
import {getUsersAction} from "../redux/AdminRedux/action";

const AdminDashboard = () => {
    const [loan, setLoan] = useState([]);
    const [statusSelected, setStatusSelected] = useState("");
    const dispatch = useDispatch();
    const {
        loans,
        loading: loanLoading,
        error,
    } = useSelector((state) => state.loansReducer);
    const {users, loading} = useSelector((state) => state.adminReducer);

    useEffect(() => {
        dispatch(fetchPendingLoans());
        dispatch(getUsersAction);
    }, [dispatch]);

    const handleUpdateStatus = async (id) => {
        if (!statusSelected) {
            return;
        }

        await fetch(`http://localhost:8081/api/loan/${id}/status?status=${statusSelected}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => console.log(response.json()))
            .then((updatedData) => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Status has been updated.",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            })

            .catch((error) => {
                console.error("Error updating data:", error);
            });
    };

    const handleChange = (event) => {
        setStatusSelected(event.target.value);
    };

    return (
        <Box mb={8}>
            <h2>Admin Dashboard</h2>
            {loanLoading ? (
                <p>Loading...</p>
            ) : loans.length === 0 ? (
                <h2>No Pending Loans</h2>
            ) : (
                <Table variant="striped" colorScheme="purple">
                    <TableCaption placement="top">Loan Details</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Loan ID</Th>
                            <Th>Loan Amount</Th>
                            <Th>Customer ID</Th>
                            <Th>Loan Date</Th>
                            <Th>Loan Purpose</Th>
                            <Th>Loan Term</Th>
                            <Th>Customer Income</Th>
                            <Th>Credit Score</Th>
                            <Th>Change status</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {Object.values(loans).map((loan) => (
                            <Tr key={loan.id}>
                                <Td>{loan.id}</Td>
                                <Td>{loan.loanAmount}</Td>
                                <Td>{loan.custId}</Td>
                                <Td>{loan.date.split("T")[0]}</Td>
                                <Td>{loan.loanPurpose}</Td>
                                <Td>{loan.loanTerm}</Td>
                                <Td>
                                    {users && users.length > 0
                                        ? (() => {
                                            const user = users.find(
                                                (user) => user.userID === loan.custId
                                            );
                                            return user ? user.income : "Loading...";
                                        })()
                                        : "Loading..."}
                                </Td>
                                <Td>
                                    {users && users.length > 0
                                        ? (() => {
                                            const user = users.find(
                                                (user) => user.userID === loan.custId
                                            );
                                            return user ? user.creditscore : "Loading...";
                                        })()
                                        : "Loading..."}
                                </Td>
                                <Td>
                                    <Select
                                        placeholder="Select option"
                                        value={statusSelected}
                                        onChange={handleChange}
                                    >
                                        <option value="rejected">Reject</option>
                                        <option value="accepted">Accept</option>
                                    </Select>
                                </Td>
                                <Td>
                                    <Button
                                        colorScheme="blue"
                                        variant={"outline"}
                                        onClick={() => handleUpdateStatus(loan.id)}
                                    >
                                        UPDATE
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            )}
        </Box>
    );
};

export default AdminDashboard;