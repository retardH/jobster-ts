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
};

// thunkAPI type
export type ThunkApi = any;

export interface IJobSlice {
  isLoading: boolean;
  position: string;
  company: string;
  jobLocation: string;
  jobTypeOptions: string[];
  jobType: "full-time" | "part-time" | "remote" | "internship";
  statusOptions: string[];
  status: "pending" | "interview" | "declined";
  isEditing: boolean;
  editJobId: string;
}

export interface IUserSlice {
  isLoading: boolean;
  user: User | null;
  isSidebarOpen: boolean;
}

export type JobsStateChangeAction = Record<keyof IJobSlice, any>;