import { combineReducers } from 'redux';

import account from './account';
import question from './question'
import questionProperties from './questionProperties';
import questionsList from './questionsList';


const allReducers = combineReducers(account, question, questionProperties, questionsList);
export default allReducers;
