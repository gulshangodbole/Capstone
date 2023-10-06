// Reducer.js
import {
  FETCH_LOANS_REQUEST,
  FETCH_LOANS_SUCCESS,
  FETCH_LOANS_FAILURE,
} from './actiontypes';

const initialState = {
  loans: [], // Make sure 'loans' is defined in the initial state
  loading: false,
  error: null,
};

const loansReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOANS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_LOANS_SUCCESS:
      return {
        ...state,
        loans: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_LOANS_FAILURE:
      return {
        ...state,
        loans: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default loansReducer;
