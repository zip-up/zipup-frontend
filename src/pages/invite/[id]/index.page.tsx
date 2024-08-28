import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { InstanceWithToken } from '@api/index';
import { button } from '@components/common/Button/styles';
import CommonGreetingPage from '@components/Layout/GreetingPageLayout';
import { DetailFundingInfo } from '@typings/funding';

export const getServerSideProps: GetServerSideProps = async context => {
  const {
    query: { id },
  } = context;

  try {
    const {
      data: { organizerName, percent, expirationDate, goalPrice },
    } = await InstanceWithToken.get<DetailFundingInfo>(`/v1/fund?funding=${id}`, {
      headers: { Authorization: `Bearer ${context.req.cookies.token}` },
    });

    return { props: { id, organizerName, percent, expirationDate, goalPrice } };
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
  > {}

export default function Invite({
  id,
  organizerName,
  percent,
  expirationDate,
  goalPrice,
}: InviteProps) {
  return (
    <CommonGreetingPage
      headTitle={
        <>
          <p>
            <span>{organizerName}</span>님의
          </p>
          집들이에 초대할게요!
        </>
      }
      subTitle={
        <>
          <p>성공적인 집들이를 위해 선물 펀딩을 받고 있어요</p>사랑하는 친구를 위해 함께해주세요!
        </>
      }
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
