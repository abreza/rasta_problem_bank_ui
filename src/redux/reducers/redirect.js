import * as actionTypes from '../actionTypes';

const initState = {
  redirectTo: null,
};

function redirect(state = initState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return { redirectTo: '/' };
    case actionTypes.REDIRECT:
      return { redirectTo: action.payload };
    case actionTypes.INIT_REDIRECT:
      return initState;
    default:
      return state;
  }
}

export default redirect;
