import axios from "axios"
import { FETCH_ALL_LOANS_SUCCESS,
    FETCH_LOAN_BY_CUST_ID_SUCCESS,
    FETCH_LOAN_BY_STATUS_SUCCESS,
    FETCH_LOAN_BY_ID_SUCCESS,
    CREATE_LOAN_SUCCESS,
    UPDATE_LOAN_STATUS_SUCCESS,
    NOT_FOUND_ERROR, } from "./actionTypes"

    const BASE_URL = 'http://localhost:8081/api/loan'; 

  export const fetchAllLoansSuccess = (loans) => ({
    type: FETCH_ALL_LOANS_SUCCESS,
    loans,
  });
  
  export const fetchLoanByCustIdSuccess = (loans) => ({
    type: FETCH_LOAN_BY_CUST_ID_SUCCESS,
    loans,
  });
  
  export const fetchLoanByStatusSuccess = (loan) => ({
    type: FETCH_LOAN_BY_STATUS_SUCCESS,
    loan,
  });
  
  export const fetchLoanByIdSuccess = (loan) => ({
    type: FETCH_LOAN_BY_ID_SUCCESS,
    loan,
  });
  
  export const createLoanSuccess = (loan) => ({
    type: CREATE_LOAN_SUCCESS,
    loan,
  });
  
  export const updateLoanStatusSuccess = (loan) => ({
    type: UPDATE_LOAN_STATUS_SUCCESS,
    loan,
  });
  
  export const notFoundError = () => ({
    type: NOT_FOUND_ERROR,
  });
  
  export const fetchAllLoans = () => async (dispatch) => {
    try {
      const response = await axios.get(BASE_URL);
      const data = response.data;
      dispatch(fetchAllLoansSuccess(data));
    } catch (error) {
      dispatch(notFoundError());
    }
  };
  
  export const fetchLoanByCustId = (custId) => async (dispatch) => {
    try {
      const response = await axios.get(`${BASE_URL}/${custId}`);
      const data = response.data;
      dispatch(fetchLoanByCustIdSuccess(data));
    } catch (error) {
      dispatch(notFoundError());
    }
  };
  
  export const fetchLoanByStatus = (status) => async (dispatch) => {
    try {
      const response = await axios.get(`${BASE_URL}/status/${status}`);
      const data = response.data;
      dispatch(fetchLoanByStatusSuccess(data));
    } catch (error) {
      dispatch(notFoundError());
    }
  };
  
  export const fetchLoanById = (custId, loanID) => async (dispatch) => {
    try {
      const response = await axios.get(`${BASE_URL}/${custId}/loan/${loanID}`);
      const data = response.data;
      dispatch(fetchLoanByIdSuccess(data));
    } catch (error) {
      dispatch(notFoundError());
    }
  };
  
  export const createLoan = (loan) => async (dispatch) => {
    try {
      const response = await axios.post(BASE_URL, loan);
      const createdLoan = response.data;
      dispatch(createLoanSuccess(createdLoan));
    } catch (error) {
      dispatch(notFoundError());
    }
  };
  
  export const updateLoanStatus = (custId, status) => async (dispatch) => {
    try {
      const response = await axios.put(`${BASE_URL}/${custId}/status/${status}`);
      const updatedLoan = response.data;
      dispatch(updateLoanStatusSuccess(updatedLoan));
    } catch (error) {
      dispatch(notFoundError());
    }
  };
