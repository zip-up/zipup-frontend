import { css } from 'styled-system/css';

const message = css({
  width: '32.8rem',
  height: '4rem',
  borderRadius: '0.8rem',
  backgroundColor: 'blue.10',
  margin: '1.6rem auto',
  padding: '1.2rem',
  display: 'flex',
  gap: '0.8rem',
  fontFamily: 'pretendard-regular',
  fontSize: 'caption1',
});

const message_icon = css({
  width: '1.6rem',
  height: '1.6rem',
  cursor: 'pointer',
});

const message_text = css({
  color: 'success',
});

const terms_conditions = css({
  color: 'text.200',
  fontFamily: 'pretendard-regular',
  fontSize: 'caption1',
  textDecoration: 'underline',
  textUnderlineOffset: '0.2rem',
  cursor: 'pointer',
});

const add_margin = css({
  marginTop: '-0.1rem',
});

const flexbox = css({
  display: 'flex',
  flexDir: 'column',
});

export { message, message_icon, message_text, terms_conditions, add_margin, flexbox };
