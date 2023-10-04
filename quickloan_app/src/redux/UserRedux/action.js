import {
    SUBMIT_FORM_REQUEST,
    SUBMIT_FORM_SUCCESS,
    SUBMIT_FORM_FAILURE,
    UPDATE_FORM_DATA,
    FETCH_USER_PROFILE_REQUEST,
    FETCH_USER_PROFILE_SUCCESS,
    FETCH_USER_PROFILE_FAILURE,
    UPDATE_USER_PROFILE_REQUEST,
    UPDATE_USER_PROFILE_SUCCESS,
    UPDATE_USER_PROFILE_FAILURE,
  } from "./actiontypes";
  import axios from "axios";
  
  export const updateFormData = (field, value) => ({
    type: UPDATE_FORM_DATA,
    field,
    value,
  });
  
  export const fetchUserProfileRequest = () => ({
    type: FETCH_USER_PROFILE_REQUEST,
  });
  
  export const fetchUserProfileSuccess = (userProfile) => ({
    type: FETCH_USER_PROFILE_SUCCESS,
    payload: userProfile,
  });
  
  export const fetchUserProfileFailure = (error) => ({
    type: FETCH_USER_PROFILE_FAILURE,
    payload: error,
  });
  
  export const updateUserProfileRequest = () => ({
    type: UPDATE_USER_PROFILE_REQUEST,
  });
  
  export const updateUserProfileSuccess = (userProfile) => ({
    type: UPDATE_USER_PROFILE_SUCCESS,
    payload: userProfile,
  });
  
  export const updateUserProfileFailure = (error) => ({
    type: UPDATE_USER_PROFILE_FAILURE,
    payload: error,
  });
  
  export const fetchUserProfile = () => {
    return async (dispatch) => {
      dispatch(fetchUserProfileRequest());
      try {
        const response = await axios.get("http://localhost:8081/api/user");
        dispatch(fetchUserProfileSuccess(response.data));
      } catch (error) {
        dispatch(fetchUserProfileFailure(error.message));
      }
    };
  };
  
  export const submitForm = (formData) => {
    return async (dispatch) => {
      dispatch({ type: SUBMIT_FORM_REQUEST });
      try {
        const response = await axios.post(
          "http://localhost:8081/api/user",
          formData
        );
        dispatch({ type: SUBMIT_FORM_SUCCESS });
        return response.data;
      } catch (error) {
        dispatch({ type: SUBMIT_FORM_FAILURE, error });
        throw error;
      }
    };
  };
  
  export const updateProfileStatus = (userId, newStatus) => {
    return async (dispatch) => {
      dispatch(updateUserProfileRequest());
      try {
        // Send a PUT request to update the user's profile status
        const response = await axios.put(
          `http://localhost:8081/api/user/${userId}/status/${newStatus}`,
          { status: newStatus }
        );
        dispatch(updateUserProfileSuccess(response.data));
      } catch (error) {
        dispatch(updateUserProfileFailure(error.message));
      }
    };
  };
  