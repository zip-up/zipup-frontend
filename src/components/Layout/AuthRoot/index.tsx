/* eslint-disable react-hooks/exhaustive-deps */
import { userState } from '@store/store';
import { css } from 'styled-system/css';
import { PropsWithChildren, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { getLoacalStorage } from '@store/localStorage';

export default function AuthRoot({ children }: PropsWithChildren) {
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const token = getLoacalStorage('@token');
    const user = getLoacalStorage('@user');
    if (token) {
      setUser(user);
    }
  }, []);

  return <div className={container}>{children}</div>;
}

const container = css({
  width: '100%',
  height: '100%',
});
