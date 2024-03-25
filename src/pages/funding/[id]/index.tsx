import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Funding() {
  const router = useRouter();

  const { id } = router.query;

  return (
    <Link href={{ pathname: `/funding/${id}/payment`, query: { amount: 20000 } }}>결제하기</Link>
  );
}
