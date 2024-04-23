import { GetServerSideProps } from 'next';
import * as commonStyle from '@pages/invite/[id]/styles';
import * as style from './styles';
import Image from 'next/image';
import Link from 'next/link';
import { css, cx } from 'styled-system/css';

export const getServerSideProps: GetServerSideProps = async context => {
  const {
    query: { id: fundingId, code, message },
  } = context;

  return { props: { fundingId, code, message } };
};

interface FailProps {
  fundingId: string;
  code: string;
  message: string;
}

export default function Fail({ fundingId, code, message }: FailProps) {
  return (
    <div className={commonStyle.container}>
      <h1 className={style.headTitle}>
        결제에 <span className={style.colorText({ color: 'red', objective: 'title' })}>실패</span>
        했어요
      </h1>
      <div className={commonStyle.subTitle}>
        <p>결제를 다시 시도해주세요.</p>계속 결제에 실패할 시 고객센터에 문의해주세요.
      </div>

      <div className={cx(style.orderInfoWrapper, css({ mb: '8rem' }))}>
        <div className={style.subInfoWrapper}>
          <span className={style.colorText({ color: 'red', objective: 'subInfo' })}>실패사유</span>
          <span>{message}</span>
        </div>
        <div className={style.subInfoWrapper}>
          <span className={style.colorText({ color: 'red', objective: 'subInfo' })}>에러코드</span>
          <span>{code}</span>
        </div>
      </div>

      <Image src="/payment_fail.png" alt="결제 실패 이미지" width={290} height={320} />
      <Link href={`/funding/${fundingId}`} className={cx(commonStyle.buttonLink, css({ mt: 0 }))}>
        돌아가기
      </Link>
    </div>
  );
}
