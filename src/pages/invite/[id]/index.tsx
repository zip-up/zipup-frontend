import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import * as style from './styles';

export const getServerSideProps: GetServerSideProps = async context => {
  const {
    query: { id },
  } = context;

  // fetch detail info

  return { props: { id } };
};

interface InviteProps {
  id: string;
}

export default function Invite({ id }: InviteProps) {
  return (
    <div className={style.container}>
      <h1 className={style.headTitle}>
        <p>
          <span>김집업</span>님의
        </p>
        집들이에 초대할게요!
      </h1>
      <div className={style.subTitle}>
        <p>성공적인 집들이를 위해 선물 펀딩을 받고 있어요</p>사랑하는 친구를 위해 함께해주세요!
      </div>
      <Image src="/image_2.svg" alt="s" width={300} height={300} />

      <Link href={`/funding/${id}`} className={style.buttonLink}>
        더 자세히 보기
      </Link>
    </div>
  );
}
