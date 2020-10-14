import * as actionTypes from '../actions/actionTypes';

function problem(
  state = {
    isFetching: false,
    wasProblemSubmitFailed: false,
  },
  action
) {
  switch (action.type) {
    case actionTypes.PROBLEM_SUBMIT_REQUEST:
      return {
        ...state,
        isFetching: true,
        wasProblemSubmitFailed: false,
      }

    case actionTypes.PROBLEM_SUBMIT_FAILURE:
      return {
        ...state,
        isFetching: false,
        wasProblemSubmitFailed: true,
      }

    case actionTypes.PROBLEM_SUBMIT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        wasProblemSubmitFailed: false,
      }

    //#########################

    case actionTypes.PROBLEM_LIST_REQUEST:
    case actionTypes.PROBLEM_REQUEST:
      return {
        ...state,
        isFetching: true,
      }


    case actionTypes.PROBLEM_LIST_FAILURE:
    case actionTypes.PROBLEM_FAILURE:
      return {
        ...state,
        isFetching: false,
      }

    case actionTypes.PROBLEM_SUCCESS:
      return {
        ...state,
        problems: {
          ...state.problems,
          [action.response.id]: action.response,
        },
        isFetching: false,
      };

    case actionTypes.PROBLEM_LIST_SUCCESS:
      return {
        ...state,
        problems: action.response.questions, //todo correct "questions"
        numberOfPages: action.response.num_pages,
        isFetching: false,
      };


    default:
      return state;
  }
}

export default problem;
