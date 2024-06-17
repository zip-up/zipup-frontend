import { cva } from 'styled-system/css';

const statusTag = cva({
  base: {
    rounded: '0.8rem',
    color: 'white',
    textStyle: 'caption1',
    w: 'fit-content',
    h: 'fit-content',
    fontWeight: '600',
  },
  variants: {
    bg: {
      black: { bg: 'main.black' },
      blue: { bg: 'success' },
      gray50: { bg: 'gray.50' },
      disabled: { bg: 'bg.300', color: 'text.200' },
    },
    status: {
      IN_PROGRESS: { bg: 'success' },
      EXPIRED: { color: 'text.200', bg: 'gray.30' },
      COMPLETED: { bg: 'black' },
    },
    size: {
      static: {
        p: '0.6rem 0.8rem',
      },
      floating: {
        p: '0.6rem 0.7rem',
      },
    },
  },
  compoundVariants: [
    {
      size: 'floating',
      css: {
        position: 'absolute',
        zIndex: 1,
        top: '0.8rem',
        right: '0.8rem',
      },
    },
  ],
});

export { statusTag };
