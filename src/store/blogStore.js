import { createSlice } from '@reduxjs/toolkit';
import { getBlogsAsync, getBlogAsync } from '../api/blogs';

const blogStore = createSlice({
  name: 'blogStore',
  initialState: {
    blogs: [],
    blog: {},
    comments: [],
  },
  reducers: {
    addComment: (state, action) => {
      state.comments = [...state.comments, action.payload];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getBlogsAsync.fulfilled, (state, action) => {
      state.blogs = action.payload;
    });
    builder.addCase(getBlogAsync.fulfilled, (state, action) => {
      state.blog = action.payload;
      state.comments = action.payload.comments;
    });
  },
});

export const { addComment } = blogStore.actions;
export default blogStore.reducer;
