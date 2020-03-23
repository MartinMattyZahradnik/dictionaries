import { Error } from "redux/types";
import {
  Dictionary,
  Word,
  FETCH_DICTIONARIES,
  FetchDictionariesActionType,
  FETCH_DICTIONARIES_SUCCESS,
  FetchDictionariesSuccessActionType,
  FETCH_DICTIONARIES_ERROR,
  FetchDictionariesErrorActionType,
  DELETE_DICTIONARY,
  DeleteDictionaryActionType,
  CREATE_DICTIONARY,
  CreateDictionaryActionType,
  CREATE_DICTIONARY_SUCCESS,
  CreateDictionarySuccessActionType,
  CREATE_DICTIONARY_ERROR,
  CreateDictionaryErrorActionType,
  CREATE_WORD,
  CreateWordActionType,
  CreateWordActionPayload,
  CREATE_WORD_SUCCESS,
  CreateWordSuccessActionType,
  CREATE_WORD_ERROR,
  CreateWordErrorActionType,
  DELETE_WORD,
  DeleteWordActionType,
  PLAY_TRANSLATION,
  PlayTranslationActionType
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

/*** ===  CREATE_DICTIONARY === ***/
export const createDictionary = (
  name: string,
  language: string
): CreateDictionaryActionType => ({
  type: CREATE_DICTIONARY,
  payload: { name, language }
});

export const createDictionarySuccess = (
  dictionary: Dictionary
): CreateDictionarySuccessActionType => ({
  type: CREATE_DICTIONARY_SUCCESS,
  payload: { dictionary }
});

export const createDictionaryError = (
  error: Error
): CreateDictionaryErrorActionType => ({
  type: CREATE_DICTIONARY_ERROR,
  payload: { error }
});

/*** ===  CREATE_WORD === ***/
export const createWord = (
  word: CreateWordActionPayload
): CreateWordActionType => ({
  type: CREATE_WORD,
  payload: word
});

export const createWordSuccess = (
  word: Word,
  dictionaryId: string
): CreateWordSuccessActionType => ({
  type: CREATE_WORD_SUCCESS,
  payload: { word, dictionaryId }
});

export const createWordError = (error: Error): CreateWordErrorActionType => ({
  type: CREATE_WORD_ERROR,
  payload: { error }
});

/*** ===  DELETE_WORD === ***/
export const deleteWord = (
  id: string,
  dictionaryId: string
): DeleteWordActionType => ({
  type: DELETE_WORD,
  payload: { id, dictionaryId }
});

/** PLAY_TRANSLATION **/
export const playTranslation = (
  translation: string
): PlayTranslationActionType => ({
  type: PLAY_TRANSLATION,
  payload: { translation }
});
