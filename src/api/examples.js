import { createAsyncThunk } from '@reduxjs/toolkit';

const getExamplesAsync = createAsyncThunk(
  'example/getExamplesAsync',
  async () => {
    const response = await fetch(`/api/examples`);
    if (!response.ok) throw new Error(response.statusText);
    const exapmles = await response.json();
    return exapmles;
  },
);

const addExample = async (example) => {
  const response =  await fetch('/api/examples', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(example),
  });
  if (!response.ok) throw new Error(response.statusText);
};

export default getExamplesAsync;
export { addExample }