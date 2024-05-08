import { css } from 'styled-system/css';

const footer = css({
  padding: '2.4rem 1.6rem 3.2rem',
  width: '36rem',
  backgroundColor: 'bg.300',
});

const footerInfoBox = css({
  height: '5.8rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
  textStyle: 'caption1',
  color: 'text.100',
});

const termsAndConditions = css({
  display: 'flex',
  gap: '0.8rem',
  textStyle: 'caption1',
  color: 'text.200',
});

const pointer = css({
  cursor: 'pointer',
});

export { footer, footerInfoBox, termsAndConditions, pointer };
