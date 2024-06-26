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
  percent: number;
  organizer: string;
  dday: number;
}

export interface ProductInfo {
  id: string;
  title: string;
  imageUrl: string;
  url: string;
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

export interface PaymentInfo {
  id: string;
  fundingName: string;
  fundingImage: string;
  paymentDate: string;
  amount: number;
  paymentNumber: string;
  status: string;
  refundable: boolean;
  isVirtualAccount: boolean;
  isDepositCompleted: boolean;
  virtualAccount?: {
    accountNumber: string;
    bankCode: string;
  };
}

export interface CancelInfoForm {
  id: string;
  cancelReason: string;
  amount?: number;
  refundReceiveAccount?: {
    bank: string;
    accountNumber: string;
    holderName: string;
  };
}
export interface DeleteInfoForm {
  fundingId: string;
  cancelReason: string;
}

export type FundingStatus = 'IN_PROGRESS' | 'EXPIRED' | 'COMPLETED';
