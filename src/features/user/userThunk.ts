import { ThunkApi } from "../../types";
import { request } from "../../utils/axios";
import { logoutUser } from "./userSlice";

export const registerUserThunk = async (
  url: string,
  user: any,
  thunkAPI: ThunkApi,
) => {
  try {
    const resp: any = await request("post", url, user);
    return resp.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const loginUserThunk = async (
  url: string,
  user: any,
  thunkAPI: ThunkApi,
) => {
  try {
    const resp: any = await request("post", url, user);
    return resp.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const updateUserThunk = async (
  url: string,
  user: any,
  thunkAPI: ThunkApi,
) => {
  try {
    const response: any = await request("patch", url, user, {
      headers: {
        Authorization: `Bearer ${thunkAPI?.getState()?.user?.user?.token}`,
      },
    });
    return response.data;
  } catch (err: any) {
    if (err.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue("Please log in again");
    }
    return thunkAPI.rejectWithValue(err.response.data.msg);
  }
};