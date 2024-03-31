import Link from 'next/link';
import Image from 'next/image';
import { css, cx } from 'styled-system/css';
import { button, styles } from '@components/common/Button/styles';

export default function Custom404() {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        gap: '2rem',
      })}
    >
      <span className={css({ fontSize: 'title1', fontWeight: '700', color: 'text.200' })}>404</span>
      <Image src={'/404.png'} alt="404 에러 페이지" width={95} height={53} />
      <div
        className={css({
          display: 'flex',
          flexDir: 'column',
          alignItems: 'center',
          gap: '1rem',
          color: 'text.200',
          m: '1rem 0rem',
        })}
      >
        <h1 className={css({ fontWeight: '600', fontSize: 'subtitle2', textAlign: 'center' })}>
          찾으시는 페이지가 없습니다
        </h1>
        <div className={css({ fontWeight: '400', fontSize: 'body2', textAlign: 'center' })}>
          <p>잘못된 접근이거나 요청하신 페이지를 찾을 수 없어요.</p>
          <p>입력하신 페이지의 주소가 정확한지 확인해주세요.</p>
        </div>
      </div>
      <Link
        href={'/'}
        className={cx(button, styles['secondary'], css({ h: '5.2rem', w: '14.6rem' }))}
      >
        메인으로 돌아가기
      </Link>
    </div>
  );
}
