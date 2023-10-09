// Reducer.js

import {
    CREATE_LOAN_SUCCESS,
    FETCH_ALL_LOANS_SUCCESS,
    FETCH_LOAN_BY_CUST_ID_SUCCESS,
    FETCH_LOAN_BY_ID_SUCCESS,
    FETCH_LOAN_BY_STATUS_SUCCESS,
    NOT_FOUND_ERROR,
    UPDATE_LOAN_STATUS_SUCCESS,
} from './actionTypes';

const initialState = {
    loans: [],
    loan: null,
    notFound: false,
};

const bankApplicationReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_LOANS_SUCCESS:
        case FETCH_LOAN_BY_CUST_ID_SUCCESS:
            return {
                ...state,
                loans: action.loans,
                loan: null,
                notFound: false,
            };
        case FETCH_LOAN_BY_STATUS_SUCCESS:
        case FETCH_LOAN_BY_ID_SUCCESS:
            return {
                ...state,
                loan: action.loan,
                notFound: false,
            }
        case CREATE_LOAN_SUCCESS:
        case UPDATE_LOAN_STATUS_SUCCESS:
            return {
                ...state,
                loan: action.loan,
                notFound: false,
            };
        case NOT_FOUND_ERROR:
            return {
                ...state,
                loan: null,
                notFound: true,
            };
        default:
            return state;
    }
};

export default bankApplicationReducer;
  