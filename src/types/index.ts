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
  status: "pending" | "interview" | "declined";
  jobType: "full-time" | "part-time" | "remote" | "internship";
} & any;

// thunkAPI type
export type ThunkApi = any;

export interface IJobSlice {
  isEditing: boolean;
  editJobId: string;
  jobs: any[],
  totalJobs: number,
  numOfPages: number,
  page: number,
  stats: any,
  monthlyApplications: any[],
}

export interface IUserSlice {
  isLoading: boolean;
  user: User | null;
  isSidebarOpen: boolean;
}

export type JobsStateChangeAction = Record<keyof IJobSlice, any>;