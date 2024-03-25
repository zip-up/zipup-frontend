import BackIcon from '@assets/icons/back.svg';
import * as s from './styles';

interface HeaderProps {
  hasTitle?: boolean;
}

export default function Header({ hasTitle }: HeaderProps) {
  return (
    <header className={s.header}>
      <button className={s.wrapper}>
        <BackIcon />
      </button>
      {hasTitle && <h2 className={s.title}>내가 만든 펀딩</h2>}
      <div className={s.wrapper} />
    </header>
  );
}
