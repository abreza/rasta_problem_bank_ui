import * as actionTypes from '../actions/actionTypes';

function account(
  state = { loggedIn: false, user: null, isFetching: false },
  action
) {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return { ...state, isFetching: true };
    case actionTypes.LOGIN_SUCCESS:
      if (action.response.user) {
        return {
          ...state,
          isFetching: false,
          loggedIn: true,
          user: action.response.user,
        }; // TODO: why "actiom.payload.user" not?
      } else {
        return state;
      }
    case actionTypes.LOGOUT_SUCCESS:
      return { ...state, loggedIn: false, user: null };
    default:
      return state;
  }
}

export default account;
