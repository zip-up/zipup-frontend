import { Instance } from '@api/index';
import { useQuery } from '@tanstack/react-query';
import { Auth } from '@typings/auth';

const useAuth = ({ code }: { code: string }) => {
  return useQuery<Auth>({
    enabled: false,
    queryKey: ['auth'],
    queryFn: async () => {
      const response = await Instance.get<Auth>(`/v1/auth/get-authentication`, {
        headers: {
          Authorization: code,
        },
      });

      return response.data;
    },
  });
};

export { useAuth };
