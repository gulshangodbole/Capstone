// reducer.js

import {
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  PARTIAL_UPDATE_PROFILE_REQUEST,
  PARTIAL_UPDATE_PROFILE_SUCCESS,
  PARTIAL_UPDATE_PROFILE_FAILURE,
} from './actiontypes';

const initialState = {
  loading: false,
  error: null,
  updatedUser: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
      return { ...state, loading: true, error: null };
    case UPDATE_PROFILE_SUCCESS:
      return { ...state, loading: false, updatedUser: action.payload, error: null };
    case UPDATE_PROFILE_FAILURE:
      return { ...state, loading: false, error: 'Failed to update profile' };
      case PARTIAL_UPDATE_PROFILE_REQUEST:
        return { ...state, loading: true, error: null };
      case PARTIAL_UPDATE_PROFILE_SUCCESS:
        return {
          ...state,
          loading: false,
          updatedUser: { ...state.updatedUser, ...action.payload },
          error: null,
        };
      case PARTIAL_UPDATE_PROFILE_FAILURE:
        return { ...state, loading: false, error: 'Failed to update profile' }
    default:
      return state;
  }
};

export default profileReducer;
