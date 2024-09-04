import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { InstanceWithToken } from '@api/index';
import { button } from '@components/common/Button/styles';
import CommonGreetingPage from '@components/Layout/GreetingPageLayout';
import { InvitationOptions } from '@pages/funding/[id]/index.page';
import { DetailFundingInfo } from '@typings/funding';
import { INVITATION_MESSAGE } from '@utils/share';

export const getServerSideProps: GetServerSideProps = async context => {
  const {
    query: { id, type },
  } = context;

  try {
    const {
      data: { organizerName, percent, expirationDate, goalPrice },
    } = await InstanceWithToken.get<DetailFundingInfo>(`/v1/fund?funding=${id}`, {
      headers: { Authorization: `Bearer ${context.req.cookies.token}` },
    });

    return {
      props: { id, organizerName, percent, expirationDate, goalPrice, type },
    };
  } catch (error) {
    return {
      redirect: {
        destination: `/404`,
        permanent: false,
      },
    };
  }
};

interface InviteProps
  extends Pick<
    DetailFundingInfo,
    'id' | 'organizerName' | 'percent' | 'expirationDate' | 'goalPrice'
  > {
  type: InvitationOptions;
}

export default function Invite({
  id,
  organizerName,
  percent,
  expirationDate,
  goalPrice,
  type,
}: InviteProps) {
  return (
    <CommonGreetingPage
      headTitle={
        <>
          <span>{organizerName}</span>
          {INVITATION_MESSAGE[type].messageWithBreak}
        </>
      }
      subTitle={
        <>
          <p>성공적인 집들이를 위해 선물 펀딩을 받고 있어요</p>사랑하는 친구를 위해 함께해주세요!
        </>
      }
      img={type === 'invite' ? '/invite.png' : '/invite-congratulation-share.png'}
      fundingInfo={{ percent, expirationDate, goalPrice }}
      button={
        <Link
          href={`/funding/${id}`}
          className={button({
            size: 'full',
            color: 'secondary',
            isBottomFixed: true,
            position: 'last',
            textStyle: 'CTAButton',
          })}
        >
          더 자세히 보기
        </Link>
      }
    />
  );
}
