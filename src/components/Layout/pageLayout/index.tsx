/* eslint-disable react-hooks/exhaustive-deps */
import { tokenState } from '@store/store';
import { css } from '@styled-system/css';
import { useRouter } from 'next/router';
import React, { PropsWithChildren, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

export default function PageLayout({ children }: PropsWithChildren) {
  const router = useRouter();
  const token = useRecoilValue(tokenState);

  useEffect(() => {
    if (!token) {
      router.push('/');
    }
  }, [token]);

  return <div className={container}>{children}</div>;
}

const container = css({
  width: '100%',
  height: '100%',
});
