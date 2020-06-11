import { fetchDataIfNeeded } from './request';
import * as actionTypes from './actionTypes';

let loginParams = {
  url: 'url', // TODO: fix url
  method: 'POST',
  requestType: actionTypes.LOGIN_REQUEST,
  receiveType: actionTypes.LOGIN_RESPONSE,
  shouldFetch: (state) => {
    if (state.account.user) {
      return false;
    }
    return true;
  },
};

export const login = (username, password) =>
  fetchDataIfNeeded(...loginParams, ...{ data: { username, password } });

let logoutParams = {
  url: 'url', // TODO: fix url
  method: 'POST',
  requestType: actionTypes.LOGIN_REQUEST,
  receiveType: actionTypes.LOGIN_RESPONSE,
};
export const logout = () => fetchDataIfNeeded(...logoutParams);
