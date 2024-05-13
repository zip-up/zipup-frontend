import Image from 'next/image';
import Link from 'next/link';
import { button } from '@components/common/Button/styles';
import { CommonNoticePage } from '@pages/login/index.page';
import { css } from 'styled-system/css';

export default function Success() {
  return (
    <CommonNoticePage
      title="탈퇴가 완료되었습니다"
      subTitle={'아쉽지만 여기서 보내드릴게요.\n더 나은 서비스로 보답하겠습니다.'}
      imageComponent={
        <Image src="/default_symbol.svg" alt="서비스 기본 아이콘" width={55} height={55} />
      }
    >
      <Link
        href="/"
        className={css(
          button.raw({ color: 'secondary', textStyle: 'CTAButton', size: 'regular' }),
          { padding: '1.2rem 1.6rem', mt: '1.3rem' },
        )}
      >
        메인으로 돌아가기
      </Link>
    </CommonNoticePage>
  );
}
