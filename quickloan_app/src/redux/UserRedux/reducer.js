import {
    UPDATE_FORM_DATA,
    SUBMIT_FORM_REQUEST,
    SUBMIT_FORM_SUCCESS,
    SUBMIT_FORM_FAILURE,
    FETCH_USER_PROFILE_REQUEST,
    FETCH_USER_PROFILE_SUCCESS,
    FETCH_USER_PROFILE_FAILURE,
    UPDATE_USER_PROFILE_REQUEST,
    UPDATE_USER_PROFILE_SUCCESS,
    UPDATE_USER_PROFILE_FAILURE,
  } from "./actiontypes";
  
  const initialState = {
    formData: {
      name: '',
      email: '',
      contact: '',
      message: '',
    },
    loading: false,
    error: null,
    userProfile: null, // Assuming a single user profile
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_FORM_DATA:
        return {
          ...state,
          formData: {
            ...state.formData,
            [action.field]: action.value,
          },
        };
      case SUBMIT_FORM_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case SUBMIT_FORM_SUCCESS:
        return {
          ...state,
          loading: false,
        };
      case SUBMIT_FORM_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.error,
        };
  
      case FETCH_USER_PROFILE_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_USER_PROFILE_SUCCESS:
        return {
          ...state,
          loading: false,
          userProfile: action.payload,
        };
      case FETCH_USER_PROFILE_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case UPDATE_USER_PROFILE_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case UPDATE_USER_PROFILE_SUCCESS:
        return {
          ...state,
          loading: false,
          userProfile: action.payload,
        };
      case UPDATE_USER_PROFILE_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default userReducer;
  