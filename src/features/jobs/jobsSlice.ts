import { createSlice } from "@reduxjs/toolkit";
import { IJobSlice, JobsStateChangeAction } from "../../types";

const initialState: IJobSlice = {
    isLoading: false,
    position: '',
    company: '',
    jobLocation: '',
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    jobType: 'full-time',
    statusOptions: ['interview', 'declined', 'pending'],
    status: 'pending',
    isEditing: false,
    editJobId: '',
  };


export const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        handleJobsInputChange: (state, { payload }: {payload: JobsStateChangeAction}) => {
            state = {...state, ...payload}
        }
    }
})

export const { handleJobsInputChange } = jobsSlice.actions;

export default jobsSlice.reducer;