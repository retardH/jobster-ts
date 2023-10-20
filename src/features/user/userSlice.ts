import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {LoginPayload, RegisterPayload, User} from "../../types";
import {requestInstance} from "../../utils/axios.ts";
import {toast} from "react-toastify";
import { addUserToLocalStorage, getUserFromLocalStorage } from '../../utils/storage.ts';

interface IUserSlice {
    isLoading: boolean;
    user: User | null;
}
const initialState: IUserSlice = {
    isLoading: false,
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
        log: () => {
            console.log('logged');
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

export default userSlice.reducer;