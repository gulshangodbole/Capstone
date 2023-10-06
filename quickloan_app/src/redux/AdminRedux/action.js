import axios from "axios"
import {
    GET_USERS,
    REQ_GET_USERS
} from "./actionTypes"

export const getUsersAction = (dispatch) => {
    dispatch({
        type: REQ_GET_USERS
    })
    axios.get('http://localhost:8081/api/users')
        .then((res) => {
            // console.log('res:', res.data)
            dispatch({
                type: GET_USERS,
                payload: res.data
            })
        })
        .catch((err) => {
            console.log('err:', err)
        })
}