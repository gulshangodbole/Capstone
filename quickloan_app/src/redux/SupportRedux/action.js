import {
    FETCH_QUERIES_FAILURE,
    FETCH_QUERIES_REQUEST,
    FETCH_QUERIES_SUCCESS,
    SUBMIT_FORM_FAILURE,
    SUBMIT_FORM_REQUEST,
    SUBMIT_FORM_SUCCESS,
    UPDATE_FORM_DATA,
    UPDATE_QUERY_STATUS_FAILURE,
    UPDATE_QUERY_STATUS_REQUEST,
    UPDATE_QUERY_STATUS_SUCCESS,
} from "./actiontypes"
import axios from 'axios';

export const updateFormData = (field, value) => ({
    type: UPDATE_FORM_DATA,
    field,
    value,
});

export const fetchQueriesRequest = () => ({
    type: FETCH_QUERIES_REQUEST,
});

export const fetchQueriesSuccess = (queries) => ({
    type: FETCH_QUERIES_SUCCESS,
    payload: queries,
});

export const fetchQueriesFailure = (error) => ({
    type: FETCH_QUERIES_FAILURE,
    payload: error,
});

export const updateQueryStatusRequest = () => ({
    type: UPDATE_QUERY_STATUS_REQUEST,
});

export const updateQueryStatusSuccess = (query) => ({
    type: UPDATE_QUERY_STATUS_SUCCESS,
    payload: query,
});

export const updateQueryStatusFailure = (error) => ({
    type: UPDATE_QUERY_STATUS_FAILURE,
    payload: error,
});

export const fetchQueries = () => {
    return async (dispatch) => {
        dispatch(fetchQueriesRequest());
        try {
            const response = await axios.get('http://localhost:8081/api/support');
            dispatch(fetchQueriesSuccess(response.data));
        } catch (error) {
            dispatch(fetchQueriesFailure(error.message));
        }
    };
};

export const submitForm = (formData) => {
    return async (dispatch) => {
        dispatch({type: SUBMIT_FORM_REQUEST});
        try {
            const response = await axios.post('http://localhost:8081/api/support', formData);
            dispatch({type: SUBMIT_FORM_SUCCESS});
            return response.data;
        } catch (error) {
            dispatch({type: SUBMIT_FORM_FAILURE, error});
            throw error;
        }
    };
};

export const updateQueryStatus = (queryId, newStatus) => {
    return async (dispatch) => {
        dispatch(updateQueryStatusRequest());
        try {
            // Send a PUT request to update the query status
            const response = await axios.put(
                `http://localhost:8081/api/support/${queryId}/status/${newStatus}`,
                {status: newStatus}
            );
            dispatch(updateQueryStatusSuccess(response.data));
        } catch (error) {
            dispatch(updateQueryStatusFailure(error.message));
        }
    };
};