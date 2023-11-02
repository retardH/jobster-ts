import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IJobSlice } from '../../types';
import { toast } from 'react-toastify';
import { deleteJobThunk, editJobThunk, getAllJobsThunk } from './jobsThunk.ts';

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
    return getAllJobsThunk(thunkApi);
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

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setEditJob: (state, action) => {
      return { ...state, isEditing: true, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllJobs.fulfilled, (state, action) => {
      state.jobs = action.payload.jobs;
    }),
      builder.addCase(getAllJobs.rejected, (_, action) => {
        toast.error(action.payload as string);
      }),
      builder.addCase(editJob.fulfilled, () => {
        toast.success('Job Modified.');
      });
    builder.addCase(editJob.rejected, (_, action) => {
      toast.error(action.payload as string);
    });
  },
});

export const { setEditJob } = jobsSlice.actions;

export default jobsSlice.reducer;
