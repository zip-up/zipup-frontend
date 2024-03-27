import { useQuery } from '@tanstack/react-query';
import { Instance } from '@api/index';
import { DetailFundingInfo } from '@typings/funding';

const useGetFundingDeatil = (fundingId?: string, userId?: string) => {
  // temp data
  const _fundingId = '4f1f3c33-eb64-11ee-b96a-f220af8d4247';
  const _userId = '4f0ff1d8-eb64-11ee-b96a-f220af8d4247';

  return useQuery<DetailFundingInfo>({
    queryKey: ['funding', '123'],
    queryFn: async () => {
      const response = await Instance.get<DetailFundingInfo>(
        `/v1/fund?funding=${_fundingId}&user=${_userId}`,
      );

      return response.data;
    },
  });
};

export { useGetFundingDeatil };
