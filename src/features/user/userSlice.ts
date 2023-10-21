import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {LoginPayload, RegisterPayload, User} from "../../types";
import {requestInstance} from "../../utils/axios.ts";
import {toast} from "react-toastify";
import {addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage} from '../../utils/storage.ts';

interface IUserSlice {
    isLoading: boolean;
    user: User | null;
    isSidebarOpen: boolean;
}
const initialState: IUserSlice = {
    isLoading: false,
    isSidebarOpen: false,
    user: getUserFromLocalStorage(),
}

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (user: RegisterPayload, thunkAPI) => {
        try {
            const response = await requestInstance.post('/auth/register', user);
            return response.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response.data.msg);
        }
    }
);

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (user: LoginPayload, thunkAPI) => {
        try {
            const response = await requestInstance.post('/auth/login', user);
            return response.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response.data.msg);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        toggleSidebarOpen: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen;
        },
        logoutUser: (state) => {
            state.user = null;
            state.isSidebarOpen = false;
            removeUserFromLocalStorage();
        }
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
        })
    }
});

export const { toggleSidebarOpen, logoutUser } = userSlice.actions;
export default userSlice.reducer;