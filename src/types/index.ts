import type { GetThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { RootState } from "../features/store";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";

export type LoginPayload = {
    email: string;
    password: string;
}

export type RegisterPayload = {
    name: string;
    email: string;
    password: string;
}

export type User = {
    email: string;
    name: string;
    lastName: string;
    location: string;
    token: string;
};


export type UpdateUserPayload = {
    name: string;
    lastName: string;
    location: string;
    email: string;
}

// thunkAPI type
export type ThunkApi = any;

export type IJobSlice = {
    isLoading: boolean;
    position: string;
    company: string;
    jobLocation: string;
    jobTypeOptions: string[];
    jobType: string;
    statusOptions: string[];
    status: string;
    isEditing: boolean;
    editJobId: string;
};

export type JobsStateChangeAction = {
    name: keyof IJobSlice;
    value: any;
}
