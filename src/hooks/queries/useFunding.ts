import { useMutation, useQuery } from '@tanstack/react-query';
import { DetailFundingInfo } from '@typings/funding';
import { useRouter } from 'next/router';
import axios from 'axios';
import { getLoacalStorage } from '@store/localStorage';
import { Instance } from '@api/index';

const useGetFundingDeatil = (fundingId: string) => {
  const token = getLoacalStorage('@token');

  return useQuery<DetailFundingInfo>({
    queryKey: ['funding', fundingId],
    queryFn: async () => {
      if (token) {
        const response = await Instance.get<DetailFundingInfo>(`/v1/fund?funding=${fundingId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      }

      const response = await axios.get<DetailFundingInfo>(
        `http://110.165.18.128:9090/api/v1/fund?funding=${fundingId}`,
      );

      return response.data;
    },
    enabled: !!fundingId,
  });
};

const useParticipateFunding = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (participateInfo: any) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/v1/present`,
        participateInfo,
        { headers: { Authorization: `Bearer ${getLoacalStorage('@token')}` } },
      );
    },

    onError: error => {
      console.log('참여자 정보 저장', error);

      const { id } = router.query;

      router.push(`/funding/${id}/payment/fail?code=${error?.code}&message=${error.message}`);
    },
  });
};

export { useGetFundingDeatil, useParticipateFunding };
