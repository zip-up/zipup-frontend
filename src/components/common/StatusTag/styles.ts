import { cva } from '@styled-system/css';

const statusTag = cva({
  base: {
    rounded: '1.15rem',
    color: 'white',
    p: '0.6rem 1.2rem',
    fontWeight: '600',
  },
  variants: {
    bg: {
      black: { bg: 'main.black' },
      blue: { bg: 'success' },
    },
  },
});

export { statusTag };
