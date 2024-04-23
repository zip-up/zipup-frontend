import FundingStatusBox from '@components/FundingStatusBox';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import * as style from './styles';
import { DetailFundingInfo } from '@typings/funding';
import { InstanceWithToken } from '@api/index';

export const getServerSideProps: GetServerSideProps = async context => {
  const {
    query: { id },
  } = context;

  try {
    const response = await InstanceWithToken.get<DetailFundingInfo>(`/v1/fund?funding=${id}`);

    return { props: { id, organizerName: response.data.organizerName } };
  } catch (e: any) {
    return {
      redirect: {
        destination: `/404`,
        permanent: false,
      },
    };
  }
};

interface InviteProps {
  id: string;
  organizerName: string;
}

export default function Invite({ id, organizerName }: InviteProps) {
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
        <Image src="/invite.png" alt="s" width={300} height={300} />
        <div className={style.positionedWrapper}>
          <FundingStatusBox
            type="floating"
            info={{ percent: 15, expirationDate: 23, goalPrice: 20000 }}
          />
        </div>
      </div>

      <Link href={`/funding/${id}`} className={style.buttonLink}>
        더 자세히 보기
      </Link>
    </div>
  );
}
