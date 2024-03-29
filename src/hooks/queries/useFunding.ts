import { useQuery } from '@tanstack/react-query';
import { Instance } from '@api/index';
import { DetailFundingInfo } from '@typings/funding';

const useGetFundingDeatil = (fundingId: string, _userId: string) => {
  const userId = 'acaf4034-1b5e-445b-8846-0d2d0a710df1';

  return useQuery<DetailFundingInfo>({
    queryKey: ['funding', '123'],
    queryFn: async () => {
      const response = await Instance.get<DetailFundingInfo>(
        `/v1/fund?funding=${'4f1f4175-eb64-11ee-b96a-f220af8d4247'}&user=${userId}`,
      );

      return response.data;
    },
  });
};

export { useGetFundingDeatil };
