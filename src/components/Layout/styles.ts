import { css } from '../../../styled-system/css';

const container = css({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const content = css({
  width: '100%',
  height: '100vh',
  maxWidth: '36rem',
  display: 'flex',
  flexDirection: 'column',
});

const main = css({
  flexGrow: 1,
});

export { container, content, main };
