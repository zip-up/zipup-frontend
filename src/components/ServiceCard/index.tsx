import { ReactNode } from 'react';
import Link from 'next/link';

import * as style from './styles';

interface ServiceCardProps {
  type?: 'service' | 'support';
  href: string;
  title: string;
  subTitle: string;
  img?: ReactNode;
}

export default function ServiceCard({
  type = 'service',
  href,
  title,
  subTitle,
  img,
}: ServiceCardProps) {
  return (
    <Link href={href} className={style.cardLink({ type })}>
      <div className={style.title}>{title}</div>
      <span className={style.subTitle}>{subTitle}</span>

      {type === 'service' && <p className={style.img}>{img}</p>}
    </Link>
  );
}
