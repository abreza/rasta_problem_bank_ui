/* eslint-disable indent */

import * as actionTypes from '../actions/actionTypes';

function account(
  state = { logged_in: false, user: null, isLoading: false },
  action
) {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return { ...state, isLoading: true };
    case actionTypes.LOGIN_RESPONSE:
      if (action.payload.data.user) {
        return { ...state, logged_in: true, isLoading: false, user: action.payload.data.user };
      } else {
        return state;
      }
    case actionTypes.LOGOUT:
      return { ...state, logged_in: false, user: null };
    default:
      return state;
  }
}

export default account;
