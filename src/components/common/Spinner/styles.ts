import { cva } from 'styled-system/css';

const spinner = cva({
  base: {
    borderRadius: '50%',
    border: '0.1rem solid',
    animation: 'spin 1s linear infinite',
    color: 'gray.20',
  },
  variants: {
    size: {
      sm: {
        borderWidth: '0.2rem',
        w: '2rem',
        h: '2rem',
        borderTop: '0.2rem solid',
        borderTopColor: 'main.blue',
      },
      md: {
        borderWidth: '0.4rem',
        w: '4rem',
        h: '4rem',
        borderTop: '0.4rem solid',
        borderTopColor: 'main.blue',
      },
    },
  },
});

export { spinner };
