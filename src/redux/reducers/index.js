import { combineReducers } from 'redux';

import account from './account';
import questionProperties from './questionProperties';
import questions from './questions';
import usersList from './usersList';

const allReducers = combineReducers({
  account,
  questionProperties,
  questions,
  usersList,
});
export default allReducers;
