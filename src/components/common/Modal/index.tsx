import React from 'react';
import { css } from '../../../../styled-system/css';
import classNames from 'classnames';
import { modal_container, modal_content } from './styles';

interface ModalProps {
  children: React.ReactNode;
  height?: string;
  onClose: () => void;
}

export default function Modal({ children, height, onClose }: ModalProps) {
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className={modal_container} onClick={onClose}>
      <div
        className={classNames(modal_content, css({ height: height || '25.5rem' }))}
        onClick={handleContentClick}
      >
        {children}
      </div>
    </div>
  );
}
