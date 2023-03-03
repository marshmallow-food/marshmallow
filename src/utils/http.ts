import axios, {AxiosInstance, AxiosResponse} from 'axios';
import {RootState, store} from '../store';
import {API_BASE_URL} from '@env';

const http: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use(
  async (config) => {
    const state = store.getState() as RootState;
    const token = state.auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  (response: AxiosResponse) => {
    // Handle the response data
    return response.data;
  },
  (error) => {
    // Handle any errors that occur during the request
    return Promise.reject(error);
  },
);

export default http;
