import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { cx } from 'styled-system/css';

import { button } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'full' | 'regular' | 'none';
  color?: 'primary' | 'secondary' | 'kakao' | 'white';
  onClick?: () => void;
  isBottomFixed?: boolean;
  position?: 'first' | 'last';
  className?: string;
  textStyle?: 'CTAButton' | 'resetButton';
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
  textStyle = 'CTAButton',
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      type={type}
      {...props}
      className={cx(
        button({
          textStyle,
          size,
          color,
          disabled,
          isBottomFixed,
          position,
        }),
        className,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
