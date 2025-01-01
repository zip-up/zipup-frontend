import React from 'react';
import { useRouter } from 'next/router';
import Card from '@components/Card';
import Button from '@components/common/Button';
import Header from '@components/common/Header';
import NoResult from '@components/NoResult';
import { FundingInfo } from '@typings/funding';

import * as style from './styles';

type MyFundingsProps = {
  fundingList: FundingInfo[] | undefined;
};

export default function MyFundings({ fundingList }: MyFundingsProps) {
  const router = useRouter();
  const type = router.query.types as string;

  const getText = () => {
    if (type === 'my') {
      return {
        title: '내가 만든 펀딩',
        noResultTitle: '아직 만든 펀딩이 없어요',
        noResultDesc: '지금 바로 내가 받고 싶은 선물을 등록해보세요.',
      };
    } else if (type === 'participated') {
      return {
        title: '내가 참여한 펀딩',
        noResultTitle: '아직 참여한 펀딩이 없어요',
        noResultDesc: '집들이를 준비하는 친구에게 집업을 알려보세요.',
      };
    }

    return {
      title: '지금 인기있는 펀딩',
      noResultTitle: '지금 인기있는 펀딩이 없어요',
      noResultDesc: '집들이를 준비하는 친구에게 집업을 알려보세요.',
    };
  };

  return (
    <>
      <Header title={getText().title} onGoBack={() => router.back()} />
      {fundingList?.length ? (
        <div className={style.cardContent}>
          <div className={style.flexContainer}>
            {fundingList.map((item, index) => (
              <Card
                key={index}
                data={item}
                onClick={() => router.push('/funding/' + item.id)}
                styles={{ minWidth: '15.6rem', height: '19rem' }}
              />
            ))}
          </div>
        </div>
      ) : (
        <NoResult
          title={getText().noResultTitle}
          desc={getText().noResultDesc}
          renderButton={
            <>
              {type === 'my' && (
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
