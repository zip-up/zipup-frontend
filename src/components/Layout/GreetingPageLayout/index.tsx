import { ReactNode } from 'react';
import Image from 'next/image';
import FundingStatusBox from '@components/FundingStatusBox';
import { getFundingStatus } from '@utils/getStatus';

import * as style from './styles';

interface CommonGreetingPageProps {
  headTitle: ReactNode;
  subTitle: ReactNode;
  fundingInfo?: { percent: number; expirationDate: number; goalPrice: number };
  button: ReactNode;
}

export default function CommonGreetingPage({
  headTitle,
  subTitle,
  fundingInfo,
  button,
}: CommonGreetingPageProps) {
  return (
    <div className={style.container}>
      <h1 className={style.headTitle}>{headTitle}</h1>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.positionedParent}>
        <Image src="/invite.png" alt="초대 이미지" width={300} height={300} />
        {fundingInfo && (
          <div className={style.positionedWrapper}>
            <FundingStatusBox
              type="floating"
              info={fundingInfo}
              status={getFundingStatus(fundingInfo.percent, fundingInfo.expirationDate)}
            />
          </div>
        )}
      </div>
      {button}
    </div>
  );
}
