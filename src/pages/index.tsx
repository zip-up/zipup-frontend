/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head';
import Button from '@components/common/Button';
import * as style from './style';
import { useEffect, useState } from 'react';
import ModalWithIcon from '@components/modals/ModalWithIcon';
import LoginIcon from '@assets/icons/login-icon.svg';
import LoginButtonIcon from '@assets/images/login-button.svg';
import HomeImage from '@assets/images/home-image.svg';
import HeaderWithLogo from '@components/HeaderWithLogo';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { tokenState, userState } from '@store/store';
import { useRouter } from 'next/router';
import { useLogIn } from '@hooks/queries/useAuth';
import PageLayout from '@components/Layout/pageLayout';
import { css } from '@styled-system/css';
import CreateImage from '@assets/images/funding_create_image.svg';
import DeliveryImage from '@assets/images/funding_delivery_image.svg';
import ParticipateImage from '@assets/images/funding_participate_image.svg';
import TargetImage from '@assets/images/funding_target_image.svg';
import classNames from 'classnames';

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
    title: '목표 금액 달설',
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
  const [token, setToken] = useRecoilState(tokenState);
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState('');
  const [isBrowsingService, setIsBrowsingService] = useState(false);
  const { data, refetch, isLoading } = useLogIn({ code });

  console.log(token);

  useEffect(() => {
    console.log(router.asPath);
    if (router.asPath.slice(2) && !isLoading) {
      console.log(isLoading);
      setCode(router.asPath.slice(2));
      refetch();
    }
  }, [router, isLoading]);

  useEffect(() => {
    if (data && !isLoading) {
      const { accesstoken, ...rest } = data;
      setUser(rest);
      setToken(accesstoken);
      localStorage.setItem('@token', accesstoken);
      localStorage.setItem('@user', JSON.stringify(rest));
      router.push('/');
    }
  }, [isLoading]);

  const getToken = async () => {
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
      {isOpen && (
        <ModalWithIcon
          title="로그인이 필요한 서비스입니다."
          subtitle="카카오 로그인으로 5초만에 시작해요!"
          onClose={() => setIsOpen(false)}
          icon={<LoginIcon />}
          buttonComponent={
            <button className={style.button} onClick={getToken}>
              <LoginButtonIcon />
            </button>
          }
        />
      )}
      <main>
        <HeaderWithLogo onOpenLogin={() => setIsOpen(true)} />
        <div className={style.text_box}>
          <p className={style.title}>
            조금씩 마음을 보태어 <span className={style.highlight}>집들이 선물</span>을 보내요
          </p>
          <span className={style.subtitle}>
            더나은 집들이 경험을 위한
            <br />
            집들이 선물 펀딩 서비스
          </span>
        </div>

        <div className={style.wrapper}>
          <div className={style.image}>
            <HomeImage />
          </div>
          {!isBrowsingService && (
            <>
              <Button
                color={isLoading ? 'disabled' : 'primary'}
                disabled={isLoading}
                onClick={() => (token ? router.push('/funding/create/1') : setIsOpen(true))}
              >
                {isLoading ? '로그인 중...' : '내 펀딩을 만들어볼까요?'}
              </Button>
              <Button color="secondary" onClick={() => setIsBrowsingService(true)}>
                서비스 둘러볼게요
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
                      <p className={classNames(style.text_desc, css({ marginTop: '-0.3rem' }))}>
                        {item.desc2}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className={style.login_box}>
                <span className={style.login_text}>
                  {token
                    ? '내 펀딩을 만들어볼까요?'
                    : '카카오로 5초만에 로그인하고\n바로 시작해볼까요?'}
                </span>
                <Button
                  type="button"
                  color="secondary"
                  className={style.login_button}
                  onClick={() => (token ? router.push('/funding/create/1') : setIsOpen(true))}
                >
                  {token ? '내 펀딩 만들러 가기' : '지금 시작하기'}
                </Button>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
}
