import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IJobSlice, ThunkApi } from '../../types';
import { toast } from 'react-toastify';
import {
  deleteJobThunk,
  editJobThunk,
  getAllJobsThunk,
  showStatsThunk,
} from './jobsThunk.ts';
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

export const getAllJobs = createAsyncThunk(
  'allJobs/getJobs',
  async (_, thunkApi) => {
    return getAllJobsThunk(thunkApi as ThunkApi<{ state: RootState }>);
  }
);

export const deleteJob = createAsyncThunk<any, string>(
  'job/deleteJob',
  async (jobId, thunkApi) => {
    return deleteJobThunk(`/jobs/${jobId}`, thunkApi);
  }
);

export const editJob = createAsyncThunk<any, Record<string, any>>(
  'job/editJob',
  async (payload, thunkApi) => {
    return editJobThunk(`/jobs/${payload.jobId}`, payload.job, thunkApi);
  }
);

export const showStats = createAsyncThunk(
  'allJobs/showStats',
  async (_, thunkAPI) => {
    return showStatsThunk(thunkAPI);
  }
);

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setEditJob: (state, action) => {
      return { ...state, isEditing: true, ...action.payload };
    },
    changePage: (state, action) => {
      state.page = action.payload;
    },
    clearJobsState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getAllJobs.fulfilled, (state, action) => {
      state.jobs = action.payload.jobs;
      state.numOfPages = action.payload.numOfPages;
      state.totalJobs = action.payload.totalJobs;
    }),
      builder.addCase(getAllJobs.rejected, (_, action) => {
        toast.error(action.payload as string);
      }),
      builder.addCase(editJob.fulfilled, () => {
        toast.success('Job Modified.');
      }),
      builder.addCase(editJob.rejected, (_, action) => {
        toast.error(action.payload as string);
      }),
      builder.addCase(showStats.fulfilled, (state, action) => {
        state.monthlyApplications = action.payload.monthlyApplications;
        state.stats = action.payload.defaultStats;
      }),
      builder.addCase(showStats.rejected, (_, action) => {
        toast.error(action.payload as string);
      });
  },
});

export const { setEditJob, changePage, clearJobsState } = jobsSlice.actions;

export default jobsSlice.reducer;
