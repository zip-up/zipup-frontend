import { Instance } from '@api/index';
import { useQuery } from '@tanstack/react-query';
import { FundingInfo } from '@typings/funding';

interface FundListProps {
  uuid: string;
  token: string;
}

const useGetMyFundingList = ({ uuid, token }: FundListProps) => {
  return useQuery<FundingInfo[]>({
    enabled: false,
    queryKey: ['get-my-funding-list', uuid],
    queryFn: async () => {
      const response = await Instance.get(`/v1/fund/list`, {
        params: {
          user: uuid,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
  });
};

const useGetParticipatedList = ({ uuid, token }: FundListProps) => {
  return useQuery<FundingInfo[]>({
    enabled: false,
    queryKey: ['get-participated-funding-list', uuid],
    queryFn: async () => {
      const response = await Instance.get(`/v1/present/list`, {
        params: {
          user: uuid,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
  });
};

export { useGetMyFundingList, useGetParticipatedList };
