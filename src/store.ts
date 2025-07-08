import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import feedbackReducer from './features/feedback/feedbackSlice';
import tagReducer from './features/tags/tagSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    feedback: feedbackReducer,
    tags: tagReducer,
    // Add other reducers here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 