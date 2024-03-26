import { PropsWithChildren } from 'react';
import * as style from './styles';

interface ModalProps {
  height?: number;
  onClose: () => void;
}

export default function Modal({ children, height, onClose }: PropsWithChildren<ModalProps>) {
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className={style.modal_container} onClick={onClose}>
      <div
        className={style.modal_content}
        style={{ height: height ? `${height * 0.1}rem` : '25.5rem' }}
        onClick={handleContentClick}
      >
        {children}
      </div>
    </div>
  );
}
