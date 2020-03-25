import React from "react";
import { cleanup, waitForElement } from "@testing-library/react";
import DictionaryList from "../DictionaryList";
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

describe("<DictionaryList>", () => {
  test("Render without error with correct props", async () => {
    const { getByTestId } = renderWithRedux(<DictionaryList match={match} />);
    const Dictionary = await waitForElement(() =>
      getByTestId("dictionary-list")
    );
    expect(Dictionary).toBeTruthy();
  });

  test("Display no dictionaries message when there are no dictionaries", async () => {
    const { getByTestId } = renderWithRedux(<DictionaryList match={match} />);
    const NoDictionaries = await waitForElement(() =>
      getByTestId("dictionary-no-dictionaries")
    );

    expect(NoDictionaries).toBeTruthy();
  });

  test("Display all dictionaries", async () => {
    const spy = jest.spyOn(redux, "useSelector");
    const dictionaries = [
      {
        id: "4ba016a4-919e-41af-9010-b83ea07b5513",
        name: "Russian",
        owner: "Matty",
        language: { label: "Slovak", languageCode: "sk" },
        words: {}
      },
      {
        id: "154b3e09-2c33-41bc-8e0f-d2b134c45211",
        name: "English",
        owner: "Rusalka",
        language: { label: "English", languageCode: "en-gb" },
        words: {}
      }
    ];
    spy.mockReturnValue("matty");
    spy.mockReturnValue(dictionaries);

    const { getByTestId } = renderWithRedux(<DictionaryList match={match} />);
    const DictionaryTableRow = await waitForElement(() =>
      getByTestId(`dictionary-table-row-${dictionaries.length - 1}`)
    );

    expect(DictionaryTableRow).toBeTruthy();
  });
});
