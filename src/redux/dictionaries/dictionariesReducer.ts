import { combineReducers } from "redux";
import { Error } from "redux/types";

import {
  FETCH_DICTIONARIES,
  FETCH_DICTIONARIES_SUCCESS,
  FETCH_DICTIONARIES_ERROR,
  Dictionary,
  DictionariesErrorReducerTypes,
  DictionariesResultReducerTypes,
  DictionariesIsLoadingReducerTypes,
  DELETE_DICTIONARY,
  CREATE_DICTIONARY_SUCCESS
} from "redux/dictionaries/types";

export const defaultState = {
  error: null,
  result: [],
  isLoading: false
};

function error(
  state: null | Error = defaultState.error,
  action: DictionariesErrorReducerTypes
) {
  switch (action.type) {
    case FETCH_DICTIONARIES:
    case FETCH_DICTIONARIES_SUCCESS:
      return null;

    case FETCH_DICTIONARIES_ERROR:
      return action.payload.error;

    default:
      return state;
  }
}

function result(
  state: Dictionary[] = defaultState.result,
  action: DictionariesResultReducerTypes
) {
  switch (action.type) {
    case FETCH_DICTIONARIES_SUCCESS:
      return action.payload.dictionaries;

    case CREATE_DICTIONARY_SUCCESS:
      return [action.payload.dictionary, ...state];

    case DELETE_DICTIONARY:
      return state.filter(
        dictionary => dictionary.name !== action.payload.name
      );

    default:
      return state;
  }
}

function isLoading(
  state: boolean = defaultState.isLoading,
  action: DictionariesIsLoadingReducerTypes
) {
  switch (action.type) {
    case FETCH_DICTIONARIES:
      return true;

    case FETCH_DICTIONARIES_SUCCESS:
    case FETCH_DICTIONARIES_ERROR:
      return false;

    default:
      return false;
  }
}

export default combineReducers({ error, result, isLoading });
