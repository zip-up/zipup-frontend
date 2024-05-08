import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import GiftIcon from '@assets/icons/big-gift-image.svg';
import Card from '@components/Card';
import Button from '@components/common/Button';
import Header from '@components/common/Header';
import { useUser } from '@hooks/queries/useAuth';
import { useGetMyFundingList, useGetParticipatedList } from '@hooks/queries/useFundingList';
import { FundingInfo } from '@typings/funding';
import { cx } from 'styled-system/css';
import { flex } from 'styled-system/patterns';

import * as style from '../styles';

export default function MyFundings() {
  const router = useRouter();
  const { types } = router.query;
  const { data: user } = useUser();

  const { data: myFundingList } = useGetMyFundingList({
    uuid: user?.id || '',
  });
  const { data: participatedList } = useGetParticipatedList({
    uuid: user?.id || '',
  });
  const data: FundingInfo[] = types === 'my' ? myFundingList! : participatedList!;

  useEffect(() => {
    if (types !== 'my' && types !== 'participated') {
      router.push('/mypage');
    }
  }, [router, types]);

  return (
    <>
      <Header
        title={String(types) === 'my' ? '내가 만든 펀딩' : '내가 참여한 펀딩'}
        onGoBack={() => router.back()}
      />
      {data?.length ? (
        <div className={style.cardContent}>
          <div className={style.flexContainer}>
            {data.map((item, index) => (
              <Card
                key={index}
                data={item}
                onClick={() => {
                  if (String(types) === 'my') {
                    router.push('/funding/' + item.id);
                  } else if (String(types) === 'participated') {
                    router.push('/funding/' + item.id);
                  }
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        <div
          className={cx(
            style.cardContent,
            flex({
              justifyContent: 'center',
            }),
          )}
        >
          <div className={style.noResult}>
            <div className={style.iconBox}>
              <GiftIcon />
            </div>
            <div className={style.textBox}>
              <p className={style.title}>
                {String(types) === 'my' ? '아직 만든 펀딩이 없어요' : '아직 참여한 펀딩이 없어요'}
              </p>
              <p className={style.desc}>
                {String(types) === 'my'
                  ? '지금 바로 내가 받고 싶은 선물을 등록해보세요.'
                  : '집들이를 준비하는 친구에게 집업을 알려보세요.'}
              </p>
            </div>
            {String(types) === 'my' && (
              <Button
                className={style.noResultButton}
                onClick={() => router.push('/funding/create/1')}
              >
                내 펀딩 만들기
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
