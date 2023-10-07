import * as actionTypes from './actiontypes';

const initialState = {
    payment: null,
    payments: [],
    error: null,
    isLoading: false, // New state for loading indicator
};

const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_PAYMENT_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case actionTypes.CREATE_PAYMENT_SUCCESS:
            return {
                ...state,
                payment: action.payload,
                error: null,
                isLoading: false,
            };
        case actionTypes.CREATE_PAYMENT_FAILURE:
            return {
                ...state,
                payment: null,
                error: action.error,
                isLoading: false,
            };
        case actionTypes.FETCH_PAYMENTS_REQUEST:
            return{
                ...state,
                isLoading: true,
            }
        case actionTypes.FETCH_PAYMENTS_SUCCESS:
            return {
                ...state,
                payments: action.payload,
                error: null,
                isLoading: false
            }
        case actionTypes.FETCH_PAYMENTS_FAILURE:
            return{
                ...state,
                payments: [],
                error: action.error,
                isLoading: false
            }
        default:
            return state;
    }
};

export default paymentReducer;
