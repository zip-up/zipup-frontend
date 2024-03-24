import Head from 'next/head';
import Logo from '../asset/logo.svg';
import Button from '@components/common/Button';
import Image from 'next/image';
import { box, header, highlight, image, logo, subtitle, text_box, wrapper, title } from './style';
import { useState } from 'react';
import LoginModal from '@components/modals/LoginModal/index';

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
        <header className={header}>
          <div className={box} />
          <button className={logo}>
            <Logo width={72.7} height={28} />
          </button>
          <div className={box} />
        </header>
        <div className={text_box}>
          <p className={title}>
            조금씩 마음을 보태어 <span className={highlight}>집들이 선물</span>을 보내요
          </p>
          <span className={subtitle}>
            더나은 집들이 경험을 위한
            <br />
            집들이 선물 펀딩 서비스
          </span>
        </div>
        <div className={wrapper}>
          <div className={image}>
            <Image src={''} alt="" />
          </div>
          <Button text="내 펀딩을 만들어볼까요?" color="primary" onClick={() => setIsOpen(true)} />
          <Button text="서비스 둘러볼게요" color="secondary" onClick={() => null} />
        </div>
      </main>
    </>
  );
}
