import { GetServerSideProps } from 'next';
import axios from 'axios';
import * as commonStyle from '@pages/invite/[id]/styles';
import * as style from './styles';
import Image from 'next/image';
import Link from 'next/link';

export const getServerSideProps: GetServerSideProps = async context => {
  const {
    query: { id: fundingId, paymentKey, orderId, amount, id },
  } = context;

  // 결제 승인 요청
  // 서버에서 amount를 받아와 suceess url parameter의 amount와 비교하는 로직이 선행되어야 함.
  //  if (amount !== userInputAmount) return redirect('/fail');

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/v1/payment/confirm?paymentKey=${paymentKey}&orderId=${orderId}&amount=${amount}`,
      {
        headers: {},
      },
    );

    return { props: { fundingId, orderId, amount } };
  } catch (e: any) {
    console.log('결제 승인 요청 에러', e);
    return {
      redirect: {
        destination: `/funding/${id}/payment/fail?code=${e.response?.data?.code}&message=${encodeURIComponent(e.response?.data?.message)}`,
        permanent: false,
      },
    };
  }
};

interface SuccessProps {
  fundingId: string;
  orderId: string;
  amount: string;
}

export default function Success({ fundingId, orderId, amount }: SuccessProps) {
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

      <Image src="/payment_success.svg" alt="s" width={320} height={320} />
      <Link href={`/funding/${fundingId}`} className={commonStyle.buttonLink}>
        돌아가기
      </Link>
    </div>
  );
}
