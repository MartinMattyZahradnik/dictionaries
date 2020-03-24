import { dissoc } from "ramda";
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
  UPDATE_DICTIONARY,
  DELETE_DICTIONARY,
  CREATE_DICTIONARY_SUCCESS,
  CREATE_WORD_SUCCESS,
  DELETE_WORD
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

    case UPDATE_DICTIONARY:
      return state.map(dictionary => {
        if (dictionary.id === action.payload.id) {
          return {
            ...dictionary,
            name: action.payload.name,
            language: action.payload.language
          };
        }
        return dictionary;
      });

    case DELETE_DICTIONARY:
      return state.filter(dictionary => dictionary.id !== action.payload.id);

    case CREATE_WORD_SUCCESS:
      return state.map(dictionary => {
        if (dictionary.id === action.payload.dictionaryId) {
          return {
            ...dictionary,
            words: {
              ...dictionary.words,
              [action.payload.word.id]: action.payload.word
            }
          };
        }
        return dictionary;
      });

    case DELETE_WORD:
      return state.map(dictionary => {
        if (dictionary.id === action.payload.dictionaryId) {
          return {
            ...dictionary,
            words: dissoc(action.payload.id, dictionary.words)
          };
        }
        return dictionary;
      });

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
