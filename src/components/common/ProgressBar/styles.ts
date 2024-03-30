import { css } from '@styled-system/css';

const progressbar = css({
  height: '0.8rem',
  position: 'relative',
});

const background_bar = css({
  borderRadius: '99.9rem',
  background: 'gray.20',
  width: '100%',
  height: '100%',
});

const current_progress = css({
  borderRadius: '99.9rem',
  background: 'main.blue',
  height: '0.8rem',
  position: 'absolute',
  top: 0,
});

export { progressbar, background_bar, current_progress };
