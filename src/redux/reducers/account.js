import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isLoggedIn: false,
  wasLoginFailed: false,
  wasRegisterationFailed: false,
  username: '',
  isFetching: false,
  token: null
}

function account(state = initialState, action) {
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
        isLoggedIn: false,
        wasLoginFailed: false,
      };

    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLoggedIn: true,
        wasLoginFailed: false,
        username: action.payload.username,
        token: action.response.token,
      }

    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        username: null,
        isLoggedIn: false,
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
        initialState
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
