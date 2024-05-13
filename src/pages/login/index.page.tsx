import { PropsWithChildren, ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import KakaoButton from '@components/common/Button/KakaoButton';
import Header from '@components/common/Header';
import { handleLogin } from '@utils/kakaoLogin';

import * as style from './styles';

interface CommonNoticePageProps {
  title: string;
  subTitle: string;
  imageComponent: ReactElement;
}

export function CommonNoticePage({
  title,
  subTitle,
  imageComponent,
  children,
}: PropsWithChildren<CommonNoticePageProps>) {
  return (
    <>
      <Header />
      <div className={style.layout}>
        <>{imageComponent}</>
        <h2 className={style.title}>{title}</h2>
        <div className={style.subTitle}>{subTitle}</div>
        {children}
      </div>
    </>
  );
}

export default function Login() {
  return (
    <>
      <CommonNoticePage
        title={'로그인이 필요한\n서비스입니다.'}
        subTitle={'간편 로그인 후 이용 가능해요.\n카카오 로그인으로 5초만에 시작해요!'}
        imageComponent={
          <Image src="/default_symbol.svg" alt="서비스 기본 아이콘" width={55} height={55} />
        }
      />
      <KakaoButton isBottomFixed position="first" onClick={handleLogin}>
        카카오로 시작하기
      </KakaoButton>
      <Link href="/" className={style.linkButton}>
        홈으로 돌아가기
      </Link>
    </>
  );
}
