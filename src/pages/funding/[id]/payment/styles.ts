import { css, cva } from 'styled-system/css';
import { hstack } from 'styled-system/patterns';

const orderInfoWrapper = css({
  bg: 'bg.200',
  rounded: '1.2rem',
  padding: '1.2rem 2.4rem',
  fontSize: 'caption1',
  fontWeight: '400',
  color: 'text.200',

  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  maxWidth: '284px',
  minWidth: '284px',
  mb: '3rem',
});

const headTitle = css({
  fontSize: 'title1',
  fontWeight: '700',
});

const subInfoWrapper = hstack({ gap: 0, alignItems: 'baseline' });

const colorText = cva({
  base: {},
  variants: {
    color: {
      blue: {
        color: 'main.blue',
      },
      red: {
        color: 'error',
      },
    },
    objective: {
      title: {
        fontSize: 'title1',
        fontWeight: '700',
      },
      subInfo: { minWidth: '5rem' },
    },
  },
});

export { orderInfoWrapper, headTitle, colorText, subInfoWrapper };
