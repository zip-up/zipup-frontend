import { PropsWithChildren } from 'react';
import { container, content, main } from './styles';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className={container}>
      <div className={content}>
        <main className={main}>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
