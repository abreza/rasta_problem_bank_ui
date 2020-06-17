import * as actionTypes from './actionTypes';

import { CALL_API, Schemas } from '../middleware/api/api';

const fetchUser = (user_id) => ({
  [CALL_API]: {
    types: [
      actionTypes.USER_REQUEST,
      actionTypes.USER_SUCCESS,
      actionTypes.USER_FAILURE,
    ],
    url: '', // TODO: fix url
    fetchOptions: {
      method: 'POST',
      body: { user_id },
    },
    schema: Schemas.USER,
  },
});

export const loadUser = (user_id, requiredFields = []) => (
  dispatch,
  getState
) => {
  const user = getState().users[user_id];
  if (user && requiredFields.every((key) => user.hasOwnProperty(key))) {
    return null;
  }

  return dispatch(fetchUser(user_id));
};

export const login = (username, password) => ({
  [CALL_API]: {
    types: [
      actionTypes.LOGIN_REQUEST,
      actionTypes.LOGIN_SUCCESS,
      actionTypes.LOGIN_FAILURE,
    ],
    url: '', // TODO: fix url
    fetchOptions: {
      method: 'POST',
      body: { username, password },
    },
    schema: Schemas.USER,
  },
});

export const logout = () => ({
  [CALL_API]: {
    types: [
      actionTypes.LOGOUT_REQUEST,
      actionTypes.LOGOUT_SUCCESS,
      actionTypes.LOGOUT_FAILURE,
    ],
    url: '', // TODO: fix url
    fetchOptions: {
      method: 'GET',
    },
  },
});
