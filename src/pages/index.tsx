import Head from 'next/head';
import Button from '@components/common/Button';
import Image from 'next/image';
import * as style from './style';
import { useState } from 'react';
import ModalWithIcon from '@components/modals/ModalWithIcon';
import LoginIcon from '@assets/login-icon.svg';
import LoginButtonIcon from '@assets/login-button.svg';
import HeaderWithLogo from '@components/HeaderWithLogo';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogin = () => {
    window.location.href = process.env.NEXT_PUBLIC_BASE_URL + '/oauth2/authorization/kakao';
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
            <button className={style.button} onClick={handleLogin}>
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
            <Image src={''} alt="" />
          </div>
          <Button color="primary" onClick={() => setIsOpen(true)}>
            내 펀딩을 만들어볼까요?
          </Button>
          <Button color="secondary" onClick={() => null}>
            서비스 둘러볼게요
          </Button>
        </div>
      </main>
    </>
  );
}
