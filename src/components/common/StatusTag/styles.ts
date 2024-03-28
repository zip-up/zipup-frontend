import { cva } from '@styled-system/css';

const statusTag = cva({
  base: {
    rounded: '0.8rem',
    color: 'white',
    fontWeight: '600',
    fontSize: 'caption1',
    w: 'fit-content',
    h: 'fit-content',
  },
  variants: {
    bg: {
      black: { bg: 'main.black' },
      blue: { bg: 'success' },
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
