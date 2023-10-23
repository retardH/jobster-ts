import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user/userSlice';
import jobsSlice from './jobs/jobsSlice';


export const store = configureStore({
    reducer: {
        user: userSlice,
        jobs: jobsSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;