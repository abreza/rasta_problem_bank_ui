import * as actionTypes from '../actions/actionTypes';

function questions(state = {}, action) {
  switch (action.type) {
    case actionTypes.QUESTION_SUCCESS:
      return {
        ...state,
        questions: {
          ...state.questions,
          [action.response.question.id]: action.response.question,
        },
        isFetching: false,
      };
    case action.QUESTION_LIST_REQUEST:
      return {
        ...state,
        questions: action.response.questions,
        isFetching: false,
      };
    default:
      return state;
  }
}

export default questions;
