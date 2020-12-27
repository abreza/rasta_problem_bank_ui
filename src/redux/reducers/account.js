import * as actionTypes from '../actionTypes';

const initialState = {
  isFetching: false,
  token: '',
  users: [],
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

    //#######################

    case actionTypes.USER_REQUEST:
      return {
        ...state,
      }

    case actionTypes.USER_SUCCESS:
      console.log(action)
      return {
        ...state,
        users: [...state.users, action.response]
      }

    case actionTypes.USER_FAILURE:
      return {
        ...state,
      }

    default:
      return state;
  }
}

export default account;