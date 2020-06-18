import * as actionTypes from './actionTypes';
import * as URLs from './URLs';

import { CALL_API, Schemas } from '../middleware/api/api';

export const fetchQuestionList = () => ({ //TODO: ma vizhegi hasho bedimm
  [CALL_API]: {
    types: [
      actionTypes.QUESTION_LIST_REQUEST,
      actionTypes.QUESTION_LIST_SUCCESS,
      actionTypes.QUESTION_LIST_FAILURE,
    ],
    url: URLs,
    fetchOptions: {
      method: 'GET',
    },
    schema: Schemas.QUESTION_ARRAY,
  },
});
