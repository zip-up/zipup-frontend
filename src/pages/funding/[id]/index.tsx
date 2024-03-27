import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from '@components/common/Header';
import * as style from './styles';
import Button from '@components/common/Button';
import MessageList from '@components/MessageList';
import StatusTag from '@components/common/StatusTag';
import DefaultPresentImg from '@assets/images/default_present.svg';
import Image from 'next/image';
import { useGetFundingDeatil } from '@hooks/queries/useFunding';

export default function Funding() {
  const router = useRouter();

  const { id } = router.query;

  const { data: fundingInfo } = useGetFundingDeatil();

  if (!fundingInfo) return null;

  const {
    title,
    imageUrl,
    expirationDate,
    percent,
    goalPrice,
    description,
    isOrganizer,
    isParticipant,
    presentList: messageList,
  } = fundingInfo;

  const RoleBasedButton = () => {
    if (isOrganizer) {
      return (
        <Button type="button" color="secondary" wFull onClick={() => {}}>
          친구에게 공유하기
        </Button>
      );
    }
    if (isParticipant) {
      return (
        <Button type="button" color="secondary" wFull onClick={() => {}}>
          결제 취소하기
        </Button>
      );
    }
    return (
      <Button type="button" color="secondary" wFull onClick={() => {}}>
        이 펀딩 참여하기
      </Button>
    );
  };

  return (
    <div className={style.pageLayout}>
      <Header />
      <DefaultPresentImg />
      <article className={style.wrapper}>
        <h2 className={style.title}>{title}</h2>

        <div className={style.statusBox}>
          <div className={style.subInfoWrapper}>
            <div className={style.statusMsg}>
              <span className={style.percentageText}>{percent}%</span>의 마음이 UP 되었어요
            </div>
            <StatusTag daysLeft={expirationDate} />
          </div>
          <div>progress bar</div>

          <div className={style.captionWrapper}>
            <span>
              펀딩 종료까지 <span className={style.blueText}>{expirationDate}일</span>
            </span>
            <span>
              <span className={style.blueText}>목표금액</span> {goalPrice.toLocaleString()}원
            </span>
          </div>
        </div>

        <RoleBasedButton />

        <div className={style.desc}>{description}</div>
      </article>

      <MessageList messages={messageList} />
    </div>
  );
}
