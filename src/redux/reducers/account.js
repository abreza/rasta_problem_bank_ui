import * as actionTypes from '../actionTypes';

const initialState = {
  isFetching: false,
  token: '',
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
      };

    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        token: action.response.token,
      }

    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
      }

    //#######################

    case actionTypes.LOGOUT_REQUEST:
      return {
        ...state,
        token: '',
      };

    default:
      return state;
  }
}

export default account;