import Image from 'next/image';
import Link from 'next/link';
import { button } from '@components/common/Button/styles';
import { CommonNoticePage } from '@components/Layout/NoticePageLayout';

export default function Fail() {
  return (
    <>
      <CommonNoticePage
        title="오류가 발생했어요"
        subTitle={
          '펀딩이 진행중이라 탈퇴가 불가능해요.\n모금액을 달성하거나 펀딩을 취소한 후\n다시 시도해주세요.'
        }
        imageComponent={<Image src="/fail.png" alt="탈퇴 이미지" width={220} height={100} />}
      />
      <Link
        href=""
        className={button({
          color: 'secondary',
          size: 'full',
          isBottomFixed: true,
          position: 'last',
          textStyle: 'CTAButton',
        })}
      >
        진행 중인 펀딩 확인하기
      </Link>
    </>
  );
}
