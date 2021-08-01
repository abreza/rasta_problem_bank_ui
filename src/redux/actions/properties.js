import * as actionTypes from '../actionTypes';
import * as URLs from './urls';

import { CALL_API } from '../middleware/api/api';

const fetchAllTags = () => ({
  [CALL_API]: {
    types: [
      actionTypes.TAGS_REQUEST,
      actionTypes.TAGS_SUCCESS,
      actionTypes.TAGS_FAILURE,
    ],
    url: URLs.GET_TAGS,
    fetchOptions: {
      method: 'GET',
    },
  },
});

export const getAllTags = () => (
  dispatch,
  getState
) => {
  const tags = getState().properties.tags;
  if (tags.length === 0) {
    return dispatch(fetchAllTags());
  }
};

const fetchAllSubtags = () => ({
  [CALL_API]: {
    types: [
      actionTypes.SUBTAGS_REQUEST,
      actionTypes.SUBTAGS_SUCCESS,
      actionTypes.SUBTAGS_FAILURE,
    ],
    url: URLs.GET_SUBTAGS,
    fetchOptions: {
      method: 'GET',
    },
  },
});

export const getAllSubtags = () => (
  dispatch,
  getState
) => {
  const subtags = getState().properties.subtags;
  if (subtags.length === 0) {
    return dispatch(fetchAllSubtags());
  }
};

const fetchAllEvents = () => ({
  [CALL_API]: {
    types: [
      actionTypes.EVENTS_REQUEST,
      actionTypes.EVENTS_SUCCESS,
      actionTypes.EVENTS_FAILURE,
    ],
    url: URLs.GET_EVENTS,
    fetchOptions: {
      method: 'GET',
    },
  },
});

export const getAllEvents = () => (
  dispatch,
  getState
) => {
  const events = getState().properties.events;
  if (events.length === 0) {
    return dispatch(fetchAllEvents());
  }
};

const fetchAllSources = () => ({
  [CALL_API]: {
    types: [
      actionTypes.SOURCES_REQUEST,
      actionTypes.SOURCES_SUCCESS,
      actionTypes.SOURCES_FAILURE,
    ],
    url: URLs.GET_SOURCES,
    fetchOptions: {
      method: 'GET',
    },
  },
});

export const getAllSources = () => (
  dispatch,
  getState
) => {
  const sources = getState().properties.sources;
  if (sources.length === 0) {
    return dispatch(fetchAllSources());
  }
};