import { getLoacalStorage, setLocalStorage } from '@store/localStorage';
import axios from 'axios';
import { getNewToken } from './auth';

const token = getLoacalStorage('@token');

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const InstanceWithToken = axios.create({
  headers: { Authorization: `Bearer ${token}` },
  withCredentials: true,
});

InstanceWithToken.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && originalRequest.url !== '/v1/auth/refresh') {
      try {
        const response = await getNewToken();

        const { accessToken } = response.data;

        InstanceWithToken.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        setLocalStorage('@token', accessToken);

        return InstanceWithToken(originalRequest);
      } catch (error) {
        //  window.location.href = '/';
        console.log('failed refresh token', error);
      }
    }

    return Promise.reject(error);
  },
);
