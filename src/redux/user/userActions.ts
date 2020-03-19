// Constants
import {
  LOGIN,
  LoginAction,
  LOGIN_SUCCESS,
  LoginSuccessAction,
  LOGIN_ERROR,
  LoginErrorAction,
  LOGOUT,
  LogoutAction,
  IUser
} from "redux/user/types";

/*** ===  LOGIN === ***/
export const login = (username: string, password: string): LoginAction => ({
  type: LOGIN,
  payload: { username, password }
});

export const loginSuccess = (user: IUser): LoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  payload: { user }
});

export const loginError = (statusCode: number): LoginErrorAction => ({
  type: LOGIN_ERROR,
  payload: { statusCode }
});

/*** ===  LOGOUT === ***/
export const logout = (): LogoutAction => ({
  type: LOGOUT
});
