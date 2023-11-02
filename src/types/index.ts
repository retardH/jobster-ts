import { GetThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { AppDispatch, RootState } from '../features/store.ts';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

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
};

export type CreateNewJobPayload = {
  position: string;
  company: string;
  jobLocation: string;
  status: 'pending' | 'interview' | 'declined';
  jobType: 'full-time' | 'part-time' | 'remote' | 'internship';
} & any;

export type ThunkApi = GetThunkAPI<{}>;

export interface IJobSlice {
  isEditing: boolean;
  editJobId: string;
  jobs: {
    _id: string;
    position: string;
    company: string;
    jobLocation: string;
    jobType: string;
    createdAt: string;
    status: string;
  }[];
  totalJobs: number;
  numOfPages: number;
  page: number;
  stats: any;
  monthlyApplications: any[];
  position: string;
  company: string;
  jobLocation: string;
  jobType: string;
  createdAt: string;
  status: string;
}

export interface IUserSlice {
  isLoading: boolean;
  user: User | null;
  isSidebarOpen: boolean;
}

export type JobsStateChangeAction = Record<keyof IJobSlice, any>;
