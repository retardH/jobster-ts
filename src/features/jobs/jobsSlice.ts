import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateNewJobPayload, IJobSlice } from "../../types";
import { requestInstance } from "../../utils/axios.ts";
import { RootState } from "../store.ts";
import { logoutUser } from "../user/userSlice.ts";
import { toast } from "react-toastify";

const initialState: IJobSlice = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  isEditing: false,
  editJobId: "",
};

export const createNewJob = createAsyncThunk<
  any,
  CreateNewJobPayload,
  {
    state: RootState;
  }
>("create/job", async (job, thunkAPI) => {
  try {
    const response = await requestInstance.post("/jobs", job, {
      headers: {
        Authorization: `Bearer ${thunkAPI.getState()?.user.user?.token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.log(error);
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      thunkAPI.rejectWithValue("Please log in again");
    }
    thunkAPI.rejectWithValue(error.response.data.msg);
  }
});

export const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createNewJob.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(createNewJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Job Created!");
      }),
      builder.addCase(createNewJob.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload as string);
      });
  },
});

export default jobsSlice.reducer;