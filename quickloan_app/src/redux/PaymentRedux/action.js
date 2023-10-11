import * as actionTypes from './actiontypes';
import axios from 'axios';

const paymentServiceName = 'gateway';

// Function to resolve the service endpoint dynamically
const resolvePaymentServiceEndpoint = async () => {
  try {
    // Make an HTTP request to Eureka to fetch service information
    const eurekaResponse = await axios.get('http://localhost:8761/eureka/apps/' + paymentServiceName);
    const instance = eurekaResponse.data.application.instance[0]; 
    console.log("instance", instance)
    if (instance) {
      const { hostName, port } = instance;
      return `http://${hostName}:${port.$}/api/payment`;
    } else {
      throw new Error(`No instances found for ${paymentServiceName}`);
    }
  } catch (error) {
    console.error('Error resolving payment-service endpoint:', error);
    throw error;
  }
};

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

export const fetchPaymentsRequest = () => {
    return {
        type: actionTypes.FETCH_PAYMENTS_REQUEST,
    };
}

export const fetchPaymentsSuccess = (payments) => {
    return {
        type: actionTypes.FETCH_PAYMENTS_SUCCESS,
        payload: payments
    }
}

export const fetchPaymentsFailure = (error) => {
    return {
        type: actionTypes.FETCH_PAYMENTS_FAILURE,
        error: error,
    };
};

export const createPayment = (paymentData) => async (dispatch) => {
    dispatch(createPaymentRequest());
  
    try {
      const paymentServiceEndpoint = await resolvePaymentServiceEndpoint();
      const response = await axios.post(`${paymentServiceEndpoint}`, paymentData);
  
      const createdPayment = response.data;
      console.log(createdPayment);
      dispatch(createPaymentSuccess(createdPayment));
      return 1;
    } catch (error) {
      dispatch(createPaymentFailure(error.message));
      return -1;
    }
  };
  
  export const fetchPayments = (id) => async (dispatch) => {
    dispatch(fetchPaymentsRequest());
  
    try {
      const paymentServiceEndpoint = await resolvePaymentServiceEndpoint();
      const response = await axios.get(`${paymentServiceEndpoint}/loan/${id}`);
      console.log(response.data);
      dispatch(fetchPaymentsSuccess(response.data));
    } catch (error) {
      dispatch(fetchPaymentsFailure(error.message));
    }
  };
  
  export const fetchPaymentsByCust = (id) => async (dispatch) => {
    dispatch(fetchPaymentsRequest());
  
    try {
      const paymentServiceEndpoint = await resolvePaymentServiceEndpoint();
      const response = await axios.get(`${paymentServiceEndpoint}/customer/${id}`);
      console.log(response.data);
      dispatch(fetchPaymentsSuccess(response.data));
    } catch (error) {
      dispatch(fetchPaymentsFailure(error.message));
    }
  };