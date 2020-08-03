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

export const fetchQuestionProperties = () => ({
  [CALL_API]: {
    types: [
      actionTypes.QUESTION_PROPERTIES_REQUEST,
      actionTypes.QUESTION_PROPERTIES_SUCCESS,
      actionTypes.QUESTION_PROPERTIES_FAILURE,
    ],
    url: URLs.GET_QUESTION_PROPERTIES,
    fetchOptions: {
      method: 'GET',
    },
  },
});


export const fetchQuestionList = () => ({ //TODO: set properties to search with back
  [CALL_API]: {
    types: [
      actionTypes.QUESTION_LIST_REQUEST,
      actionTypes.QUESTION_LIST_SUCCESS,
      actionTypes.QUESTION_LIST_FAILURE,
    ],
    url: URLs.GET_QUESTIONS_LIST,
    fetchOptions: {
      method: 'GET',
    },
  },
});
