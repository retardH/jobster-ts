import { GetThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { ThunkApi } from '../../types';
import { request } from '../../utils/axios';
import { RootState } from '../store';

export const deleteJobThunk = async (url: string, thunkApi: ThunkApi) => {
  try {
    const response = await request('delete', url);
    return response.data;
  } catch (err: any) {
    thunkApi.rejectWithValue(err.response.data.msg);
  }
};

export const editJobThunk = async (
  url: string,
  jobPayload: Record<string, any>,
  thunkApi: ThunkApi
) => {
  try {
    const response = request('patch', url, jobPayload);
    return response.data;
  } catch (err: any) {
    thunkApi.rejectWithValue(err.response.data.msg);
  }
};

export const getAllJobsThunk = async (
  thunkApi: ThunkApi<{ state: RootState }>
) => {
  const {
    search,
    searchStatus: status,
    searchType: jobType,
    sort,
    page,
  } = thunkApi.getState()?.jobs;

  const url = '/jobs';

  let params: any = {
    status,
    jobType,
    sort,
    page,
  };

  if (search) {
    params = { ...params, search };
  }

  try {
    const response: any = await request('get', url, params);
    return response.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data.msg);
  }
};

export const showStatsThunk = async (thunkAPI: ThunkApi) => {
  try {
    const resp = await request('get', '/jobs/stats');
    console.log(resp.data);
    return resp.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
