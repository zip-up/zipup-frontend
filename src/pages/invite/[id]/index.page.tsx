import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { InstanceWithToken } from '@api/index';
import FundingStatusBox from '@components/FundingStatusBox';
import { DetailFundingInfo } from '@typings/funding';

import * as style from './styles';

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
    <div className={style.container}>
      <h1 className={style.headTitle}>
        <p>
          <span>{organizerName}</span>님의
        </p>
        집들이에 초대할게요!
      </h1>
      <div className={style.subTitle}>
        <p>성공적인 집들이를 위해 선물 펀딩을 받고 있어요</p>사랑하는 친구를 위해 함께해주세요!
      </div>
      <div className={style.positionedParent}>
        <Image src="/invite.png" alt="초대 이미지" width={300} height={300} />
        <div className={style.positionedWrapper}>
          <FundingStatusBox type="floating" info={{ percent, expirationDate, goalPrice }} />
        </div>
      </div>

      <Link href={`/funding/${id}`} className={style.buttonLink}>
        더 자세히 보기
      </Link>
    </div>
  );
}
