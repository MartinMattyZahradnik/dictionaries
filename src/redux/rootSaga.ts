import { spawn } from "redux-saga/effects";

import userSaga from "redux/user/userSaga";
import dictionariesSaga from "redux/dictionaries/dictionariesSaga";

export default function* rootSaga() {
  yield spawn(userSaga);
  yield spawn(dictionariesSaga);
}
