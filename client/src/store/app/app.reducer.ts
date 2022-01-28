import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStoreState } from "../../interfaces";

export interface AppState extends IStoreState {
  postLayout?: "list" | "grid";
}

const initialState: AppState = {
  postLayout: "list",
  isLoading: false,
  error: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateApp(state) {
      state.isLoading = true;
    },
    updateAppSuccess(state, action: PayloadAction<AppState>) {
      state.isLoading = false;
      state.postLayout = action.payload.postLayout;
    },
    updateAppError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const appAction = appSlice.actions;
export const appReducer = appSlice.reducer;
