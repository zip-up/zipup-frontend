import { useRouter } from 'next/router';
import MyFundings from '@components/MyFundings/index.page';
import { useFundingList } from '@hooks/queries/useFundingList';

export default function MyFundingsPage() {
  const router = useRouter();
  const { data: myFundingList } = useFundingList({ types: router.query.types as string });

  return <MyFundings fundingList={myFundingList} />;
}
