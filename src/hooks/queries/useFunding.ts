import { useQuery } from '@tanstack/react-query';
import { Instance } from '@api/index';
import { DetailFundingInfo } from '@typings/funding';

const useGetFundingDeatil = (fundingId: string, userId: string) => {
  return useQuery<DetailFundingInfo>({
    queryKey: ['funding', fundingId],
    queryFn: async () => {
      const response = await Instance.get<DetailFundingInfo>(
        `/v1/fund?funding=${fundingId}&user=${userId}`,
      );

      return response.data;
    },
  });
};

export { useGetFundingDeatil };
