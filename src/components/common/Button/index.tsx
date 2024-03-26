import classnames from 'classnames';
import { button, styles } from './styles';
import { css } from '../../../../styled-system/css';
import { PropsWithChildren } from 'react';

interface ButtonProps {
  onClick?: () => void;
  height?: string;
  color: 'primary' | 'secondary' | 'disabled';
  className?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

export default function Button({
  height = '5.2rem',
  onClick,
  color,
  children,
  className,
  type = 'button',
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      type={type}
      className={classnames(button, styles[color], css({ height }), className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
