import { css } from 'styled-system/css';
import { flex } from 'styled-system/patterns';

const tabs = flex({});

const tabItem = css({
  width: '100%',
  height: '4.8rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 'body2',
  borderBottomWidth: '0.2rem',
  cursor: 'pointer',
});

export { tabs, tabItem };
