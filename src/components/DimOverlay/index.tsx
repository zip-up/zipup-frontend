import { PropsWithChildren } from 'react';
import { css } from 'styled-system/css';

interface DimOverlayProps {
  isActive: boolean;
}
export default function DimOverlay({ isActive, children }: PropsWithChildren<DimOverlayProps>) {
  if (!isActive) return children;

  return (
    <div className={css({ position: 'relative' })}>
      {children}
      <div
        className={css({
          position: 'absolute',
          top: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'text.300',
          opacity: '0.8',
          mixBlendMode: 'multiply',
        })}
      />
    </div>
  );
}
