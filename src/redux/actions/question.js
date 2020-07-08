import * as actionTypes from './actionTypes';
import * as URLs from './URLs';

import { CALL_API } from '../middleware/api/api';

export const fetchQuestion = (question_id) => ({
  [CALL_API]: {
    types: [
      actionTypes.QUESTION_REQUEST,
      actionTypes.QUESTION_SUCCESS,
      actionTypes.QUESTION_FAILURE,
    ],
    url: URLs.GET_QUESTION + question_id,
    fetchOptions: {
      method: 'GET',
    },
    // schema: Schemas.QUESTION,
  },
});

// TODO: save on store
export const submitQuestion = (question) => ({
  [CALL_API]: {
    types: [
      actionTypes.QUESTION_SUBMIT_REQUEST,
      actionTypes.QUESTION_SUBMIT_SUCCESS,
      actionTypes.QUESTION_SUBMIT_FAILURE,
    ],
    url: URLs.SUBMIT_QUESTION,
    fetchOptions: {
      method: 'POST',
      body: question,
    },
  },
});
