import Modal from '@components/common/Modal';

import * as style from './styles';

interface ModalWithIconProps {
  isOpen: boolean;
  onClose: () => void;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  buttonComponent: React.ReactNode;
  width?: string;
}

export default function ModalWithIcon({
  isOpen,
  onClose,
  title,
  subtitle,
  icon,
  buttonComponent,
  width,
}: ModalWithIconProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} height={258} width={width}>
      <div className={style.topBox}>
        <div className={style.imageBox}>{icon}</div>
        <p className={style.title}>{title}</p>
      </div>
      <p className={style.subtitle}>{subtitle}</p>
      <div className={style.buttonBox}>{buttonComponent}</div>
    </Modal>
  );
}
