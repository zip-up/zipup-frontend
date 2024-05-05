import { css } from 'styled-system/css';

const footer = css({
  '@media (min-height: 650px)': {
    position: 'absolute',
    bottom: 0,
  },
  padding: '2.4rem 1.6rem 3.2rem',
  width: '36rem',
  backgroundColor: 'bg.300',
  marginTop: '3rem',
});

const footerInfoBox = css({
  height: '5.8rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
  fontFamily: 'pretendard-regular',
  fontSize: 'caption1',
  color: 'text.100',
  fontWeight: 400,
});

const termsAndConditions = css({
  display: 'flex',
  gap: '0.8rem',
  fontFamily: 'pretendard-regular',
  fontSize: 'caption1',
  color: 'text.200',
});

const pointer = css({
  cursor: 'pointer',
});

const style = {
  footer,
  footerInfoBox,
  termsAndConditions,
  pointer,
};

export default style;
