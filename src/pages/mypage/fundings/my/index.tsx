import Card from '@components/Card';
import Header from '@components/common/Header';
import { useRouter } from 'next/router';
import React from 'react';
import * as style from '../../styles';

const data = [
  {
    title: '펀딩 제목입니다',
    amount: 0,
  },
  {
    title: '펀딩 제목입니다',
    amount: 25,
  },
  {
    title: '펀딩 제목입니다',
    amount: 50,
  },
  {
    title: '펀딩 제목입니다',
    amount: 100,
  },
];

export default function MyFundings() {
  const router = useRouter();

  return (
    <>
      <Header hasTitle title="내가 만든 펀딩" onGoBack={() => router.back()} />
      <div className={style.card_content}>
        <div className={style.flex_container}>
          {data.map((item, index) => (
            <Card key={index} data={item} />
          ))}
        </div>
      </div>
    </>
  );
}
