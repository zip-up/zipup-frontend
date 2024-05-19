import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Card from '@components/Card';
import Button from '@components/common/Button';
import Header from '@components/common/Header';
import NoResut from '@components/NoResult';
import { useFundingList } from '@hooks/queries/useFundingList';

import * as style from '../styles';

export default function MyFundings() {
  const router = useRouter();
  const { types } = router.query;

  const { data: myFundingList } = useFundingList({ types: types as string });

  useEffect(() => {
    if (types !== 'my' && types !== 'participated') {
      router.push('/mypage');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [types]);

  return (
    <>
      <Header
        title={types === 'my' ? '내가 만든 펀딩' : '내가 참여한 펀딩'}
        onGoBack={() => router.back()}
      />
      {myFundingList?.length ? (
        <div className={style.cardContent}>
          <div className={style.flexContainer}>
            {myFundingList.map((item, index) => (
              <Card key={index} data={item} onClick={() => router.push('/funding/' + item.id)} />
            ))}
          </div>
        </div>
      ) : (
        <NoResut
          title={types === 'my' ? '아직 만든 펀딩이 없어요' : '아직 참여한 펀딩이 없어요'}
          desc={
            types === 'my'
              ? '지금 바로 내가 받고 싶은 선물을 등록해보세요.'
              : '집들이를 준비하는 친구에게 집업을 알려보세요.'
          }
          renderButton={
            <>
              {types === 'my' && (
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
