/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head';
import Button from '@components/common/Button';
import * as style from './style';
import { useEffect, useState } from 'react';
import HeaderWithLogo from '@components/HeaderWithLogo';
import { useSetRecoilState } from 'recoil';
import { userState } from '@store/store';
import { useRouter } from 'next/router';
import { useLogIn } from '@hooks/queries/useAuth';
import { css, cx } from 'styled-system/css';
import CreateImage from '@assets/images/funding_create_image.svg';
import DeliveryImage from '@assets/images/funding_delivery_image.svg';
import ParticipateImage from '@assets/images/funding_participate_image.svg';
import TargetImage from '@assets/images/funding_target_image.svg';

import LoginModal from '@components/modals/LoginModal';
import Spinner from '@components/common/Spinner';
import Header from '@components/common/Header';
import { getLoacalStorage, setLocalStorage } from '@store/localStorage';

const descData = [
  {
    title: '펀딩 개설 후 공유',
    desc1: '원하는 선물을 등록하고 링크를 공유해요',
    desc2: '마음을 모으는 건 집업이 할게요',
    icon: <CreateImage />,
  },
  {
    title: '선물 펀딩 참여',
    desc1: '예산이 부족해도 괜찮아요',
    desc2: '축하하는 마음에 집중할 수 있어요',
    icon: <ParticipateImage />,
  },
  {
    title: '목표 금액 달성',
    desc1: '친구들에게 축하 메세지를 받아요',
    desc2: '따뜻한 집들이를 준비해요',
    icon: <TargetImage />,
  },
  {
    title: '선물 배송',
    desc1: '내가 정말 원하던 선물!',
    desc2: '집 앞에서 바로 만나요',
    icon: <DeliveryImage />,
  },
];

export default function Home() {
  const router = useRouter();
  const setUser = useSetRecoilState(userState);
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState('');
  const [isBrowsingService, setIsBrowsingService] = useState(false);
  const { data, isLoading } = useLogIn({ code });

  useEffect(() => {
    if (router.isReady && router.asPath.length > 2) {
      setCode(router.asPath.slice(2));
    }
  }, [router.isReady, router.query, code]);

  useEffect(() => {
    if (data) {
      console.log(data);
      const { accessToken, ...rest } = data;
      setUser(rest);
      setLocalStorage('@token', accessToken);
      setLocalStorage('@user', JSON.stringify(rest));
      router.push('/');
    }
  }, [data]);

  const handleLogin = async () => {
    window.location.href =
      process.env.NEXT_PUBLIC_BASE_URL.slice(0, -4) + '/oauth2/authorization/kakao';
  };

  return (
    <>
      <Head>
        <title>ZIPup | 집들이 선물 펀딩 서비스</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
          {`
            :root {
              --font-pretendard-bold: 'Pretendard-Bold', sans-serif;
              --font-pretendard-semibold: 'Pretendard-SemiBold', sans-serif;
              --font-pretendard-regular: 'Pretendard-Regular', sans-serif;
            }
          `}
        </style>
      </Head>
      {isOpen && <LoginModal onClose={() => setIsOpen(false)} onClick={handleLogin} />}

      {isBrowsingService ? (
        <Header onGoBack={() => setIsBrowsingService(false)} />
      ) : (
        <HeaderWithLogo onOpen={() => setIsOpen(true)} />
      )}
      <div className={cx(style.text_box, css({ mt: isBrowsingService ? '-3rem' : '3rem' }))}>
        {isBrowsingService ? (
          <p className={cx(style.title, css({ textAlign: 'center' }))}>
            <span>
              더 멋진 <span className={style.highlight}>집들이 경험</span>을 위한
            </span>
            <p>집들이 선물 펀딩 서비스</p>
          </p>
        ) : (
          <p className={cx(style.title, css({ width: '23.3rem' }))}>
            조금씩 마음을 보태어 <span className={style.highlight}>집들이 선물</span>을 보내요
          </p>
        )}
        {isBrowsingService ? (
          <span className={style.subtitle}>
            주는 사람은 부담 없이,
            <br />
            받는 사람은 높은 만족도로
            <br />
            모두에게 즐거운 선물 경험을 제공해요
          </span>
        ) : (
          <span className={style.subtitle}>
            더나은 집들이 경험을 위한
            <br />
            집들이 선물 펀딩 서비스
          </span>
        )}
      </div>

      <div className={style.wrapper}>
        <div className={style.image}>
          <img src="/home.png" alt="home" width={245} height={236} />
        </div>
        {!isBrowsingService && (
          <>
            <Button
              color={isLoading ? 'disabled' : 'primary'}
              disabled={isLoading}
              onClick={() =>
                getLoacalStorage('@token') ? router.push('/funding/create/1') : setIsOpen(true)
              }
              isBottomFixed
              className={css({ bottom: '90px' })}
            >
              {isLoading ? <Spinner size="sm" /> : '내 펀딩을 만들어볼까요?'}
            </Button>
            <Button color="secondary" onClick={() => setIsBrowsingService(true)} isBottomFixed>
              서비스를 둘러볼게요
            </Button>
          </>
        )}
      </div>
      {isBrowsingService && (
        <>
          <div className={style.service_box}>
            <div className={style.service_title_box}>
              <span className={style.service_title}>집들이 선물, 어떻게 받을 수 있나요?</span>
            </div>
            <div className={style.service_desc_box}>
              {descData.map(item => (
                <div key={item.title} className={style.service_desc_card}>
                  <div
                    style={{
                      height: '5.6rem',
                      width: '5.6rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </div>
                  <div className={style.service_text_box}>
                    <p className={style.text_title}>{item.title}</p>
                    <p className={style.text_desc}>{item.desc1}</p>
                    <p className={cx(style.text_desc, css({ marginTop: '-0.3rem' }))}>
                      {item.desc2}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className={style.login_box}>
              <span className={style.login_text}>
                {getLoacalStorage('@token')
                  ? '내가 원하는 선물을\n지금 바로 등록해보세요'
                  : '카카오로 5초만에 로그인하고\n바로 시작해볼까요?'}
              </span>
              <Button
                type="button"
                color="secondary"
                className={style.login_button}
                onClick={() =>
                  getLoacalStorage('@token') ? router.push('/funding/create/1') : setIsOpen(true)
                }
              >
                {getLoacalStorage('@token') ? '내 펀딩 만들러 가기' : '지금 시작하기'}
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
