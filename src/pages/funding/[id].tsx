import Link from 'next/link';

export default function Funding() {
  return <Link href={{ pathname: '/payment', query: { amount: 20000 } }}>결제하기</Link>;
}
