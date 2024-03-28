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
import { useSetRecoilState } from 'recoil';
import { tokenState } from '@store/store';
import { useRouter } from 'next/router';
import { useAuth } from '@hooks/queries/useAuth';
import { Auth } from '@typings/auth';

export default function Home() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const setToken = useSetRecoilState(tokenState);
  const [code, setCode] = useState('');
  const [user, setUser] = useState<Auth>();
  const { data, refetch, isLoading, error } = useAuth({ code });

  if (!isLoading) {
    console.log(error);
    console.log(data);
  }

  useEffect(() => {
    setCode(router.asPath.slice(2));
    console.log(code);
  }, [router.asPath]);

  useEffect(() => {
    if (code) {
      refetch();
    }

    if (data) {
      setUser(data);
    }
  }, [code, data]);

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
        <HeaderWithLogo />
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
          {isLoading ? (
            <div>로딩중</div>
          ) : (
            <Button color="primary" onClick={() => setIsOpen(true)}>
              내 펀딩을 만들어볼까요?
            </Button>
          )}
          <Button color="secondary" onClick={() => null}>
            서비스 둘러볼게요
          </Button>
        </div>
      </main>
    </>
  );
}
