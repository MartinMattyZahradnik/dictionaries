import { SagaIterator } from "redux-saga";
import { takeLatest, put, delay, select } from "redux-saga/effects";
import uuid from "uuid/v4";
import { request } from "utils/request";
import {
  FETCH_DICTIONARIES,
  FetchDictionariesActionType,
  CREATE_DICTIONARY,
  CreateDictionaryActionType,
  CREATE_WORD,
  CreateWordActionType,
  PLAY_TRANSLATION,
  PlayTranslationActionType
} from "redux/dictionaries/types";

// Actions
import {
  fetchDictionariesSuccess,
  fetchDictionariesError,
  createDictionarySuccess,
  createDictionaryError,
  createWordSuccess,
  createWordError
} from "./dictionariesActions";

// Selectors
import {
  selectDictionaries,
  selectDictionaryDetail
} from "./dictionariesSelectors";
import { selectUsername } from "redux/user/userSelectors";

import { history } from "App";

function* fetchDictionariesSagaWatcher({
  payload
}: FetchDictionariesActionType): SagaIterator<void> {
  try {
    // to simulate async request
    yield delay(1200);
    const dictionaries = yield select(selectDictionaries);
    yield put(fetchDictionariesSuccess(dictionaries));
    history.push("/");
  } catch (error) {
    yield put(
      fetchDictionariesError({
        message: "Ups. Unable to load dictionaries",
        statusCode: 400
      })
    );
  }
}

function* createDictionarySagaWatcher({
  payload: { name, language }
}: CreateDictionaryActionType): SagaIterator<void> {
  try {
    const owner = yield select(selectUsername);

    // to simulate async request
    yield delay(1200);
    yield put(
      createDictionarySuccess({
        id: uuid(),
        name,
        language,
        owner,
        words: {}
      })
    );
  } catch (error) {
    yield put(
      createDictionaryError({
        message: "Ups. Unable to create dictionaries",
        statusCode: 400
      })
    );
  }
}

function* createWordWatcher({
  payload: { dictionaryId, text, translation }
}: CreateWordActionType): SagaIterator<void> {
  try {
    const { language, id } = yield select(selectDictionaryDetail, dictionaryId);

    // to simulate async request
    yield delay(1200);
    yield put(
      createWordSuccess(
        {
          id: uuid(),
          text,
          translation,
          language
        },
        id
      )
    );
  } catch (error) {
    yield put(
      createWordError({
        message: "Ups. Unable to create word.",
        statusCode: 400
      })
    );
  }
}

function* playTranslationSagaWatcher({
  payload: { translation, languageCode }
}: PlayTranslationActionType) {
  try {
    const API_KEY = process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY;
    const res = yield request.post(
      "https://texttospeech.googleapis.com/v1beta1/text:synthesize",
      {
        input: {
          text: translation
        },
        voice: {
          languageCode,
          ssmlGender: "FEMALE"
        },
        audioConfig: {
          audioEncoding: "MP3"
        }
      },
      { headers: { "X-Goog-Api-Key": API_KEY } }
    );

    const {
      data: { audioContent }
    } = res;

    const audio = new Audio(`data:audio/mp3;base64,${audioContent}`);
    audio.play();
  } catch (error) {
    // Dispatch notification to user
    // log error to logger service (APM or something similar)
    console.log("Ups. Unable to play translation");
  }
}

export default function* userSaga() {
  yield takeLatest(FETCH_DICTIONARIES, fetchDictionariesSagaWatcher);
  yield takeLatest(CREATE_DICTIONARY, createDictionarySagaWatcher);
  yield takeLatest(CREATE_WORD, createWordWatcher);
  yield takeLatest(PLAY_TRANSLATION, playTranslationSagaWatcher);
}
