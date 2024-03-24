import Modal from '@components/common/Modal';
import Login from '@asset/login-button.svg';
import * as style from './styles';

interface LoginModalProps {
  onClose: () => void;
}

export default function LoginModal({ onClose }: LoginModalProps) {
  const REDIRECT_URI = 'http://localhost:3000/kakao/callback';
  const url = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code
`;

  const handleLogin = () => {
    window.location.href = url;
  };

  return (
    <Modal onClose={onClose}>
      <div className={style.imageBox}>
        <div className={style.image} />
      </div>
      <p className={style.title}>로그인이 필요한 서비스입니다.</p>
      <p className={style.subtitle}>카카오 로그인으로 5초만에 시작해요!</p>
      <p className={style.button_box}>
        <button className={style.button} onClick={handleLogin}>
          <Login />
        </button>
      </p>
    </Modal>
  );
}
