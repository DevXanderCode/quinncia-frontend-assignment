import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';
const AUTH_TOKEN = 'token';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
  timeout: 60000,
});

// Intercept all requests
client.interceptors.request.use(
  (config) => {
    console.log(`${config.method.toUpperCase()} - ${config.url}:`);
    return config;
  },
  (error) => Promise.reject(error),
);

// Intercept all responses
client.interceptors.response.use(
  async (response) => {
    console.log(`${response.status} - ${response.config.url}:`);
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(AUTH_TOKEN);
      window.location.href = '/';
      return null;
    }
    return Promise.reject(error);
  },
);

export default async (needsAuth = true) => {
  if (needsAuth) {
    client.defaults.headers.Authorization = `Bearer ${localStorage.getItem(AUTH_TOKEN)}`;
  }
  return client;
};
