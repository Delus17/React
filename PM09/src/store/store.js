import { configureStore } from '@reduxjs/toolkit';
import servicesStore from './servicesStore';
import exampleStore from './exampleStore';
import blogStore from './blogStore';

const store = configureStore({
  reducer: {
    services: servicesStore,
    examples: exampleStore,
    blogs: blogStore,
  }
});

export default store;