import { css } from 'styled-system/css';

const header = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '4.8rem',
  padding: '0 1.7rem',
});

const logo = css({
  cursor: 'pointer',
});

const buttonGroup = css({
  display: 'flex',
  alignItems: 'center',
  gap: '0.6rem',
});

const box = css({
  width: '3rem',
  height: '3rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export { header, logo, buttonGroup, box };
