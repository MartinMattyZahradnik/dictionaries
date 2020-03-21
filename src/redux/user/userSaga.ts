import { takeLatest, put, delay } from "redux-saga/effects";
import { LOGIN } from "redux/user/types";

// Actions
import { loginSuccess, loginError } from "./userActions";

// Types
import { LoginActionPayload } from "./types";

import { history } from "App";

function* loginSagaWatcher({
  payload
}: {
  type: string;
  payload: LoginActionPayload;
}) {
  try {
    // to simulate async request
    yield delay(500);
    yield put(loginSuccess({ username: payload.username }));
    history.push("/");
  } catch (error) {
    yield put(loginError(403));
  }
}

export default function* userSaga() {
  yield takeLatest(LOGIN, loginSagaWatcher);
}
