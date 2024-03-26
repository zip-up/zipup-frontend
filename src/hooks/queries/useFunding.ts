import { useQuery } from '@tanstack/react-query';
import { Instance } from '@api/index';

type TempResponseType = Array<{
  id: string;
  title: string;
  imageUrl: string;
  status: string;
  percent: number;
  organizer: string;
}>;

const useGetFundingDeatil = () => {
  return useQuery<TempResponseType>({
    queryKey: ['funding', '123'],
    queryFn: async () => {
      const response = await Instance.get<TempResponseType>('/v1/fund/temp');

      return response.data;
    },
  });
};

export { useGetFundingDeatil };
