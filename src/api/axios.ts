import axios from 'axios';
import { ENV } from '@/shared/config';

export const api = axios.create({
  baseURL: ENV.API_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});
