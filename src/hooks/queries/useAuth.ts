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

 export { useLogIn, useLogout };
