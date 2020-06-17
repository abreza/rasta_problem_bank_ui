import * as actionTypes from './actionTypes';

import { CALL_API, Schemas } from '../middleware/api/api';

export const fetchUserList = () => ({
  [CALL_API]: {
    types: [
      actionTypes.USER_LIST_REQUEST,
      actionTypes.USER_LIST_SUCCESS,
      actionTypes.USER_LIST_FAILURE,
    ],
    url: '', // TODO: fix url
    fetchOptions: {
      method: 'GET',
    },
    schema: Schemas.USER_ARRAY,
  },
});
