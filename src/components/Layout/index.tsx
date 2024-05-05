import { PropsWithChildren } from 'react';

import * as style from './styles';

function Layout({ children }: PropsWithChildren) {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <main className={style.main}>{children}</main>
      </div>
    </div>
  );
}

export default Layout;
