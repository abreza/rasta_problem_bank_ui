import * as actionTypes from './actionTypes';

import { CALL_API, Schemas } from '../middleware/api/api';

export const fetchQuestionProperties = () => ({
  [CALL_API]: {
    types: [
      actionTypes.QUESTION_PROPERTIES_REQUEST,
      actionTypes.QUESTION_PROPERTIES_SUCCESS,
      actionTypes.QUESTION_PROPERTIES_FAILURE,
    ],
    url: '', // TODO: fix url
    fetchOptions: {
      method: 'GET',
    },
    schema: Schemas.QUESTION_PROPERTIES,
  },
});
