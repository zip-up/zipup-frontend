import Link from 'next/link';
import { useRouter } from 'next/router';
import DefaultNotiIcon from '@assets/icons/bell-default.svg';
import NotiWithAlertIcon from '@assets/icons/bell-with-alert.svg';
import UserIcon from '@assets/icons/user-small.svg';
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
  const hasUnreadNotifications = false;

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
      <Link href={'/'} aria-label="집업 홈페이지">
        <LogoIcon />
      </Link>
      <div className={style.buttonGroup}>
        <Link href={'/notifications'} aria-label="알림 페이지">
          {hasUnreadNotifications ? <NotiWithAlertIcon /> : <DefaultNotiIcon />}
        </Link>
        <button
          className={cx(style.box, css({ cursor: 'pointer' }))}
          data-d
          onClick={() => (user ? router.push('/mypage') : onOpen())}
          aria-label={user ? '마이 페이지로 이동' : '로그인을 위해 모달 열기'}
        >
          {user?.profileImage ? <Profile src={user.profileImage} size="full" /> : <UserIcon />}
        </button>
      </div>
    </header>
  );
}
