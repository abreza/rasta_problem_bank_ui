import { combineReducers } from 'redux';

import account from './account';
import problem from './problem';
import properties from './properties';

const allReducers = combineReducers({
  account,
  problem,
  properties,
});
export default allReducers;
