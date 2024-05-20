import { PropsWithChildren, ReactElement } from 'react';
import Header from '@components/common/Header';

import * as style from './styles';

interface CommonNoticePageProps {
  title: string;
  subTitle: string;
  imageComponent: ReactElement;
}

export function CommonNoticePage({
  title,
  subTitle,
  imageComponent,
  children,
}: PropsWithChildren<CommonNoticePageProps>) {
  return (
    <>
      <Header />
      <div className={style.layout}>
        <>{imageComponent}</>
        <h2 className={style.title}>{title}</h2>
        <div className={style.subTitle}>{subTitle}</div>
        {children}
      </div>
    </>
  );
}
