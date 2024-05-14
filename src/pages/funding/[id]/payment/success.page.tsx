import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { InstanceWithToken } from '@api/index';
import Spinner from '@components/common/Spinner';
import { useGetFundingDetail, useParticipateFunding } from '@hooks/queries/useFunding';
import * as commonStyle from '@pages/invite/[id]/styles';
import { getLoacalStorage } from '@store/localStorage';
import { isAxiosError } from 'axios';
import { css, cx } from 'styled-system/css';

import * as style from './styles';

export const getServerSideProps: GetServerSideProps = async context => {
  const {
    query: { id: fundingId, paymentKey, orderId, amount },
  } = context;

  try {
    const response = await InstanceWithToken.get(
      `/v1/payment/confirm?paymentKey=${paymentKey}&orderId=${orderId}&amount=${amount}`,
    );

    if (!response.data.id) throw new Error('결제 승인 요청 실패');

    return { props: { fundingId, orderId, amount, paymentId: response.data.id } };
  } catch (error) {
    console.error('결제 승인 요청 에러', error);

    if (isAxiosError(error)) {
      return {
        redirect: {
          destination: `/funding/${fundingId}/payment/fail?code=${error.response?.data?.code}&message=${encodeURIComponent(error.response?.data?.message)}`,
          permanent: false,
        },
      };
    }

    return {
      redirect: {
        destination: `/funding/${fundingId}/payment/fail?code=${500}&message=${encodeURIComponent('결제 과정에서 서버에 오류가 발생했습니다.')}`,
        permanent: false,
      },
    };
  }
};

interface SuccessProps {
  fundingId: string;
  orderId: string;
  amount: string;
  paymentId: string;
}

export default function Success({ fundingId, orderId, amount, paymentId }: SuccessProps) {
  const participateInfo = getLoacalStorage('@participateInfo');

  const { mutate, isPending: isMutating } = useParticipateFunding();

  const { data: fundingInfo, isLoading } = useGetFundingDetail(fundingId);

  useEffect(() => {
    if (isLoading) return;

    mutate({
      fundingId,
      paymentId,
      ...participateInfo,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  if (isMutating || isLoading)
    return (
      <div className={commonStyle.container}>
        <Spinner />
      </div>
    );

  return (
    <div className={commonStyle.container}>
      <h1 className={style.headTitle}>
        펀딩 참여가
        <span className={style.colorText({ color: 'blue', objective: 'title' })}> 완료</span>
        되었어요
      </h1>
      <div className={commonStyle.subTitle}>
        <p>결제를 성공적으로 완료했어요.</p>
        {fundingInfo?.organizerName}님의 집들이를 UP해주셔서 감사해요!
      </div>

      <div className={style.orderInfoWrapper}>
        <div className={style.subInfoWrapper}>
          <span className={style.colorText({ color: 'blue', objective: 'subInfo' })}>
            주문 번호
          </span>
          <span>{orderId}</span>
        </div>
        <div className={style.subInfoWrapper}>
          <span className={style.colorText({ color: 'blue', objective: 'subInfo' })}>
            결제 금액
          </span>
          <span>{Number(amount).toLocaleString()}원</span>
        </div>
      </div>

      <Image src="/payment_success.png" alt="결제 성공 이미지" width={280} height={300} />
      <Link href={`/funding/${fundingId}`} className={cx(commonStyle.buttonLink, css({ mt: 0 }))}>
        돌아가기
      </Link>
    </div>
  );
}
