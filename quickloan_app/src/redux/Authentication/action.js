import axios from 'axios';
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from './actionType';

export const checkEmailExists = (email) => async(dispatch) =>{
  
  try {
    
    const res = await axios.get(`http://localhost:8081/api/users`);
    return res.data.some((user) => user.email === email);
  } catch (error) {
    console.error('Error checking email existence:', error);
    return false;
  }
};

export const signup = (formData) => async (dispatch) => {
  
  const emailExists = await dispatch(checkEmailExists(formData.email));
  console.log("inside signup action")
  if (emailExists) {
    dispatch({ type: SIGNUP_FAILURE, payload: 'User already exists with this email.' });
    return -1; // Indicate signup failure
  }

  dispatch({ type: SIGNUP_REQUEST });
  console.log("inside signup action")
  try {
    const res = await axios.post('http://localhost:8081/api/users', formData);
    dispatch({ type: SIGNUP_SUCCESS, payload: res.data });
    return 1; // Indicate signup success
  } catch (error) {
    dispatch({ type: SIGNUP_FAILURE });
    return -1; // Indicate signup failure
  }
};

export const login = (loginData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const res = await axios.get(`http://localhost:8081/api/users`);
    const user = res.data.find((el) => el.email === loginData.email && el.password === loginData.password);

    if (user) {
      dispatch({ type: LOGIN_SUCCESS, payload: user });
      return true; // Indicate login success
    } else {
      dispatch({ type: LOGIN_FAILURE });
      return false; // Indicate login failure
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE });
    return false; // Indicate login failure
  }
};
