import classnames from 'classnames';
import { button, styles } from './styles';
import { css } from '@styled-system/css';
import { CSSProperties, PropsWithChildren } from 'react';

interface ButtonProps {
  onClick?: () => void;
  height?: string;
  color: 'primary' | 'secondary' | 'disabled';
  className?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  style?: CSSProperties;
}

export default function Button({
  height = '5.2rem',
  onClick,
  color,
  children,
  className,
  type = 'button',
  style,
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      type={type}
      className={classnames(button, styles[color], css({ height }), className)}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
}
