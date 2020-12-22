import * as actionTypes from '../actionTypes';
import { toast } from 'react-toastify';

function account(state = {}, action) {
  switch (action.type) {
    case actionTypes.REGISTER_SUCCESS:
      toast.success('ورودت رو به بانک مسئله خوش‌آمد میگم!')
      return { ...state };

    case actionTypes.REGISTER_FAILURE:
      toast.error('احتمالا یک حساب با همین نام کاربری از قبل وجود داره!')
      return { ...state }

    case actionTypes.LOGIN_SUCCESS:
      toast.success('خوش اومدی!')
      return { ...state };

    case actionTypes.LOGIN_FAILURE:
      toast.error('نام کاربری یا رمز عبورت اشتباهه')
      return { ...state };

    case actionTypes.LOGOUT_REQUEST:
      toast.success('خداحافظ! منتظرت هستیم...');
      return { ...state }

    case actionTypes.SUBMIT_PROBLEM_SUCCESS:
      if (action.payload.type === 'edit')
        toast.success('ایول! مسئله با موفقیت ویرایش شد.');
      else
        toast.success('ایول! مسئله با موفقیت ایجاد شد.');
      return { ...state }

    case actionTypes.SUBMIT_PROBLEM_FAILURE:
      toast.error('ای بابا! یه مشکلی هست...');
      return { ...state }

    case actionTypes.NOTIFY:
      if (action.payload.type === 'success')
        toast.success(action.payload.message);
      if (action.payload.type === 'error')
        toast.error(action.payload.message);
      if (action.payload.type === 'warning')
        toast.warning(action.payload.message);
      return { ...state }

    default:
      return state;
  }
}

export default account;