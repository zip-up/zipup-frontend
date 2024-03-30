import { Instance } from '@api/index';
import { CreateFund } from '@store/types';
import { useMutation } from '@tanstack/react-query';

const useCreateFunding = () => {
  return useMutation({
    mutationFn: async ({ data, token }: { data: CreateFund; token: string }) => {
      const response = await Instance.post('/v1/fund', JSON.stringify(data), {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    },
    onError: e => {
      console.log(e);
    },
  });
};

export { useCreateFunding };
