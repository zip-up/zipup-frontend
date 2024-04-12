import { InstanceWithToken } from '@api/index';
import { useMutation, useQuery } from '@tanstack/react-query';
import { UserWithToken } from '@typings/auth';

const useLogIn = ({ code }: { code: string }) => {
  return useQuery<UserWithToken>({
    enabled: !!code,
    queryKey: ['login', code],
    queryFn: async () => {
      try {
        const response = await InstanceWithToken.get<UserWithToken>(`/v1/auth/authentication`, {
          headers: { Authorization: code },
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
    mutationFn: async () => {
      const response = await InstanceWithToken.post(`/v1/auth/sign-out`);

      console.log(response);

      return response.data;
    },
    onError: e => console.log(e),
  });
};

const useRefresh = async (refreshToken: string) => {
  try {
    const response = await InstanceWithToken.post(`/v1/auth/refresh`, null, {
      params: {
        'refresh-token': refreshToken,
      },
    });
    const { accessToken, refreshToken: newRefreshToken } = response.data;
    localStorage.setItem('@token', accessToken);
    localStorage.setItem('@refresh', newRefreshToken);
    InstanceWithToken.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    return accessToken;
  } catch (error) {
    console.error('Token refresh failed:', error);
    // 토큰 갱신 실패 시 홈 페이지로 리디렉션
    window.location.replace('/');
    return null;
  }
};

InstanceWithToken.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshTokenValue = localStorage.getItem('@refresh');
      if (refreshTokenValue) {
        // const token = await useRefresh(refreshTokenValue);
        // if (token) {
        //   originalRequest.headers.Authorization = `Bearer ${token}`;
        //   return axios(originalRequest);
        // }
      }
    }
    return Promise.reject(error);
  },
);

export { useLogIn, useLogout };
