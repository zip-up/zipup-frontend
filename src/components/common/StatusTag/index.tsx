import { FundingStatus } from '@typings/funding';

import * as style from './styles';

interface StatusTagProps {
  status: FundingStatus;
  daysLeft?: number;
  isFloating?: boolean;
}

export default function StatusTag({ status, daysLeft = 0, isFloating = false }: StatusTagProps) {
  const size = isFloating ? 'floating' : 'static';

  const STATUS_MESSAGE = {
    IN_PROGRESS: '진행중',
    EXPIRED: '기간만료',
    COMPLETED: '완료',
  };

  return (
    <div className={style.statusTag({ status, size })}>
      {daysLeft >= 0 ? `D - ${daysLeft}` : STATUS_MESSAGE[status]}
    </div>
  );
}
