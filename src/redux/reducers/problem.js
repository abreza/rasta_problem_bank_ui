import * as actionTypes from '../actions/actionTypes';

function problem(
  state = {
    isFetching: false,
    wasProblemSubmitSuccessful: false,
    wasProblemSubmitFailed: false,
  },
  action
) {
  switch (action.type) {
    case actionTypes.PROBLEM_SUBMIT_REQUEST:
      return {
        ...state,
        isFetching: true,
        wasProblemSubmitSuccessful: false,
        wasProblemSubmitFailed: false,
      }

    case actionTypes.PROBLEM_SUBMIT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        wasProblemSubmitSuccessful: true,
        wasProblemSubmitFailed: false,
      }

    case actionTypes.PROBLEM_SUBMIT_FAILURE:
      return {
        ...state,
        isFetching: false,
        wasProblemSubmitSuccessful: false,
        wasProblemSubmitFailed: true,
      }

    //#########################

    case actionTypes.PROBLEM_LIST_REQUEST:
    case actionTypes.PROBLEM_REQUEST:
      return {
        ...state,
        isFetching: true,
      }

    case actionTypes.PROBLEM_LIST_SUCCESS:
      console.log(action.response)
      return {
        ...state,
        problems: action.response.questions, //todo correct "questions"
        numberOfPages: action.response.num_pages,
        isFetching: false,
      };

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

    default:
      return state;
  }
}

export default problem;
