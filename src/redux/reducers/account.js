import * as actionTypes from '../actionTypes';

const initialState = {
  isLoggedIn: false,
  isRegistered: false,
  wasLoginFailed: false,
  wasRegistrationFailed: false,
  username: '',
  isFetching: false,
  token: null,
  promptStatus: false,
  promptHeader: '',
  promptText: '',
  promptColor: '',
}

function account(state = initialState, action) {
  switch (action.type) {
    case actionTypes.REGISTER_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        token: action.response.token,
      };

    case actionTypes.REGISTER_FAILURE:
      return {
        ...state,
        isFetching: false,
      };

    //#######################

    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        isLoggedIn: false,
      };

    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLoggedIn: true,
        // username: action.payload.username, //todo
        token: action.response.token,
      }

    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        username: null,
        isLoggedIn: false,
      }

    //#######################

    case actionTypes.LOGOUT_REQUEST:
      return {
        ...state,
        token: '',
        isLoggedIn: false,

      };

    default:
      return state;
  }
}

export default account;