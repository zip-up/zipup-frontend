export interface MessageInfo {
  id: string;
  senderName: string;
  contributionPercent: number;
  profileImage: string;
  participantId: string;
  congratsMessage: string;
}

export interface FundingInfo {
  id: string;
  title: string;
  imageUrl: string;
  status: string;
  percent: number;
  organizer: string;
  fundId?: string;
}

export interface ProductInfo {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
}

export interface DetailFundingInfo {
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
}

export interface ParticipantInfo {
  participateId: string;
  senderName: string;
  congratsMessage: string;
}

export interface ParticipateInfo extends ParticipantInfo {
  fundingId: string;
  paymentId: string;
}
