import { fetchDataIfNeeded } from './request';
import * as actionTypes from './actionTypes';

let getQuestionPropertiesParams = {
  url: 'url', // TODO: fix url
  data: {},
  method: 'GET',
  requestType: actionTypes.UPDATE_QUESTION_PROPERTIES_REQUEST,
  receiveType: actionTypes.UPDATE_QUESTION_PROPERTIES_RECEIVE,
};

export const update = () => fetchDataIfNeeded(...getQuestionPropertiesParams);
