import * as actionTypes from './actionTypes';

import { CALL_API, Schemas } from '../middleware/api/api';

export const fetchQuestionList = () => ({
  [CALL_API]: {
    types: [
      actionTypes.QUESTION_LIST_REQUEST,
      actionTypes.QUESTION_LIST_SUCCESS,
      actionTypes.QUESTION_LIST_FAILURE,
    ],
    url: '', // TODO: fix url
    fetchOptions: {
      method: 'GET',
    },
    schema: Schemas.QUESTION_ARRAY,
  },
});
