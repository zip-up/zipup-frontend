import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Card from '@components/Card';
import Button from '@components/common/Button';
import Header from '@components/common/Header';
import NoResult from '@components/NoResult';
import { useFundingList } from '@hooks/queries/useFundingList';
import { FundingInfo } from '@typings/funding';

import * as style from '../styles';

type MainTextType = {
  title: string;
  noResultTitle: string;
  noResultDesc: string;
};

type MainTextKeys = 'my' | 'participated' | 'trending';

const MAIN_TEXT: Record<MainTextKeys, MainTextType> = {
  my: {
    title: '내가 만든 펀딩',
    noResultTitle: '아직 만든 펀딩이 없어요',
    noResultDesc: '지금 바로 내가 받고 싶은 선물을 등록해보세요.',
  },
  participated: {
    title: '내가 참여한 펀딩',
    noResultTitle: '아직 참여한 펀딩이 없어요',
    noResultDesc: '집들이를 준비하는 친구에게 집업을 알려보세요.',
  },
  trending: {
    title: '지금 인기있는 펀딩',
    noResultTitle: '지금 인기있는 펀딩이 없어요',
    noResultDesc: '집들이를 준비하는 친구에게 집업을 알려보세요.',
  },
};

export default function MyFundings() {
  const router = useRouter();
  const [data, setData] = useState<FundingInfo[]>([]);
  const { data: myFundingList } = useFundingList({ types: router.query.types as string });
  const [currentRouter, setCurrentRouter] = useState<MainTextKeys>('my');

  useEffect(() => {
    if (router.asPath === '/trending') {
      setCurrentRouter('trending');
    } else if (['my', 'participated'].includes(router.query.types as string)) {
      setCurrentRouter(router.query.types as MainTextKeys);
    } else {
      router.push('/mypage');
    }
  }, [router]);

  useEffect(() => {
    setData(myFundingList || []);
  }, [myFundingList]);

  return (
    <>
      <Header title={MAIN_TEXT[currentRouter].title} onGoBack={() => router.back()} />
      {data?.length ? (
        <div className={style.cardContent}>
          <div className={style.flexContainer}>
            {data.map((item, index) => (
              <Card key={index} data={item} onClick={() => router.push('/funding/' + item.id)} />
            ))}
          </div>
        </div>
      ) : (
        <NoResult
          title={MAIN_TEXT[currentRouter].noResultTitle}
          desc={MAIN_TEXT[currentRouter].noResultDesc}
          renderButton={
            <>
              {currentRouter === 'my' && (
                <Button
                  className={style.noResultButton}
                  onClick={() => router.push('/funding/create/1')}
                >
                  내 펀딩 만들기
                </Button>
              )}
            </>
          }
        />
      )}
    </>
  );
}
