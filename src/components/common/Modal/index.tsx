import React from 'react';
import { css } from '../../../../styled-system/css';
import classNames from 'classnames';
import { modal_container, modal_content } from './styles';

interface ModalProps {
  children: React.ReactNode;
  height?: string;
}

export default function Modal({ children, height }: ModalProps) {
  return (
    <div className={modal_container}>
      <div className={classNames(modal_content, css({ height: height || '25.5rem' }))}>
        {children}
      </div>
    </div>
  );
}
