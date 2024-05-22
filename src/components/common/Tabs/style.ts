import { css } from 'styled-system/css';
import { flex } from 'styled-system/patterns';

const tabs = flex({
  position: 'relative',
  width: '100%',
});

const tabItem = css({
  flex: 1,
  height: '4.8rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textStyle: 'body2',
  cursor: 'pointer',
  position: 'relative',
});

const indicator = css({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: 'calc(100% / 4)',
  height: '0.2rem',
  backgroundColor: 'main.blue',
  transition: 'transform 0.4s ease',
});

export { tabs, tabItem, indicator };
