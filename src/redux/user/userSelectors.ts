import { createSelector } from "reselect";
import { IState } from "redux/rootReducer";
import { Error } from "redux/types";

const getUserData = (state: IState) => state.user;

export const selectUser = createSelector(
  getUserData,
  userData => userData.result
);

export const selectUserIsLoading = createSelector(
  getUserData,
  (userData): boolean => userData.isLoading
);

export const selectUserError = createSelector(
  getUserData,
  (userData): null | Error => userData.error
);

export const selectIsUserLoggedIn = createSelector(
  selectUser,
  (user): boolean => Boolean(user)
);
