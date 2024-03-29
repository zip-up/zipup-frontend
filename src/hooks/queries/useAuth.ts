import { Instance } from '@api/index';
import { useMutation, useQuery } from '@tanstack/react-query';
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

export { useLogIn, useLogout };
