import axios from 'axios';
import {FETCH_LOANS_FAILURE, FETCH_LOANS_REQUEST, FETCH_LOANS_SUCCESS,} from './actiontypes';

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

export const fetchLoansRequest = () => ({
    type: FETCH_LOANS_REQUEST,
});

export const fetchLoansSuccess = (loans) => ({
    type: FETCH_LOANS_SUCCESS,
    payload: loans,
});

export const fetchLoansFailure = (error) => ({
    type: FETCH_LOANS_FAILURE,
    payload: error,
});

export const fetchLoans = (id) => {
    return async (dispatch) => {
      dispatch(fetchLoansRequest());
  
      try {
        const loanServiceEndpoint = await resolveLoanServiceEndpoint();
        const response = await axios.get(`${loanServiceEndpoint}/${id}`);
        dispatch(fetchLoansSuccess(response.data));
      } catch (error) {
        dispatch(fetchLoansFailure(error.message));
      }
    };
  };
  
  export const fetchPendingLoans = () => {
    return async (dispatch) => {
      dispatch(fetchLoansRequest());
  
      try {
        const loanServiceEndpoint = await resolveLoanServiceEndpoint();
        const response = await axios.get(`${loanServiceEndpoint}/status/pending`);
        console.log(response.data);
        dispatch(fetchLoansSuccess(response.data));
      } catch (error) {
        dispatch(fetchLoansFailure(error.message));
      }
    };
  };