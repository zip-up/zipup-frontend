import { css } from 'styled-system/css';
import { vstack } from 'styled-system/patterns';

const msgsWrapper = vstack({
  bg: 'bg.200',
  alignItems: 'flex-start',
  gap: '1.5rem',
  p: '1.3rem',
  w: '100%',
});

const title = css({
  color: 'text.100',
  textStyle: 'subtitle1',
  letterSpacing: '-0.02rem',
});

export { msgsWrapper, title };
