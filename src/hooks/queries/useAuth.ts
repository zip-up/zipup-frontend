import { InstanceWithToken } from '@api/index';
import { getLoacalStorage, setLocalStorage } from '@store/localStorage';
import { useMutation, useQuery } from '@tanstack/react-query';
import { User, UserWithToken } from '@typings/auth';
import axios from 'axios';
import Cookies from 'js-cookie';

const useLogIn = ({ code }: { code: string }) => {
  return useQuery<UserWithToken>({
    enabled: !!code,
    queryKey: ['login', code],
    queryFn: async () => {
      try {
        const response = await axios.get<UserWithToken>(`/v1/auth/authentication`, {
          headers: { Authorization: code },
          withCredentials: true,
        });

        const { accessToken } = response.data;

        InstanceWithToken.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        setLocalStorage('@token', accessToken);
        Cookies.set('token', accessToken);

        return response.data;
      } catch (error) {
        console.error('로그인 오류:', error);
        throw error;
      }
    },
  });
};

const useUser = () => {
  const user = getLoacalStorage('@user');

  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const response = await InstanceWithToken.get<User>(`/v1/user?id=${user?.id}`);

        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    enabled: !!user?.id,
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

export { useLogIn, useUser, useLogout };
