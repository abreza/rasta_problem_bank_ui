import * as actionTypes from '../actions/actionTypes'

function questionsList(state = {}, action) {
  switch (action.type) {
  case actionTypes.UPDATE_QUESTIONS_LIST_REQUEST:
    return { ...state, isLoading: true };
  case actionTypes.UPDATE_QUESTIONS_LIST_RECEIVE:
    return { ...state, isLoading: false, questionsList: action.payload.questionsList }
  default:
    return state;
  }
}

export default questionsList;