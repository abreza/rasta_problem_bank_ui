import { combineReducers } from 'redux';

import account from './account';
import question from './question';
import usersList from './usersList';

const allReducers = combineReducers({
  account,
  question,
  usersList,
});
export default allReducers;
