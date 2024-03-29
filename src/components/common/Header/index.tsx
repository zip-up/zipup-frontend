import { css } from '@styled-system/css';
import BackIcon from '@assets/icons/back.svg';
import { useRouter } from 'next/router';

interface HeaderProps {
  hasTitle?: boolean;
  title?: string;
  onGoBack?: () => void;
}

export default function Header({ hasTitle, title, onGoBack }: HeaderProps) {
  const router = useRouter();

  const handleGoBack = () => router.back();

  return (
    <header className={header}>
      <button className={wrapper} onClick={onGoBack || handleGoBack}>
        <BackIcon />
      </button>
      {hasTitle && <h2 className={styled_title}>{title}</h2>}
      <div className={wrapper} />
    </header>
  );
}

const header = css({
  width: '100%',
  height: '4.8rem',
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 2rem',
});

const wrapper = css({
  width: '2.4rem',
  height: '2.4rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
});

const styled_title = css({
  fontFamily: 'pretendard-semibold',
  fontWeight: '600',
  color: 'text.100',
  fontSize: 'subtitle2',
});
