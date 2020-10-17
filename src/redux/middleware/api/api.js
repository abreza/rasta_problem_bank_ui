import fetchApi from '../../../utils/fetchApi';
import * as actionTypes from '../../actions/actionTypes';
import { normalize } from 'normalizr';

export const CALL_API = 'Call API';

export default ({ getState }) => (next) => async (action) => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const actionWith = (data) => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  let { fetchOptions } = callAPI;
  const { url, types, payload, schema } = callAPI;
  const [requestType, successType, failureType] = types;
  next(actionWith({ payload, type: requestType }));

  try {
    if (!fetchOptions.dontContentType) {
      fetchOptions.headers = {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      };
    }
    const account = getState().account;
    if (!!account && !!account.token) {
      fetchOptions.headers = {
        ...fetchOptions.headers,
        Authorization: account.token,
      };
    }
    let response = await fetchApi(url, fetchOptions);
    if (schema) {
      response = normalize(response, schema);
    }
    return next(
      actionWith({
        payload,
        response,
        type: successType,
      })
    );
  } catch (error) {
    if (error.message === 'TOKEN_EXPIRED') {
      return next(
        actionWith({
          payload,
          type: actionTypes.LOGOUT_REQUEST,
          error: error.message || 'Something bad happened!',
        })
      );
    }
    return next(
      actionWith({
        payload,
        type: failureType,
        error: error.message || 'Something bad happened!',
      })
    );
  }
};
