import * as actionTypes from '../actionTypes';

function problem(
  state = {
    isFetching: false,
  },
  action
) {
  switch (action.type) {
    case actionTypes.SUBMIT_PROBLEM_REQUEST:
      return {
        ...state,
        isFetching: true,
      }

    case actionTypes.SUBMIT_PROBLEM_SUCCESS:
      return {
        ...state,
        isFetching: false,
      }

    case actionTypes.SUBMIT_PROBLEM_FAILURE:
      return {
        ...state,
        isFetching: false,
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
