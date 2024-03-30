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
import classNames from 'classnames';
import { flex } from '@styled-system/patterns';
import GiftIcon from '@assets/icons/big-gift-image.svg';
import Button from '@components/common/Button';

export default function MyFundings() {
  const router = useRouter();
  const { types } = router.query;
  const user = useRecoilValue(userState);
  const token = useRecoilValue(tokenState);
  const {
    data: myFundingList,
    refetch: refetchMyFundingList,
    isLoading: isMyFundingListLoading,
  } = useGetMyFundingList({
    uuid: user.id,
    token,
  });
  const {
    data: participatedList,
    refetch: refetchParticipatedList,
    isLoading: isParticipatedListLoading,
  } = useGetParticipatedList({
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
  }, [user.id]);

  useEffect(() => {
    if (String(types) === 'my' && myFundingList) {
      setData(myFundingList || []);
    } else if (String(types) === 'participated' && participatedList) {
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
      {data.length > 0 && (
        <div className={style.card_content}>
          <div className={style.flex_container}>
            {data.map((item, index) => (
              <Card key={index} data={item} onClick={() => router.push('/funding/' + item.id)} />
            ))}
          </div>
        </div>
      )}
      {!data.length && !isParticipatedListLoading && !isMyFundingListLoading && (
        <div
          className={classNames(
            style.card_content,
            flex({
              justifyContent: 'center',
            }),
          )}
        >
          <div className={style.no_result}>
            <div className={style.icon_box}>
              <GiftIcon />
            </div>
            <div className={style.text_box}>
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
                color="secondary"
                className={style.no_result_button}
                onClick={() => router.push('/funding/create/1')}
              >
                내 펀딩 만들기
              </Button>
            )}
          </div>
        </div>
      )}
    </PageLayout>
  );
}
