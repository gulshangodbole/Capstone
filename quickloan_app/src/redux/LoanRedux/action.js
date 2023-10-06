import axios from 'axios';
import {
  FETCH_LOANS_REQUEST,
  FETCH_LOANS_SUCCESS,
  FETCH_LOANS_FAILURE,
} from './actiontypes';

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
  return (dispatch) => {
    dispatch(fetchLoansRequest());
    axios
      .get(`http://localhost:8081/api/loan/${id}`)
      .then((response) => {
        dispatch(fetchLoansSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchLoansFailure(error.message));
      });
  };
};