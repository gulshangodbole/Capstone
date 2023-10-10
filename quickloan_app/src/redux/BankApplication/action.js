import axios from "axios"
import {
    CREATE_LOAN_SUCCESS,
    FETCH_ALL_LOANS_SUCCESS,
    FETCH_LOAN_BY_CUST_ID_SUCCESS,
    FETCH_LOAN_BY_ID_SUCCESS,
    FETCH_LOAN_BY_STATUS_SUCCESS,
    NOT_FOUND_ERROR,
    UPDATE_LOAN_STATUS_SUCCESS,
} from "./actionTypes"

const loanServiceName = 'loan-service';

// Function to resolve the service endpoint dynamically
const resolveLoanServiceEndpoint = async () => {
  try {
    // Make an HTTP request to Eureka to fetch service information
    const eurekaResponse = await axios.get('http://localhost:8761/eureka/apps/' + loanServiceName);
    const instance = eurekaResponse.data.application.instance[0]; 
    console.log("instance", instance)
    if (instance) {
      const { hostName, port } = instance;
      return `http://${hostName}:${port.$}/api/loan`;
    } else {
      throw new Error(`No instances found for ${loanServiceName}`);
    }
  } catch (error) {
    console.error('Error resolving user-service endpoint:', error);
    throw error;
  }
};

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
      const loanServiceEndpoint = await resolveLoanServiceEndpoint();
      const response = await axios.get(loanServiceEndpoint);
      const data = response.data;
      dispatch(fetchAllLoansSuccess(data));
    } catch (error) {
      dispatch(notFoundError());
    }
  };
  
  export const fetchLoanByCustId = (custId) => async (dispatch) => {
    try {
      const loanServiceEndpoint = await resolveLoanServiceEndpoint();
      const response = await axios.get(`${loanServiceEndpoint}/${custId}`);
      const data = response.data;
      dispatch(fetchLoanByCustIdSuccess(data));
    } catch (error) {
      dispatch(notFoundError());
    }
  };
  
  export const fetchLoanByStatus = (status) => async (dispatch) => {
    try {
      const loanServiceEndpoint = await resolveLoanServiceEndpoint();
      const response = await axios.get(`${loanServiceEndpoint}/status/${status}`);
      const data = response.data;
      dispatch(fetchLoanByStatusSuccess(data));
    } catch (error) {
      dispatch(notFoundError());
    }
  };
  
  export const fetchLoanById = (custId, loanID) => async (dispatch) => {
    try {
      const loanServiceEndpoint = await resolveLoanServiceEndpoint();
      const response = await axios.get(
        `${loanServiceEndpoint}/${custId}/loan/${loanID}`
      );
      const data = response.data;
      dispatch(fetchLoanByIdSuccess(data));
    } catch (error) {
      dispatch(notFoundError());
    }
  };
  
  export const createLoan = (loan) => async (dispatch) => {
    try {
      const loanServiceEndpoint = await resolveLoanServiceEndpoint();
      const response = await axios.post(loanServiceEndpoint, loan);
      const createdLoan = response.data;
      dispatch(createLoanSuccess(createdLoan));
    } catch (error) {
      dispatch(notFoundError());
    }
  };
  
  export const updateLoanStatus = (custId, status) => async (dispatch) => {
    try {
      const loanServiceEndpoint = await resolveLoanServiceEndpoint();
      const response = await axios.put(
        `${loanServiceEndpoint}/${custId}/status/${status}`
      );
      const updatedLoan = response.data;
      dispatch(updateLoanStatusSuccess(updatedLoan));
    } catch (error) {
      dispatch(notFoundError());
    }
  };