import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Redirect() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      console.log(router.query.code);
      router.push('/');
    }, 1000);
  }, []);

  return <div>로그인 중 입니다...</div>;
}
