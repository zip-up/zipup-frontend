import { InstanceWithToken } from '@api/index';
import { CreateFund } from '@store/types';
import { useMutation } from '@tanstack/react-query';

const useCreateFunding = () => {
  return useMutation({
    mutationFn: async ({ data }: { data: CreateFund }) => {
      const response = await InstanceWithToken.post('/v1/fund', data);

      return response.data;
    },
    onError: e => {
      console.log(e);
    },
  });
};

export { useCreateFunding };
