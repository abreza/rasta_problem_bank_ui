import fetch from 'cross-fetch';

const request = (requestType) => ({
  type: requestType,
});

const receive = (receiveType, data) => ({
  type: receiveType,
  payload: {
    data,
    receivedAt: Date.now(),
  },
});

export function fetchData(url, data, method, requestType, receiveType) {
  return async (dispatch) => {
    dispatch(request(requestType));
    // TODO: fix fetch
    const rcv = await fetch(url, data, method);
    dispatch(receive(receiveType, rcv.json()));
  };
}

export const fetchDataIfNeeded = (
  url,
  data,
  method,
  requestType,
  receiveType,
  shouldFetch
) => (dispatch, getState) => {
  if (shouldFetch) {
    if (shouldFetch(getState())) {
      return dispatch(fetchData(url, data, method, requestType, receiveType));
    }
  } else {
    return dispatch(fetchData(url, data, method, requestType, receiveType));
  }
};
