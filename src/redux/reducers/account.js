import * as actionTypes from '../actions/actionTypes';

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
        isRegistered: false,
        wasRegistrationFailed: false,
      };

    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        token: action.response.token,
        isRegistered: true,
      };

    case actionTypes.REGISTER_FAILURE:
      return {
        ...state,
        isFetching: false,
        wasRegistrationFailed: true,
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
        ...initialState,
        // promptStatus: true,
        // promptHeader: "خدا به همراهت :(",
        // promptText: "بازم بیا، منتظرتیم...",
        // promptColor: "teal", todo
      };

    case actionTypes.LOGOUT_FAILURE:
      return {
        ...state,
        isFetching: false
      }

    //#######################

    case actionTypes.SHOWـPROMPT:
      return {
        ...state,
        promptStatus: true,
        promptHeader: action.payload.header,
        promptText: action.payload.text,
        promptColor: action.payload.color,
      }

    case actionTypes.REMOVEـPROMPT:
      return {
        ...state,
        promptStatus: false,
        promptHeader: '',
        promptText: '',
        promptColor: '',
      }

    default:
      return state;
  }
}

export default account;