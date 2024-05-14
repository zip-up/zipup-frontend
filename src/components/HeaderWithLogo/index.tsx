import { useRouter } from 'next/router';
import UserIcon from '@assets/icons/user.svg';
import LogoIcon from '@assets/images/logo.svg';
import Profile from '@components/common/Profile';
import { useUser } from '@hooks/queries/useAuth';
import { css, cx } from 'styled-system/css';

import { box, header, logo } from './styles';

interface HeaderWithLogoProps {
  onOpen: () => void;
}

export default function HeaderWithLogo({ onOpen }: HeaderWithLogoProps) {
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
