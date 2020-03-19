import { spawn } from "redux-saga/effects";

import userSaga from "redux/user/userSaga";

export default function* rootSaga() {
  yield spawn(userSaga);
}
