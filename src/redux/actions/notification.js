import * as actionTypes from '../actionTypes';
import * as URLs from './urls';

import { CALL_API } from '../middleware/api/api';

export const notify = (message, type) => ({
  type: actionTypes.NOTIFY,
  payload: {
    message,
    type,
  }
});