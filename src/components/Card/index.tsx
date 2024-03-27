import { css } from '@styled-system/css';
import GiftIcon from '@assets/icons/gift-image.svg';
import StatusTag from '@components/common/StatusTag';
import ProgressBar from '@components/common/ProgressBar';
import { FundingInfo } from '@typings/funding';
import Image from 'next/image';
import * as style from './styles';

interface CardProps {
  data: FundingInfo;
  onClick: () => void;
}

const Card = ({ data, onClick }: CardProps) => {
  const PROGRESS_BAR_BASE_WIDTH = 140;

  return (
    <div className={style.container} onClick={onClick}>
      <div className={style.image_box}>
        <div className={style.status}>
          <StatusTag daysLeft={Number(data.status)} />
        </div>
        {false && <div className={style.blur} />}
        <p>{data.imageUrl ? <Image src={data.imageUrl} alt="펀딩 이미지" /> : <GiftIcon />}</p>
      </div>
      <div className={style.info_box}>
        <ProgressBar
          noMargin
          progressBarWidth={css({ width: PROGRESS_BAR_BASE_WIDTH * 0.1 + 'rem' })}
          width={(PROGRESS_BAR_BASE_WIDTH * data.percent) / 1000 + 'rem'}
        />
        <div className={style.title}>{data.title}</div>
        <div className={style.percent}>{data.percent}% 달성</div>
      </div>
    </div>
  );
};

export default Card;
