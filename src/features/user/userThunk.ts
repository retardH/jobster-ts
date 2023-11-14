import { LoginPayload, RegisterPayload, ThunkApi } from '../../types';
import { checkForUnauthorizedResponse, request } from '../../utils/axios';
import { clearJobsState } from '../jobs/jobsSlice';
import { logoutUser } from './userSlice';

export const registerUserThunk = async (
  url: string,
  user: RegisterPayload,
  thunkAPI: ThunkApi
) => {
  try {
    const resp: any = await request('post', url, user);
    return resp.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const loginUserThunk = async (
  url: string,
  user: LoginPayload,
  thunkAPI: ThunkApi
) => {
  try {
    const resp: any = await request('post', url, user);
    return resp.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const updateUserThunk = async (
  url: string,
  user: any,
  thunkAPI: ThunkApi
) => {
  try {
    const response: any = await request('patch', url, user);
    return response.data;
  } catch (err: any) {
    return checkForUnauthorizedResponse(err, thunkAPI);
  }
};

export const clearStoreThunk = async (message: string, thunkAPI: ThunkApi) => {
  try {
    thunkAPI.dispatch(logoutUser(message));
    thunkAPI.dispatch(clearJobsState());

    return Promise.resolve();
  } catch {
    return Promise.reject();
  }
};
