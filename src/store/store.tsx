import { atom } from 'recoil';
import { CreateFund } from './types';
import { User } from '@typings/auth';

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
    senderName: '',
    price: 0,
    msg: '',
  },
});

export const userState = atom<User>({
  key: 'user',
  default: {
    id: '',
    name: '',
    email: '',
    profileImage: '',
  },
});
