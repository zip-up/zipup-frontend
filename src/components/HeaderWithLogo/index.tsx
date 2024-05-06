import { useRouter } from 'next/router';
import UserIcon from '@assets/icons/user.svg';
import LogoIcon from '@assets/images/logo.svg';
import Profile from '@components/common/Profile';
import { useUser } from '@hooks/queries/useAuth';
import { css, cx } from 'styled-system/css';

interface HeaderWithLogoProps {
  onOpen: () => void;
}

function HeaderWithLogo({ onOpen }: HeaderWithLogoProps) {
  const router = useRouter();
  const { data: user } = useUser();

  return (
    <header className={header}>
      <div className={box} />
      <button className={logo} onClick={() => router.push('/')}>
        <LogoIcon />
      </button>
      <button
        className={cx(box, css({ cursor: 'pointer' }))}
        data-d
        onClick={() => (user ? router.push('/mypage') : onOpen())}
      >
        {user?.profileImage ? <Profile src={user.profileImage} size="full" /> : <UserIcon />}
      </button>
    </header>
  );
}

export default HeaderWithLogo;

const header = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '4.8rem',
  padding: '0 1.7rem',
  borderBottomWidth: '0.1rem',
  borderBottomColor: 'gray.20',
});

const logo = css({
  cursor: 'pointer',
});

const box = css({
  width: '3rem',
  height: '3rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
