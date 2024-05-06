import { useRouter } from 'next/router';
import { InstanceWithToken } from '@api/index';
import { getLoacalStorage } from '@store/localStorage';
import { CreateFund } from '@store/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { DetailFundingInfo, ParticipantInfo } from '@typings/funding';
import axios, { isAxiosError } from 'axios';

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
      console.error(error);
      throw error;
    },
  });
};

const useGetFundingDetail = (fundingId: string) => {
  const token = getLoacalStorage('@token');

  return useQuery<DetailFundingInfo>({
    queryKey: ['funding', fundingId],
    queryFn: async () => {
      if (token) {
        const response = await InstanceWithToken.get<DetailFundingInfo>(
          `/v1/fund?funding=${fundingId}`,
        );

        return response.data;
      }

      const response = await axios.get<DetailFundingInfo>(`/v1/fund?funding=${fundingId}`);

      return response.data;
    },
    enabled: !!fundingId,
  });
};

const useParticipateFunding = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (participateInfo: ParticipantInfo) => {
      await InstanceWithToken.post(`/v1/present`, participateInfo);
    },

    onError: error => {
      console.error('참여자 정보 저장', error);

      if (isAxiosError(error)) {
        const { id } = router.query;

        router.push(`/funding/${id}/payment/fail?code=${error?.code}&message=${error.message}`);
      }
    },
  });
};

export { useCreateFunding, useGetFundingDetail, useParticipateFunding };
