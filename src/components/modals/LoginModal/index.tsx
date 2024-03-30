import ModalWithIcon from '@components/modals/ModalWithIcon';
import LoginIcon from '@assets/icons/login-icon.svg';
import LoginButtonIcon from '@assets/images/login-button.svg';
import { css } from '@styled-system/css';

interface LoginModalProps {
  onClose: () => void;
  onClick: () => void;
}

export default function LoginModal({ onClose, onClick }: LoginModalProps) {
  return (
    <ModalWithIcon
      title="로그인이 필요한 서비스입니다."
      subtitle="카카오 로그인으로 5초만에 시작해요!"
      onClose={onClose}
      icon={<LoginIcon />}
      buttonComponent={
        <button className={button} onClick={onClick}>
          <LoginButtonIcon />
        </button>
      }
    />
  );
}

const button = css({
  position: 'absolute',
  bottom: '1.8rem',
  left: 0,
  height: '4.9rem',
  width: '29.7rem',
  margin: '0 1rem',
  display: 'flex',
  justifyContent: 'center',
  cursor: 'pointer',
});
