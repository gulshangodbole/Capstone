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
} from "@chakra-ui/react";
import { useParams } from "react-router-dom"; // Assuming you are using React Router
import axios from "axios";
import Swal from "sweetalert2";

const Loan = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector((store) => store.AuthReducer);

  useEffect(async () => {
    const id = currentUser.userID; // Assign the value directly

    try {
      const response = await axios.get(`http://localhost:8081/api/loan/${id}`);
      setLoans(response.data);
      console.log("Loans", loans);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }, []);

  return (
    <Box mb={8}>
      {loading ? (
        <p>Loading...</p>
      ) : loans.length == 0 ? (
        <h2>No Loans</h2>
      ) : (
        <Table variant="striped" colorScheme="purple">
          <TableCaption placement="top">Loan Details</TableCaption>
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
                </Tr>
              ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default Loan;
