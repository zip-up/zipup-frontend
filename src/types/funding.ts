export type MessageInfo = {
  id: string;
  senderName: string;
  contributionPercent: number;
  profileImage: string;
  participantId: string;
  congratsMessage: string;
};

export type FundingInfo = {
  id: string;
  title: string;
  imageUrl: string;
  status: string;
  percent: number;
  organizer: string;
};

export type DetailFundingInfo = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  expirationDate: number;
  isCompleted: boolean;
  percent: number;
  goalPrice: number;
  presentList: MessageInfo[];
  isOrganizer: boolean;
  isParticipant: boolean;
  organizer: string;
  organizerName: string;
};
