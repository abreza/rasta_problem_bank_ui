import * as actionTypes from './actionTypes';
import * as URLs from './URLs';

import { CALL_API } from '../middleware/api/api';

const fetchUser = (account_id) => ({
  [CALL_API]: {
    types: [
      actionTypes.USER_REQUEST,
      actionTypes.USER_SUCCESS,
      actionTypes.USER_FAILURE,
    ],
    url: URLs.GET_USER_DATA + account_id,
    fetchOptions: {
      method: 'GET',
    },
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
    url: URLs.LOGIN_USER,
    fetchOptions: {
      method: 'POST',
      body: { username, password },
    },
  },
});

export const register = (
  username,
  password,
  first_name,
  last_name,
  phone_number,
  email
) => ({
  [CALL_API]: {
    types: [
      actionTypes.REGISTER_REQUEST,
      actionTypes.REGISTER_SUCCESS,
      actionTypes.REGISTER_FAILURE,
    ],
    url: URLs.REGISTER_USER,
    fetchOptions: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: { username, password },
        first_name,
        last_name,
        phone_number,
        email,
      }),
    },
  },
});

export const logout = () => ({
  [CALL_API]: {
    types: [
      actionTypes.LOGOUT_REQUEST,
      actionTypes.LOGOUT_SUCCESS,
      actionTypes.LOGOUT_FAILURE,
    ],
    url: URLs.LOGOUT_USER,
    fetchOptions: {
      method: 'GET',
    },
  },
});
