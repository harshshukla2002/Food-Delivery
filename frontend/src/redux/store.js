import { combineReducers, legacy_createStore } from "redux";
import { reducer as FoodReducer } from "./Food/reducer";
import { reducer as AuthReducer } from "./Auth/reducer";

const mainReducer = combineReducers({ FoodReducer, AuthReducer });

export const store = legacy_createStore(mainReducer);
