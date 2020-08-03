const callApi = async (url, fetchOptions, token) => {
  fetchOptions = {
    ...fetchOptions,
    headers: {
      ...fetchOptions.headers,
      'Content-Type': 'application/json',
      Authorization: 'Token 62b51b4cd0622e00ae6994a51eb47a641409b46a',
    },
  }

  fetchOptions = {
    ...fetchOptions,
    body: JSON.stringify(fetchOptions.body),
  }

  console.log(fetchOptions);
  const response = await fetch(url, fetchOptions);
  console.log(response);
  return await response.json();
};

export const CALL_API = 'Call API';

export default (store) => (next) => async (action) => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { url, fetchOptions, payload1 } = callAPI;
  const { types } = callAPI;

  const actionWith = (data) => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  const [requestType, successType, failureType] = types;
  next(actionWith({
    type: requestType,
    payload: payload1,
  }));

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
