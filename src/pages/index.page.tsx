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
import Draggable from '@components/Draggable';
import Footer from '@components/Footer';
import HeaderWithLogo from '@components/HeaderWithLogo';
import LoginModal from '@components/modals/LoginModal';
import { useLogIn } from '@hooks/queries/useAuth';
import { useFundingList, useStaticItemsList } from '@hooks/queries/useFundingList';
import { getLoacalStorage } from '@store/localStorage';
import { productForFundState } from '@store/store';
import { useSetRecoilState } from 'recoil';
import { css, cx } from 'styled-system/css';

import * as style from './style';

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
  const { data } = useFundingList({ types: 'trending' });
  const { data: staticItems } = useStaticItemsList();

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
            priority
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
          <Draggable className={style.sideWrapper}>
            {data?.map(item => (
              <Card
                key={item.id}
                width="14.6rem"
                height="21rem"
                data={item}
                onClick={() => {
                  router.push('/funding/' + item.id);
                }}
                styles={{ minWidth: '14.6rem', minHeight: '21rem' }}
                hasShadow
              />
            ))}
          </Draggable>
        </div>
        <div className={css({ margin: '2rem 0' })}>
          <div className={style.subtitleBox}>
            <h2 className={style.category}>요즘 핫한 집꾸템 추천!</h2>
          </div>
          <Draggable className={style.sideWrapper}>
            {staticItems?.map(item => (
              <Card
                key={item.id}
                width="14.6rem"
                height="21rem"
                product={item}
                onClick={() => {
                  setProductForFundState({
                    imageUrl: item.imageUrl,
                    url: item.productUrl,
                    price: item.goalPrice,
                    title: item.title,
                  });
                  router.push('/funding/create/1');
                }}
                styles={{ minWidth: '14.6rem', minHeight: '21rem' }}
                isProduct
                hasShadow
              />
            ))}
          </Draggable>
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
      </div>
      <Footer />
    </>
  );
}
