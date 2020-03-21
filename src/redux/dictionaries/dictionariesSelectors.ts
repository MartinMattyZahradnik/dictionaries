import { createSelector } from "reselect";
import { RootState } from "redux/rootReducer";
import { Error } from "redux/types";

// Types
import { Dictionary } from "./types";

const getDictionaries = (state: RootState) => state.dictionaries;

export const selectDictionaries = createSelector(
  getDictionaries,
  (dictionaries): Dictionary[] => dictionaries.result
);

export const selectDictionariesIsLoading = createSelector(
  getDictionaries,
  (dictionaries): boolean => dictionaries.isLoading
);

export const selectDictionariesError = createSelector(
  getDictionaries,
  (dictionaries): null | Error => dictionaries.error
);

export const selectUserDictionaries = createSelector(
  [selectDictionaries, (state: RootState, username: string) => username],
  (dictionaries, username): Dictionary[] =>
    dictionaries.filter(dictionary => dictionary.owner === username)
);