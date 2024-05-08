import { css } from 'styled-system/css';
import { flex } from 'styled-system/patterns';

const searchBox = css({
  width: '36rem',
  height: '7.6rem',
  padding: '1.8rem 1.6rem 0.8rem 1.6rem',
  position: 'relative',
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

const tabs = flex({});

const tabItem = css({
  width: '9rem',
  height: '4.8rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 'body2',
  borderBottomWidth: '0.2rem',
  cursor: 'pointer',
});

const content = css({
  backgroundColor: 'bg.200',
  height: 'calc(100vh - 17.4rem)',
});

export { searchBox, input, searchBtn, tabs, tabItem, content };
