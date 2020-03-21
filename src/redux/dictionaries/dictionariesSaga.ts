import { takeLatest, put, delay, select } from "redux-saga/effects";
import {
  FETCH_DICTIONARIES,
  FetchDictionariesActionType,
  CREATE_DICTIONARY,
  CreateDictionaryActionType
} from "redux/dictionaries/types";

// Actions
import {
  fetchDictionariesSuccess,
  fetchDictionariesError,
  createDictionarySuccess,
  createDictionaryError
} from "./dictionariesActions";

// Selectors
import { selectDictionaries } from "./dictionariesSelectors";
import { selectUsername } from "redux/user/userSelectors";

import { history } from "App";

function* fetchDictionariesSagaWatcher({
  payload
}: FetchDictionariesActionType) {
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
}: CreateDictionaryActionType) {
  try {
    const owner = yield select(selectUsername);

    // to simulate async request
    yield delay(1200);
    yield put(
      createDictionarySuccess({
        name,
        language,
        owner,
        words: []
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

export default function* userSaga() {
  yield takeLatest(FETCH_DICTIONARIES, fetchDictionariesSagaWatcher);
  yield takeLatest(CREATE_DICTIONARY, createDictionarySagaWatcher);
}
