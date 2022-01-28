import { ThunkDispatch } from "@reduxjs/toolkit";
import { IPost } from "../../interfaces";
import {
  ApiRequestQuery,
  ApiResponse,
  ApiResponseCreated,
  ApiService,
} from "../../services";
import { AppDispatch } from "../store";
import { postAction } from "./post.reducer";

export const getPosts =
  (query?: ApiRequestQuery) => async (dispatch: AppDispatch) => {
    try {
      dispatch(postAction.getPosts());

      const { data } = await ApiService.post<ApiResponse<IPost[]>>(
        "/posts/query",
        query
      );

      dispatch(postAction.getPostsSuccees(data.result));
    } catch (e) {
      dispatch(postAction.getPostsError("Error!"));
    }
  };

export const getPostByKey =
  (id: number | string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(postAction.getPostByKey());

      const { data } = await ApiService.get<ApiResponse<IPost>>(`/posts/${id}`);

      dispatch(postAction.getPostByKeySuccees(data.result));
    } catch (e) {
      dispatch(postAction.getPostByKeyError("Error!"));
    }
  };

export const createPost = (data: IPost) => async (dispatch: AppDispatch) => {
  try {
    dispatch(postAction.createPost());

    console.log({ data });

    const response = await ApiService.post<ApiResponseCreated>("/posts", data);
    const result = response.data.result;

    dispatch(postAction.createPostSuccees());

    return result;
  } catch (e) {
    dispatch(postAction.createPostError("Error!"));
  }
};

export const updatePost =
  (key: string | number, data: IPost) => async (dispatch: AppDispatch) => {
    try {
      dispatch(postAction.updatePost());

      await ApiService.put<ApiResponse<IPost>>(`/posts/${key}`, data);

      dispatch(postAction.updatePostSuccees());
    } catch (e) {
      dispatch(postAction.updatePostError("Error!"));
    }
  };

export const deletePost =
  (key: string | number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(postAction.deletePost());

      await ApiService.delete<ApiResponse<IPost>>(`/post/${key}`);

      dispatch(postAction.deletePostSuccees());
    } catch (e) {
      dispatch(postAction.deletePostError("Error!"));
    }
  };
