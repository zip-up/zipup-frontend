type QuestionsAndAnswers = {
  question: string;
  answer: string;
};

export type FaqQuestionsType = {
  이용문의: QuestionsAndAnswers[];
  배송: QuestionsAndAnswers[];
  '취소/환불': QuestionsAndAnswers[];
  회원: QuestionsAndAnswers[];
};

export const FaqQuestions: FaqQuestionsType = {
  이용문의: [
    {
      question: '펀딩 등록 방법이 궁금해요.',
      answer: '',
    },
    {
      question: '펀딩 참여 방법이 궁금해요.',
      answer: '',
    },
    {
      question: '펀딩 수정/삭제는 어떻게 하나요?',
      answer: '',
    },
    {
      question: '펀딩 참여 시 어떤 결제 수단을 사용할 수 있나요?',
      answer: '',
    },
    {
      question: '펀딩을 만들었어요. 어떻게 공유하나요?',
      answer: '',
    },
    {
      question: '펀딩 기간이 만료되었어요.',
      answer: '',
    },
  ],
  배송: [
    {
      question: '배송은 언제 시작하나요?',
      answer: '',
    },
    {
      question: '배송지 입력을 깜빡했어요.',
      answer: '',
    },
    {
      question: '배송지를 변경하고 싶어요.',
      answer: '',
    },
    {
      question: '배송 완료된 상품을 환불받고 싶어요.',
      answer: '',
    },
  ],
  '취소/환불': [
    {
      question: '펀딩 참여자입니다.\n참여한 펀딩 내역을 취소 및 환불 받고 싶어요.',
      answer: '',
    },
    {
      question: '펀딩 주최자입니다.\n내가 만든 펀딩을 취소 및 환불 받고 싶어요.',
      answer: '',
    },
    {
      question: '배송 완료된 상품을 환불받고 싶어요.',
      answer: '',
    },
  ],
  회원: [
    {
      question: '회원가입은 어떻게 하나요?',
      answer: '',
    },
    {
      question: '집업에서 탈퇴하고 싶어요.',
      answer: '',
    },
  ],
} as const;
