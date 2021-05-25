import * as actionTypes from '../actionTypes';

const initState = {
  isFetching: false,
  comments: [],
}

function problem(
  state = initState,
  action
) {
  switch (action.type) {

    case actionTypes.SUBMIT_COMMENTS_REQUEST:
    case actionTypes.PROBLEM_LIST_REQUEST:
    case actionTypes.GET_PROBLEM_REQUEST:
    case actionTypes.SUBMIT_PROBLEM_REQUEST:
      return {
        ...state,
        isFetching: true,
      }

    case actionTypes.SUBMIT_COMMENTS_FAILURE:
    case actionTypes.SUBMIT_COMMENTS_SUCCESS:
    case actionTypes.PROBLEM_LIST_FAILURE:
    case actionTypes.GET_PROBLEM_FAILURE:
    case actionTypes.SUBMIT_PROBLEM_FAILURE:
    case actionTypes.SUBMIT_PROBLEM_SUCCESS:
      return {
        ...state,
        isFetching: false,
      }


    case actionTypes.PROBLEM_LIST_SUCCESS:
      return {
        ...state,
        problems: action.response.questions,
        numberOfPages: action.response.num_pages,
        isFetching: false,
      };

    case actionTypes.GET_PROBLEM_SUCCESS:
      return {
        ...state,
        problem: action.response,
        isFetching: false,
      };

    default:
      return state;
  }
}

export default problem;
