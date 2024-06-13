import { PropsWithChildren } from 'react';
import { pretendard } from '@styles/font';
import { cx } from 'styled-system/css';

import * as style from './styles';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <main className={cx(pretendard.className, style.main)}>{children}</main>
      </div>
    </div>
  );
}
