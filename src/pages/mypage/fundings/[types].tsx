import Card from '@components/Card';
import Header from '@components/common/Header';
import { FundingInfo } from '@typings/funding';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import * as style from '../styles';

const data: FundingInfo[] = [
  {
    id: '1',
    title: '테스트1',
    imageUrl: '',
    status: '3',
    percent: 0,
    organizer: '',
  },
  {
    id: '2',
    title: '테스트2',
    imageUrl: '',
    status: '2',
    percent: 25,
    organizer: '',
  },
  {
    id: '3',
    title: '테스트3',
    imageUrl: '',
    status: '0',
    percent: 50,
    organizer: '',
  },
  {
    id: '4',
    title: '테스트4',
    imageUrl: '',
    status: '70',
    percent: 100,
    organizer: '',
  },
];

export default function MyFundings() {
  const router = useRouter();
  const { types } = router.query;

  useEffect(() => {
    if (String(types) !== 'my' && String(types) !== 'participated') {
      router.push('/mypage');
    }
  }, [router.query]);

  return (
    <>
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
    </>
  );
}
