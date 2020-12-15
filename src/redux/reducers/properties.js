import * as actionTypes from '../actionTypes';

function properties(
  state = { tags: [], subtags: [], events: [], sources: [], isFetching: false },
  action
) {
  switch (action.type) {
    case actionTypes.TAGS_REQUEST:
      return { ...state, isFetching: true };

    case actionTypes.TAGS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        tags: action.response,
      };

    case actionTypes.TAGS_FAILURE:
      return { ...state, isFetching: false };

    //#######################

    case actionTypes.SUBTAGS_REQUEST:
      return { ...state, isFetching: true };

    case actionTypes.SUBTAGS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        subtags: action.response,
      };

    case actionTypes.SUBTAGS_FAILURE:
      return { ...state, isFetching: false };

    //#######################

    case actionTypes.EVENTS_REQUEST:
      return { ...state, isFetching: true };

    case actionTypes.EVENTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        events: action.response,
      };

    case actionTypes.EVENTS_FAILURE:
      return { ...state, isFetching: false };

    //#######################

    case actionTypes.SOURCES_REQUEST:
      return { ...state, isFetching: true };

    case actionTypes.SOURCES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        sources: action.response,
      };

    case actionTypes.SOURCES_FAILURE:
      return { ...state, isFetching: false };

    //#######################

    default:
      return state;
  }
}

export default properties;
