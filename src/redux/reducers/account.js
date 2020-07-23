import * as actionTypes from '../actions/actionTypes';

function account(
  state = { loggedIn: false, user: null, isFetching: false, token: null },
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
      return { ...state, isFetching: true };

    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        loggedIn: true,
        token: action.response.token,
      }

    case actionTypes.LOGIN_FAILURE:
      return { ...state, isFetching: false }

    //#######################

    case actionTypes.LOGOUT_REQUEST:
      return { ...state, isFetching: true };

    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        token: null,
        loggedIn: false
      };

    case actionTypes.LOGOUT_FAILURE:
      return { ...state, isFetching: false }

    //#######################

    default:
      return state;
  }
}

export default account;
