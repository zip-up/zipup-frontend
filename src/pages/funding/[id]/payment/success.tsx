import { GetServerSideProps } from 'next';
import * as commonStyle from '@pages/invite/[id]/styles';
import * as style from './styles';
import Image from 'next/image';
import Link from 'next/link';
import { Instance } from '@api/index';
import { css, cx } from '@styled-system/css';
import { useEffect } from 'react';
import { getLoacalStorage } from '@store/localStorage';
import { useParticipateFunding } from '@hooks/queries/useFunding';

export const getServerSideProps: GetServerSideProps = async context => {
  const {
    query: { id: fundingId, paymentKey, orderId, amount },
  } = context;

  // 결제 승인 요청
  // 서버에서 amount를 받아와 suceess url parameter의 amount와 비교하는 로직이 선행되어야 함.
  //  if (amount !== userInputAmount) return redirect('/fail');

  try {
    const response = await Instance.get(
      `/v1/payment/confirm?paymentKey=${paymentKey}&orderId=${orderId}&amount=${amount}`,
    );

    return { props: { fundingId, orderId, amount, paymentId: response.data.id } };
  } catch (e: any) {
    console.log('결제 승인 요청 에러', e);
    return {
      redirect: {
        destination: `/funding/${fundingId}/payment/fail?code=${e.response?.data?.code}&message=${encodeURIComponent(e.response?.data?.message)}`,
        permanent: false,
      },
    };
  }
};

interface SuccessProps {
  fundingId: string;
  orderId: string;
  amount: string;
  paymentId: string;
}

export default function Success({ fundingId, orderId, amount, paymentId }: SuccessProps) {
  const participateInfo = getLoacalStorage('@participateInfo');

  const { mutate, isPending } = useParticipateFunding();

  useEffect(() => {
    mutate({
      fundingId,
      paymentId,
      ...participateInfo,
    });
  }, []);

  if (isPending) return <span>로딩 중....</span>;

  return (
    <div className={commonStyle.container}>
      <h1 className={commonStyle.headTitle}>
        펀딩 참여가 <span className={style.blueText}>완료</span>되었어요
      </h1>
      <div className={commonStyle.subTitle}>
        <p>결제를 성공적으로 완료했어요.</p>김집업님의 집들이를 UP해주셔서 감사해요!
      </div>

      <div className={style.orderInfoWrapper}>
        <div>
          <span className={style.blueText}>주문 번호</span> <span>{orderId}</span>
        </div>
        <div>
          <span className={style.blueText}>결제 금액</span>
          <span>{Number(amount).toLocaleString()}원</span>
        </div>
      </div>

      <Image src="/payment_success.png" alt="결제 성공 이미지" width={280} height={300} />
      <Link href={`/funding/${fundingId}`} className={cx(commonStyle.buttonLink, css({ mt: 0 }))}>
        돌아가기
      </Link>
    </div>
  );
}
