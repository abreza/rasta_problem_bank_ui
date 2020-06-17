import * as actionTypes from './actionTypes';

import { CALL_API, Schemas } from '../middleware/api/api';

export const fetchQuestion = () => ({
  [CALL_API]: {
    types: [
      actionTypes.QUESTION_REQUEST,
      actionTypes.QUESTION_SUCCESS,
      actionTypes.QUESTION_FAILURE,
    ],
    url: '', // TODO: fix url
    fetchOptions: {
      method: 'GET',
    },
    schema: Schemas.QUESTION,
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
    url: '', // TODO: fix url
    fetchOptions: {
      method: 'POST',
      body: question,
    },
  },
});
