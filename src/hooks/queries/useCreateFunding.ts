import { Instance } from '@api/index';
import { CreateFund } from '@store/types';
import { useMutation } from '@tanstack/react-query';

const useCreateFunding = () => {
  return useMutation({
    mutationFn: async (data: CreateFund) => {
      const response = await Instance.post('/v1/fund', {
        ...data,
      });

      return response.data;
    },
    onError: e => {
      console.log(e);
    },
  });
};

export { useCreateFunding };
