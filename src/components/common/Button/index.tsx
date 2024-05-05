import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { cx } from 'styled-system/css';

import { button } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'full' | 'regular' | 'none';
  color?: 'primary' | 'secondary' | 'kakao';
  onClick?: () => void;
  isBottomFixed?: boolean;
  position?: 'first' | 'last';
  className?: string;
}

export default function Button({
  type = 'button',
  size = 'full',
  color = 'secondary',
  isBottomFixed = false,
  position = 'last',
  onClick,
  children,
  disabled,
  className,
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      type={type}
      {...props}
      className={cx(
        className,
        button({
          size,
          color,
          disabled,
          isBottomFixed,
          position,
        }),
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
