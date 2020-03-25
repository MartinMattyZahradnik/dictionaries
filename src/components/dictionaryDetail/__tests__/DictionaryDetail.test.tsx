import React from "react";
import { cleanup, waitForElement } from "@testing-library/react";
import DictionaryDetail from "../DictionaryDetail";
import { renderWithRedux } from "utils/test";

import * as redux from "react-redux";

afterEach(() => {
  cleanup();
});

const match = {
  params: {
    id: "dictionary-id-1"
  }
};

describe("<DictionaryDetail>", () => {
  const mockedDictionary = {
    id: "4ba016a4-919e-41af-9010-b83ea07b5513",
    name: "Russian",
    owner: "Matty",
    language: { label: "Slovak", languageCode: "sk" },
    words: {
      "92dec6d1-737a-49f0-9b7c-aa40e13a8a5f": {
        id: "92dec6d1-737a-49f0-9b7c-aa40e13a8a5f",
        text: "bag",
        translation: "sáčok",
        language: { label: "Slovak", languageCode: "sk" }
      },
      "02fd7a64-319e-49f8-82b9-106f9558c613": {
        id: "02fd7a64-319e-49f8-82b9-106f9558c613",
        text: "hands",
        translation: "ruky",
        language: { label: "Slovak", languageCode: "sk" }
      }
    }
  };

  test("Render without error with correct props", async () => {
    const spy = jest.spyOn(redux, "useSelector");

    spy.mockReturnValue(mockedDictionary);
    const { getByTestId } = renderWithRedux(<DictionaryDetail match={match} />);
    const Dictionary = await waitForElement(() =>
      getByTestId("dictionary-detail")
    );
    expect(Dictionary).toBeTruthy();
  });

  test("Display no words message when there are no saved words", async () => {
    const spy = jest.spyOn(redux, "useSelector");
    spy.mockReturnValue({ ...mockedDictionary, words: {} });
    const { getByTestId } = renderWithRedux(<DictionaryDetail match={match} />);
    const NoWords = await waitForElement(() => getByTestId("no-words-message"));

    expect(NoWords).toBeTruthy();
  });

  test("Display all words belongs to dictionary", async () => {
    const spy = jest.spyOn(redux, "useSelector");
    spy.mockReturnValue(mockedDictionary);

    const { getByTestId } = renderWithRedux(<DictionaryDetail match={match} />);
    const DictionaryWordRow = await waitForElement(() =>
      getByTestId(
        `word-row-${Object.values(mockedDictionary.words).length - 1}`
      )
    );

    expect(DictionaryWordRow).toBeTruthy();
  });

  test("Display dictionary name and language", async () => {
    const spy = jest.spyOn(redux, "useSelector");
    spy.mockReturnValue(mockedDictionary);

    const { getByText } = renderWithRedux(<DictionaryDetail match={match} />);
    const DictionaryName = await waitForElement(() =>
      getByText(`Dictionary name: ${mockedDictionary.name}`)
    );

    const DictionaryLanguage = await waitForElement(() =>
      getByText(`Language: ${mockedDictionary.language.label}`)
    );

    expect(DictionaryName).toBeTruthy();
    expect(DictionaryLanguage).toBeTruthy();
  });
});
