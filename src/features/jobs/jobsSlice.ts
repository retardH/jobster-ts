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
    const response: any = await request(
      'get',
      url,
      {},
      {
        headers: {
          authorization: `Bearer ${thunkApi?.getState()?.user?.user?.token}`,
        },
      }
    );
    return response.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data.msg);
  }
});

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllJobs.fulfilled, (state, action) => {
      state.jobs = action.payload.jobs;
    }),
      builder.addCase(getAllJobs.rejected, (_, action) => {
        toast.error(action.payload as string);
      });
  },
});

export default jobsSlice.reducer;
