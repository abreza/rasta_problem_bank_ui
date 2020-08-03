import * as actionTypes from '../actions/actionTypes';

function account(
  state = { isLoggedIn: false, user: null, isFetching: false, token: null, isLoginSuccessful: false },
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

    //#######################

    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        username: action.payload.username,
      };

    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLoggedIn: true,
        isLoginSuccessful: true,
        token: action.response.token,
      }

    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        username: null,
      }

    //#######################

    case actionTypes.LOGOUT_REQUEST:
      return { ...state, isFetching: true };

    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        token: null,
        isLoggedIn: false
      };

    case actionTypes.LOGOUT_FAILURE:
      return { ...state, isFetching: false }

    //#######################

    default:
      return state;
  }
}

export default account;
