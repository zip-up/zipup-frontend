import { useRouter } from 'next/router';
import Header from '@components/common/Header';
import * as style from './styles';
import Button from '@components/common/Button';
import MessageList from '@components/MessageList';
import DefaultPresentImg from '@assets/images/default_present.svg';
import { useGetFundingDeatil } from '@hooks/queries/useFunding';
import FundingStatusBox from '@components/FundingStatusBox';

export default function Funding() {
  const router = useRouter();
  const { id: fundingId } = router.query;

  const { data: fundingInfo } = useGetFundingDeatil(fundingId);

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
      <Button
        type="button"
        color="secondary"
        wFull
        onClick={() => router.push(`/funding/${fundingId}/participate`)}
      >
        이 펀딩 참여하기
      </Button>
    );
  };

  return (
    <div className={style.pageLayout}>
      <Header />
      {!imageUrl ? (
        <DefaultPresentImg />
      ) : (
        <div className={style.imageWrapper}>
          <img src={imageUrl} alt="상품 이미지" />
        </div>
      )}
      <article className={style.wrapper}>
        <h2 className={style.title}>{title}</h2>

        <FundingStatusBox info={{ percent, expirationDate, goalPrice }} />

        <RoleBasedButton />

        <div className={style.desc}>{description}</div>
      </article>

      <MessageList messages={messageList} />
    </div>
  );
}