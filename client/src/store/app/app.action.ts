import { ApiResponse, ApiService } from "../../services";
import { AppDispatch } from "../store";
import { appAction, AppState } from "./app.reducer";

export const updateApp = (data: AppState) => async (dispatch: AppDispatch) => {
  try {
    console.log(data);

    dispatch(appAction.updateApp());
    dispatch(appAction.updateAppSuccess(data));
  } catch (e) {
    console.log({ e });
  }
};
