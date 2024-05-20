import Image from 'next/image';
import Button from '@components/common/Button';
import { statusTag } from '@components/common/StatusTag/styles';
import { PaymentInfo } from '@typings/funding';
import { formatDateTime } from '@utils/date';
import { css, RecipeVariantProps } from 'styled-system/css';

import * as style from './styles';

interface PaymentCardProps {
  paymentInfo: PaymentInfo;
  handleClick: () => void;
}

type StatusTagVarients = RecipeVariantProps<typeof statusTag>;
type StatusTagBg = NonNullable<StatusTagVarients>['bg'];

const CANCEL_STATUS_COLOR_MAP: { [key: string]: StatusTagBg } = {
  결제완료: 'blue',
  취소요청: 'black',
  취소완료: 'gray50',
} as const;

export default function PaymentCard({
  paymentInfo: {
    fundingName,
    fundingImage,
    paymentDate,
    amount,
    paymentNumber,
    status,
    refundable,
  },
  handleClick,
}: PaymentCardProps) {
  const [date, time] = formatDateTime(paymentDate);

  return (
    <div className={style.cardWrapper}>
      <div className={style.topInfo}>
        <span>
          <span>{date}</span>
          <span className={style.divider}>|</span>
          <span>{time}</span>
        </span>
        <span
          className={css(statusTag.raw({ size: 'static', bg: CANCEL_STATUS_COLOR_MAP[status] }), {
            fontWeight: '500',
            padding: '0.8rem',
          })}
        >
          {status}
        </span>
      </div>

      <div className={style.contentWrapper}>
        <div className={style.contentLayout}>
          <Image
            src={fundingImage ? fundingImage : '/default-funding-80.png'}
            alt="펀딩 상품 이미지"
            width={80}
            height={80}
            style={{ borderRadius: '0.6rem', objectFit: 'contain' }}
          />

          <div className={style.subInfoWrapper}>
            <span className={style.title}>{fundingName}</span>
            <span className={css({ textStyle: 'subtitle1' })}>
              {Number(amount).toLocaleString()}원
            </span>
            <span className={css({ textStyle: 'caption1', color: 'text.200' })}>
              <span className={css({ color: 'text.300', mr: '0.8rem' })}>결제 번호</span>
              {paymentNumber}
            </span>
          </div>
        </div>
        <Button color="white" disabled={!refundable} onClick={handleClick}>
          결제 취소
        </Button>
      </div>
    </div>
  );
}
