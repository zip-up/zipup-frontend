import Header from '@components/common/Header';
import PaymentCard from '@components/PaymentCard';
import { css } from 'styled-system/css';

export default function PayInfo() {
  const orderList = [
    {
      date: '2024.05.08',
      time: '12:00',
      imageUrl: '',
      title: '우리 집에 안락함을 더해줘, 이케아안녕안녕ㅇ안ㅇ연ㅇ',
      amount: '50000',
      orderId: '11100000',
      status: '결제완료',
      cancelable: true,
    },
  ];

  return (
    <>
      <Header hasTitle title="내 정보 관리" />
      {/** tab component */}
      <div className={css({ bg: 'bg.200', padding: '0 1.6rem', h: '100%' })}>
        {orderList.map(info => (
          <PaymentCard paymentInfo={info} key={info.orderId}></PaymentCard>
        ))}
      </div>
    </>
  );
}
