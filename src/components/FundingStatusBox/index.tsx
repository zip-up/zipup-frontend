import ProgressBar from '@components/common/ProgressBar';
import StatusTag from '@components/common/StatusTag';
import { DetailFundingInfo } from '@typings/funding';
import { cx } from 'styled-system/css';

import * as style from './styles';

interface FundingStatusBoxProps {
  type?: 'floating' | 'static';
  info: Pick<DetailFundingInfo, 'percent' | 'expirationDate' | 'goalPrice'>;
}

export default function FundingStatusBox({
  type = 'static',
  info: { percent, expirationDate, goalPrice },
}: FundingStatusBoxProps) {
  return (
    <div className={cx(style.statusBox({ type }))}>
      <div className={style.subInfoWrapper}>
        <div className={style.statusMsg}>
          <span className={style.percentageText}>{percent}%</span>의 마음이 UP 되었어요
        </div>
        <StatusTag daysLeft={expirationDate} />
      </div>

      <ProgressBar isNotFull width={`${290 * (percent / 100)}px`} />

      <div className={style.captionWrapper}>
        <span>
          펀딩 종료까지 <span className={style.blueText}>{expirationDate}일</span>
        </span>
        <span>
          <span className={style.blueText}>목표금액</span> {goalPrice.toLocaleString()}원
        </span>
      </div>
    </div>
  );
}
