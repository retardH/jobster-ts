import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IJobSlice, JobSearchForm, ThunkApi } from '../../types';
import { toast } from 'react-hot-toast';
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
  sort: 'a-z',
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
  async (_, thunkApi: any) => {
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
      console.log('edit jbbb');

      return { ...state, ...action.payload, isEditing: true };
    },
    changePage: (state, action) => {
      state.page = action.payload;
    },
    clearJobsState: () => initialState,
    setSearchFilter: (state: JobSearchForm, action) => {
      const newState = {
        ...state,
        search: action.payload.search,
        searchStatus: action.payload.searchStatus,
        sort: action.payload.sort,
        searchType: action.payload.searchType,
      };
      Object.assign(state, newState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllJobs.fulfilled, (state, action) => {
      state.jobs = action.payload.jobs;
      state.numOfPages = action.payload.numOfPages;
      state.totalJobs = action.payload.totalJobs;
    });
    builder.addCase(getAllJobs.rejected, (_, action) => {
      toast.error(action.payload as string);
    });
    builder.addCase(editJob.fulfilled, () => {
      toast.success('Job Modified.');
      clearJobsState();
    });
    builder.addCase(editJob.rejected, (_, action) => {
      toast.error(action.payload as string);
    });
    builder.addCase(deleteJob.fulfilled, () => {
      toast.success('Job Deleted.');
    });
    builder.addCase(showStats.fulfilled, (state, action) => {
      state.monthlyApplications = action.payload.monthlyApplications;
      state.stats = action.payload.defaultStats;
    });
    builder.addCase(showStats.rejected, (_, action) => {
      toast.error(action.payload as string);
    });
  },
});

export const { setEditJob, changePage, clearJobsState, setSearchFilter } =
  jobsSlice.actions;

export default jobsSlice.reducer;
