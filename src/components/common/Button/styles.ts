import { cva } from 'styled-system/css';

export const button = cva({
  base: {
    rounded: '0.8rem',
    color: 'bg.100',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
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
        '&:hover': { bgColor: 'blue.40' },
      },
      secondary: {
        bgColor: 'text.100',
        '&:hover': { bgColor: 'text.200' },
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
        bgColor: 'text.300',
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
      first: { bottom: '8.8rem' },
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
  ],
});
