import BackIcon from '@assets/icons/back.svg';
import * as style from './styles';

interface HeaderProps {
  hasTitle?: boolean;
}

export default function Header({ hasTitle }: HeaderProps) {
  return (
    <header className={style.header}>
      <button className={style.wrapper}>
        <BackIcon />
      </button>
      {hasTitle && <h2 className={style.title}>내가 만든 펀딩</h2>}
      <div className={style.wrapper} />
    </header>
  );
}
