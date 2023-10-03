import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQueries, updateQueryStatus } from '../redux/SupportRedux/action';
import { Table, Thead, Tbody, Tr, Th, Td, Select } from '@chakra-ui/react';

const AdminSupport = () => {
  const dispatch = useDispatch();
  const queries = useSelector((store) => store.supportReducer.queries);
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    dispatch(fetchQueries());
  }, [dispatch]);

  const handleStatusChange = (query, newStatus) => {
    console.log(newStatus)
    dispatch(updateQueryStatus(query.id, newStatus));
  };

  const filteredQueries =
    filterStatus === 'All' ? queries : queries.filter((query) => query.status === filterStatus);

  return (
    <div>
        <Select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        style={{ marginBottom: '20px', width:'20%'}}
      >
        <option value="All">All</option>
        <option value="Open">Open</option>
        <option value="In Progress">In Progress</option>
        <option value="Closed">Closed</option>
      </Select>

      <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th>Contact</Th>
          <Th>Message</Th>
          <Th>Status</Th>
        </Tr>
      </Thead>
      <Tbody>
        {filteredQueries.map((query) => (
          <Tr key={query.id}>
            <Td>{query.name}</Td>
            <Td>{query.email}</Td>
            <Td>{query.contact}</Td>
            <Td>{query.message}</Td>
            <Td>{query.status}</Td>
            <Td>
              <Select
                value={query.status}
                onChange={(e) => handleStatusChange(query, e.target.value)}
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </Select>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
    </div>
  );
};

export default AdminSupport;
