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

export const fetchQuestionListByPage = (page) => ({
  [CALL_API]: {
    types: [
      actionTypes.QUESTION_LIST_REQUEST,
      actionTypes.QUESTION_LIST_SUCCESS,
      actionTypes.QUESTION_LIST_FAILURE,
    ],
    url: URLs.GET_QUESTIONS_LIST,
    fetchOptions: {
      method: 'POST',
      body: {
        sub_tags: [],
        tag: -1,
        verification_status: [],
        publish_date_from: "2018-05-05T02:10:35.905349+04:30",
        publish_date_until: "2021-05-05T02:10:35.905349+04:30",
        appropriate_grades_min: 1,
        appropriate_grades_max: 12,
        level_min: 0,
        level_max: 10000,
        sources: [
        ],
        question_makers: [
        ],
        events: [],
        page: 1
      }
    },
  },
});

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
