import { Instance } from '@api/index';
import { useQuery } from '@tanstack/react-query';
import { UserWithToken } from '@typings/auth';

const useLogIn = ({ code }: { code: string }) => {
  return useQuery<UserWithToken>({
    enabled: false,
    queryKey: ['login'],
    queryFn: async () => {
      const response = await Instance.get<UserWithToken>(`/v1/auth/authentication`, {
        headers: {
          Authorization: code,
        },
      });
      return response.data;
    },
  });
};

const useLogout = ({ token }: { token: string }) => {
  return useQuery({
    enabled: false,
    queryKey: ['logout'],
    queryFn: async () => {
      const response = await Instance.get(`/v1/auth/sign-out`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
  });
};

export { useLogIn, useLogout };
