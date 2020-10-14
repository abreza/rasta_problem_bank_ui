import * as actionTypes from '../actions/actionTypes';

function account(
  state = {
    isLoggedIn: false,
    wasRegisterationFailed: false,
    wasLoginFailed: false,
    username: null,
    isFetching: false,
    token: null
  },
  action
) {
  switch (action.type) {
    case actionTypes.REGISTER_REQUEST:
      return {
        ...state,
        isFetching: true,
        wasRegisterationFailed: false,
      };

    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        token: action.response.token,
        wasRegisterationFailed: false,
      };

    case actionTypes.REGISTER_FAILURE:
      return {
        ...state,
        isFetching: false,
        wasRegisterationFailed: true,
      };

    //#######################

    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        wasLoginFailed: false,
      };

    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLoggedIn: true,
        username: action.payload.username,
        token: action.response.token,
        wasLoginFailed: false,
      }

    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        username: null,
        wasLoginFailed: true,
      }

    //#######################

    case actionTypes.LOGOUT_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        token: null,
        isLoggedIn: false
      };

    case actionTypes.LOGOUT_FAILURE:
      return {
        ...state,
        isFetching: false
      }

    //#######################

    default:
      return state;
  }
}

export default account;
