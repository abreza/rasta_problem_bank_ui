import * as actionTypes from '../actionTypes';

function problem(
  state = {
    isFetching: false,
    wasProblemSubmissionSuccessful: false,
    wasProblemSubmissionFailed: false,
  },
  action
) {
  switch (action.type) {
    case actionTypes.SUBMIT_PROBLEM_REQUEST:
      return {
        ...state,
        isFetching: true,
        wasProblemSubmissionSuccessful: false,
        wasProblemSubmissionFailed: false,
      }

    case actionTypes.SUBMIT_PROBLEM_SUCCESS:
      return {
        ...state,
        isFetching: false,
        wasProblemSubmissionSuccessful: true,
      }

    case actionTypes.SUBMIT_PROBLEM_FAILURE:
      return {
        ...state,
        isFetching: false,
        wasProblemSubmissionFailed: true,

      }

    //#########################

    case actionTypes.PROBLEM_LIST_REQUEST:
    case actionTypes.GET_PROBLEM_REQUEST:
      return {
        ...state,
        isFetching: true,
      }

    case actionTypes.PROBLEM_LIST_SUCCESS:
      console.log(action.response)
      return {
        ...state,
        problems: action.response.questions,
        numberOfPages: action.response.num_pages,
        isFetching: false,
      };

    case actionTypes.PROBLEM_LIST_FAILURE:
    case actionTypes.GET_PROBLEM_FAILURE:
      return {
        ...state,
        isFetching: false,
      }

    case actionTypes.GET_PROBLEM_SUCCESS:
      return {
        ...state,
        problems: {
          ...state.problems,
          [action.response.id]: action.response,
        },
        isFetching: false,
      };

    default:
      return state;
  }
}

export default problem;
