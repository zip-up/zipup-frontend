import { PropsWithChildren } from 'react';
import useLockBodyScroll from '@hooks/useLockScroll';

import * as style from './styles';

interface ModalProps {
  isOpen: boolean;
  width?: string;
  height?: number;
  onClose: () => void;
}

export default function Modal({
  children,
  isOpen,
  height,
  width,
  onClose,
}: PropsWithChildren<ModalProps>) {
  useLockBodyScroll(isOpen);

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className={style.modalContainer} onClick={onClose}>
      <div
        className={style.modalContent}
        style={{ height: height ? `${height * 0.1}rem` : '25.5rem', width }}
        onClick={handleContentClick}
      >
        {children}
      </div>
    </div>
  );
}
