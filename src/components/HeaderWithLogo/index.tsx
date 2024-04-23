import LogoIcon from '@assets/images/logo.svg';
import UserIcon from '@assets/icons/user.svg';
import { css } from 'styled-system/css';
import { useRouter } from 'next/router';
import Profile from '@components/common/Profile';
import { useUser } from '@hooks/queries/useAuth';

interface HeaderWithLogoProps {
  onOpen: () => void;
}

const HeaderWithLogo = ({ onOpen }: HeaderWithLogoProps) => {
  const router = useRouter();
  const { data: user } = useUser();

  return (
    <header className={header}>
      <div className={box} />
      <button className={logo} onClick={() => router.push('/')}>
        <LogoIcon width={72.7} height={28} />
      </button>
      <button className={box} data-d onClick={() => (user ? router.push('/mypage') : onOpen())}>
        {user?.profileImage ? <Profile src={user.profileImage} size="full" /> : <UserIcon />}
      </button>
    </header>
  );
};

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
  cursor: 'pointer',
});
