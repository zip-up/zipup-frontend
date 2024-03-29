import { useQuery } from '@tanstack/react-query';
import { Instance } from '@api/index';
import { DetailFundingInfo } from '@typings/funding';

const useGetFundingDeatil = (fundingId: string, userId: string) => {
  return useQuery<DetailFundingInfo>({
    queryKey: ['funding', '123'],
    queryFn: async () => {
      const response = await Instance.get<DetailFundingInfo>(`/v1/fund?funding=${'4f1f4175-eb64-11ee-b96a-f220af8d4247'}&user=${userId}`,
      );

      return response.data;
    },
  });
};

export { useGetFundingDeatil };
