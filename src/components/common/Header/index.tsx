import { useRouter } from 'next/router';
import BackIcon from '@assets/icons/back.svg';
import { css } from 'styled-system/css';

interface HeaderProps {
  hasTitle?: boolean;
  title?: string;
  onGoBack?: () => void;
  fromCreate?: boolean;
}

export default function Header({ hasTitle, title, onGoBack, fromCreate }: HeaderProps) {
  const router = useRouter();

  const handleGoBack = () => (fromCreate ? router.push('/') : router.back());

  return (
    <header className={header}>
      <button className={wrapper} onClick={onGoBack || handleGoBack}>
        <BackIcon />
      </button>
      {hasTitle && <h2 className={styledTitle}>{title}</h2>}
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

const styledTitle = css({
  fontFamily: 'pretendard-semibold',
  fontWeight: '600',
  color: 'text.100',
  fontSize: 'subtitle2',
});
