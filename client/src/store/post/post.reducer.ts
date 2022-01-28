import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { string } from "yup/lib/locale";
import { IPost, IStoreState } from "../../interfaces";

interface PostState extends IStoreState {
  posts: IPost[] | [];
  post: IPost | null;
  layout: string;
}

const initialState: PostState = {
  posts: [],
  post: null,
  layout: "list",
  isLoading: false,
  error: null,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getPosts(state) {
      state.isLoading = true;
    },
    getPostsSuccees(state, action: PayloadAction<IPost[]>) {
      state.posts = action.payload;
      state.isLoading = false;
    },
    getPostsError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },

    getPostByKey(state) {
      state.isLoading = true;
    },
    getPostByKeySuccees(state, action: PayloadAction<IPost>) {
      state.post = action.payload;
      state.isLoading = false;
    },
    getPostByKeyError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },

    createPost(state) {
      state.isLoading = true;
    },
    createPostSuccees(state) {
      state.isLoading = false;
    },
    createPostError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },

    updatePost(state) {
      state.isLoading = true;
    },
    updatePostSuccees(state) {
      state.isLoading = false;
    },
    updatePostError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },

    deletePost(state) {
      state.isLoading = true;
    },
    deletePostSuccees(state) {
      state.isLoading = false;
    },
    deletePostError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const postAction = postSlice.actions;
export const postReducer = postSlice.reducer;
