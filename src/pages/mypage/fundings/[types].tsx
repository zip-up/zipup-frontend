/* eslint-disable react-hooks/exhaustive-deps */
import Card from '@components/Card';
import Header from '@components/common/Header';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import * as style from '../styles';
import { useGetMyFundingList, useGetParticipatedList } from '@hooks/queries/useGetFundingList';
import { useRecoilValue } from 'recoil';
import { tokenState, userState } from '@store/store';
import { FundingInfo } from '@typings/funding';
import PageLayout from '@components/Layout/pageLayout';

export default function MyFundings() {
  const router = useRouter();
  const { types } = router.query;
  const user = useRecoilValue(userState);
  const token = useRecoilValue(tokenState);
  const { data: myFundingList, refetch: refetchMyFundingList } = useGetMyFundingList({
    uuid: user.id,
    token,
  });
  const { data: participatedList, refetch: refetchParticipatedList } = useGetParticipatedList({
    uuid: user.id,
    token,
  });
  const [data, setData] = useState<FundingInfo[]>([]);

  useEffect(() => {
    if (String(types) !== 'my' && String(types) !== 'participated') {
      router.push('/mypage');
    }
  }, [router.query]);

  useEffect(() => {
    if (user.id) {
      if (String(types) === 'my') {
        refetchMyFundingList();
      } else if (String(types) === 'participated') {
        refetchParticipatedList();
      }
    }
  }, [user]);

  console.log(myFundingList);

  useEffect(() => {
    if (String(types) === 'my') {
      setData(myFundingList || []);
    } else if (String(types) === 'participated') {
      setData(participatedList || []);
    }
  }, [myFundingList, participatedList]);

  return (
    <PageLayout>
      <Header
        hasTitle
        title={String(types) === 'my' ? '내가 만든 펀딩' : '내가 참여한 펀딩'}
        onGoBack={() => router.back()}
      />
      <div className={style.card_content}>
        <div className={style.flex_container}>
          {data.map((item, index) => (
            <Card key={index} data={item} onClick={() => router.push('/funding/' + item.id)} />
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
