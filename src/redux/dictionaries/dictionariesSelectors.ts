import { createSelector } from "reselect";
import { RootState } from "redux/rootReducer";
import { Error } from "redux/types";

// Types
import { Dictionary, Language } from "./types";

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

export const selectDictionaryDetail = createSelector(
  [selectDictionaries, (state: RootState, id: string) => id],
  (dictionaries, id): Dictionary | undefined =>
    dictionaries.find(dictionary => dictionary.name === id)
);

export const selectAvailableLanguages = (): Language[] => [
  { label: "Slovak", languageCode: "sk" },
  { label: "Czech", languageCode: "cz" },
  { label: "English", languageCode: "en" },
  { label: "Spain", languageCode: "es" },
  { label: "Chinese", languageCode: "cn" }
];

export const selectLanguageByLanguageCode = (
  languageCode: string
): Language | undefined =>
  selectAvailableLanguages().find(
    language => language.languageCode === languageCode
  );
