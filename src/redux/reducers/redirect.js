import * as actionTypes from '../actionTypes';

const initState = {
  redirectTo: null,
};

function redirect(state = initState, action) {
  switch (action.type) {
    case actionTypes.REGISTER_SUCCESS:
      return { redirectTo: '/' };

    case actionTypes.LOGIN_SUCCESS:
      return { redirectTo: '/' };

    case actionTypes.SUBMIT_PROBLEM_SUCCESS:
      return { redirectTo: '/problemset/page/1' };

    case actionTypes.REDIRECT:
      return { redirectTo: action.payload };

    case actionTypes.INIT_REDIRECT:
      return initState;

    default:
      return state;
  }
}

export default redirect;
