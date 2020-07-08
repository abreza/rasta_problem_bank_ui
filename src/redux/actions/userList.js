import * as actionTypes from './actionTypes';
import * as URLs from './URLs';


import { CALL_API, Schemas } from '../middleware/api/api';

export const fetchUserList = () => ({ //TODO: set properties to search with back
  [CALL_API]: {
    types: [
      actionTypes.USER_LIST_REQUEST,
      actionTypes.USER_LIST_SUCCESS,
      actionTypes.USER_LIST_FAILURE,
    ],
    url: URLs.GET_USERS_LIST,
    fetchOptions: {
      method: 'GET',
    },
    schema: Schemas.USER_ARRAY,
  },
});
