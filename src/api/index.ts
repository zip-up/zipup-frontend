import { getLoacalStorage } from '@store/localStorage';
import axios from 'axios';

const token = getLoacalStorage('@token');

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const InstanceWithToken = axios.create({
  headers: { Authorization: `Bearer ${token}` },
  withCredentials: true,
});

