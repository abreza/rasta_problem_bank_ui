const callApi = async (url, fetchOptions, token) => {
  fetchOptions = {
    ...fetchOptions,
    headers: { ...fetchOptions.headers, Autorization: token },
  }

  fetchOptions = {
    ...fetchOptions,
    body: JSON.stringify(fetchOptions.body),
  }

  const response = await fetch(url, fetchOptions);
  return await response.json();
};

export const CALL_API = 'Call API';

export default (store) => (next) => async (action) => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { url, fetchOptions } = callAPI;
  const { types } = callAPI;

  const actionWith = (data) => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType }));

  try {
    const { account } = store.getState();
    const { token } = account;
    const response = await callApi(url, fetchOptions, token);
    return next(
      actionWith({
        response,
        type: successType,
      })
    );
  } catch (error) {
    return next(
      actionWith({
        type: failureType,
        error: error.message || 'Something bad happened',
      })
    );
  }
};
