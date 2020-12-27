import * as actionTypes from '../actionTypes';

const initState = {
  isFetching: false,
  problems: [],
  comments: [],
}

function problem(
  state = initState,
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

    //#########################

    case actionTypes.GET_PROBLEM_SUCCESS:
      return {
        ...state,
        problems: [...state.problems, action.response],
        isFetching: false,
      };

    //#########################

    case actionTypes.SUBMIT_COMMENTS_REQUEST:
      return {
        ...state,
        isFetching: true,
      }

    case actionTypes.SUBMIT_COMMENTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
      }

    case actionTypes.SUBMIT_COMMENTS_FAILURE:
      return {
        ...state,
        isFetching: false,
      }

    default:
      return state;
  }
}

export default problem;
