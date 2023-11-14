import { ThunkApi } from '../../types';
import { checkForUnauthorizedResponse, request } from '../../utils/axios';
import { RootState } from '../store';

export const deleteJobThunk = async (url: string, thunkApi: ThunkApi) => {
  try {
    const response = await request('delete', url);
    return response.data;
  } catch (err: any) {
    return checkForUnauthorizedResponse(err, thunkApi);
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
    return checkForUnauthorizedResponse(err, thunkApi);
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
  } = thunkApi.getState().jobs;

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
    return checkForUnauthorizedResponse(err, thunkApi);
  }
};

export const showStatsThunk = async (thunkApi: ThunkApi) => {
  try {
    const resp = await request('get', '/jobs/stats');
    return resp.data;
  } catch (err: any) {
    return checkForUnauthorizedResponse(err, thunkApi);
  }
};