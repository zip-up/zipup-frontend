import { cva } from 'styled-system/css';

const spinner = cva({
  base: {
    borderRadius: '50%',
    border: '1px solid',
  },
  variants: {
    size: {
      sm: {
        borderWidth: '2px',
        w: '20px',
        h: '20px',
        borderTop: '2px solid gray',
      },
      md: {
        borderWidth: '4px',
        w: '40px',
        h: '40px',
        borderTop: '4px solid gray',
      },
    },
  },
});

export { spinner };
