import { Instance } from '@api/index';
import { useQuery } from '@tanstack/react-query';

const useAuthentication = () => {
  return useQuery({
    queryKey: ['authentication'],
    queryFn: async () => {
      await Instance.get('/v1/auth/get-authentication').then(res => {
        const accessToken = res.headers['authorization'];
        console.log('access 토큰 :', accessToken);

        return { accessToken };
      });
    },
  });
};

export { useAuthentication };
