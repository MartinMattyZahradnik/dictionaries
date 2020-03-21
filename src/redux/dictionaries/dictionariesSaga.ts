import { takeLatest, put, delay, select } from "redux-saga/effects";
import { FETCH_DICTIONARIES } from "redux/dictionaries/types";

// Actions
import {
  fetchDictionariesSuccess,
  fetchDictionariesError
} from "./dictionariesActions";

// Selectors
import { selectDictionaries } from "./dictionariesSelectors";

import { history } from "App";

function* fetchDictionariesSagaWatcher({
  payload
}: {
  type: string;
  payload: { username: string };
}) {
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

export default function* userSaga() {
  yield takeLatest(FETCH_DICTIONARIES, fetchDictionariesSagaWatcher);
}
