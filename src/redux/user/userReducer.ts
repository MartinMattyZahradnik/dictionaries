import { combineReducers } from "redux";
import {
  User,
  UserErrorReducerTypes,
  UserResultReducerTypes,
  UserIsLoadingReducerTypes
} from "./types";
import { Error } from "redux/types";

import { LOGIN, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from "redux/user/types";

export const defaultState = {
  error: null,
  result: null,
  isLoading: false
};

function error(state: null | Error = null, action: UserErrorReducerTypes) {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case LOGOUT:
      return null;

    case LOGIN_ERROR:
      return action.payload.statusCode;

    default:
      return state;
  }
}

function result(state: null | User = null, action: UserResultReducerTypes) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.payload.user;

    case LOGOUT:
      return null;

    default:
      return state;
  }
}

function isLoading(state: boolean = false, action: UserIsLoadingReducerTypes) {
  switch (action.type) {
    case LOGIN:
      return true;

    case LOGIN_SUCCESS:
    case LOGOUT:
      return false;

    default:
      return false;
  }
}

export default combineReducers({ error, result, isLoading });
