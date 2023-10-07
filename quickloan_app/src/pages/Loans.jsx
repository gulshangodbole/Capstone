import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Select,
  Box,
  Button,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom"; // Assuming you are using React Router
import axios from "axios";
import Swal from "sweetalert2";
import { fetchLoans } from '../redux/LoanRedux/action';

const Loan = () => {
  const { currentUser } = useSelector((store) => store.AuthReducer);
  const dispatch = useDispatch();
  const { loans, loading, error } = useSelector((state) => state.loansReducer);
  useEffect(() => {
    dispatch(fetchLoans(currentUser.userID));
  }, [dispatch, currentUser.userID]);
      
  const navigate = useNavigate();

  return (
    <Box mb={8}>
      {loading ? (
        <p>Loading...</p>
      ) : loans.length == 0 ? (
        <h2>No Loans</h2>
      ) : (
        <Table variant="striped" colorScheme="purple">
          <TableCaption fontFamily={"Archivoblack"} fontSize={"35px"} placement="top">Loan Details</TableCaption>
          <Thead>
            <Tr>
              <Th>Loan ID</Th>
              <Th>Loan Amount</Th>
              <Th>Amount Due</Th>
              <Th>Loan Date</Th>
              <Th>Loan Purpose</Th>
              <Th>Loan Term</Th>
              <Th>Loan Status</Th>
              
            </Tr>
          </Thead>
          <Tbody>
            {loans
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((loan) => (
                <Tr key={loan.id}>
                  <Td>{loan.id}</Td>
                  <Td>{loan.loanAmount}</Td>
                  <Td>{loan.dueAmount}</Td>
                  <Td>{loan.date.split("T")[0]}</Td>
                  <Td>{loan.loanPurpose}</Td>
                  <Td>{loan.loanTerm}</Td>
                  <Td>{loan.status}</Td>
                  <Td><Button isDisabled={loan.status.toLowerCase()!=='accepted'} onClick={() => navigate('/payment', {state: loan.id})}>Pay Loan</Button></Td>
                  <Td><Button onClick={() => navigate('/paymentHistory', {state: loan.id})}>Past Payments</Button></Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default Loan;
