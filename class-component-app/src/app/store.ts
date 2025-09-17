import { configureStore } from '@reduxjs/toolkit';
import selectionReducer from '../features/selection/selectionSlice';
import { rickAndMortyApi } from '../services/api';

export const store = configureStore({
  reducer: {
    selection: selectionReducer,
    [rickAndMortyApi.reducerPath]: rickAndMortyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rickAndMortyApi.middleware),
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
