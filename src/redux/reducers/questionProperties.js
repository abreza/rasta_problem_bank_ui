import * as actionTypes from '../actions/actionTypes'

function questionProperties(state = {}, action) {
  switch (action.type) {
  case actionTypes.UPDATE_QUESTION_PROPERTIES_REQUEST:
    return { ...state, isLoading: true };
  case actionTypes.UPDATE_QUESTION_PROPERTIES_RECEIVE:
    return { ...state, isLoading: false, questionProperties: action.payload.questionProperties }
  default:
    return state;
  }
}

export default questionProperties;