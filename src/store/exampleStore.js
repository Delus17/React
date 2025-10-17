import { createSlice } from '@reduxjs/toolkit';
import getExamplesAsync from '../api/examples';

const exampleStore = createSlice({
  name: 'exampleStore',
  initialState: {
    examples: []
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getExamplesAsync.fulfilled, (state, action) => {
      state.examples = action.payload;
    });
  },
});

export default exampleStore.reducer;
