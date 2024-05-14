import { PropsWithChildren } from 'react';

import * as style from './styles';

interface ModalProps {
  width?: string;
  onClose: () => void;
}

export default function Modal({ children, width, onClose }: PropsWithChildren<ModalProps>) {
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className={style.modalContainer} onClick={onClose}>
      <div className={style.modalContent} style={{ width }} onClick={handleContentClick}>
        {children}
      </div>
    </div>
  );
}
