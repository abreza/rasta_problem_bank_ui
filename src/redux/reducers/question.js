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

    /////////////////////////////

    case actionTypes.QUESTION_PROPERTIES_REQUEST:
      return { ...state, isLoading: true };

    case actionTypes.QUESTION_PROPERTIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        properties: action.response.properties,
      };

    case actionTypes.QUESTION_PROPERTIES_FAILURE:
      return {
        ...state,
        isLoading: false,
      }

    default:
      return state;
  }
}

export default question;
