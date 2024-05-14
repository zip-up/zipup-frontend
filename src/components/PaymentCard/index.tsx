import Image from 'next/image';
import Button from '@components/common/Button';
import { css } from 'styled-system/css';

import * as style from './styles';

interface PaymentCardProps {
  paymentInfo: {
    date: string;
    time: string;
    imageUrl: string;
    title: string;
    amount: string;
    orderId: string;
    status: string;
    cancelable: boolean;
  };
  handleClick: () => void;
}

export default function PaymentCard({
  paymentInfo: { date, time, imageUrl, title, amount, orderId, status, cancelable },
  handleClick,
}: PaymentCardProps) {
  return (
    <div className={style.cardWrapper}>
      <div className={style.topInfo}>
        <span>
          <span>{date}</span>
          <span className={style.divider}>|</span>
          <span>{time}</span>
        </span>
        <span className={style.status}>{status}</span>
      </div>

      <div className={style.contentWrapper}>
        <div className={style.contentLayout}>
          <Image
            src={imageUrl ? imageUrl : '/default_image_80.png'}
            alt="펀딩 상품 이미지"
            width={80}
            height={80}
            style={{ borderRadius: '0.6rem', objectFit: 'contain' }}
          />

          <div className={style.subInfoWrapper}>
            <span className={style.title}>{title}</span>
            <span className={css({ textStyle: 'subtitle1' })}>
              {Number(amount).toLocaleString()}원
            </span>
            <span className={css({ textStyle: 'caption1', color: 'text.200' })}>
              <span className={css({ color: 'text.300', mr: '0.8rem' })}>결제 번호</span>
              {orderId}
            </span>
          </div>
        </div>
        <Button color="white" disabled={!cancelable} onClick={handleClick}>
          결제 취소
        </Button>
      </div>
    </div>
  );
}
