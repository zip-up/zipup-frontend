import { getLoacalStorage, setLocalStorage } from '@store/localStorage';
import axios from 'axios';
import Cookies from 'js-cookie';

import { getNewToken } from './auth';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const InstanceWithToken = axios.create({
  withCredentials: true,
  headers: { Authorization: `Bearer ${getLoacalStorage('@token')}` },
});

InstanceWithToken.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${getLoacalStorage('@token')}`;

  return config;
});

InstanceWithToken.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      error.response?.data?.error_name === 'EXPIRED_TOKEN' &&
      originalRequest.url !== '/v1/auth/refresh'
    ) {
      try {
        const response = await getNewToken();

        const { accessToken } = response.data;

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        InstanceWithToken.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        setLocalStorage('@token', accessToken);
        Cookies.set('token', accessToken);

        return InstanceWithToken(originalRequest);
      } catch (error) {
        window.location.href = '/';
        console.error('failed refresh token', error);
      }
    }

    return Promise.reject(error);
  },
);
