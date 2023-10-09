// src/reducers/supportReducer.js
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
    UPDATE_QUERY_STATUS_SUCCESS
} from "./actiontypes"

const initialState = {
    formData: {
        name: '',
        email: '',
        contact: '',
        message: '',
    },
    loading: false,
    error: null,
    queries: []
};

const supportReducer = (state = initialState, action) => {
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

        case FETCH_QUERIES_REQUEST:
        case UPDATE_QUERY_STATUS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case FETCH_QUERIES_SUCCESS:
            return {
                ...state,
                loading: false,
                queries: action.payload,
            };

        case FETCH_QUERIES_FAILURE:
        case UPDATE_QUERY_STATUS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case UPDATE_QUERY_STATUS_SUCCESS:
            // Update the query status in state based on the action payload
            const updatedQuery = action.payload;
            const updatedQueries = state.queries.map((query) =>
                query.id === updatedQuery.id ? updatedQuery : query
            );
            return {
                ...state,
                queries: updatedQueries,
                loading: false,
            };

        default:
            return state;
    }
};

export default supportReducer;
  