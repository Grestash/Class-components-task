import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: number[] = [];

const selectionSlice = createSlice({
  name: 'selection',
  initialState,
  reducers: {
    toggle(state, action: PayloadAction<number>) {
      const index = state.indexOf(action.payload);
      if (index >= 0) {
        state.splice(index, 1);
      } else {
        state.push(action.payload);
      }
    },
    clear(state) {
      state.length = 0;
    },
  },
});

export default selectionSlice.reducer;
export const { toggle, clear } = selectionSlice.actions;
