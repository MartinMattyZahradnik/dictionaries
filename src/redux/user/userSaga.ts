import { request } from "utils/request";
import { takeLatest, put } from "redux-saga/effects";
import { LOGIN } from "redux/user/types";

// Actions
import { loginSuccess, loginError } from "./userActions";

// Types
import { ILoginActionPayload } from "./types";

function* loginSagaWatcher({
  payload
}: {
  type: string;
  payload: ILoginActionPayload;
}) {
  try {
    const resp = yield request.post(`/auth/login`, payload);
    sessionStorage.setItem("jwtToken", resp.data.token);
    request.defaults.headers.Authorization = resp.data.token;
    yield put(loginSuccess(resp.data.user));
  } catch (error) {
    if (error.response.status === 404 || error.response.status === 403) {
      yield put(loginError(error.response.status));
    }
  }
}

export default function* userSaga() {
  yield takeLatest(LOGIN, loginSagaWatcher);
}
