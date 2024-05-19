import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import GoIcon from '@assets/icons/go.svg';
import CreateImage from '@assets/images/funding_create_image.svg';
import DeliveryImage from '@assets/images/funding_delivery_image.svg';
import ParticipateImage from '@assets/images/funding_participate_image.svg';
import TargetImage from '@assets/images/funding_target_image.svg';
import HomeImage from '@assets/images/home-fragment-brick.svg';
import Card from '@components/Card';
import Button from '@components/common/Button';
import Header from '@components/common/Header';
import Spinner from '@components/common/Spinner';
import Footer from '@components/Footer';
import HeaderWithLogo from '@components/HeaderWithLogo';
import LoginModal from '@components/modals/LoginModal';
import { useLogIn } from '@hooks/queries/useAuth';
import { getLoacalStorage } from '@store/localStorage';
import { productForFundState } from '@store/store';
import { pretendard } from '@styles/font';
import { useSetRecoilState } from 'recoil';
import { css, cx } from 'styled-system/css';

import * as style from './style';

const dummydata = [
  {
    id: '0',
    title: '우리 집에 안락함을 더하기',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1683121158319-acc40c6ef3b2?q=80&w=2264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    status: '1',
    percent: 75,
    organizer: 'dp',
  },
  {
    id: '1',
    title: '펀딩 이름입니다.',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1683121158319-acc40c6ef3b2?q=80&w=2264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    status: '1',
    percent: 0,
    organizer: '',
  },
  {
    id: '2',
    title: '펀딩 이름입니다.',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1683121158319-acc40c6ef3b2?q=80&w=2264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    status: '1',
    percent: 0,
    organizer: '',
  },
];

const productData = [
  {
    id: '0',
    title: '초절전리모컨 서큘레이터 선풍기',
    imageUrl:
      'https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/168189031695799079.jpg?gif=1&w=960&h=960&c=c&webp=1',
    url: 'https://ohou.se/productions/861834/selling?affect_id=1&affect_type=StoreSearchResult',
    price: 76900,
  },
  {
    id: '1',
    title: '펀딩 이름입니다.',
    price: 0,
    url: '',
    imageUrl: '',
  },
  {
    id: '2',
    title: '펀딩 이름입니다.',
    price: 0,
    url: '',
    imageUrl: '',
  },
];

const WAY_TO_FUND = [
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
  const setProductForFundState = useSetRecoilState(productForFundState);
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState('');
  const [isBrowsingService, setIsBrowsingService] = useState(false);
  const { isLoading } = useLogIn({ code });

  useEffect(() => {
    if (router.isReady && router.asPath.length > 2) {
      setCode(router.asPath.slice(2));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

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
        <HeaderWithLogo onOpen={() => setIsOpen(true)} hasNoBorder />
      )}
      <div className={style.banner}>
        <div className={style.bannerWrapper}>
          <div className={style.textBox}>
            <p className={style.title}>
              조금씩 마음을 보태어 <span className={style.highlight}>집들이 선물</span>을 보내요
            </p>
            <span className={style.subTitle}>
              더 멋진 집들이 경험을 위한
              <br />
              집들이 선물 펀딩 서비스
            </span>
          </div>
          <div className={style.homeImage1}>
            <HomeImage />
          </div>
          <Image
            src="/home-fragment-hand.png"
            alt="메인 홈 이미지"
            width={290}
            height={221}
            className={style.homeImage2}
          />
          <div className={style.homeImage3}>
            <HomeImage />
          </div>
        </div>
        <div className={style.loginBox}>
          <span className={style.loginText}>원하는 선물을 지금 바로 등록해보세요!</span>
          <Button
            size="full"
            style={{ marginTop: '1.9rem' }}
            onClick={() =>
              getLoacalStorage('@token') ? router.push('/funding/create/1') : setIsOpen(true)
            }
          >
            {isLoading ? <Spinner size="sm" /> : '내 펀딩 만들러 가기'}
          </Button>
        </div>
      </div>
      <div className={style.divider} />
      <div>
        <div className={css({ marginTop: '3.2rem' })}>
          <div className={style.subtitleBox}>
            <h2 className={style.category}>지금 인기있는 펀딩은?</h2>
            <a href="/trending" className={style.seeMore}>
              <div className={style.moveText}>더보기</div>
              <GoIcon style={{ color: '#0098E8' }} />
            </a>
          </div>
          <div className={style.sideWrapper}>
            {dummydata.map(item => (
              <Card
                key={item.id}
                width="14.6rem"
                height="21rem"
                data={item}
                onClick={() => router.push('/funding/' + item.id)}
                styles={{ minWidth: '14.6rem', minHeight: '21rem' }}
                hasShadow
              />
            ))}
          </div>
        </div>
        <div className={css({ margin: '2rem 0' })}>
          <div className={style.subtitleBox}>
            <h2 className={style.category}>요즘 핫한 집꾸템 추천!</h2>
          </div>
          <div className={style.sideWrapper}>
            {productData.map(item => (
              <Card
                key={item.id}
                width="14.6rem"
                height="21rem"
                product={item}
                onClick={() => {
                  setProductForFundState({
                    imageUrl: item.imageUrl,
                    url: item.url,
                    price: item.price,
                    title: item.title,
                  });
                  router.push('/funding/create/1');
                }}
                styles={{ minWidth: '14.6rem', minHeight: '21rem' }}
                isProduct
                hasShadow
              />
            ))}
          </div>
        </div>
      </div>
      <div className={style.serviceBox}>
        <div className={style.serviceTitleBox}>
          <span className={style.serviceTitle}>집들이 선물, 어떻게 받을 수 있나요?</span>
        </div>
        <div className={style.serviceDescBox}>
          {WAY_TO_FUND.map(item => (
            <div key={item.title} className={style.serviceDescCard}>
              <div className={style.iconBox}>{item.icon}</div>
              <div className={style.serviceTextBox}>
                <p className={style.textTitle}>{item.title}</p>
                <p className={style.textDesc}>{item.desc1}</p>
                <p className={cx(style.textDesc, css({ marginTop: '-0.3rem' }))}>{item.desc2}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer className={css({ height: '10.8rem' })} />
    </>
  );
}
