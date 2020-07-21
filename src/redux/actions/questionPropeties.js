import * as actionTypes from './actionTypes';
import * as URLs from './URLs';

import { CALL_API } from '../middleware/api/api';

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