import * as actionTypes from '../actionTypes';
import { toast } from 'react-toastify';

function account(state = {}, action) {
  switch (action.type) {
    case actionTypes.REGISTER_SUCCESS:
      toast.success('ورودت رو به بانک مسئله خوش‌آمد میگم!')
      return { ...state };

    case actionTypes.REGISTER_FAILURE:
      toast.error('احتمالا یکی با این نام کاربری یا رمز عبور از قبل وجود داره!')
      return { ...state }

    case actionTypes.LOGIN_SUCCESS:
      toast.success('خوش اومدی!')
      return { ...state };

    case actionTypes.LOGIN_FAILURE:
      toast.error('نام کاربری یا رمز عبورت اشتباهه')
      return { ...state };

    case actionTypes.LOGOUT_REQUEST:
      toast.success('خداحافظت! منتظرت هستیم...');
      return { ...state }

    case actionTypes.NOTIFY:
      if (action.payload === 'success')
        toast.success(action.payload.message);
      if (action.payload === 'error')
        toast.error(action.payload.message);
      if (action.payload === 'warning')
        toast.warning(action.payload.message);
      return { ...state }

    default:
      return state;
  }
}

export default account;