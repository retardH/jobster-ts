import { createSlice } from '@reduxjs/toolkit';

interface UserSliceInitial {
    isLoading: boolean;
    user: any;
}
const initialState: UserSliceInitial = {
    isLoading: false,
    user: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        log: () => {
            console.log('logged');
        }
    }
})

export default userSlice.reducer;