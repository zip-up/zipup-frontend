import { vstack } from '@styled-system/patterns';
import { css } from '@styled-system/css';

const container = vstack({
  p: '1.6rem',
  alignItems: 'flex-start',
});

const title = css({
  fontWeight: 600,
  color: 'text.100',
  fontSize: 'title2',
  lineHeight: '3rem',
});

export { container, title };
