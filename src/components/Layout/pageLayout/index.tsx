/* eslint-disable react-hooks/exhaustive-deps */
import { tokenState, userState } from '@store/store';
import { css } from 'styled-system/css';
import { PropsWithChildren, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

export default function PageLayout({ children }: PropsWithChildren) {
  const setToken = useSetRecoilState(tokenState);
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const token = localStorage.getItem('@token');
    const user = JSON.parse(localStorage.getItem('@user') as string);
    if (token) {
      setToken(token);
      setUser(user);
    }
  }, [setToken]);

  return <div className={container}>{children}</div>;
}

const container = css({
  width: '100%',
  height: '100%',
  position: 'relative',
});
