import { useRouter } from 'next/navigation';
import { InstanceWithToken } from '@api/index';
import { getLoacalStorage, setLocalStorage } from '@store/localStorage';
import { useMutation, useQuery } from '@tanstack/react-query';
import { User, UserWithToken } from '@typings/auth';
import axios from 'axios';
import Cookies from 'js-cookie';

const useLogIn = ({ code }: { code: string }) => {
  const router = useRouter();

  return useQuery<UserWithToken>({
    enabled: !!code,
    queryKey: ['login', code],
    queryFn: async () => {
      const response = await axios.get<UserWithToken>(`/v1/auth/authentication`, {
        headers: { Authorization: `Bearer ${code}` },
        withCredentials: true,
      });

      const { accessToken, ...userData } = response.data;

      InstanceWithToken.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      setLocalStorage('@token', accessToken);
      setLocalStorage('@user', userData);

      Cookies.set('token', accessToken);

      if (response.data) {
        router.push('/');
      }

      return response.data;
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
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const response = await InstanceWithToken.post(`/v1/auth/sign-out`);

      return response.data;
    },
    onSuccess: () => {
      localStorage.clear();
      Cookies.remove('token');

      router.push('/');
    },
  });
};

const useWithdrawal = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ withdrawalReason }: { withdrawalReason: string }) => {
      const response = await InstanceWithToken.put('/v1/user/withdrawal', {
        withdrawalReason,
      });

      return response.data;
    },
    onSuccess: () => router.push('/mypage/withdrawal/success'),
    onError: error => {
      console.error(error);
      router.push('/mypage/withdrawal/fail');
    },
  });
};

export { useLogIn, useUser, useLogout, useWithdrawal };
