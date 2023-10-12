import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {LoginPayload, RegisterPayload} from "../../types";
import {requestInstance} from "../../utils/axios.ts";
import {toast} from "react-toastify";

interface UserSlice {
    isLoading: boolean;
    user: any;
}
const initialState: UserSlice = {
    isLoading: false,
    user: null,
}

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (user: RegisterPayload, thunkAPI) => {
        try {
            const response = await requestInstance.post('/auth/testingRegister', user);
            console.log(response);
        } catch (err: any) {
            toast.error(err.response.data.msg);
            console.log('error', err.response);
        }
    }
);

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (user: LoginPayload, thunkAPI) => {
        try {
            const response = await requestInstance.post('/auth/login', user);
            console.log(response);
        } catch (err: any) {
            toast.error(err.response.data.msg);
            console.log('error', err.response);
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        log: () => {
            console.log('logged');
        }
    }
});

export default userSlice.reducer;