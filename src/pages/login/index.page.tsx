import Image from 'next/image';
import Link from 'next/link';
import KakaoButton from '@components/common/Button/KakaoButton';
import { button } from '@components/common/Button/styles';
import { CommonNoticePage } from '@components/Layout/NoticePageLayout';
import { handleLogin } from '@utils/kakaoLogin';

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
      <Link
        href="/"
        className={button({
          isBottomFixed: true,
          color: 'secondary',
          position: 'last',
          size: 'full',
          textStyle: 'CTAButton',
        })}
      >
        홈으로 돌아가기
      </Link>
    </>
  );
}
