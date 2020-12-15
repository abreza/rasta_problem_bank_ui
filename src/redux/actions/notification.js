import * as actionTypes from '../actionTypes';
import * as URLs from './urls';

import { CALL_API } from '../middleware/api/api';

const notify = (message, type) => ({
  [CALL_API]: {
    types: [
      actionTypes.NOTIFY,
    ],
    fetchOptions: {
      payload: {
        message,
        type,
      }
    },
  },
});