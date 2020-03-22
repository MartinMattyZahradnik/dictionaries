import { SagaIterator } from "redux-saga";

import { spawn } from "redux-saga/effects";

import userSaga from "redux/user/userSaga";
import dictionariesSaga from "redux/dictionaries/dictionariesSaga";

export default function* rootSaga(): SagaIterator<void> {
  yield spawn(userSaga);
  yield spawn(dictionariesSaga);
}
