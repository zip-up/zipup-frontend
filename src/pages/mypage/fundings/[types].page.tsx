import { useEffect } from 'react';
import { useRouter } from 'next/router';
import MyFundings, { MainTextKeys } from '@components/MyFundings/index.page';
import { useFundingList } from '@hooks/queries/useFundingList';

export default function MyFundingsPage() {
  const router = useRouter();
  const { data: myFundingList } = useFundingList({ types: router.query.types as string });

  let type: MainTextKeys = 'my';
  if (router.query.types === 'participated') {
    type = 'participated';
  }

  return <MyFundings fundingList={myFundingList!} type={type} />;
}
