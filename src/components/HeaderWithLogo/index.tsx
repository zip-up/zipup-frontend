import { useRouter } from 'next/router';
import UserIcon from '@assets/icons/user.svg';
import LogoIcon from '@assets/images/logo.svg';
import Profile from '@components/common/Profile';
import { useUser } from '@hooks/queries/useAuth';
import { css, cx } from 'styled-system/css';

import * as style from './styles';

interface HeaderWithLogoProps {
  onOpen: () => void;
  hasNoBorder?: boolean;
}

export default function HeaderWithLogo({ onOpen, hasNoBorder = false }: HeaderWithLogoProps) {
  const router = useRouter();
  const { data: user } = useUser();

  return (
    <header
      className={cx(
        style.header,
        css({
          borderBottomWidth: '0.1rem',
          borderBottomColor: hasNoBorder ? 'white' : 'gray.20',
        }),
      )}
    >
      <div className={style.box} />
      <button className={style.logo} onClick={() => router.push('/')}>
        <LogoIcon />
      </button>
      <button
        className={cx(style.box, css({ cursor: 'pointer' }))}
        data-d
        onClick={() => (user ? router.push('/mypage') : onOpen())}
      >
        {user?.profileImage ? <Profile src={user.profileImage} size="full" /> : <UserIcon />}
      </button>
    </header>
  );
}
