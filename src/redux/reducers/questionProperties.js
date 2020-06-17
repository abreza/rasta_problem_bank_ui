import * as actionTypes from '../actions/actionTypes';

function questionProperties(state = {}, action) {
  switch (action.type) {
    case actionTypes.QUESTION_PROPERTIES_REQUEST:
      return { ...state, isLoading: true };
    case actionTypes.QUESTION_PROPERTIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        questionProperties: action.response.questionProperties,
      };
    default:
      return state;
  }
}

export default questionProperties;
