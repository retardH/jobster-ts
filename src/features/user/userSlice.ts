import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserSlice, LoginPayload, UpdateUserPayload } from "../../types";
import { toast } from "react-toastify";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/storage.ts";
import { RootState } from "../store.ts";
import {
  loginUserThunk,
  registerUserThunk,
  updateUserThunk,
} from "./userThunk.ts";

const initialState: IUserSlice = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkApi) => {
    return registerUserThunk("auth/register", user, thunkApi);
  },
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user: LoginPayload, thunkAPI) => {
    return loginUserThunk("auth/login", user, thunkAPI);
  },
);

export const updateUser = createAsyncThunk<
  any,
  UpdateUserPayload,
  { state: RootState }
>("user/updateUser", async (user: any, thunkAPI) => {
  return updateUserThunk("auth/updateUser", user, thunkAPI);
});

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    toggleSidebarOpen: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutUser: (state, action: PayloadAction<string | undefined>) => {
      state.user = null;
      state.isSidebarOpen = false;
      if (action.payload) {
        toast.success(action.payload);
      }
      removeUserFromLocalStorage();
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        addUserToLocalStorage(action.payload.user);
        toast.success(`User Registered, ${action.payload.user.name}`);
      }),
      builder.addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload as string);
      }),
      builder.addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        addUserToLocalStorage(action.payload.user);
        toast.success(`Welcome Back, ${action.payload.user.name}`);
      }),
      builder.addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload as string);
      }),
      builder.addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;

        addUserToLocalStorage(action.payload.user);
        toast.success("Profile Successfully Updated");
      }),
      builder.addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload as string);
      });
  },
});

export const { toggleSidebarOpen, logoutUser, setLoading } = userSlice.actions;
export default userSlice.reducer;