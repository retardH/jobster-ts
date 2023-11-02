import { ThunkApi } from '../../types';
import { request } from '../../utils/axios';

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

// export const getAllJobs = createAsyncThunk(
//     'allJobs/getJobs',
//     async (_, thunkApi) => {

//     }
//   );

export const getAllJobsThunk = async (thunkApi: ThunkApi) => {
  const url = '/jobs';

  try {
    const response: any = await request('get', url);
    return response.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data.msg);
  }
};
