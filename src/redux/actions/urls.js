export const ROOT = "http://bank.karsooghmehregan.ir/api/";

export const GET_USER = (id) => ROOT.concat(`account/${id}`);

export const LOGIN_USER = ROOT.concat('signin/');
export const REGISTER_USER = ROOT.concat('signup/');
export const LOGOUT_USER = ROOT.concat('signout/');

export const GET_PROBLEM = ROOT.concat('question/');
export const SUBMIT_PROBLEM = ROOT.concat('question/');

export const CREATE_COMMENT = ROOT.concat('comment/');
export const EDIT_COMMENT = ROOT.concat('comment/');

export const GET_TAGS = ROOT.concat('tag/');
export const GET_SUBTAGS = ROOT.concat('subtag/');
export const GET_EVENTS = ROOT.concat('event/');
export const GET_SOURCES = ROOT.concat('source/');

export const GET_PROBLEMS_LIST = ROOT.concat('qfilter/');
