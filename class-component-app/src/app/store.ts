import { configureStore } from "@reduxjs/toolkit";
import selectionReducer from '../features/selection/selectionSlice'


export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const store = configureStore({
    reducer: {
        selection: selectionReducer
    }
})