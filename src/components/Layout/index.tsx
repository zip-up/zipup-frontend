import { PropsWithChildren } from 'react';
import { pretendard } from '@styles/font';

import * as style from './styles';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <main className={pretendard.className}>{children}</main>
      </div>
    </div>
  );
}
