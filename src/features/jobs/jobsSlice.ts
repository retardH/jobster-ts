import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IJobSlice } from '../../types';
import { request } from '../../utils/axios.ts';
import { toast } from 'react-toastify';
import { RootState } from '../store.ts';

const initialFiltersState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const initialState: IJobSlice = {
  isEditing: false,
  editJobId: '',
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  status: 'pending',
  jobLocation: '',
  jobType: 'full-time',
  position: '',
  company: '',
  createdAt: '',
  ...initialFiltersState,
};

export const getAllJobs = createAsyncThunk<
  any,
  undefined,
  {
    state: RootState;
  }
>('allJobs/getJobs', async (_, thunkApi) => {
  const url = '/jobs';

  try {
    const response: any = await request('get', url, undefined, {
      headers: {
        authorization: `Bearer ${thunkApi?.getState()?.user?.user?.token}`,
      },
    });
    return response.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data.msg);
  }
});

export const deleteJob = createAsyncThunk<any, string, { state: RootState }>(
  'job/deleteJob',
  async (jobId, thunkApi) => {
    try {
      const response = await request('delete', `/jobs/${jobId}`, undefined, {
        headers: {
          authorization: `Bearer ${thunkApi?.getState()?.user?.user?.token}`,
        },
      });
      return response.data;
    } catch (err: any) {
      thunkApi.rejectWithValue(err.response.data.msg);
    }
  }
);

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setEditJob: (state, action) => {
      console.log(action.payload);

      return { ...state, isEditing: true, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllJobs.fulfilled, (state, action) => {
      state.jobs = action.payload.jobs;
    }),
      builder.addCase(getAllJobs.rejected, (_, action) => {
        toast.error(action.payload as string);
      });
  },
});

export const { setEditJob } = jobsSlice.actions;

export default jobsSlice.reducer;
