import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from '@components/common/Header';

export default function Funding() {
  const router = useRouter();

  const { id } = router.query;

  return (
    <>
      <Header />
      <Link href={{ pathname: `/funding/${id}/payment`, query: { amount: 20000 } }}>결제하기</Link>
    </>
  );
}
