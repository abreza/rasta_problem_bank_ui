import { fetchDataIfNeeded } from './request';
import * as actionTypes from './actionTypes';

let params = {
  url: 'url', // TODO: fix url
  data: {},
  method: 'GET',
  requestType: actionTypes.UPDATE_QUESTION_DATA_REQUEST,
  receiveType: actionTypes.UPDATE_QUESTION_DATA_RECEIVE,
};

export const update = () => fetchDataIfNeeded(...params);
