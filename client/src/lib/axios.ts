import axios from 'axios';
import { BACKEND_BASE_URL } from '@/utils/constants';

export default axios.create({
  baseURL: BACKEND_BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BACKEND_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
