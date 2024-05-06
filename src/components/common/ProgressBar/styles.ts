import { css } from 'styled-system/css';

const progressBar = css({
  height: '0.8rem',
  position: 'relative',
});

const backgroundBar = css({
  borderRadius: '99.9rem',
  background: 'gray.20',
  width: '100%',
  height: '100%',
});

const currentProgress = css({
  borderRadius: '99.9rem',
  background: 'main.blue',
  height: '0.8rem',
  position: 'absolute',
  top: 0,
});

export { progressBar, backgroundBar, currentProgress };
