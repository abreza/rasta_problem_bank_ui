import { combineReducers } from 'redux';

import account from './account';
import question from './question';
import usersList from './usersList';
import properties from './properties';

const allReducers = combineReducers({
  account,
  question,
  usersList,
  properties,
});
export default allReducers;
