import { getLoacalStorage } from '@store/localStorage';
import axios from 'axios';

const token = getLoacalStorage('@token');

export const Instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  withCredentials: true,
});
