import { IUser } from "../../interfaces";
import { ApiResponse, ApiService } from "../../services";
import { AppDispatch } from "../store";
import { userAction } from "./user.reducer";

export const getUsers = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(userAction.getUsers());

    const { data } = await ApiService.get<ApiResponse<IUser[]>>("/users");

    console.log({ data });

    dispatch(userAction.getUsersSuccees(data.result));
  } catch (e) {
    dispatch(userAction.getUsersError("Error!"));
  }
};

export const getUserByKey =
  (id: number | string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(userAction.getUserByKey());

      const { data } = await ApiService.get<ApiResponse<IUser>>(`/users/${id}`);

      dispatch(userAction.getUserByKeySuccees(data.result));
    } catch (e) {
      dispatch(userAction.getUserByKeyError("Error!"));
    }
  };

export const createUser = (data: IUser) => async (dispatch: AppDispatch) => {
  try {
    dispatch(userAction.createUser());

    await ApiService.post<ApiResponse<IUser>>("/users", data);

    dispatch(userAction.createUserSuccees());
  } catch (e) {
    dispatch(userAction.createUserError("Error!"));
  }
};

export const updateUser =
  (key: string | number, data: IUser) => async (dispatch: AppDispatch) => {
    try {
      dispatch(userAction.updateUser());

      await ApiService.put<ApiResponse<IUser>>(`/users/${key}`, data);

      dispatch(userAction.updateUserSuccees());
    } catch (e) {
      dispatch(userAction.updateUserError("Error!"));
    }
  };

export const deleteUser =
  (key: string | number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(userAction.deleteUser());

      await ApiService.delete<ApiResponse<IUser>>(`/users/${key}`);

      dispatch(userAction.deleteUserSuccees());
    } catch (e) {
      dispatch(userAction.deleteUserError("Error!"));
    }
  };
