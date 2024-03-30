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
  wFull?: boolean;
  disabled?: boolean;
  isBottomFixed?: boolean;
}

export const BottomFixedStyle = css({
  position: 'fixed',
  bottom: '24px',
  width: '100%',
  transform: 'translateX(-50%)',
  left: '50%',
  maxWidth: '32.8rem',
});

export default function Button({
  wFull = false,
  height = '5.2rem',
  onClick,
  color,
  children,
  className,
  type = 'button',
  style,
  disabled,
  isBottomFixed = false,
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      type={type}
      className={classnames(
        button,
        styles[color],
        css(wFull && { width: '100%' }, { height }),
        className,
        isBottomFixed && BottomFixedStyle,
      )}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
