import { cva } from 'styled-system/css';

const spinner = cva({
  base: {
    borderRadius: '50%',
    border: '1px solid',
    animation: 'spin 1s linear infinite',
    color: 'gray.200',
  },
  variants: {
    size: {
      sm: {
        borderWidth: '2px',
        w: '20px',
        h: '20px',
        borderTop: '2px solid',
        borderTopColor: 'main.blue',
      },
      md: {
        borderWidth: '4px',
        w: '40px',
        h: '40px',
        borderTop: '4px solid',
        borderTopColor: 'main.blue',
      },
    },
  },
});

export { spinner };
