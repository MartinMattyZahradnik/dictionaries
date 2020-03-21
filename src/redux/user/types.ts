import { Error } from "redux/types";

// LOGIN
export const LOGIN = "user/LOGIN";
export const LOGIN_SUCCESS = "user/LOGIN_SUCCESS";
export const LOGIN_ERROR = "user/LOGIN_ERROR";
export const LOGOUT = "user/LOGOUT";

export interface User {
  username: string;
}

export interface LoginActionPayload {
  username: string;
}

export interface LoginAction {
  type: typeof LOGIN;
  payload: LoginActionPayload;
}

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: { user: User };
}

export interface LoginErrorAction {
  type: typeof LOGIN_ERROR;
  payload: { statusCode: number };
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export type UserErrorReducerTypes =
  | LoginSuccessAction
  | LoginErrorAction
  | LogoutAction;

export type UserResultReducerTypes = LoginSuccessAction | LogoutAction;

export type UserIsLoadingReducerTypes =
  | LoginAction
  | LoginSuccessAction
  | LoginErrorAction
  | LogoutAction;

export interface UserReducerState {
  error: null | Error;
  result: User | null;
  isLoading: boolean;
}
