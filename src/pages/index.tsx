import Head from 'next/head';
import Logo from '@assets/images/logo.svg';
import Button from '@components/common/Button';
import Image from 'next/image';
import * as style from './style';
import { useState } from 'react';
import LoginModal from '@components/modals/LoginModal/index';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

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
      {isOpen && <LoginModal onClose={() => setIsOpen(false)} />}
      <main>
        <header className={style.header}>
          <div className={style.box} />
          <button className={style.logo}>
            <Logo width={72.7} height={28} />
          </button>
          <div className={style.box} />
        </header>
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
