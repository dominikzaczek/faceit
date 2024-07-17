import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type LastSeenState = {
  lastSeenPostId: number | null;
};

const initialState: LastSeenState = {
  lastSeenPostId: null,
};

export const lastSeenPostSlice = createSlice({
  name: 'lastSeenPost',
  initialState,
  reducers: {
    setLastSeenPost(state, action: PayloadAction<number>) {
      state.lastSeenPostId = action.payload;
    },
  },
  selectors: {
    selectLastSeenPost: (state) => state.lastSeenPostId
  }
});

export const { setLastSeenPost } = lastSeenPostSlice.actions;

export const { selectLastSeenPost } = lastSeenPostSlice.selectors;