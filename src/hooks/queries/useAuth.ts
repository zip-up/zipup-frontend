import { Instance } from '@api/index';
import { useMutation, useQuery } from '@tanstack/react-query';
import { UserWithToken } from '@typings/auth';
import axios from 'axios';

const useLogIn = ({ code }: { code: string }) => {
  return useQuery<UserWithToken>({
    enabled: !!code,
    queryKey: ['login', code],
    queryFn: async () => {
      try {
        const response = await Instance.get<UserWithToken>(`/v1/auth/authentication`, {
          headers: {
            Authorization: code,
          },
        });
        return response.data;
      } catch (error) {
        console.error('로그인 오류:', error);
        throw error;
      }
    },
  });
};

const useLogout = () => {
  return useMutation({
    mutationFn: async ({ token }: { token: string }) => {
      const response = await Instance.post(`/v1/auth/sign-out`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);

      return response.data;
    },
    onError: e => console.log(e),
  });
};

const useRefresh = async (refreshToken: string) => {
  try {
    const response = await Instance.post(`/v1/auth/refresh`, null, {
      params: {
        'refresh-token': refreshToken,
      },
    });
    const { token, refreshToken: newRefreshToken } = response.data;
    localStorage.setItem('@token', token);
    localStorage.setItem('@refresh', newRefreshToken);
    Instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    return token;
  } catch (error) {
    console.error('Token refresh failed:', error);
    // 토큰 갱신 실패 시 로그인 페이지로 리디렉션
    window.location.replace('/sign-in');
    return null;
  }
};

Instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshTokenValue = localStorage.getItem('@refresh');
      if (refreshTokenValue) {
        const newToken = await useRefresh(refreshTokenValue);
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axios(originalRequest);
        }
      }
    }
    return Promise.reject(error);
  },
);

export { useLogIn, useLogout };
