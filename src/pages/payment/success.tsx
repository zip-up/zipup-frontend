import { GetServerSideProps } from 'next';
import { redirect } from 'next/navigation';
import axios from 'axios';

export const getServerSideProps: GetServerSideProps = async context => {
  const {
    query: { paymentKey, orderId, amount },
  } = context;

  // 결제 승인 요청
  // 서버에서 amount를 받아와 suceess url parameter의 amount와 비교하는 로직이 선행되어야 함.
  //  if (amount !== userInputAmount) return redirect('/fail');

  const encryptedSecretKey = `Basic ${btoa(process.env.NEXT_PUBLIC_SECRET_KEY + ':')}`;

  try {
    const response = await axios.post(
      'https://api.tosspayments.com/v1/payments/confirm',
      {
        paymentKey,
        orderId,
        amount,
      },
      {
        headers: {
          Authorization: encryptedSecretKey,
        },
      },
    );
    return { props: { paymentKey, orderId, amount } };
  } catch (e: any) {
    redirect(`/payment/fail?code=${e.response.data.code}&message=${e.response.data.message}`);
  }
};

interface SuccessProps {
  paymentKey: string;
  orderId: string;
  amount: string;
}

export default function Success({ paymentKey, orderId, amount }: SuccessProps) {
  return (
    <>
      <div>결제 번호: {paymentKey}</div>
      <div>주문 번호: {orderId}</div>
      <div>결제 금액: {amount}</div>
    </>
  );
}
