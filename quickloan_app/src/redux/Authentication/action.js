import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS,  } from './actionType';


export const checkEmailExists = (email) => async () => {
  try {
    const res = await axios.get(`http://localhost:8081/api/user`);
    return res.data.some((user) => user.email === email);
  } catch (error) {
    console.error('Error checking email existence:', error);
    return false;
  }
};


export const signup = (formData) => async (dispatch) => {


  const emailExists = await dispatch(checkEmailExists(formData.email));

  if (emailExists) {
    // If email already exists, dispatch a failure action
    dispatch({ type: SIGNUP_FAILURE, payload: 'User already exists with this email.' });
    return false;
  }


    dispatch({ type: SIGNUP_REQUEST });

<<<<<<< HEAD
    return axios.post('http://localhost:8081/api/user', formData).then((res) => {
=======
    return axios.post('http://localhost:8081/api/users', formData).then((res) => {
>>>>>>> e7f146d6fa8962e6f48244e785f111c4f3616228
        dispatch({ type: SIGNUP_SUCCESS, payload: res.data })
        return res.data
    }).catch((err) => {

        dispatch({ type: SIGNUP_FAILURE })
        return false;
    })

}
export const login = (loginData) => async (dispatch) => {


    dispatch({ type: LOGIN_REQUEST});
  
    try {
<<<<<<< HEAD
      const res = await axios.get(`http://localhost:8081/api/user`);
=======
      const res = await axios.get(`http://localhost:8081/api/users`);
>>>>>>> e7f146d6fa8962e6f48244e785f111c4f3616228
  
      const user = res.data.find((el) => el.email === loginData.email && el.password === loginData.password);
  
      if (user) {
        dispatch({ type: LOGIN_SUCCESS, payload: user });
        console.log("User found:", user);
        return true;
      } else {
        dispatch({ type: LOGIN_FAILURE });
        return false;
      }
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE });
    }
  };
  