import { PropsWithChildren } from 'react';
import { flex } from 'styled-system/patterns';

interface GradientBackgroundProps {
  direction?: 'row' | 'column';
  color?: 'white' | 'lightgray';
}

export default function GradientBackground({
  direction = 'row',
  color = 'white',
  children,
}: PropsWithChildren<GradientBackgroundProps>) {
  const gradientColors = {
    white: '#FFF 66%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0)',
    lightgray: '#F8F9FA 66%, rgba(248, 249, 250, 0.8), rgba(248, 249, 250, 0.0)',
  };

  return (
    <div
      className={flex({
        direction,
        gap: direction === 'row' ? '0.8rem' : '1.6rem',
        w: '36rem',
        h: 'fit-content',
        pos: 'fixed',
        bottom: 0,
        p: '1.6rem 1.6rem 2.4rem 1.6rem',
        background: `linear-gradient(0deg, ${gradientColors[color]})`,
      })}
    >
      {children}
    </div>
  );
}
