import { createSlice } from '@reduxjs/toolkit';
import getServicesAsync from '../api/services';

const servicesStore = createSlice({
  name: 'servicesStore',
  initialState: {
    services: []
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getServicesAsync.fulfilled, (state, action) => {
      state.services = action.payload;
    });
  },
});

export default servicesStore.reducer;
