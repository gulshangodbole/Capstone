// actions.js

import axios from 'axios';
import {
    PARTIAL_UPDATE_PROFILE_FAILURE,
    PARTIAL_UPDATE_PROFILE_REQUEST,
    PARTIAL_UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
} from './actiontypes';

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

export const updateProfile = (id, updatedUser) => async (dispatch) => {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
  
    try {
      const userServiceEndpoint = await resolveUserServiceEndpoint();
      const res = await axios.put(`${userServiceEndpoint}/${id}`, updatedUser);
  
      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: res.data });
      return res.data;
    } catch (error) {
      dispatch({ type: UPDATE_PROFILE_FAILURE });
      throw error;
    }
  };
  
  export const getUserDetails = (userId) => async (dispatch) => {
    try {
      const userServiceEndpoint = await resolveUserServiceEndpoint();
      const res = await axios.get(`${userServiceEndpoint}/${userId}`);
      console.log('action response', res.data);
      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error });
    }
  };
  
  export const getAllUserDetails = () => async (dispatch) => {
    try {
      const userServiceEndpoint = await resolveUserServiceEndpoint();
      const res = await axios.get(userServiceEndpoint);
      console.log('action response', res.data);
      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error });
    }
  };
  
  export const partialUpdateProfile = (id, creditscore, income) => async (dispatch) => {
    dispatch({ type: PARTIAL_UPDATE_PROFILE_REQUEST });
  
    try {
      const userServiceEndpoint = await resolveUserServiceEndpoint();
      const res = await axios.patch(`${userServiceEndpoint}/${id}?creditscore=${creditscore}&income=${income}`);
  
      dispatch({ type: PARTIAL_UPDATE_PROFILE_SUCCESS, payload: res.data });
      return res.data;
    } catch (error) {
      dispatch({ type: PARTIAL_UPDATE_PROFILE_FAILURE });
      throw error;
    }
  };
  
  export const expenseUpdateProfile = (id, expense, savings) => async (dispatch) => {
    dispatch({ type: PARTIAL_UPDATE_PROFILE_REQUEST });
  
    try {
      const userServiceEndpoint = await resolveUserServiceEndpoint();
      const res = await axios.patch(`${userServiceEndpoint}/${id}/updateexpense?expense=${expense}&savings=${savings}`);
  
      dispatch({ type: PARTIAL_UPDATE_PROFILE_SUCCESS, payload: res.data });
      return res.data;
    } catch (error) {
      dispatch({ type: PARTIAL_UPDATE_PROFILE_FAILURE });
      throw error;
    }
  };