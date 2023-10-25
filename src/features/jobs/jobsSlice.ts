import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateNewJobPayload, IJobSlice } from "../../types";
import { requestInstance } from "../../utils/axios.ts";
import { RootState } from "../store.ts";
import { logoutUser } from "../user/userSlice.ts";
import { toast } from "react-toastify";


const initialFiltersState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const initialState: IJobSlice = {
  isEditing: false,
  editJobId: "",
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};



export const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    
  },
});

export default jobsSlice.reducer;