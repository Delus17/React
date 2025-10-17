import { createAsyncThunk } from '@reduxjs/toolkit';

const getBlogsAsync = createAsyncThunk(
  'blog/getBlogsAsync',
  async () => {
    const response = await fetch(`/api/blogs`);
    if (!response.ok) throw new Error(response.statusText);
    
    const blogs = await response.json();
    
    return blogs;
  },
);

const getBlogAsync = createAsyncThunk(
  'blog/getBlogAsync',
  async (id) => {
    const response = await fetch(`/api/blogs/${id}`);
    if (!response.ok) throw new Error(response.statusText);
    
    const blog = await response.json();
    
    return blog;
  },
  );

const addBlog = async (blog) => {
  await fetch('/api/blogs/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(blog),
  });
}

const sendComment = async (id, comment) => {
  await fetch(`/api/blogs/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({comment: comment}),
  });
}

export { getBlogsAsync, getBlogAsync, sendComment, addBlog };