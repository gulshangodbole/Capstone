// actions.js

import axios from 'axios';
import {
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  PARTIAL_UPDATE_PROFILE_REQUEST,
  PARTIAL_UPDATE_PROFILE_SUCCESS,
  PARTIAL_UPDATE_PROFILE_FAILURE,
} from './actiontypes';

export const updateProfile = (id, updatedUser) => async (dispatch) => {
  dispatch({ type: UPDATE_PROFILE_REQUEST });

  try {
    const res = await axios.put(`http://localhost:8081/api/users/${id}`, updatedUser);

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: res.data });
    return res.data;
  } catch (error) {
    dispatch({ type: UPDATE_PROFILE_FAILURE });
    throw error; 
  }
};

export const getUserDetails = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:8081/api/users/${userId}`);
    console.log("action response",res.data)
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error });
  }
};

export const getAllUserDetails = () => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:8081/api/users`);
    console.log("action response",res.data)
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error });
  }
};

export const partialUpdateProfile = (id, creditscore, income) => async (dispatch) => {
  dispatch({ type: PARTIAL_UPDATE_PROFILE_REQUEST });

  try {
    const res = await axios.patch(`http://localhost:8081/api/users/${id}?creditscore=${creditscore}&income=${income}`);

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
    const res = await axios.patch(`http://localhost:8081/api/users/${id}/updateexpense?expense=${expense}&savings=${savings}`);

    dispatch({ type: PARTIAL_UPDATE_PROFILE_SUCCESS, payload: res.data });
    return res.data;
  } catch (error) {
    dispatch({ type: PARTIAL_UPDATE_PROFILE_FAILURE });
    throw error;
  }
};