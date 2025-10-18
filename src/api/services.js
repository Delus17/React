/**
 * @fileoverview API for services.
 */
import { createAsyncThunk } from '@reduxjs/toolkit';

/**
 * Fetches all services.
 */
const getServicesAsync = createAsyncThunk(
  'services/getServicesAsync',
  async () => {
  const response = await fetch('/api/services');
  if (!response.ok) throw new Error(response.statusText);
  const services = await response.json();
  return services;
  },
);

/**
 * Adds a new service.
 * @param {Object} service
 */
const addService = async (service) => {
  const response = await fetch('/api/services', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(service),
  });
  if (!response.ok) throw new Error(response.statusText);
};

export default getServicesAsync;
export { addService };