import { css } from 'styled-system/css';

const cardContent = css({
  height: 'calc(100% - 4.8rem)',
  backgroundColor: 'bg.200',
  padding: '1.6rem',
});

const noResult = css({
  marginTop: '19rem',
});

const iconBox = css({
  width: '100%',
  height: '10.4rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '2.4rem',
});

const textBox = css({
  height: '4.6rem',
  width: '100%',
  textAlign: 'center',
});

const title = css({
  color: 'gray.60',
  textStyle: 'subtitle2',
  fontWeight: '600',
});

const desc = css({
  color: 'gray.60',
  textStyle: 'body2',
  marginTop: '0.4rem',
});

export { cardContent, noResult, iconBox, textBox, title, desc };
