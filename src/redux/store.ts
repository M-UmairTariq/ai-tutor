import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import coursesReducer from './slices/coursesSlice';
import topicsReducer from './slices/topicsSlice';
import leaderBoardReducer from './slices/leaderboardSlice';
import chatWindowReducer from "./slices/chatwindowSlice"; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: coursesReducer,
    topics: topicsReducer,
    leaderboard: leaderBoardReducer,
    chatWindow: chatWindowReducer
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;