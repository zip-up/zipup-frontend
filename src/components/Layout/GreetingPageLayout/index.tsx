import { ReactNode } from 'react';
import Image from 'next/image';
import FundingStatusBox from '@components/FundingStatusBox';
import { getFundingStatus } from '@utils/getStatus';
import { css, cx } from 'styled-system/css';

import * as style from './styles';

interface CommonGreetingPageProps {
  type?: 'invite' | 'gratitude';
  headTitle: ReactNode;
  subTitle: ReactNode;
  img: string;
  fundingInfo?: { percent: number; expirationDate: number; goalPrice: number };
  letter?: ReactNode;
  button: ReactNode;
}

export default function CommonGreetingPage({
  type = 'invite',
  headTitle,
  subTitle,
  img,
  fundingInfo,
  letter,
  button,
}: CommonGreetingPageProps) {
  return (
    <div className={cx(style.container, css({ mt: type === 'invite' ? '6rem' : '0' }))}>
      <h1 className={style.headTitle}>{headTitle}</h1>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.positionedParent}>
        <Image src={img} alt="초대 이미지" width={300} height={350} />
        <div className={style.positionedWrapper}>
          {fundingInfo ? (
            <FundingStatusBox
              type="floating"
              info={fundingInfo}
              status={getFundingStatus(fundingInfo.percent, fundingInfo.expirationDate)}
            />
          ) : (
            letter
          )}
        </div>
      </div>
      {button}
    </div>
  );
}
