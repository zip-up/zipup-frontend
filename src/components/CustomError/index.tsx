import { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { button } from '@components/common/Button/styles';
import { css } from 'styled-system/css';

interface ErrorContainerProps {
  code: '404' | '500';
  title: string;
  contents: ReactNode;
}

export function ErrorPage({ code, title, contents }: ErrorContainerProps) {
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
      <span className={css({ textStyle: 'title1', color: 'text.200' })}>{code}</span>
      <Image src={'/error.png'} alt="에러 페이지" width={95} height={53} />
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
        <h1 className={css({ textStyle: 'subtitle2', textAlign: 'center' })}>{title}</h1>
        <div className={css({ textStyle: 'body2', textAlign: 'center' })}>{contents}</div>
      </div>
      <Link href="/" className={css(button.raw({ color: 'secondary' }), { p: '1rem 1.6rem' })}>
        메인으로 돌아가기
      </Link>
    </div>
  );
}
