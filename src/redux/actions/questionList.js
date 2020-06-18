import * as actionTypes from './actionTypes';
import * as URLs from './URLs';

import { CALL_API, Schemas } from '../middleware/api/api';

export const fetchQuestionList = () => ({ //TODO: set properties to search with back
  [CALL_API]: {
    types: [
      actionTypes.QUESTION_LIST_REQUEST,
      actionTypes.QUESTION_LIST_SUCCESS,
      actionTypes.QUESTION_LIST_FAILURE,
    ],
    url: URLs.GET_QUESTION_LIST,
    fetchOptions: {
      method: 'GET',
    },
    schema: Schemas.QUESTION_ARRAY,
  },
});
