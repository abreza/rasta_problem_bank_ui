import * as actionTypes from '../actions/actionTypes';

function account(
  state = { loggedIn: false, user: null, isFetching: false },
  action
) {
  switch (action.type) {
    case actionTypes.REGISTER_REQUEST:
      return { ...state, isFetching: true };
    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state, 
        isFetching: false,
        token: action.response.token,
      };
    case actionTypes.REGISTER_FAILURE:
      return { ...state, isFetching: false };
    case actionTypes.LOGIN_REQUEST:
      return { ...state, isFetching: true };
    case actionTypes.LOGIN_SUCCESS:
      if (action.response.user) {
        return {
          ...state,
          isFetching: false,
          loggedIn: true,
          user: action.response.user,
        };
      } else {
        return state;
      }
    case actionTypes.LOGIN_FAILURE:
      return { ...state, isFetching: false }
    case actionTypes.LOGOUT_SUCCESS:
      return { ...state, loggedIn: false, user: null };
    default:
      return state;
  }
}

export default account;
