import * as style from './styles';
import Button from '@components/common/Button';
import Image from 'next/image';
import Header from '@components/common/Header';
import KakaoButton from '@components/common/Button/KakaoButton';
import { handleLogin } from '@utils/kakaoLogin';

export default function Login() {
  // ssr로 변경 및 로그인한 유저가 접근 시 404페이지, mypage로 redirect
  return (
    <>
      <Header />
      <div className={style.layout}>
        <Image src="/default_symbol.svg" alt="서비스 기본 아이콘" width={55} height={55} />
        <h2 className={style.title}>로그인이 필요한 서비스입니다.</h2>
        <div className={style.subTitle}>
          간편 로그인 후 이용 가능해요. <p>카카오 로그인으로 5초만에 시작해요!</p>
        </div>

        <KakaoButton isBottomFixed onClick={handleLogin}>
          카카오로 시작하기
        </KakaoButton>
        <Button isBottomFixed>홈으로 돌아가기</Button>
      </div>
    </>
  );
}
