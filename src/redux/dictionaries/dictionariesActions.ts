import { Error } from "redux/types";
import {
  Dictionary,
  FETCH_DICTIONARIES,
  FetchDictionariesActionType,
  FETCH_DICTIONARIES_SUCCESS,
  FetchDictionariesSuccessActionType,
  FETCH_DICTIONARIES_ERROR,
  FetchDictionariesErrorActionType,
  DELETE_DICTIONARY,
  DeleteDictionaryActionType
} from "redux/dictionaries/types";

/*** ===  FETCH_DICTIONARIES === ***/
export const fetchDictionaries = (
  username: string
): FetchDictionariesActionType => ({
  type: FETCH_DICTIONARIES,
  payload: { username }
});

export const fetchDictionariesSuccess = (
  dictionaries: Dictionary[]
): FetchDictionariesSuccessActionType => ({
  type: FETCH_DICTIONARIES_SUCCESS,
  payload: { dictionaries }
});

export const fetchDictionariesError = (
  error: Error
): FetchDictionariesErrorActionType => ({
  type: FETCH_DICTIONARIES_ERROR,
  payload: { error }
});

export const deleteDictionary = (name: string): DeleteDictionaryActionType => ({
  type: DELETE_DICTIONARY,
  payload: { name }
});
