import { css } from 'styled-system/css';
import { flex } from 'styled-system/patterns';

const inner = flex({
  width: '36rem',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1.6rem',
});

const textBox = flex({
  alignItems: 'center',
  justifyContent: 'center',
});

const textWrapper = css({
  textStyle: 'title1',
  color: 'text.100',
});

const infoBox = flex({
  flexDirection: 'column',
  gap: '0.8rem',
  width: '100%',
});

const titleBox = css({
  textStyle: 'body1',
  color: 'text.200',
  lineHeight: '2.4rem',
});

const deliveryBox = flex({
  padding: '1.2rem 2.4rem',
  margin: '0.8rem auto',
  width: '28.4rem',
  height: '6.4rem',
  backgroundColor: 'bg.200',
  borderRadius: '1.2rem',
  flexDirection: 'column',
  gap: '0.4rem',
  justifyContent: 'center',
});

const deliveryTextBox = flex({
  alignItems: 'center',
  gap: '0.8rem',
  textStyle: 'caption1',
  color: 'text.200',
});

const notification = flex({
  width: '32.8rem',
  margin: '0 auto',
  textStyle: 'caption1',
  color: 'main.blue',
  fontWeight: 500,
  padding: '1.2rem',
  textAlign: 'center',
  position: 'absolute',
  backgroundColor: 'blue.10',
  borderRadius: '0.8rem',
  bottom: '3.2rem',
  alignItems: 'center',
  gap: '0.8rem',
});

export {
  inner,
  textBox,
  textWrapper,
  infoBox,
  titleBox,
  deliveryBox,
  deliveryTextBox,
  notification,
};
