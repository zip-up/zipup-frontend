/* eslint-disable react-hooks/exhaustive-deps */
import Button from '@components/common/Button';
import HeaderWithLogo from '@components/HeaderWithLogo';
import UserIcon from '@assets/icons/user.svg';
import GoIcon from '@assets/icons/go.svg';
import ExitIcon from '@assets/icons/exit.svg';
import MyFundingIcon from '@assets/images/my-funding.svg';
import ParticipatedFundingIcon from '@assets/images/participated_funding.svg';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as style from './styles';

const MyPage = () => {
  const router = useRouter();
  const isLoggedIn = true;
  const image = '';

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn]);

  return (
    <>
      <HeaderWithLogo />
      <div className={style.content}>
        <div className={style.profile_box}>
          <div className={style.info_box}>
            <div className={style.avatar}>
              {image ? <Image src={''} alt="profile image" width={42} height={42} /> : <UserIcon />}
            </div>
            <div className={style.name_box}>
              <span className={style.name}>김집업</span>
              <span>님</span>
            </div>
            <button className={style.logout}>
              <ExitIcon />
            </button>
          </div>
          <Button
            color="primary"
            className={style.button}
            onClick={() => router.push('/funding/create/1')}
          >
            내 펀딩 만들러 가기 <GoIcon />
          </Button>
        </div>
        <div className={style.service_box}>
          <span className={style.service_title}>서비스</span>
          <button
            className={style.go_funding_btn}
            onClick={() => router.push('/mypage/fundings/my')}
          >
            <div className={style.go_funding_info_box}>
              <h2 className={style.go_funding_title}>내가 만든 펀딩</h2>
              <span className={style.go_funding_subtitle}>작성한 펀딩을 확인할 수 있어요</span>
            </div>
            <p className={style.funding_image}>
              <MyFundingIcon />
            </p>
          </button>
          <button
            className={style.go_funding_btn}
            onClick={() => router.push('/mypage/fundings/participated')}
          >
            <div className={style.go_funding_info_box}>
              <h2 className={style.go_funding_title}>참여한 펀딩</h2>
              <span className={style.go_funding_subtitle}>결제한 펀딩을 확인할 수 있어요</span>
            </div>
            <p className={style.funding_image}>
              <ParticipatedFundingIcon />
            </p>
          </button>
        </div>
        <footer className={style.footer}>
          <div className={style.footer_info_box}>
            <p>상호명 : 집업</p>
            <p>고객센터 : 0504-0815-5379</p>
            <div className={style.terms_and_conditions}>
              <a
                href="https://www.figma.com/exit?url=https%3A%2F%2Fdanisong.notion.site%2F508a845508794eab98435cecea30d561%3Fpvs%3D4"
                className={style.pointer}
              >
                이용약관
              </a>
              <a
                href="https://danisong.notion.site/bdf9880b3f91458fbe1a4118de2b5eb1?pvs=4"
                className={style.pointer}
              >
                개인정보처리방침
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default MyPage;
