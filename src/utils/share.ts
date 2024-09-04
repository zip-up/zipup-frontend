import { InvitationOptions } from '@pages/funding/[id]/index.page';

interface ShareKakaoProps {
  userName: string;
  imageUrl: string;
  fundingId: string;
  invitationType: InvitationOptions;
}

export const INVITATION_MESSAGE = {
  invite: { message: '님의 집들이에 초대할게요!', messageWithBreak: '님의\n집들이에 초대할게요!' },
  congratulate: {
    message: '님을 위해 마음을 함께 모아주세요',
    messageWithBreak: '님을 위해\n마음을 함께 모아주세요',
  },
};

export const shareKakao = ({ userName, imageUrl, fundingId, invitationType }: ShareKakaoProps) => {
  if (!window.Kakao) throw new Error('카카오톡 실행에 오류가 발생했습니다.');

  const url =
    process.env.NODE_ENV === 'production'
      ? `https://zip-up.vercel.app/invite/${fundingId}?type=${invitationType}`
      : `https://localhost:3000/invite/${fundingId}?type=${invitationType}`;

  window.Kakao.Share?.sendDefault({
    objectType: 'feed',
    content: {
      title: `${userName}${INVITATION_MESSAGE[invitationType].message}`,
      description: '집업에서 선물 펀딩에 함께해주세요!',
      imageUrl,
      link: {
        mobileWebUrl: url,
        webUrl: url,
      },
    },
    installTalk: true,
    buttons: [
      {
        title: '자세히 보기',
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
    ],
  });
};
