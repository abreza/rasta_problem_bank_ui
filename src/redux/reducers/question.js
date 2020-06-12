import * as actionTypes from '../actions/actionTypes'

function question(state = {}, action) {
  switch (action.type) {
  case actionTypes.UPDATE_QUESTION_REQUEST:
    return { ...state, isLoading: true };
  case actionTypes.UPDATE_QUESTION_RECEIVE:
    return {
      ...state, isLoading: false,
      question: action.payload.question, //TODO: is it correct to store just the latest question?
    }
  case actionTypes.SUBMIT_UPDATED_QUESTION_REQUEST:
    return //TODO
  case actionTypes.SUBMIT_UPDATED_QUESTION_RECEIVE:
    return //TODO
  default:
    return state;
  }
}

export default question;