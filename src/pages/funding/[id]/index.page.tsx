/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import Header from '@components/common/Header';
import * as style from './styles';
import Button from '@components/common/Button';
import MessageList from '@components/MessageList';
import DefaultPresentImg from '@assets/images/default_present.svg';
import { useGetFundingDeatil } from '@hooks/queries/useFunding';
import FundingStatusBox from '@components/FundingStatusBox';
import { useState } from 'react';
import LoginModal from '@components/modals/LoginModal';
import { useRecoilValue } from 'recoil';
import { userState } from '@store/store';
import { getLoacalStorage } from '@store/localStorage';

export default function Funding() {
  const router = useRouter();

  const { id: fundingId } = router.query;
  const user = useRecoilValue(userState);

  const { data: fundingInfo } = useGetFundingDeatil(String(fundingId));
  const [isModalOn, setIsModalOn] = useState(false);

  if (!fundingInfo) return null;

  const {
    title,
    imageUrl,
    expirationDate,
    percent,
    goalPrice,
    description,
    isOrganizer,
    isParticipant,
    presentList: messageList,
  } = fundingInfo;

  const handleKakaoShare = () => {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `${user.name}님의 집들이에 당신을 초대합니다.`,
        description: '집업에서 선물 펀딩에 함께해주세요!',
        imageUrl: fundingInfo.imageUrl,
        link: {
          mobileWebUrl: `https://zip-up.vercel.app/funding/${fundingId}`,
          webUrl: `https://zip-up.vercel.app/funding/${fundingId}`,
        },
      },
      buttons: [
        {
          title: '자세히 보기',
          link: {
            mobileWebUrl: `https://zip-up.vercel.app/funding/${fundingId}`,
            webUrl: `https://zip-up.vercel.app/funding/${fundingId}`,
          },
        },
      ],
    });
  };

  const RoleBasedButton = () => {
    if (isOrganizer) {
      return (
        <Button type="button" color="secondary" wFull onClick={handleKakaoShare}>
          친구에게 공유하기
        </Button>
      );
    }
    if (isParticipant) {
      return (
        <Button type="button" color="secondary" wFull onClick={() => {}}>
          결제 취소하기
        </Button>
      );
    }
    return (
      <Button
        type="button"
        color="secondary"
        wFull
        onClick={() => {
          if (getLoacalStorage('@user')) return router.push(`/funding/${fundingId}/participate`);

          setIsModalOn(true);
        }}
      >
        이 펀딩 참여하기
      </Button>
    );
  };

  const handleLogin = async () => {
    window.location.href =
      process.env.NEXT_PUBLIC_BASE_URL.slice(0, -4) + '/oauth2/authorization/kakao';
  };

  return (
    <div className={style.pageLayout}>
      <Header />
      {!imageUrl ? (
        <DefaultPresentImg />
      ) : (
        <div className={style.imageWrapper}>
          <img src={imageUrl} alt="상품 이미지" />
        </div>
      )}
      <article className={style.wrapper}>
        <h2 className={style.title}>{title}</h2>

        <FundingStatusBox info={{ percent, expirationDate, goalPrice }} />

        <RoleBasedButton />

        <div className={style.desc}>{description}</div>
      </article>
      <MessageList messages={messageList} />

      {isModalOn && (
        <LoginModal onClick={() => handleLogin()} onClose={() => setIsModalOn(false)} />
      )}
    </div>
  );
}
