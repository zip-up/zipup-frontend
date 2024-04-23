import { atom } from 'recoil';
import { CreateFund } from './types';

export const createFundState = atom<CreateFund>({
  key: 'createFund',
  default: {
    title: '',
    roadAddress: '',
    detailAddress: '',
    phoneNumber: '',
    description: '',
    goalPrice: 0,
    productUrl: '',
    imageUrl: '',
    fundingStart: '',
    fundingFinish: '',
  },
});

export const fundingFormState = atom({
  key: 'fundingParticipateForm',
  default: {
    participateId: '',
    price: 0,
  },
});