import * as actionTypes from '../actionTypes';
import * as URLs from './urls';

import { CALL_API } from '../middleware/api/api';

export const fetchProblem = (problemId) => ({
  [CALL_API]: {
    types: [
      actionTypes.GET_PROBLEM_REQUEST,
      actionTypes.GET_PROBLEM_SUCCESS,
      actionTypes.GET_PROBLEM_FAILURE,
    ],
    url: URLs.GET_PROBLEM + problemId,
    fetchOptions: {
      method: 'GET',
    },
  },
});

export const fetchProblemsListByPage = (page) => ({
  [CALL_API]: {
    types: [
      actionTypes.PROBLEM_LIST_REQUEST,
      actionTypes.PROBLEM_LIST_SUCCESS,
      actionTypes.PROBLEM_LIST_FAILURE,
    ],
    url: URLs.GET_PROBLEMS_LIST,
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
        level_max: 100,
        sources: [
        ],
        question_makers: [
        ],
        events: [],
        page: page
      }
    },
  },
});

export const createProblem = (problem) => {
  return ({
    [CALL_API]: {
      types: [
        actionTypes.SUBMIT_PROBLEM_REQUEST,
        actionTypes.SUBMIT_PROBLEM_SUCCESS,
        actionTypes.SUBMIT_PROBLEM_FAILURE,
      ],
      payload: {
        type: 'create',
      },
      url: URLs.SUBMIT_PROBLEM,
      fetchOptions: {
        method: 'POST',
        body: problem,
      },
    },
  })
};

export const editProblem = (problem, id) => {
  return ({
    [CALL_API]: {
      types: [
        actionTypes.SUBMIT_PROBLEM_REQUEST,
        actionTypes.SUBMIT_PROBLEM_SUCCESS,
        actionTypes.SUBMIT_PROBLEM_FAILURE,
      ],
      payload: {
        type: 'edit',
      },
      url: URLs.SUBMIT_PROBLEM + id,
      fetchOptions: {
        method: 'PUT',
        body: problem,
      },
    },
  })
};

