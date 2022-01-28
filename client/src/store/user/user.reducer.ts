import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { string } from "yup/lib/locale";
import { IUser, IStoreState } from "../../interfaces";

interface UserState extends IStoreState {
  users: IUser[] | [];
  user: IUser | null;
  layout: string;
}

const initialState: UserState = {
  users: [],
  user: null,
  layout: "list",
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUsers(state) {
      state.isLoading = true;
    },
    getUsersSuccees(state, action: PayloadAction<IUser[]>) {
      state.users = action.payload;
      state.isLoading = false;
    },
    getUsersError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },

    getUserByKey(state) {
      state.isLoading = true;
    },
    getUserByKeySuccees(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
      state.isLoading = false;
    },
    getUserByKeyError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },

    createUser(state) {
      state.isLoading = true;
    },
    createUserSuccees(state) {
      state.isLoading = false;
    },
    createUserError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },

    updateUser(state) {
      state.isLoading = true;
    },
    updateUserSuccees(state) {
      state.isLoading = false;
    },
    updateUserError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },

    deleteUser(state) {
      state.isLoading = true;
    },
    deleteUserSuccees(state) {
      state.isLoading = false;
    },
    deleteUserError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const userAction = userSlice.actions;
export const userReducer = userSlice.reducer;
