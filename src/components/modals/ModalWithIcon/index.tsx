import Modal from '@components/common/Modal';
import * as style from './styles';

interface ModalWithIconProps {
  onClose: () => void;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  buttonComponent: React.ReactNode;
  width?: string;
}

export default function ModalWithIcon({
  onClose,
  title,
  subtitle,
  icon,
  buttonComponent,
  width,
}: ModalWithIconProps) {
  return (
    <Modal onClose={onClose} height={258} width={width}>
      <div className={style.top_box}>
        <div className={style.image_box}>{icon}</div>
        <p className={style.title}>{title}</p>
      </div>
      <p className={style.subtitle}>{subtitle}</p>
      <p className={style.button_box}>{buttonComponent}</p>
    </Modal>
  );
}
