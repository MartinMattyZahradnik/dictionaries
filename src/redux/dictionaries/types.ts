import { Error } from "redux/types";

export const FETCH_DICTIONARIES = "dictionaries/FETCH_DICTIONARIES";
export const FETCH_DICTIONARIES_SUCCESS =
  "dictionaries/FETCH_DICTIONARIES_SUCCESS";
export const FETCH_DICTIONARIES_ERROR = "dictionaries/FETCH_DICTIONARIES_ERROR";

export const DELETE_DICTIONARY = "dictionaries/DELETE_DICTIONARY";

export interface Dictionary {
  name: string;
  owner: string;
  language: string;
  words: Word[];
}

export interface Word {
  text: string;
  translation: string;
}

export interface FetchDictionariesActionType {
  type: typeof FETCH_DICTIONARIES;
  payload: { username: string };
}

export interface FetchDictionariesSuccessActionType {
  type: typeof FETCH_DICTIONARIES_SUCCESS;
  payload: { dictionaries: Dictionary[] };
}

export interface FetchDictionariesErrorActionType {
  type: typeof FETCH_DICTIONARIES_ERROR;
  payload: { error: Error };
}

export interface DeleteDictionaryActionType {
  type: typeof DELETE_DICTIONARY;
  payload: { name: string };
}

export type DictionariesErrorReducerTypes =
  | FetchDictionariesActionType
  | FetchDictionariesSuccessActionType
  | FetchDictionariesErrorActionType;

export type DictionariesResultReducerTypes =
  | FetchDictionariesSuccessActionType
  | DeleteDictionaryActionType;

export type DictionariesIsLoadingReducerTypes =
  | FetchDictionariesActionType
  | FetchDictionariesSuccessActionType
  | FetchDictionariesErrorActionType;

export interface DictionariesReducerState {
  error: null | Error;
  result: Dictionary[];
  isLoading: boolean;
}
