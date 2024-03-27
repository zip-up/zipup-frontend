import LogoIcon from '@assets/logo.svg';
import UserIcon from '@assets/user.svg';
import { css } from '@styled-system/css';

const HeaderWithLogo = () => {
  return (
    <header className={header}>
      <div className={box} />
      <button className={logo}>
        <LogoIcon width={72.7} height={28} />
      </button>
      <div className={box}>
        <UserIcon width={24} height={24} />
      </div>
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
