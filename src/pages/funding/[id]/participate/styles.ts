import { vstack } from '@styled-system/patterns';
import { css, cx } from '@styled-system/css';
import { statusTag } from '@components/common/StatusTag/styles';

const pageLayout = vstack({
  w: '32.8rem',
});

const container = vstack({
  p: '1.6rem',
  alignItems: 'flex-start',
});

const title = css({
  fontWeight: 600,
  color: 'text.100',
  fontSize: 'title2',
  lineHeight: '3rem',
  mb: '3rem',
});

const label = cx(
  statusTag({ bg: 'blue' }),
  css({
    display: 'inline-flex',
    alignItems: 'center',
    p: '0.7rem 1.2rem 0.7rem 1.1rem',
    gap: '0.8rem',
    fontWeight: '400',
    fontSize: '1.6rem',
  }),
);

export { pageLayout, container, title, label };
