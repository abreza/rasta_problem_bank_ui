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

    //###########################

    case actionTypes.QUESTION_LIST_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case actionTypes.QUESTION_LIST_SUCCESS:
      return {
        ...state,
        allQuestions: action.response.questions,
        totalNumberOfPages: action.response.num_pages,
        isFetching: false,
      };


    case actionTypes.QUESTION_LIST_FAILURE:
      return {
        ...state,
        isFetching: false,
      }
      
    default:
      return state;
  }
}

export default question;
