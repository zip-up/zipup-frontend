import CancelIcon from '@assets/icons/cancel.svg';
import Button from '@components/common/Button';
import Header from '@components/common/Header';
import ModalWithIcon from '@components/modals/ModalWithIcon';
import PaymentCard from '@components/PaymentCard';
import { css } from 'styled-system/css';
import { flex } from 'styled-system/patterns';

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

  // const { data: paymentList } = useGetPaymentList();

  return (
    <>
      <Header hasTitle title="내 정보 관리" />
      {/** tab component */}
      <div
        className={flex({
          direction: 'column',
          bg: 'bg.200',
          padding: '1.6rem',
          h: '100%',
          gap: '1.6rem',
        })}
      >
        {orderList.map(info => (
          <PaymentCard paymentInfo={info} key={info.orderId} handleClick={() => {}}></PaymentCard>
        ))}
      </div>
      <ModalWithIcon
        icon={<CancelIcon />}
        title="정말 결제를 취소하시겠어요?"
        subtitle={'선물 받는 분께 취소 내역이 전달됩니다.\n삭제된 축하 메시지는 복구되지 않아요.'}
        buttonComponent={
          <div className={flex({ gap: '0.8rem' })}>
            <Button color="primary" className={css({ width: '10.9rem' })}>
              아니요
            </Button>
            <Button color="secondary" className={css({ width: '16.8rem' })}>
              예, 취소할게요
            </Button>
          </div>
        }
      />
    </>
  );
}
