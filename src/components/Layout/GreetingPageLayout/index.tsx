import { ReactNode } from 'react';
import Image from 'next/image';
import FundingStatusBox from '@components/FundingStatusBox';
import { getFundingStatus } from '@utils/getStatus';

import * as style from './styles';

interface CommonGreetingPageProps {
  type?: 'invite' | 'gratitude';
  headTitle: ReactNode;
  subTitle: ReactNode;
  fundingInfo?: { percent: number; expirationDate: number; goalPrice: number };
  letter?: ReactNode;
  button: ReactNode;
  isTextareaExpanded?: boolean;
}

export default function CommonGreetingPage({
  type = 'invite',
  headTitle,
  subTitle,
  fundingInfo,
  letter,
  button,
  isTextareaExpanded,
}: CommonGreetingPageProps) {
  console.log(isTextareaExpanded);

  return (
    <div className={style.container}>
      <h1 className={style.headTitle}>{headTitle}</h1>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.positionedParent}>
        <Image
          src={
            type === 'invite'
              ? '/invite.png'
              : isTextareaExpanded
                ? '/letter-expand.png'
                : '/letter.png'
          }
          alt="초대 이미지"
          width={300}
          height={300}
          style={{ height: isTextareaExpanded ? 338 : 300 }}
        />
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
