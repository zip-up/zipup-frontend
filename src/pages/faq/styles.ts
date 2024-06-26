import { css } from 'styled-system/css';

const searchBox = css({
  width: '36rem',
  height: '7.6rem',
  padding: '1.8rem 1.6rem 0.8rem 1.6rem',
  position: 'relative',
  margin: '0 auto',
});

const input = css({
  width: '32.8rem',
  height: '5.2rem',
  borderRadius: '0.8rem',
  borderColor: 'gray.30',
  borderWidth: '0.1rem',
  backgroundColor: 'bg.200',
  margin: '0 auto',
  padding: '1.3rem 5.2rem 1.19rem 1.6rem',
  outline: 'none',
});

const searchBtn = css({
  position: 'absolute',
  right: '1.6rem',
  cursor: 'pointer',
  height: '5.2rem',
  width: '5rem',
  paddingLeft: '1.2rem',
});

const content = css({
  backgroundColor: 'bg.200',
  flex: 1,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
});

export { searchBox, input, searchBtn, content };
