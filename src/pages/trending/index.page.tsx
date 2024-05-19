import React from 'react';
import MyFundings from '@components/MyFundings/index.page';
import { useFundingList } from '@hooks/queries/useFundingList';

export default function Trendings() {
  const { data: trendingFundingList } = useFundingList({ types: 'trending' });

  return <MyFundings fundingList={trendingFundingList} type="trending" />;
}
