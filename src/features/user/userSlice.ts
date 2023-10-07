import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

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
    async (user, thunkAPI) => {
        console.log(`Register User: ${user}`, thunkAPI);
    }
);

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (user, thunkAPI) => {
        console.log(`Login User: ${user}`, thunkAPI);
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