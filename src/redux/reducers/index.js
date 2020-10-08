import { combineReducers } from 'redux';

import account from './account';
import problem from './problem';
import usersList from './usersList';
import properties from './properties';

const allReducers = combineReducers({
  account,
  problem,
  usersList,
  properties,
});
export default allReducers;
