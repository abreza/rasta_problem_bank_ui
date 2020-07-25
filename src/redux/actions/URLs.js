const ROOT = "https://bank.rastaiha.ir/api/";

export const GET_USERS_LIST = ROOT.concat('account/list'); //TODO: set properties to search with back
export const GET_USER_DATA = ROOT.concat('account/');

export const LOGIN_USER = ROOT.concat('signin/');
export const REGISTER_USER = ROOT.concat('signup/');
export const LOGOUT_USER = ROOT.concat('account/');

export const GET_QUESTION = ROOT.concat('question/');
export const SUBMIT_QUESTION = ROOT.concat('question/');
export const GET_QUESTION_PROPERTIES = ROOT.concat('question/properties'); //TODO: set url with back
export const GET_QUESTIONS_LIST = ROOT.concat('question/list'); //TODO: set properties to search with back
