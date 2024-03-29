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

export default function Home() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useRecoilState(tokenState);
  const [code, setCode] = useState('');
  const setUser = useSetRecoilState(userState);
  const { data, refetch, isLoading } = useLogIn({ code });

  useEffect(() => {
    if (router.asPath.slice(2)) {
      setCode(router.asPath.slice(2));
      refetch();
    }
  }, [router]);

  useEffect(() => {
    if (data && !isLoading) {
      setUser({
        id: data.id,
        name: data.name,
        email: data.email,
        profileImage: data.profileImage,
      });
      setToken(data.accesstoken);
      localStorage.setItem('@token', data.accesstoken);
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
          <Button
            color={isLoading ? 'disabled' : 'primary'}
            disabled={isLoading}
            onClick={() => (token ? router.push('/funding/create/1') : setIsOpen(true))}
          >
            {isLoading ? '로그인 중...' : '내 펀딩을 만들어볼까요?'}
          </Button>
          <Button color="secondary" onClick={() => null}>
            서비스 둘러볼게요
          </Button>
        </div>
      </main>
    </>
  );
}
