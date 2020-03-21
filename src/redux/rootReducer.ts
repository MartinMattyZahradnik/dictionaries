import { combineReducers } from "redux";

// Reducers
import userReducer from "redux/user/userReducer";
import dictionariesReducer from "redux/dictionaries/dictionariesReducer";

// Reducers Types
import { UserReducerState } from "redux/user/types";
import { DictionariesReducerState } from "redux/dictionaries/types";

// Default states
import { defaultState as userDefaultState } from "./user/userReducer";
import { defaultState as dictionariesDefaultState } from "./dictionaries/dictionariesReducer";

export interface RootState {
  user: UserReducerState;
  dictionaries: DictionariesReducerState;
}

export const initialState: RootState = {
  user: userDefaultState,
  dictionaries: dictionariesDefaultState
};

export default combineReducers({
  user: userReducer,
  dictionaries: dictionariesReducer
});
