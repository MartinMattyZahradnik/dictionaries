import { combineReducers } from "redux";

// Reducers
import userReducer from "redux/user/userReducer";

// Reducers Types
import { IUserReducerState } from "redux/user/types";

// Default states
import { defaultState as userDefaultState } from "./user/userReducer";

export interface IState {
  user: IUserReducerState;
}

export const initialState: IState = {
  user: userDefaultState
};

export default combineReducers({
  user: userReducer
});
