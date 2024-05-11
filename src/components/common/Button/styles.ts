import { cva } from 'styled-system/css';

export const button = cva({
  base: {
    rounded: '0.8rem',
    color: 'gray.0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    outline: 'none',
  },
  variants: {
    size: {
      regular: {
        padding: '1.4rem',
      },
      full: {
        width: '100%',
        padding: '1.4rem 0',
      },
      none: {
        width: 'fit-content',
        height: 'fit-content',
      },
    },
    color: {
      primary: {
        bgColor: 'main.blue',
        '@media (hover: hover):enabled': {
          '&:hover': { bgColor: 'main.sky' },
        },
      },
      secondary: {
        bgColor: 'text.100',
        '@media (hover: hover):enabled': {
          '&:hover': { bgColor: 'gray.60' },
        },
      },
      kakao: {
        bgColor: 'main.yellow',
        color: '#1E2025',
      },
    },
    textStyle: {
      CTAButton: { textStyle: 'subtitle2' },
      resetButton: { textStyle: 'body1' },
    },
    disabled: {
      true: {
        cursor: 'not-allowed',
      },
    },
    isBottomFixed: {
      true: {
        position: 'fixed',
        left: '50%',
        transform: 'translateX(-50%)',
        maxWidth: '32.8rem',
      },
    },
    position: {
      first: { bottom: '9.5rem' },
      last: { bottom: '2.4rem' },
    },
  },
  compoundVariants: [
    {
      color: 'kakao',
      css: {
        gap: '1.75rem',
      },
    },
    {
      disabled: true,
      color: 'primary',
      css: {
        bgColor: 'bg.300',
      },
    },
    {
      disabled: true,
      color: 'secondary',
      css: {
        bgColor: 'text.300',
      },
    },
  ],
});
