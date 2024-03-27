import { cva } from '@styled-system/css';

const statusTag = cva({
  base: {
    rounded: '0.9rem',
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
        p: '0.6rem 1.2rem',
      },
      floating: {
        p: '1rem 1.2rem',
      },
    },
  },
});

export { statusTag };
