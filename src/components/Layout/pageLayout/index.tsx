/* eslint-disable react-hooks/exhaustive-deps */
import { userState } from '@store/store';
import { css } from 'styled-system/css';
import { PropsWithChildren, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { setLocalStorage, getLoacalStorage } from '@store/localStorage';

export default function PageLayout({ children }: PropsWithChildren) {
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const token = getLoacalStorage('@token');
    const user = JSON.parse(getLoacalStorage('@user'));
    if (token) {
      setLocalStorage('@token', token);
      setUser(user);
    }
  }, []);

  return <div className={container}>{children}</div>;
}

const container = css({
  width: '100%',
  height: '100%',
  position: 'relative',
});
