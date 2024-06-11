import { useRouter } from 'next/navigation';
import { InstanceWithToken } from '@api/index';
import { getLoacalStorage, setLocalStorage } from '@store/localStorage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { User, UserWithToken } from '@typings/auth';
import axios, { isAxiosError } from 'axios';
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
  const token = getLoacalStorage('@token');

  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await InstanceWithToken.get<User>('/v1/user');

      return response.data;
    },
    enabled: !!token,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await InstanceWithToken.post(`/v1/auth/sign-out`);

      return response.data;
    },
    onSuccess: () => {
      localStorage.clear();
      Cookies.remove('token');
      queryClient.removeQueries({ queryKey: ['user'] });

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
    onSuccess: () => {
      localStorage.clear();
      Cookies.remove('token');

      router.push('/mypage/withdrawal/success');
    },
    onError: error => {
      if (isAxiosError(error)) {
        if (error.response?.data.code === 3004) router.push('/mypage/withdrawal/fail');
      }
    },
  });
};

export { useLogIn, useUser, useLogout, useWithdrawal };
