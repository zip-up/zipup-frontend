import { useQuery } from '@tanstack/react-query';
import { Instance } from '@api/index';

interface PresentList {
  id: string;
  senderName: string;
  contributionPercent: number;
  profileImage: string;
  participantId: string;
  congratsMessage: string;
}

interface ResponseType {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  expirationDate: number;
  isCompleted: boolean;
  percent: number;
  goalPrice: number;
  presentList: PresentList[];
  isOrganizer: boolean;
  organizer: string;
}

const useGetFundingDeatil = (fundingId?: string, userId?: string) => {
  // temp data
  const _fundingId = '4f1f3c33-eb64-11ee-b96a-f220af8d4247';
  const _userId = '4f0ff1d8-eb64-11ee-b96a-f220af8d4247';

  return useQuery<ResponseType>({
    queryKey: ['funding', '123'],
    queryFn: async () => {
      const response = await Instance.get<ResponseType>(
        `/v1/fund?funding=${_fundingId}&user=${_userId}`,
      );

      return response.data;
    },
  });
};

export { useGetFundingDeatil };
