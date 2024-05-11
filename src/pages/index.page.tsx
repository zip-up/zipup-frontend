import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import CreateImage from '@assets/images/funding_create_image.svg';
import DeliveryImage from '@assets/images/funding_delivery_image.svg';
import ParticipateImage from '@assets/images/funding_participate_image.svg';
import TargetImage from '@assets/images/funding_target_image.svg';
import Button from '@components/common/Button';
import GradientBackground from '@components/common/Button/GradientBackground';
import Header from '@components/common/Header';
import Spinner from '@components/common/Spinner';
import HeaderWithLogo from '@components/HeaderWithLogo';
import LoginModal from '@components/modals/LoginModal';
import { useLogIn } from '@hooks/queries/useAuth';
import { getLoacalStorage, setLocalStorage } from '@store/localStorage';
import { pretendard } from '@styles/font';
import { css, cx } from 'styled-system/css';

import * as style from './style';

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
      const { accessToken, ...userData } = data;

      setLocalStorage('@token', accessToken);
      setLocalStorage('@user', userData);

      router.push('/');
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>ZIPup | 집들이 선물 펀딩 서비스</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style jsx global>
          {`
            :root {
              --font-pretendard: ${pretendard.style.fontFamily};
            }
          `}
        </style>
      </Head>
      {isOpen && <LoginModal onClose={() => setIsOpen(false)} />}

      {isBrowsingService ? (
        <Header onGoBack={() => setIsBrowsingService(false)} />
      ) : (
        <HeaderWithLogo onOpen={() => setIsOpen(true)} />
      )}
      <div className={cx(style.textBox, css({ mt: isBrowsingService ? '-3rem' : '3rem' }))}>
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
          <span className={style.subTitle}>
            주는 사람은 부담 없이,
            <br />
            받는 사람은 높은 만족도로
            <br />
            모두에게 즐거운 선물 경험을 제공해요
          </span>
        ) : (
          <span className={style.subTitle}>
            더나은 집들이 경험을 위한
            <br />
            집들이 선물 펀딩 서비스
          </span>
        )}
      </div>

      <div
        className={cx(style.wrapper, css({ height: isBrowsingService ? 'fit-content' : '40rem' }))}
      >
        <div className={style.image}>
          <Image src="/home.png" alt="메인 홈 이미지" fill priority />
        </div>
        {!isBrowsingService && (
          <GradientBackground direction="column">
            <Button
              color="primary"
              disabled={isLoading}
              onClick={() =>
                getLoacalStorage('@token') ? router.push('/funding/create/1') : setIsOpen(true)
              }
            >
              {isLoading ? <Spinner size="sm" /> : '내 펀딩을 만들어볼까요?'}
            </Button>
            <Button onClick={() => setIsBrowsingService(true)}>서비스를 둘러볼게요</Button>
          </GradientBackground>
        )}
      </div>
      {isBrowsingService && (
        <>
          <div className={style.serviceBox}>
            <div className={style.serviceTitleBox}>
              <span className={style.serviceTitle}>집들이 선물, 어떻게 받을 수 있나요?</span>
            </div>
            <div className={style.serviceDescBox}>
              {descData.map(item => (
                <div key={item.title} className={style.serviceDescCard}>
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
                  <div className={style.serviceTextBox}>
                    <p className={style.textTitle}>{item.title}</p>
                    <p className={style.textDesc}>{item.desc1}</p>
                    <p className={cx(style.textDesc, css({ marginTop: '-0.3rem' }))}>
                      {item.desc2}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className={style.loginBox}>
              <span className={style.loginText}>
                {getLoacalStorage('@token')
                  ? '내가 원하는 선물을\n지금 바로 등록해보세요'
                  : '카카오로 5초만에 로그인하고\n바로 시작해볼까요?'}
              </span>
              <Button
                className={style.loginButton}
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
