import { css } from 'styled-system/css';

const notiWrapper = { display: 'flex', gap: '1rem', padding: '1.2rem 2rem' };

const title = css({
  textStyle: 'subtitle2',
  fontSize: '1.6rem',
  lineHeight: '2.5rem',
  paddingBottom: '0.3rem',
});

const message = css({ textStyle: 'body1', fontSize: '1.5rem', lineHeight: '2.1rem' });

const date = css({
  textStyle: 'caption1',
  fontSize: '1.3rem',
  color: 'text.200',
  paddingTop: '0.6rem',
});

const info = css({
  textStyle: 'caption1',
  color: 'text.200',
  textAlign: 'center',
  padding: '1.6rem 2rem',
});

export { notiWrapper, title, message, date, info };
