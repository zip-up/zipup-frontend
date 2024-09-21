import LoginIcon from '@assets/icons/user-large.svg';
import KakaoButton from '@components/common/Button/KakaoButton';
import ModalWithIcon from '@components/modals/ModalWithIcon';
import { handleLogin } from '@utils/kakaoLogin';

interface LoginModalProps {
  onClose: () => void;
}

export default function LoginModal({ onClose }: LoginModalProps) {
  return (
    <ModalWithIcon
      title="로그인이 필요한 서비스입니다."
      subtitle="카카오 로그인으로 5초만에 시작해요!"
      onClose={onClose}
      icon={<LoginIcon />}
      buttonComponent={<KakaoButton onClick={handleLogin}>카카오로 시작하기</KakaoButton>}
    />
  );
}
