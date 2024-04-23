import { InstanceWithToken } from '@api/index';
import { CreateFund } from '@store/types';
import { useMutation } from '@tanstack/react-query';

const useCreateFunding = (
  successCallback: ({ id, imageUrl }: { id: string; imageUrl: string }) => void,
) => {
  return useMutation({
    mutationFn: async ({ data }: { data: CreateFund }) => {
      const response = await InstanceWithToken.post('/v1/fund', data);

      return response.data;
    },
    onSuccess: createdFundingData => successCallback(createdFundingData),
    onError: error => {
      console.log(error);
      throw error;
    },
  });
};

export { useCreateFunding };
