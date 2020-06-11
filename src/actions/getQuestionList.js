import { fetchDataIfNeeded } from './request';
import * as actionTypes from './actionTypes';

let updateQuestionListParams = {
  url: 'url', // TODO: fix url
  data: {},
  method: 'GET',
  requestType: actionTypes.UPDATE_QUESTION_LIST_REQUEST,
  receiveType: actionTypes.UPDATE_QUESTION_LIST_RECEIVE,
  shouldFetch: (state) => {
    // TODO: check user type
    if (state.account.logged_in) {
      return true;
    }
    return false;
  },
};

export const updateQuestionList = fetchDataIfNeeded(
  ...updateQuestionListParams
);

let getQuestionParams = {
  url: 'url', // TODO: fix url
  data: {},
  method: 'GET',
  requestType: actionTypes.UPDATE_QUESTION_LIST_REQUEST,
  receiveType: actionTypes.UPDATE_QUESTION_LIST_RECEIVE,
  shouldFetch: (state) => {
    // TODO: check user type
    if (state.account.logged_in) {
      return true;
    }
    return false;
  },
};
export const getQuestion = (questionId) =>
  fetchDataIfNeeded(...{ ...getQuestionParams, url: '' }); // TODO: url
