import { css } from 'styled-system/css';

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

const blueText = css({ color: 'main.blue', mr: '1rem' });
const redText = css({ color: 'error', mr: '1rem' });

export { orderInfoWrapper, blueText, redText };
