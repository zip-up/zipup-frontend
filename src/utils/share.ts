import { InvitationOptions } from '@pages/funding/[id]/index.page';

interface ShareKakaoProps {
  userName: string;
  imageUrl: string;
  fundingId: string;
  invitationType: InvitationOptions;
}

const INVITATION_MESSAGE = {
  invite: '님의 집들이에 초대할게요!',
  congratulate: '님을 위해 마음을 함께 모아주세요',
};

export const shareKakao = ({ userName, imageUrl, fundingId, invitationType }: ShareKakaoProps) => {
  if (!window.Kakao) throw new Error('카카오톡 실행에 오류가 발생했습니다.');

  const url =
    process.env.NODE_ENV === 'production'
      ? `https://zip-up.vercel.app/invite/${fundingId}`
      : `https://localhost:3000/invite/${fundingId}`;

  window.Kakao.Share?.sendDefault({
    objectType: 'feed',
    content: {
      title: `${userName}${INVITATION_MESSAGE[invitationType]}`,
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
