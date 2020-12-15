import { combineReducers } from 'redux';

import account from './account';
import problem from './problem';
import properties from './properties';
import notification from './notification';
import redirect from './redirect';

const allReducers = combineReducers({
  account,
  problem,
  properties,
  notification,
  redirect,
});
export default allReducers;
