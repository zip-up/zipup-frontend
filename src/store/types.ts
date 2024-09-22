export interface CreateFund {
  id: string;
  title: string;
  roadAddress: string;
  detailAddress: string;
  phoneNumber: string;
  description: string;
  goalPrice: number;
  productUrl: string;
  imageUrl: string;
  fundingStart: string;
  fundingFinish: string;
  target?: 'create' | 'update';
}
