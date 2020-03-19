// LOGIN
export const LOGIN = "user/LOGIN";
export const LOGIN_SUCCESS = "user/LOGIN_SUCCESS";
export const LOGIN_ERROR = "user/LOGIN_ERROR";
export const LOGOUT = "user/LOGOUT";

export type AvailableUserRoles = "admin" | "user" | "visitor";

export interface IUser {
  _id: string;
  username: string;
  password: string;
}

export interface ILoginActionPayload {
  username: string;
  password: string;
}

export interface LoginAction {
  type: typeof LOGIN;
  payload: ILoginActionPayload;
}

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: { user: IUser };
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

export interface IUserReducerState {
  error: null | number;
  result: IUser | null;
  isLoading: boolean;
}
