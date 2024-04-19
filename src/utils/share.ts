interface ShareKakaoProps {
  username: string;
  imageUrl: string;
  fundId: number;
}

export const shareKakao = ({ username, imageUrl, fundId }: ShareKakaoProps) => {
  if (!window.Kakao) throw new Error('카카오톡 실행에 오류가 발생했습니다.');

  const url = `https://zip-up.vercel.app/funding/${fundId}`;

  window.Kakao.Share?.sendDefault({
    objectType: 'feed',
    content: {
      title: `${username}님의 집들이에 당신을 초대합니다.`,
      description: '집업에서 선물 펀딩에 함께해주세요!',
      imageUrl,
      link: {
        mobileWebUrl: url,
      },
    },
    installTalk: true,
    buttons: [
      {
        title: '자세히 보기',
        link: {
          mobileWebUrl: url,
        },
      },
    ],
  });
};
