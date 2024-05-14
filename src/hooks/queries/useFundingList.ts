import { InstanceWithToken } from '@api/index';
import { useQuery } from '@tanstack/react-query';
import { FundingInfo } from '@typings/funding';

interface FundListProps {
  types: string;
}

const useFundingList = ({ types }: FundListProps) => {
  return useQuery<FundingInfo[]>({
    refetchOnWindowFocus: false,
    queryKey: [types],
    queryFn: async () => {
      try {
        const response = await InstanceWithToken.get(
          types === 'my' ? `/v1/fund/list` : `/v1/present/list`,
        );

        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

export { useFundingList };
