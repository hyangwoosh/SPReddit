import {
  combineReducers,
  configureStore,
  ThunkDispatch,
} from "@reduxjs/toolkit";

import { appReducer } from "./app";
import { postReducer } from "./post";
import { userReducer } from "./user";

const reducer = combineReducers({
  app: appReducer,
  user: userReducer,
  post: postReducer,
});

export const setupStore = () => configureStore({ reducer });

export type RootState = ReturnType<typeof reducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = ThunkDispatch<RootState, any, any>; // AppStore["dispatch"];
