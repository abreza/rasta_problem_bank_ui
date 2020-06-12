import * as actionTypes from '../actions/actionTypes'

function usersList(state = {}, action) {
  switch (action.type) {
  case actionTypes.UPDATE_USERS_RATING_REQUEST:
    return { ...state, isLoading: true };
  case actionTypes.UPDATE_USERS_RATING_RECEIVE:
    return { ...state, isLoading: false, usersList: action.payload.usersList }
  default:
    return state;
  }
}

export default usersList;