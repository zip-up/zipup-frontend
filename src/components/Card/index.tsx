import Image from 'next/image';
import GiftIcon from '@assets/images/gift-images.svg';
import ProgressBar from '@components/common/ProgressBar';
import StatusTag from '@components/common/StatusTag';
import { FundingInfo } from '@typings/funding';
import { css, cx } from 'styled-system/css';

import * as style from './styles';

interface CardProps {
  data: FundingInfo;
  onClick: () => void;
}

export default function Card({ data, onClick }: CardProps) {
  const PROGRESS_BAR_BASE_WIDTH = 140;

  return (
    <div className={style.container} onClick={onClick}>
      <div
        className={cx(
          style.imageBox,
          css({ backgroundColor: data.imageUrl.length <= 6 ? 'blue.10' : 'white' }),
        )}
      >
        <div className={style.status}>
          <StatusTag daysLeft={Number(data.status)} isCompleted={data.status === '완료'} />
        </div>
        {data.status === '완료' && <div className={style.blur} />}
        <div>
          {data.imageUrl === 'https:' || !data.imageUrl ? (
            <GiftIcon />
          ) : (
            <div className={style.imageWrapper}>
              <Image
                src={data.imageUrl}
                alt="펀딩 이미지"
                fill
                style={{ objectFit: 'cover' }}
                sizes="15.6rem"
              />
            </div>
          )}
        </div>
      </div>
      <div className={style.infoBox}>
        <ProgressBar
          noMargin
          progressBarWidth={css({ width: PROGRESS_BAR_BASE_WIDTH * 0.1 + 'rem' })}
          width={
            data.percent >= 100
              ? '14.1rem'
              : (PROGRESS_BAR_BASE_WIDTH * data.percent) / 1000 + 'rem'
          }
        />
        <div className={style.title}>{data.title}</div>
        <div className={style.percent}>{data.percent}% 달성</div>
      </div>
    </div>
  );
}
