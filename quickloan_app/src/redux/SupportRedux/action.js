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

const supportServiceName = 'support-service';

// Function to resolve the service endpoint dynamically
const resolveSupportServiceEndpoint = async () => {
  try {
    // Make an HTTP request to Eureka to fetch service information
    const eurekaResponse = await axios.get('http://localhost:8761/eureka/apps/' + supportServiceName);
    const instance = eurekaResponse.data.application.instance[0]; 
    console.log("instance", instance)
    if (instance) {
      const { hostName, port } = instance;
      return `http://${hostName}:${port.$}/api/support`;
    } else {
      throw new Error(`No instances found for ${supportServiceName}`);
    }
  } catch (error) {
    console.error('Error resolving user-service endpoint:', error);
    throw error;
  }
};

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
            // Resolve the service endpoint dynamically
            const serviceEndpoint = await resolveSupportServiceEndpoint();
            const response = await axios.get(serviceEndpoint);
            dispatch(fetchQueriesSuccess(response.data));
        } catch (error) {
            dispatch(fetchQueriesFailure(error.message));
        }
    };
};

export const submitForm = (formData) => {
    return async (dispatch) => {
        dispatch({ type: SUBMIT_FORM_REQUEST });
        try {
            // Resolve the service endpoint dynamically
            const serviceEndpoint = await resolveSupportServiceEndpoint();
            const response = await axios.post(serviceEndpoint, formData);
            dispatch({ type: SUBMIT_FORM_SUCCESS });
            return response.data;
        } catch (error) {
            dispatch({ type: SUBMIT_FORM_FAILURE, error });
            throw error;
        }
    };
};

export const updateQueryStatus = (queryId, newStatus) => {
    return async (dispatch) => {
        dispatch(updateQueryStatusRequest());
        try {
            // Resolve the service endpoint dynamically
            const serviceEndpoint = await resolveSupportServiceEndpoint();
            // Send a PUT request to update the query status
            const response = await axios.put(
                `${serviceEndpoint}/${queryId}/status/${newStatus}`,
                { status: newStatus }
            );
            dispatch(updateQueryStatusSuccess(response.data));
        } catch (error) {
            dispatch(updateQueryStatusFailure(error.message));
        }
    };
};