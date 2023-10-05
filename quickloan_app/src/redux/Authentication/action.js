import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS,  } from './actionType';


export const checkEmailExists = (email) => async () => {
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
  console.log("Email" ,emailExists);
  if (emailExists) {
    // If email already exists, dispatch a failure action
    dispatch({ type: SIGNUP_FAILURE, payload: 'User already exists with this email.' });
    return 0;
  }


    dispatch({ type: SIGNUP_REQUEST });
    return axios.post('http://localhost:8081/api/users', formData).then((res) => {
        dispatch({ type: SIGNUP_SUCCESS, payload: res.data })
        return 1
    }).catch((err) => {

    dispatch({ type: SIGNUP_FAILURE })
    return -1;
    })

}
export const login = (loginData) => async (dispatch) => {


    dispatch({ type: LOGIN_REQUEST});
  
    try {
      const res = await axios.get(`http://localhost:8081/api/users`);
      const user = res.data.find((el) => el.email === loginData.email && el.password === loginData.password);
      if (user) {
        dispatch({ type: LOGIN_SUCCESS, payload: user });
        console.log("User found:", user);
        return true;
      } else {
        dispatch({ type: LOGIN_FAILURE });
        console.log("User failed:", user);
        return false;
      }
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE });
    }
  };
  