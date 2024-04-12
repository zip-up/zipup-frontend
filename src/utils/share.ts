const registerKakao = () => {
  if (window.Kakao) {
    const kakao = window.Kakao;

    if (!kakao.isInitialized()) {
      kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
    }

    return kakao;
  }

  return null;
};

interface ShareKakaoProps {
  username: string;
  imageUrl: string;
  fundId: string;
}

export const shareKakao = ({ username, imageUrl, fundId }: ShareKakaoProps) => {
  const kakao = registerKakao();
  if (!kakao) throw new Error('카카오톡을 열 수 없습니다.');

  const url = `https://zip-up.vercel.app/funding/${fundId}`;

  kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: `${username}님의 집들이에 당신을 초대합니다.`,
      description: '집업에서 선물 펀딩에 함께해주세요!',
      imageUrl: imageUrl,
      link: {
        mobileWebUrl: url,
      },
    },
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
