import { useRouter } from 'next/router';
import BackIcon from '@assets/icons/back.svg';

import * as style from './styles';

interface HeaderProps {
  title?: string;
  onGoBack?: () => void;
  fromCreate?: boolean;
}

export default function Header({ title, onGoBack, fromCreate }: HeaderProps) {
  const router = useRouter();

  const handleGoBack = () => (fromCreate ? router.push('/') : router.back());

  return (
    <header className={style.header}>
      <button className={style.wrapper} onClick={onGoBack || handleGoBack}>
        <BackIcon />
      </button>
      {title && <h2 className={style.styledTitle}>{title}</h2>}
      <div className={style.wrapper} />
    </header>
  );
}
