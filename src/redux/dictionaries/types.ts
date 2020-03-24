import { Error } from "redux/types";

export const FETCH_DICTIONARIES = "dictionaries/FETCH_DICTIONARIES";
export const FETCH_DICTIONARIES_SUCCESS =
  "dictionaries/FETCH_DICTIONARIES_SUCCESS";
export const FETCH_DICTIONARIES_ERROR = "dictionaries/FETCH_DICTIONARIES_ERROR";

export const CREATE_DICTIONARY = "dictionaries/CREATE_DICTIONARY";
export const CREATE_DICTIONARY_SUCCESS =
  "dictionaries/CREATE_DICTIONARY_SUCCESS";
export const CREATE_DICTIONARY_ERROR = "dictionaries/CREATE_DICTIONARY_ERROR";

export const DELETE_DICTIONARY = "dictionaries/DELETE_DICTIONARY";

export const CREATE_WORD = "dictionaries/CREATE_WORD";
export const CREATE_WORD_SUCCESS = "dictionaries/CREATE_WORD_SUCCESS";
export const CREATE_WORD_ERROR = "dictionaries/CREATE_WORD_ERROR";

export const UPDATE_DICTIONARY = "dictionary/UPDATE_DICTIONARY";
export const DELETE_WORD = "dictionary/DELETE_WORD";
export const PLAY_TRANSLATION = "dictionary/PLAY_TRANSLATION";

export type Language = {
  label: string;
  languageCode: string;
};

export interface Dictionary {
  id: string;
  name: string;
  owner: string;
  language: Language;
  words: { [key: string]: Word };
}

export interface Word {
  id: string;
  text: string;
  translation: string;
  language: string;
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

export interface CreateDictionaryActionType {
  type: typeof CREATE_DICTIONARY;
  payload: { name: string; language: Language };
}

export interface CreateDictionarySuccessActionType {
  type: typeof CREATE_DICTIONARY_SUCCESS;
  payload: { dictionary: Dictionary };
}

export interface CreateDictionaryErrorActionType {
  type: typeof CREATE_DICTIONARY_ERROR;
  payload: { error: Error };
}

export interface UpdateDictionaryActionType {
  type: typeof UPDATE_DICTIONARY;
  payload: { id: string; name: string; language: Language };
}

export interface DeleteDictionaryActionType {
  type: typeof DELETE_DICTIONARY;
  payload: { id: string };
}

export type CreateWordActionPayload = {
  text: string;
  translation: string;
  dictionaryId: string;
};
export interface CreateWordActionType {
  type: typeof CREATE_WORD;
  payload: CreateWordActionPayload;
}

export interface CreateWordSuccessActionType {
  type: typeof CREATE_WORD_SUCCESS;
  payload: { word: Word; dictionaryId: string };
}

export interface CreateWordErrorActionType {
  type: typeof CREATE_WORD_ERROR;
  payload: { error: Error };
}

export interface DeleteWordActionType {
  type: typeof DELETE_WORD;
  payload: { id: string; dictionaryId: string };
}

export interface PlayTranslationActionType {
  type: typeof PLAY_TRANSLATION;
  payload: { translation: string; languageCode: string };
}

export type DictionariesErrorReducerTypes =
  | FetchDictionariesActionType
  | FetchDictionariesSuccessActionType
  | FetchDictionariesErrorActionType;

export type DictionariesResultReducerTypes =
  | FetchDictionariesSuccessActionType
  | DeleteDictionaryActionType
  | CreateDictionarySuccessActionType
  | CreateWordSuccessActionType
  | DeleteWordActionType
  | UpdateDictionaryActionType;

export type DictionariesIsLoadingReducerTypes =
  | FetchDictionariesActionType
  | FetchDictionariesSuccessActionType
  | FetchDictionariesErrorActionType;

export interface DictionariesReducerState {
  error: null | Error;
  result: Dictionary[];
  isLoading: boolean;
}
