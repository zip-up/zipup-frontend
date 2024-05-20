import { PropsWithChildren } from 'react';
import Modal from '@components/common/Modal';
import { subTitle } from '@pages/style';

import * as style from './styles';

interface ModalWithIconProps {
  onClose?: () => void;
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  buttonComponent: React.ReactNode;
  width?: string;
}

export default function ModalWithIcon({
  onClose = () => {},
  title,
  subtitle,
  icon,
  buttonComponent,
  width,
  children,
}: PropsWithChildren<ModalWithIconProps>) {
  return (
    <Modal onClose={onClose} width={width}>
      <div className={style.topBox}>
        <div className={style.imageBox}>{icon}</div>
        <p className={style.title}>{title}</p>
      </div>
      {subTitle && <p className={style.subtitle}>{subtitle}</p>}
      {children}
      <div className={style.buttonBox}>{buttonComponent}</div>
    </Modal>
  );
}
