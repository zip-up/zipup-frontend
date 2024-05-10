import { PropsWithChildren } from 'react';
import { cva } from 'styled-system/css';

interface GradientBackgroundProps {
  direction?: 'row' | 'column';
  color?: 'white' | 'lightgray';
}

export default function GradientBackground({
  direction = 'row',
  color = 'white',
  children,
}: PropsWithChildren<GradientBackgroundProps>) {
  return <div className={gradientBg({ direction, gradientColor: color })}>{children}</div>;
}

const gradientBg = cva({
  base: {
    display: 'flex',
    w: '36rem',
    h: 'fit-content',
    pos: 'fixed',
    bottom: 0,
    p: '3rem 1.6rem 2.4rem 1.6rem',
  },
  variants: {
    direction: {
      row: {
        flexDir: 'row',
        gap: '0.8rem',
      },
      column: { flexDir: 'column', gap: '1.6rem' },
    },
    gradientColor: {
      white: {
        backgroundImage: `linear-gradient(0deg, #FFF 66%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0))`,
      },
      lightgray: {
        backgroundImage:
          'linear-gradient(0deg, #F8F9FA 66%, rgba(248, 249, 250, 0.8), rgba(248, 249, 250, 0.0))',
      },
    },
  },
});
