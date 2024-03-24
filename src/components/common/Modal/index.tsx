import { PropsWithChildren } from 'react';
import { css } from '../../../../styled-system/css';
import classNames from 'classnames';
import * as style from './styles';

interface ModalProps {
  height?: string;
  onClose: () => void;
}

export default function Modal({ children, height, onClose }: PropsWithChildren<ModalProps>) {
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className={style.modal_container} onClick={onClose}>
      <div
        className={classNames(style.modal_content, css({ height: height || '25.5rem' }))}
        onClick={handleContentClick}
      >
        {children}
      </div>
    </div>
  );
}
