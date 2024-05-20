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
    size: {
      static: {
        p: '0.4rem 0.7rem',
      },
      floating: {
        p: '0.8rem 0.8rem',
      },
    },
  },
});

export { statusTag };
