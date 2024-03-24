import classnames from 'classnames';
import { button, styles } from './styles';
import { css } from '../../../../styled-system/css';
import { PropsWithChildren } from 'react';

interface ButtonProps {
  onClick: () => void;
  height?: string;
  color: 'primary' | 'secondary' | 'disabled';
}

export default function Button({
  height = '5.2rem',
  onClick,
  color,
  children,
}: PropsWithChildren<ButtonProps>) {
  return (
    <button className={classnames(button, styles[color], css({ height }))} onClick={onClick}>
      {children}
    </button>
  );
}
