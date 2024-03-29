import { Instance } from '@api/index';
import { useQuery } from '@tanstack/react-query';
import { UserWithToken } from '@typings/auth';

const useAuth = ({ code }: { code: string }) => {
  return useQuery<UserWithToken>({
    enabled: false,
    queryKey: ['auth'],
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

export { useAuth };
