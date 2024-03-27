import { Instance } from '@api/index';
import { useMutation } from '@tanstack/react-query';

const useLogin = (email: string, password: string) => {
  return useMutation({
    mutationFn: async () => {
      const response = await Instance.post('/api/v1/user/sign-in', {
        email,
        password,
      });

      return response.data;
    },
    onError: e => {
      console.log(e);
    },
  });
};

const useSignin = (name: string, email: string, password: string) => {
  return useMutation({
    mutationFn: async () => {
      const response = await Instance.post('/api/v1/user/sign-up', {
        name,
        email,
        password,
      });

      return response.data;
    },
    onError: e => {
      console.log(e);
    },
  });
};

export { useLogin, useSignin };
