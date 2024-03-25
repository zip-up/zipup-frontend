import Modal from '@components/common/Modal';
import Login from '@assets/login-button.svg';
import * as style from './styles';

interface LoginModalProps {
  onClose: () => void;
}

export default function LoginModal({ onClose }: LoginModalProps) {
  const handleLoginClick = () => {
    window.location.href = process.env.NEXT_PUBLIC_BASE_URL + '/oauth2/authorization/kakao';
  };

  return (
    <Modal onClose={onClose}>
      <div className={style.imageBox}>
        <div className={style.image} />
      </div>
      <p className={style.title}>로그인이 필요한 서비스입니다.</p>
      <p className={style.subtitle}>카카오 로그인으로 5초만에 시작해요!</p>
      <p className={style.button_box}>
        <button className={style.button} onClick={handleLoginClick}>
          <Login />
        </button>
      </p>
    </Modal>
  );
}
