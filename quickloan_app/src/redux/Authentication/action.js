import axios from 'axios';
import {
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    SIGNUP_FAILURE,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
} from './actionType';

const userServiceName = 'gateway';

// Function to resolve the service endpoint dynamically
const resolveUserServiceEndpoint = async () => {
  try {
    // Make an HTTP request to Eureka to fetch service information
    const eurekaResponse = await axios.get('http://localhost:8761/eureka/apps/' + userServiceName);
    const instance = eurekaResponse.data.application.instance[0]; 
    console.log("instance", instance)
    if (instance) {
      const { hostName, port } = instance;
      return `http://${hostName}:${port.$}/api/users`;
    } else {
      throw new Error(`No instances found for ${userServiceName}`);
    }
  } catch (error) {
    console.error('Error resolving user-service endpoint:', error);
    throw error;
  }
};


export const checkEmailExists = (email) => async (dispatch) => {

    try {
        const userServiceEndpoint = await resolveUserServiceEndpoint();

        const res = await axios.get(userServiceEndpoint);
        return res.data.some((user) => user.email === email);
    } catch (error) {
        console.error('Error checking email existence:', error);
        return false;
    }
};

export const signup = (formData) => async (dispatch) => {
    const userServiceEndpoint = await resolveUserServiceEndpoint();
    const emailExists = await dispatch(checkEmailExists(formData.email));
    console.log(userServiceEndpoint)
    if (emailExists) {
        dispatch({type: SIGNUP_FAILURE, payload: 'User already exists with this email.'});
        return -1; // Indicate signup failure
    }

    dispatch({type: SIGNUP_REQUEST});
    console.log(formData)
    try {
        const res = await axios.post(userServiceEndpoint, formData);
        dispatch({type: SIGNUP_SUCCESS, payload: res.data});
        return 1; // Indicate signup success
    } catch (error) {
        dispatch({type: SIGNUP_FAILURE});
        console.log(error)
        return -1; // Indicate signup failure
    }
};

export const login = (loginData) => async (dispatch) => {
    dispatch({type: LOGIN_REQUEST});

    try {
        const userServiceEndpoint = await resolveUserServiceEndpoint();

        const res = await axios.get(userServiceEndpoint);
        const user = res.data.find((el) => el.email === loginData.email && el.password === loginData.password);

        if (user) {
            dispatch({type: LOGIN_SUCCESS, payload: user});
            return true; // Indicate login success
        } else {
            dispatch({type: LOGIN_FAILURE});
            return false; // Indicate login failure
        }
    } catch (error) {
        dispatch({type: LOGIN_FAILURE});
        return false; // Indicate login failure
    }
};
