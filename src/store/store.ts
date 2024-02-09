import { configureStore } from "@reduxjs/toolkit";
import accountReducer from './Slices/AuthSlice'
import playlistReducer from '../store/Slices/SongSlice'

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    account: accountReducer,
    songs: playlistReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;