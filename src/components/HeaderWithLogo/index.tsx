import LogoIcon from '@assets/images/logo.svg';
import UserIcon from '@assets/icons/user.svg';
import { css } from '@styled-system/css';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { tokenState, userState } from '@store/store';
import Image from 'next/image';

interface HeaderWithLogoProps {
  onOpen: () => void;
}

const HeaderWithLogo = ({ onOpen }: HeaderWithLogoProps) => {
  const router = useRouter();
  const token = useRecoilValue(tokenState);
  const user = useRecoilValue(userState);

  return (
    <header className={header}>
      <div className={box} />
      <button className={logo} onClick={() => router.push('/')}>
        <LogoIcon width={72.7} height={28} />
      </button>
      <button className={box} onClick={() => (token ? router.push('/mypage') : onOpen())}>
        {user.profileImage ? (
          <Image src={user.profileImage} alt="profile image" width={24} height={24} />
        ) : (
          <UserIcon />
        )}
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
  width: '2.4rem',
  height: '2.4rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
});
