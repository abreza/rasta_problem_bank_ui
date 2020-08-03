import * as actionTypes from '../actions/actionTypes';

function question(state = {}, action) {
  switch (action.type) {
    case actionTypes.QUESTION_REQUEST:
      return {
        ...state,
        isFetching: true,
      }

    case actionTypes.QUESTION_SUCCESS:
      return {
        ...state,
        questions: {
          ...state.questions,
          [action.response.id]: action.response,
        },
        isFetching: false,
      };

    case actionTypes.QUESTION_FAILURE:
      return {
        ...state,
        isFetching: false,
      }
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

export default question;
