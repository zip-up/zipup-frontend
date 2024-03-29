import { GetServerSideProps } from 'next';
import axios from 'axios';

export const getServerSideProps: GetServerSideProps = async context => {
  const {
    query: { paymentKey, orderId, amount, id },
  } = context;

  // 결제 승인 요청
  // 서버에서 amount를 받아와 suceess url parameter의 amount와 비교하는 로직이 선행되어야 함.
  //  if (amount !== userInputAmount) return redirect('/fail');

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/v1/payment/confirm?paymentKey=${paymentKey}&orderId=${orderId}&amount=${amount}`,
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      },
    );

    return { props: { paymentKey, orderId, amount } };
  } catch (e: any) {
    return {
      redirect: {
        destination: `/funding/${id}/payment/fail?code=${e.response?.data?.code}&message=${encodeURIComponent(e.response?.data?.message)}`,
        permanent: false,
      },
    };
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
