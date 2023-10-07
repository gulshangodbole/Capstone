import * as actionTypes from './actiontypes';
import axios from 'axios';

export const createPaymentRequest = () => {
    return {
        type: actionTypes.CREATE_PAYMENT_REQUEST,
    };
};

// Action creator for creating a payment success
export const createPaymentSuccess = (payment) => {
    // console.log('create payment success method of action.js')
    return {
        type: actionTypes.CREATE_PAYMENT_SUCCESS,
        payload: payment,
    };
};

// Action creator for creating a payment failure
export const createPaymentFailure = (error) => {
    return {
        type: actionTypes.CREATE_PAYMENT_FAILURE,
        error: error,
    };
};

// Async action creator to create a payment using Axios
export const createPayment = (paymentData) => {
    return async (dispatch) => {
        dispatch(createPaymentRequest());
        try {
            // Make an Axios POST request to create a payment
            const response = await axios.post('http://localhost:8081/api/payment', paymentData);

            const createdPayment = response.data;

            // Dispatch success action
            dispatch(createPaymentSuccess(createdPayment));
            return 1;
        } catch (error) {
            // Dispatch failure action
            dispatch(createPaymentFailure(error.message));
            return -1;
        }
    };
};
