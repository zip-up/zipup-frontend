import { useMutation, useQuery } from '@tanstack/react-query';
import { DetailFundingInfo } from '@typings/funding';
import { useRouter } from 'next/router';
import axios from 'axios';
import { getLoacalStorage } from '@store/localStorage';

const useGetFundingDeatil = (fundingId: string) => {
  return useQuery<DetailFundingInfo>({
    queryKey: ['funding', fundingId],
    queryFn: async () => {
      const response = await axios.get<DetailFundingInfo>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/v1/fund?funding=${fundingId}`,
      );

      return response.data;
    },
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
