/* eslint-disable @next/next/no-img-element */
import { css } from '@styled-system/css';
import GiftIcon from '@assets/icons/gift-image.svg';
import StatusTag from '@components/common/StatusTag';
import ProgressBar from '@components/common/ProgressBar';
import { FundingInfo } from '@typings/funding';
import * as style from './styles';
import classNames from 'classnames';

interface CardProps {
  data: FundingInfo;
  onClick: () => void;
}

const Card = ({ data, onClick }: CardProps) => {
  const PROGRESS_BAR_BASE_WIDTH = 140;

  return (
    <div className={style.container} onClick={onClick}>
      <div
        className={classNames(
          style.image_box,
          css({ backgroundColor: data.imageUrl.length <= 6 ? 'blue.10' : 'white' }),
        )}
      >
        <div className={style.status}>
          <StatusTag daysLeft={Number(data.status)} />
        </div>
        {data.percent === 100 && <div className={style.blur} />}
        <p>
          {data.imageUrl === 'https:' ? (
            <GiftIcon />
          ) : (
            <img src={data.imageUrl} alt="펀딩 이미지" width={100} height={120} />
          )}
        </p>
      </div>
      <div className={style.info_box}>
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
};

export default Card;
